from datetime import datetime
from typing import Optional

from sqlmodel import SQLModel, Field


class PracticeAttempt(SQLModel, table=True):
    """One run of a scenario by a user.

    Created when the user completes (or abandons) a scenario. ``success``
    means they reached the end without exiting; ``mistakes`` is the count
    of wrong choices during the run.
    """

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", index=True)
    brand_slug: str = Field(index=True)
    category_slug: str = Field(index=True)
    success: bool = Field(default=False)
    mistakes: int = Field(default=0)
    duration_seconds: int = Field(default=0)
    started_at: datetime = Field(default_factory=datetime.utcnow)
    completed_at: Optional[datetime] = None
