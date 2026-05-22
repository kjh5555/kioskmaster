from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.db import get_session
from app.models.brand import Brand
from app.models.category import Category
from app.schemas.brand import BrandRead, BrandDetail, ScenarioOnly

router = APIRouter(prefix="/brands", tags=["brands"])


def _category_slug(brand: Brand, session: Session) -> str:
    cat = session.get(Category, brand.category_id)
    return cat.slug if cat else ""


@router.get("", response_model=list[BrandRead])
def list_brands(session: Session = Depends(get_session)):
    brands = session.exec(select(Brand).order_by(Brand.order)).all()
    return [
        BrandRead(
            slug=b.slug,
            name=b.name,
            emoji=b.emoji,
            category_slug=_category_slug(b, session),
            goal_summary=b.goal_summary,
        )
        for b in brands
    ]


@router.get("/{slug}", response_model=BrandDetail)
def get_brand(slug: str, session: Session = Depends(get_session)):
    brand = session.exec(select(Brand).where(Brand.slug == slug)).first()
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")
    return BrandDetail(
        slug=brand.slug,
        name=brand.name,
        emoji=brand.emoji,
        category_slug=_category_slug(brand, session),
        goal_summary=brand.goal_summary,
        scenario_json=brand.scenario_json,
    )


@router.get("/{slug}/scenario", response_model=ScenarioOnly)
def get_scenario(slug: str, session: Session = Depends(get_session)):
    brand = session.exec(select(Brand).where(Brand.slug == slug)).first()
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")
    return ScenarioOnly(scenario_json=brand.scenario_json)
