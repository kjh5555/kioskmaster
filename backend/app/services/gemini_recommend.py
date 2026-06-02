"""
Pro 모드 시나리오 추천 — Gemini 가 카테고리·브랜드 보고 하나 추천.

Falls back to deterministic first-brand 추천 if GEMINI_API_KEY missing
or use_llm flag off, similar to gemini_goal.py.
"""
from __future__ import annotations

import json
import logging
from typing import Any, Optional

from app.config import settings

logger = logging.getLogger(__name__)

_FALLBACK_REASON = "오늘은 친숙한 메뉴부터 차근차근 연습해볼게요."


def recommend(brand_choices: list[dict[str, str]]) -> dict[str, Any]:
    """
    brand_choices: [{"category_slug", "category_title",
                     "brand_slug", "brand_name"}, ...]
    Returns {"category_slug", "brand_slug", "reason", "used_gemini"}.
    """
    if not brand_choices:
        return {
            "category_slug": None,
            "brand_slug": None,
            "reason": _FALLBACK_REASON,
            "used_gemini": False,
        }

    fallback = {
        "category_slug": brand_choices[0]["category_slug"],
        "brand_slug": brand_choices[0]["brand_slug"],
        "reason": _FALLBACK_REASON,
        "used_gemini": False,
    }

    if not settings.use_llm or not settings.gemini_api_key:
        return fallback

    try:
        return _call_gemini(brand_choices)
    except Exception as exc:  # noqa: BLE001
        logger.warning("Recommend gemini call failed: %s", exc)
        return fallback


# ---------------------------------------------------------------------------
# Gemini call
# ---------------------------------------------------------------------------

def _call_gemini(brand_choices: list[dict[str, str]]) -> dict[str, Any]:
    import google.generativeai as genai

    valid_pairs = {
        f"{c['category_slug']}/{c['brand_slug']}" for c in brand_choices
    }
    cat_enum = sorted({c["category_slug"] for c in brand_choices})
    brand_enum = sorted({c["brand_slug"] for c in brand_choices})

    schema = {
        "type": "object",
        "properties": {
            "category_slug": {"type": "string", "enum": cat_enum},
            "brand_slug": {"type": "string", "enum": brand_enum},
            "reason": {"type": "string"},
        },
        "required": ["category_slug", "brand_slug", "reason"],
    }

    genai.configure(api_key=settings.gemini_api_key)
    model = genai.GenerativeModel(
        model_name="gemini-2.5-flash",
        generation_config=genai.types.GenerationConfig(
            response_mime_type="application/json",
            response_schema=schema,
            temperature=1.0,
        ),
    )
    prompt = _build_prompt(brand_choices)
    response = model.generate_content(prompt)
    parsed = json.loads(response.text)

    cat = parsed.get("category_slug")
    brand = parsed.get("brand_slug")
    pair = f"{cat}/{brand}"

    # 잘못된 조합(예: fastfood/ktx) → 첫 후보로 fallback
    if pair not in valid_pairs:
        first = brand_choices[0]
        cat = first["category_slug"]
        brand = first["brand_slug"]

    return {
        "category_slug": cat,
        "brand_slug": brand,
        "reason": parsed.get("reason", _FALLBACK_REASON),
        "used_gemini": True,
    }


def _build_prompt(brand_choices: list[dict[str, str]]) -> str:
    lines = [
        "당신은 어르신이 키오스크 연습 미니앱을 사용할 때 오늘 어떤 시나리오를 연습하면 좋을지 추천하는 도우미예요.",
        "아래 가능한 시나리오 중 정확히 하나를 골라주세요. 매번 다양한 추천이 나오면 좋아요.",
        "",
        "## 가능한 시나리오 (category_slug / brand_slug — 설명)",
    ]
    for c in brand_choices:
        lines.append(
            f"- {c['category_slug']} / {c['brand_slug']} — {c['category_title']} > {c['brand_name']}"
        )
    lines += [
        "",
        "## 출력 규칙",
        "- category_slug 와 brand_slug 는 반드시 위 목록의 같은 행 조합이어야 합니다.",
        "- reason 은 어르신께 친근하고 따뜻한 1문장(한국어). 너무 길지 않게.",
        "  예: '오늘은 따뜻한 카페라떼 한 잔 어떠세요?'",
        "       '햄버거 매장에서 세트 메뉴 한 번 시켜볼까요?'",
        "       '병원 무인 접수기에 익숙해지면 진료받으실 때 편하실 거예요.'",
    ]
    return "\n".join(lines)
