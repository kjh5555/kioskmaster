from typing import Any, Optional
from pydantic import BaseModel


class BrandRead(BaseModel):
    slug: str
    name: str
    emoji: str
    category_slug: str
    goal_summary: str


class BrandDetail(BaseModel):
    slug: str
    name: str
    emoji: str
    category_slug: str
    goal_summary: str
    scenario_json: Optional[Any] = None


class ScenarioOnly(BaseModel):
    scenario_json: Optional[Any] = None
