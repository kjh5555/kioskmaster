from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.db import get_session
from app.models.brand import Brand
from app.models.category import Category
from app.models.menu_category import MenuCategory
from app.models.menu_item import MenuItem
from app.schemas.brand import BrandRead, BrandDetail, ScenarioOnly, DynamicGoalResponse
from app.services.gemini_goal import generate_goal

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


@router.get("/{slug}/dynamic-goal", response_model=DynamicGoalResponse)
def get_dynamic_goal(slug: str, session: Session = Depends(get_session)):
    brand = session.exec(select(Brand).where(Brand.slug == slug)).first()
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")

    # Fetch menu items grouped by category slug
    menu_categories = session.exec(
        select(MenuCategory).where(MenuCategory.brand_id == brand.id)
    ).all()

    menu_by_category: dict[str, list[dict[str, str]]] = {}
    for mc in menu_categories:
        items = session.exec(
            select(MenuItem).where(MenuItem.menu_category_id == mc.id).order_by(MenuItem.order)
        ).all()
        menu_by_category[mc.slug] = [{"slug": item.slug, "name": item.name} for item in items]

    result = generate_goal(
        brand_name=brand.name,
        menu_by_category=menu_by_category,
        scenario_json=brand.scenario_json,
    )
    return DynamicGoalResponse(
        goal_summary=result["goal_summary"],
        selections=result["selections"],
        used_gemini=result["used_gemini"],
        debug_reason=result.get("debug_reason"),
    )
