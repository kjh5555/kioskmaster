from typing import TYPE_CHECKING, Optional, List, Any
from sqlmodel import SQLModel, Field, Relationship, Column
from sqlalchemy import JSON

if TYPE_CHECKING:
    from app.models.category import Category
    from app.models.menu_category import MenuCategory


class Brand(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    slug: str = Field(unique=True, index=True)
    name: str
    emoji: str
    category_id: int = Field(foreign_key="category.id")
    scenario_json: Optional[Any] = Field(default=None, sa_column=Column(JSON))
    goal_summary: str = ""
    order: int = 0

    category: Optional["Category"] = Relationship(back_populates="brands")
    menu_categories: List["MenuCategory"] = Relationship(back_populates="brand")
