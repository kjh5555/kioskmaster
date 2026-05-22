from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.db import get_session
from app.models.category import Category
from app.models.brand import Brand
from app.schemas.category import CategoryRead, CategoryDetail, BrandSummary

router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("", response_model=list[CategoryRead])
def list_categories(session: Session = Depends(get_session)):
    categories = session.exec(select(Category).order_by(Category.order)).all()
    result = []
    for cat in categories:
        brand_count = len(session.exec(select(Brand).where(Brand.category_id == cat.id)).all())
        result.append(CategoryRead(
            slug=cat.slug,
            title=cat.title,
            description=cat.description,
            emoji=cat.emoji,
            order=cat.order,
            brand_count=brand_count,
        ))
    return result


@router.get("/{slug}", response_model=CategoryDetail)
def get_category(slug: str, session: Session = Depends(get_session)):
    cat = session.exec(select(Category).where(Category.slug == slug)).first()
    if not cat:
        raise HTTPException(status_code=404, detail="Category not found")
    brands = session.exec(select(Brand).where(Brand.category_id == cat.id).order_by(Brand.order)).all()
    return CategoryDetail(
        slug=cat.slug,
        title=cat.title,
        description=cat.description,
        emoji=cat.emoji,
        order=cat.order,
        brands=[BrandSummary(slug=b.slug, name=b.name, emoji=b.emoji, goal_summary=b.goal_summary) for b in brands],
    )
