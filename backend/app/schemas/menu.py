from pydantic import BaseModel


class MenuItemRead(BaseModel):
    slug: str
    name: str
    price: str
    kcal: str
    emoji: str
    is_new: bool
    order: int


class MenuCategoryRead(BaseModel):
    slug: str
    title: str
    order: int
    items: list[MenuItemRead] = []


class MenuCategorySummary(BaseModel):
    slug: str
    title: str
    order: int
