from pydantic import BaseModel


class BrandSummary(BaseModel):
    slug: str
    name: str
    emoji: str
    goal_summary: str


class CategoryRead(BaseModel):
    slug: str
    title: str
    description: str
    emoji: str
    order: int
    brand_count: int = 0


class CategoryDetail(BaseModel):
    slug: str
    title: str
    description: str
    emoji: str
    order: int
    brands: list[BrandSummary] = []
