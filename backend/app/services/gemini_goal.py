"""
Gemini-powered dynamic goal generator for kiosk practice sessions.

Given a brand and its menu items, asks Gemini to pick ONE meal combination
so the "correct answers" change each session. Falls back to deterministic
defaults if GEMINI_API_KEY is missing or the call fails.
"""
from __future__ import annotations

import json
import logging
from typing import Any, Optional

from app.config import settings

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Schema used for Gemini's structured JSON output
# ---------------------------------------------------------------------------

_RESPONSE_SCHEMA = {
    "type": "object",
    "properties": {
        "goalSummary": {"type": "string"},
        "selections": {
            "type": "object",
            "properties": {
                "dine-mode":      {"type": "string", "enum": ["dine-in", "takeout"]},
                "category":       {"type": "string"},
                "set-or-single":  {"type": "string", "enum": ["set", "single"]},
                "set-size":       {"type": "string", "enum": ["regular", "large"]},
                "side-select":    {"type": "string"},
                "drink-select":   {"type": "string"},
                "table-service":  {"type": "string", "enum": ["table-service", "counter-pickup"]},
                "pay-method":     {"type": "string", "enum": ["credit-card", "smart-pay", "mobile-voucher"]},
            },
            "required": [
                "dine-mode", "set-or-single", "set-size",
                "table-service", "pay-method",
            ],
        },
    },
    "required": ["goalSummary", "selections"],
}

# ---------------------------------------------------------------------------
# Fallback defaults (used when Gemini is unavailable)
# ---------------------------------------------------------------------------

_FALLBACK_SELECTIONS: dict[str, str] = {
    "dine-mode": "dine-in",
    "set-or-single": "set",
    "set-size": "regular",
    "table-service": "table-service",
    "pay-method": "credit-card",
}

_FALLBACK_SUMMARY = "매장에서 세트 메뉴를 주문하고 카드로 결제해 보세요."


# ---------------------------------------------------------------------------
# Public entry point
# ---------------------------------------------------------------------------

def generate_goal(
    brand_name: str,
    menu_by_category: dict[str, list[dict[str, str]]],
    scenario_json: Optional[Any] = None,
) -> dict[str, Any]:
    """
    Return { "goal_summary": str, "selections": dict[str, str], "used_gemini": bool }.

    Parameters
    ----------
    brand_name:
        Human-readable brand name, e.g. "맥도날드".
    menu_by_category:
        Mapping of category slug → list of {"slug": ..., "name": ...} dicts.
        E.g. {"burger": [{"slug": "bigmac", "name": "빅맥"}, ...], "side": [...], "drink": [...]}
    scenario_json:
        The brand's full scenario_json stored in DB. Used to extract
        deterministic correctChoiceId values for the fallback.
    """
    if not settings.gemini_api_key:
        fallback = _make_fallback(menu_by_category, scenario_json)
        fallback["debug_reason"] = "no_api_key"
        return fallback

    try:
        return _call_gemini(brand_name, menu_by_category)
    except Exception as exc:
        logger.warning("Gemini call failed, using fallback: %s", exc)
        fallback = _make_fallback(menu_by_category, scenario_json)
        fallback["debug_reason"] = f"gemini_failed: {type(exc).__name__}: {exc}"
        return fallback


# ---------------------------------------------------------------------------
# Gemini call
# ---------------------------------------------------------------------------

def _build_prompt(brand_name: str, menu_by_category: dict[str, list[dict[str, str]]]) -> str:
    lines: list[str] = [
        "당신은 노인 사용자가 키오스크 연습을 할 때 오늘의 주문 목표를 정해주는 도우미예요.",
        f"{brand_name} 키오스크에서 다음 메뉴 중 하나를 선택해 한 끼 세트를 골라주세요.",
        "",
    ]

    burgers = menu_by_category.get("burger", [])
    sides   = menu_by_category.get("side", [])
    drinks  = menu_by_category.get("drink", [])

    if burgers:
        lines.append("## 버거 메뉴")
        for item in burgers:
            lines.append(f"- {item['name']} (slug: {item['slug']})")
        lines.append("")

    if sides:
        lines.append("## 사이드 메뉴")
        for item in sides:
            lines.append(f"- {item['name']} (slug: {item['slug']})")
        lines.append("")

    if drinks:
        lines.append("## 음료 메뉴")
        for item in drinks:
            lines.append(f"- {item['name']} (slug: {item['slug']})")
        lines.append("")

    lines += [
        "## 결정해야 할 항목",
        "- dine-mode: 매장(dine-in) 또는 포장(takeout)",
        "- category: 버거 slug (위 목록에서 선택)",
        "- set-or-single: 세트(set) 또는 단품(single)",
        "- set-size: 기본(regular) 또는 라지(large)",
        "- side-select: 사이드 slug (위 목록에서 선택, 세트일 때)",
        "- drink-select: 음료 slug (위 목록에서 선택, 세트일 때)",
        "- table-service: 테이블서비스(table-service) 또는 카운터수령(counter-pickup)",
        "- pay-method: 신용카드(credit-card), 삼성페이 등 간편결제(smart-pay), 모바일상품권(mobile-voucher)",
        "",
        "goalSummary는 노인 사용자에게 오늘의 주문 목표를 친근하게 1~2문장으로 안내해 주세요.",
        "메뉴 항목이 없는 경우 해당 항목은 selections에서 생략해도 됩니다.",
    ]

    return "\n".join(lines)


def _call_gemini(brand_name: str, menu_by_category: dict[str, list[dict[str, str]]]) -> dict[str, Any]:
    import google.generativeai as genai  # imported lazily to avoid crash if package missing

    genai.configure(api_key=settings.gemini_api_key)

    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config=genai.types.GenerationConfig(
            response_mime_type="application/json",
            response_schema=_RESPONSE_SCHEMA,
            temperature=1.0,
        ),
    )

    prompt = _build_prompt(brand_name, menu_by_category)
    response = model.generate_content(prompt)
    parsed = json.loads(response.text)

    goal_summary = parsed.get("goalSummary", _FALLBACK_SUMMARY)
    selections: dict[str, str] = parsed.get("selections", {})

    return {
        "goal_summary": goal_summary,
        "selections": selections,
        "used_gemini": True,
    }


# ---------------------------------------------------------------------------
# Fallback builder
# ---------------------------------------------------------------------------

def _make_fallback(
    menu_by_category: dict[str, list[dict[str, str]]],
    scenario_json: Optional[Any],
) -> dict[str, Any]:
    selections = dict(_FALLBACK_SELECTIONS)

    # Pull correctChoiceId values from scenario steps when available
    if scenario_json and isinstance(scenario_json, dict):
        steps = scenario_json.get("steps", [])
        for step in steps:
            step_id = step.get("id")
            correct = step.get("correctChoiceId")
            if step_id and correct:
                selections[step_id] = correct

    # Fill in a burger slug if available
    burgers = menu_by_category.get("burger", [])
    if burgers and "category" not in selections:
        selections["category"] = burgers[0]["slug"]

    sides = menu_by_category.get("side", [])
    if sides and "side-select" not in selections:
        selections["side-select"] = sides[0]["slug"]

    drinks = menu_by_category.get("drink", [])
    if drinks and "drink-select" not in selections:
        selections["drink-select"] = drinks[0]["slug"]

    return {
        "goal_summary": _FALLBACK_SUMMARY,
        "selections": selections,
        "used_gemini": False,
    }
