"""
Pro 모드 — LLM(Gemini) 시나리오 추천 endpoint.
"""
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlmodel import Session, select
from typing import Optional

from app.db import get_session
from app.models.brand import Brand
from app.models.category import Category
from app.services.gemini_recommend import recommend

router = APIRouter(prefix="/recommend", tags=["recommend"])


class RecommendResponse(BaseModel):
    category_slug: Optional[str]
    brand_slug: Optional[str]
    reason: str
    used_gemini: bool


@router.get("", response_model=RecommendResponse)
def get_recommendation(session: Session = Depends(get_session)) -> RecommendResponse:
    """현재 DB 의 시나리오가 있는 brand 중 LLM 이 하나 추천."""
    categories = session.exec(select(Category).order_by(Category.order)).all()
    brand_choices: list[dict[str, str]] = []
    for cat in categories:
        brands = session.exec(
            select(Brand)
            .where(Brand.category_id == cat.id)
            .order_by(Brand.order)
        ).all()
        for b in brands:
            if not b.scenario_json:
                continue
            brand_choices.append(
                {
                    "category_slug": cat.slug,
                    "category_title": cat.title,
                    "brand_slug": b.slug,
                    "brand_name": b.name,
                }
            )

    result = recommend(brand_choices)
    return RecommendResponse(**result)
