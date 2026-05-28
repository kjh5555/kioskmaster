from datetime import datetime
from typing import Optional

from sqlmodel import SQLModel, Field


class BrandRequest(SQLModel, table=True):
    """User-submitted request asking us to add a new kiosk scenario.

    Users (typically children on behalf of their parents) can ask for a
    specific brand/branch/public office to be added. The operator reviews
    and progresses the status through 'received' → 'in_progress' → 'live'.
    """

    id: Optional[int] = Field(default=None, primary_key=True)
    requester_user_id: int = Field(foreign_key="user.id", index=True)
    brand_name: str
    branch: Optional[str] = None  # e.g. "잠실점", "강남구청 본관"
    category_hint: Optional[str] = None  # e.g. "공공기관", "패스트푸드"
    description: Optional[str] = None
    image_urls: Optional[str] = None  # JSON-encoded list of uploaded photo URLs
    status: str = Field(default="received", index=True)  # received | in_progress | live | rejected
    operator_note: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
