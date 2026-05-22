from typing import TYPE_CHECKING, Optional, List
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from app.models.brand import Brand


class Category(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    slug: str = Field(unique=True, index=True)
    title: str
    description: str
    emoji: str
    order: int = 0

    brands: List["Brand"] = Relationship(back_populates="category")
