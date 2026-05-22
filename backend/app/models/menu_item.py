from typing import TYPE_CHECKING, Optional
from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from app.models.menu_category import MenuCategory


class MenuItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    menu_category_id: int = Field(foreign_key="menucategory.id")
    slug: str = Field(index=True)
    name: str
    price: str
    kcal: str
    emoji: str
    image_url: Optional[str] = None
    is_new: bool = False
    order: int = 0

    menu_category: Optional["MenuCategory"] = Relationship(back_populates="items")
