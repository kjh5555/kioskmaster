"""
Idempotent seed script. Run with:
    python -m app.seed.seed
"""
import sys
import os

# Ensure backend/ is on sys.path when run as a module
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from sqlmodel import Session, select

from app.db import engine, init_db
from app.models.category import Category
from app.models.brand import Brand
from app.models.menu_category import MenuCategory
from app.models.menu_item import MenuItem
from app.seed.data.categories import CATEGORIES
from app.seed.data.brands import BRANDS
from app.seed.data.mcdonalds_menu import (
    MCDONALDS_CATEGORY_TITLES,
    MCDONALDS_CATEGORY_ORDER,
    MCDONALDS_CATEGORY_ITEMS,
)


def seed_categories(session: Session) -> dict[str, Category]:
    slug_to_cat: dict[str, Category] = {}
    for data in CATEGORIES:
        existing = session.exec(select(Category).where(Category.slug == data["slug"])).first()
        if existing:
            existing.title = data["title"]
            existing.description = data["description"]
            existing.emoji = data["emoji"]
            existing.order = data["order"]
            session.add(existing)
            slug_to_cat[data["slug"]] = existing
        else:
            cat = Category(**data)
            session.add(cat)
            session.flush()
            slug_to_cat[data["slug"]] = cat
    session.flush()
    return slug_to_cat


def seed_brands(session: Session, slug_to_cat: dict[str, Category]) -> dict[str, Brand]:
    slug_to_brand: dict[str, Brand] = {}
    for cat_slug, brand_list in BRANDS.items():
        cat = slug_to_cat[cat_slug]
        for data in brand_list:
            existing = session.exec(select(Brand).where(Brand.slug == data["slug"])).first()
            if existing:
                existing.name = data["name"]
                existing.emoji = data["emoji"]
                existing.goal_summary = data["goal_summary"]
                existing.scenario_json = data["scenario_json"]
                existing.order = data["order"]
                existing.category_id = cat.id
                session.add(existing)
                slug_to_brand[data["slug"]] = existing
            else:
                brand = Brand(
                    slug=data["slug"],
                    name=data["name"],
                    emoji=data["emoji"],
                    category_id=cat.id,
                    goal_summary=data["goal_summary"],
                    scenario_json=data["scenario_json"],
                    order=data["order"],
                )
                session.add(brand)
                session.flush()
                slug_to_brand[data["slug"]] = brand
    session.flush()
    return slug_to_brand


def seed_mcdonalds_menu(session: Session, slug_to_brand: dict[str, Brand]) -> None:
    brand = slug_to_brand.get("mcdonalds")
    if not brand:
        print("McDonald's brand not found, skipping menu seed")
        return

    for order_idx, cat_slug in enumerate(MCDONALDS_CATEGORY_ORDER):
        title = MCDONALDS_CATEGORY_TITLES[cat_slug]
        items_data = MCDONALDS_CATEGORY_ITEMS.get(cat_slug, [])

        existing_cat = session.exec(
            select(MenuCategory)
            .where(MenuCategory.brand_id == brand.id)
            .where(MenuCategory.slug == cat_slug)
        ).first()

        if existing_cat:
            existing_cat.title = title
            existing_cat.order = order_idx
            session.add(existing_cat)
            menu_cat = existing_cat
        else:
            menu_cat = MenuCategory(
                brand_id=brand.id,
                slug=cat_slug,
                title=title,
                order=order_idx,
            )
            session.add(menu_cat)
            session.flush()

        for item_order, item_data in enumerate(items_data):
            existing_item = session.exec(
                select(MenuItem)
                .where(MenuItem.menu_category_id == menu_cat.id)
                .where(MenuItem.slug == item_data["id"])
            ).first()

            if existing_item:
                existing_item.name = item_data["name"]
                existing_item.price = item_data["price"]
                existing_item.kcal = item_data["kcal"]
                existing_item.emoji = item_data["emoji"]
                existing_item.is_new = item_data.get("isNew", False)
                existing_item.order = item_order
                session.add(existing_item)
            else:
                item = MenuItem(
                    menu_category_id=menu_cat.id,
                    slug=item_data["id"],
                    name=item_data["name"],
                    price=item_data["price"],
                    kcal=item_data["kcal"],
                    emoji=item_data["emoji"],
                    is_new=item_data.get("isNew", False),
                    order=item_order,
                )
                session.add(item)

    session.flush()


def run_seed() -> None:
    print("Initializing DB tables...")
    init_db()

    with Session(engine) as session:
        print("Seeding categories...")
        slug_to_cat = seed_categories(session)

        print("Seeding brands...")
        slug_to_brand = seed_brands(session, slug_to_cat)

        print("Seeding McDonald's menu...")
        seed_mcdonalds_menu(session, slug_to_brand)

        session.commit()

    print("Seed complete.")


if __name__ == "__main__":
    run_seed()
