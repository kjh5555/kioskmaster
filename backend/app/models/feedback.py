from datetime import datetime
from typing import Optional

from sqlmodel import SQLModel, Field


class Feedback(SQLModel, table=True):
    """User feedback / bug report / feature request submitted from the
    settings page. Operator reviews from admin panel.
    """

    id: Optional[int] = Field(default=None, primary_key=True)
    requester_user_id: int = Field(foreign_key="user.id", index=True)
    category: str = Field(default="other", index=True)  # bug | feature | other
    message: str
    contact: Optional[str] = None  # optional email/phone the user shares
    status: str = Field(default="new", index=True)  # new | read | resolved
    operator_note: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
