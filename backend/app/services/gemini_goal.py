"""
Gemini-powered dynamic goal generator for kiosk practice sessions.

Workflow:
1. Take the brand's stock scenario_json.
2. Expand certain steps' choices using the brand's real menu DB
   (e.g. category step → all available burgers, not just bigmac).
3. Ask Gemini to pick ONE valid choiceId per step (enforced via JSON schema enum).
4. Return the expanded scenario AND Gemini's selections so the frontend can
   override correctChoiceId and render the right options.

Falls back to deterministic defaults if GEMINI_API_KEY is missing or fails.
"""
from __future__ import annotations

import copy
import json
import logging
from typing import Any, Optional

from app.config import settings

logger = logging.getLogger(__name__)

_FALLBACK_SUMMARY = "오늘은 세트 메뉴를 주문하고 카드로 결제해 보세요."

# Map step.id → which menu category to pull burger/side/drink items from.
# When a step appears here, the step's choices are *replaced* with menu items
# (utility choices like cancel/home/help are kept). Otherwise the scenario's
# original choices are used as-is.
_STEP_MENU_CATEGORY: dict[str, str] = {
    "category": "burger",  # McDonald's burger picker step
    "menu": "burger",      # Burger King burger picker step
}

# Choice ids that are navigation/utility rather than real answers — excluded
# from the randomizable pool so Gemini doesn't pick "cancel" as the goal,
# but kept in the scenario's choices so the UI still renders the button.
_UTILITY_CHOICE_IDS = {
    # Generic nav
    "cancel", "home", "help", "back", "close",
    "language", "accessibility", "point-accumulate", "point-qr",
    "lang-english", "lang-korean",
    "nutrition", "edit-burger",
    "edit-fries", "edit-fries-ingredient",
    "edit-drink", "edit-drink-ingredient",
    "qty-minus", "qty-plus", "add-more", "cancel-item",
    # Burger King specific utility / non-goal alternatives
    "use-coupon", "exit", "edit-ingredients",
    "cancel-order", "cancel-pay",
    "remove-cart-item",
    "manual-code",
    # BK side-upsell: 4 side items are alternatives Gemini shouldn't pick;
    # the goal is to decline (decline-side stays as the only real choice).
    "add-side", "creamy-mozzaball", "2030348", "2030420", "6080072",
    # BK receipt popup: 영수증 출력 is the wrong path; 주문번호표만 출력 wins.
    "receipt",
    # BK pay-method: only credit-card is the goal for now.
    "payco", "meal-ticket",
    # BK combo-select alternatives: only 라지세트 (7111691) is the goal.
    # Other combos (단품, 세트) shouldn't be Gemini-selected.
    "7111052", "1080013",
}


# ---------------------------------------------------------------------------
# Public entry point
# ---------------------------------------------------------------------------

def generate_goal(
    brand_name: str,
    menu_by_category: dict[str, list[dict[str, str]]],
    scenario_json: Optional[Any] = None,
) -> dict[str, Any]:
    """
    Return {
      "goal_summary": str,
      "selections": dict[str, str],
      "used_gemini": bool,
      "scenario_json": dict  # expanded scenario with menu-based choices
    }
    """
    expanded = _expand_scenario(scenario_json, menu_by_category)
    step_choices = _extract_step_choices(expanded)

    if not settings.use_llm:
        fb = _make_fallback(expanded)
        fb["debug_reason"] = "llm_disabled"
        return fb

    if not settings.gemini_api_key or not step_choices:
        fb = _make_fallback(expanded)
        fb["debug_reason"] = "no_api_key" if not settings.gemini_api_key else "no_steps"
        return fb

    try:
        result = _call_gemini(brand_name, menu_by_category, step_choices)
        result["scenario_json"] = expanded
        return result
    except Exception as exc:
        logger.warning("Gemini call failed, using fallback: %s", exc)
        fb = _make_fallback(expanded)
        fb["debug_reason"] = f"gemini_failed: {type(exc).__name__}: {exc}"
        return fb


# ---------------------------------------------------------------------------
# Scenario expansion: pull real menu items into step.choices
# ---------------------------------------------------------------------------

def _expand_scenario(
    scenario_json: Optional[Any],
    menu_by_category: dict[str, list[dict[str, str]]],
) -> dict[str, Any]:
    """Return a deep copy of scenario with menu items merged into mapped steps."""
    if not scenario_json or not isinstance(scenario_json, dict):
        return scenario_json if isinstance(scenario_json, dict) else {}

    scenario = copy.deepcopy(scenario_json)
    steps = scenario.get("steps", [])

    for step in steps:
        sid = step.get("id")
        menu_cat = _STEP_MENU_CATEGORY.get(sid)
        if not menu_cat:
            continue
        menu_items = menu_by_category.get(menu_cat, [])
        if not menu_items:
            continue

        original = step.get("choices") or []
        # Keep utility choices (cancel/home/help) so the UI still renders them.
        utility = [c for c in original if c.get("id") in _UTILITY_CHOICE_IDS]
        # Replace real choices with menu items.
        menu_choices = [
            {"id": item["slug"], "label": item["name"], "emoji": "🍔"}
            for item in menu_items
        ]
        step["choices"] = menu_choices + utility

    return scenario


