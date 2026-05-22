"""
Gemini-powered dynamic goal generator for kiosk practice sessions.

Given a brand and its scenario, asks Gemini to pick ONE valid choiceId per step
so the "correct answers" change each session while staying within the choices
the scenario actually offers. Falls back to deterministic defaults if
GEMINI_API_KEY is missing or the call fails.
"""
from __future__ import annotations

import json
import logging
from typing import Any, Optional

from app.config import settings

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Fallback summary
# ---------------------------------------------------------------------------

_FALLBACK_SUMMARY = "오늘은 세트 메뉴를 주문하고 카드로 결제해 보세요."


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

    Selections only contain step ids whose scenario step has more than one
    choice — otherwise there's nothing to randomize.
    """
    step_choices = _extract_step_choices(scenario_json)

    if not settings.gemini_api_key:
        fallback = _make_fallback(scenario_json)
        fallback["debug_reason"] = "no_api_key"
        return fallback

    if not step_choices:
        fallback = _make_fallback(scenario_json)
        fallback["debug_reason"] = "no_scenario_steps"
        return fallback

    try:
        return _call_gemini(brand_name, menu_by_category, step_choices)
    except Exception as exc:
        logger.warning("Gemini call failed, using fallback: %s", exc)
        fallback = _make_fallback(scenario_json)
        fallback["debug_reason"] = f"gemini_failed: {type(exc).__name__}: {exc}"
        return fallback


# ---------------------------------------------------------------------------
# Scenario inspection
# ---------------------------------------------------------------------------

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


# Choice ids that are navigation/utility rather than real answers — exclude
# from the randomizable pool so Gemini doesn't pick "cancel" as the goal.
_UTILITY_CHOICE_IDS = {
    "cancel", "home", "help", "back",
    "language", "accessibility", "point-accumulate", "point-qr",
    "lang-english", "lang-korean",
    "nutrition", "edit-burger",
    "edit-fries", "edit-fries-ingredient",
    "edit-drink", "edit-drink-ingredient",
    "qty-minus", "qty-plus", "add-more", "cancel-item",
}


def _randomizable_choices(step_choices: dict[str, list[str]]) -> dict[str, list[str]]:
    """Drop utility/nav choice ids; keep steps that still have ≥2 real options."""
    result: dict[str, list[str]] = {}
    for sid, ids in step_choices.items():
        real = [cid for cid in ids if cid not in _UTILITY_CHOICE_IDS]
        if len(real) >= 2:
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
        f"{brand_name} 키오스크 연습 시나리오에서 매 세션 다른 주문이 되도록 각 단계마다 하나의 선택지를 골라주세요.",
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
        "  메뉴 이름은 한국어로 자연스럽게 풀어 써주세요.",
    ]

    return "\n".join(lines)


def _build_response_schema(randomizable: dict[str, list[str]]) -> dict[str, Any]:
    """Build a JSON schema that pins each selection to its scenario's choice ids."""
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
    import google.generativeai as genai  # imported lazily

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
    selections_raw: dict[str, str] = parsed.get("selections", {})

    # Validate: any value not in the allowed list is replaced with the first choice.
    selections: dict[str, str] = {}
    for sid, allowed in randomizable.items():
        val = selections_raw.get(sid)
        selections[sid] = val if val in allowed else allowed[0]

    # Fill in single-choice steps (where there was no randomization to do)
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
    """Use the scenario's own correctChoiceId for every step."""
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
    }
