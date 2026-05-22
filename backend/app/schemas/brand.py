from typing import Any, Optional
from pydantic import BaseModel


class BrandRead(BaseModel):
    slug: str
    name: str
    emoji: str
    image_url: Optional[str] = None
    category_slug: str
    goal_summary: str


class BrandDetail(BaseModel):
    slug: str
    name: str
    emoji: str
    image_url: Optional[str] = None
    category_slug: str
    goal_summary: str
    scenario_json: Optional[Any] = None


class ScenarioOnly(BaseModel):
    scenario_json: Optional[Any] = None


class DynamicGoalResponse(BaseModel):
    goal_summary: str
    selections: dict[str, str]
    used_gemini: bool
    scenario_json: Optional[Any] = None