def _extract_step_choices(scenario_json: Optional[Any]) -> dict[str, list[str]]:
    """Return {step_id: [choiceId, ...]} for every step that has choices."""
    if not scenario_json or not isinstance(scenario_json, dict):
        return {}
    out: dict[str, list[str]] = {}
    for step in scenario_json.get("steps", []):
        sid = step.get("id")
        choices = step.get("choices") or []
        ids = [c.get("id") for c in choices if isinstance(c, dict) and c.get("id")]
        if sid and ids:
            out[sid] = ids
    return out


def _randomizable_choices(step_choices: dict[str, list[str]]) -> dict[str, list[str]]:
    """Drop utility choice ids; keep steps that still have ≥1 real option."""
    result: dict[str, list[str]] = {}
    for sid, ids in step_choices.items():
        real = [cid for cid in ids if cid not in _UTILITY_CHOICE_IDS]
        if real:
            result[sid] = real
    return result


# ---------------------------------------------------------------------------
# Gemini call
# ---------------------------------------------------------------------------

def _build_prompt(
    brand_name: str,
    menu_by_category: dict[str, list[dict[str, str]]],
    randomizable: dict[str, list[str]],
) -> str:
    lines: list[str] = [
        "당신은 노인 사용자가 키오스크 연습을 할 때 오늘의 주문 목표를 정해주는 도우미예요.",
        f"{brand_name} 키오스크 시나리오에서 매 세션 다른 주문이 되도록 각 단계마다 하나의 선택지를 골라주세요.",
        "",
        "## 메뉴 참고",
    ]
    for cat_slug, items in menu_by_category.items():
        if not items:
            continue
        lines.append(f"### {cat_slug}")
        for item in items:
            lines.append(f"- {item['name']} (slug: {item['slug']})")
        lines.append("")

    lines.append("## 단계별 선택지 (반드시 이 목록에서만 골라야 함)")
    for sid, ids in randomizable.items():
        lines.append(f"- {sid}: {ids}")

    lines += [
        "",
        "## 출력 규칙",
        "- selections의 각 키는 위 단계 id와 정확히 일치해야 합니다.",
        "- 각 값은 그 단계의 선택지 목록 안의 id 중 하나여야 합니다.",
        "- 새 slug를 만들거나 임의로 변형하지 마세요.",
        "- goalSummary는 어르신께 친근하게 1~2문장으로 오늘의 주문 목표를 설명해 주세요.",
        "  반드시 위 메뉴 이름을 한국어로 자연스럽게 풀어 써주세요.",
        "  예: \"오늘은 매장에서 1955버거 라지세트와 코울슬로, 아이스 아메리카노를 주문할 거예요!\"",
    ]
    return "\n".join(lines)


def _build_response_schema(randomizable: dict[str, list[str]]) -> dict[str, Any]:
    properties: dict[str, Any] = {}
    for sid, ids in randomizable.items():
        properties[sid] = {"type": "string", "enum": list(ids)}
    return {
        "type": "object",
        "properties": {
            "goalSummary": {"type": "string"},
            "selections": {
                "type": "object",
                "properties": properties,
                "required": list(properties.keys()),
            },
        },
        "required": ["goalSummary", "selections"],
    }


def _call_gemini(
    brand_name: str,
    menu_by_category: dict[str, list[dict[str, str]]],
    step_choices: dict[str, list[str]],
) -> dict[str, Any]:
    import google.generativeai as genai

    randomizable = _randomizable_choices(step_choices)
    if not randomizable:
        return {
            "goal_summary": _FALLBACK_SUMMARY,
            "selections": {sid: ids[0] for sid, ids in step_choices.items()},
            "used_gemini": False,
        }

    genai.configure(api_key=settings.gemini_api_key)
    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        generation_config=genai.types.GenerationConfig(
            response_mime_type="application/json",
            response_schema=_build_response_schema(randomizable),
            temperature=1.0,
        ),
    )

    prompt = _build_prompt(brand_name, menu_by_category, randomizable)
    response = model.generate_content(prompt)
    parsed = json.loads(response.text)

    goal_summary = parsed.get("goalSummary", _FALLBACK_SUMMARY)
    raw_sel: dict[str, str] = parsed.get("selections", {})

    selections: dict[str, str] = {}
    for sid, allowed in randomizable.items():
        val = raw_sel.get(sid)
        selections[sid] = val if val in allowed else allowed[0]
    for sid, ids in step_choices.items():
        if sid not in selections and ids:
            selections[sid] = ids[0]

    return {
        "goal_summary": goal_summary,
        "selections": selections,
        "used_gemini": True,
    }


# ---------------------------------------------------------------------------
# Fallback builder
# ---------------------------------------------------------------------------

def _make_fallback(scenario_json: Optional[Any]) -> dict[str, Any]:
    selections: dict[str, str] = {}
    if scenario_json and isinstance(scenario_json, dict):
        for step in scenario_json.get("steps", []):
            sid = step.get("id")
            correct = step.get("correctChoiceId")
            if sid and correct:
                selections[sid] = correct
    return {
        "goal_summary": _FALLBACK_SUMMARY,
        "selections": selections,
        "used_gemini": False,
        "scenario_json": scenario_json if isinstance(scenario_json, dict) else {},
    }
