from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.db import get_session
from app.models.brand import Brand
from app.models.menu_category import MenuCategory
from app.models.menu_item import MenuItem
from app.schemas.menu import MenuCategorySummary, MenuCategoryRead, MenuItemRead

router = APIRouter(prefix="/brands", tags=["menus"])


@router.get("/{slug}/menus", response_model=list[MenuCategorySummary])
def list_menu_categories(slug: str, session: Session = Depends(get_session)):
    brand = session.exec(select(Brand).where(Brand.slug == slug)).first()
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")
    cats = session.exec(
        select(MenuCategory).where(MenuCategory.brand_id == brand.id).order_by(MenuCategory.order)
    ).all()
    return [MenuCategorySummary(slug=c.slug, title=c.title, order=c.order) for c in cats]


@router.get("/{slug}/menus/{category_slug}", response_model=MenuCategoryRead)
def get_menu_category(slug: str, category_slug: str, session: Session = Depends(get_session)):
    brand = session.exec(select(Brand).where(Brand.slug == slug)).first()
    if not brand:
        raise HTTPException(status_code=404, detail="Brand not found")
    cat = session.exec(
        select(MenuCategory)
        .where(MenuCategory.brand_id == brand.id)
        .where(MenuCategory.slug == category_slug)
    ).first()
    if not cat:
        raise HTTPException(status_code=404, detail="Menu category not found")
    items = session.exec(
        select(MenuItem).where(MenuItem.menu_category_id == cat.id).order_by(MenuItem.order)
    ).all()
    return MenuCategoryRead(
        slug=cat.slug,
        title=cat.title,
        order=cat.order,
        items=[
            MenuItemRead(
                slug=item.slug,
                name=item.name,
                price=item.price,
                kcal=item.kcal,
                emoji=item.emoji,
                is_new=item.is_new,
                order=item.order,
            )
            for item in items
        ],
    )
