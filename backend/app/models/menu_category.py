from typing import TYPE_CHECKING, Optional, List
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from app.models.brand import Brand
    from app.models.menu_item import MenuItem


class MenuCategory(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    brand_id: int = Field(foreign_key="brand.id")
    slug: str = Field(index=True)
    title: str
    order: int = 0

    brand: Optional["Brand"] = Relationship(back_populates="menu_categories")
    items: List["MenuItem"] = Relationship(back_populates="menu_category")
