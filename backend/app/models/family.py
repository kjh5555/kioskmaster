from datetime import datetime
from typing import Optional

from sqlmodel import SQLModel, Field


class FamilyLink(SQLModel, table=True):
    """A confirmed link between an elder (parent) and a guardian (child).

    The link is symmetric in storage (one row per pair) and unique on the
    (parent_user_id, child_user_id) combination.
    """

    id: Optional[int] = Field(default=None, primary_key=True)
    parent_user_id: int = Field(foreign_key="user.id", index=True)
    child_user_id: int = Field(foreign_key="user.id", index=True)
    nickname: Optional[str] = None  # what the child calls the parent ("어머니" etc.)
    created_at: datetime = Field(default_factory=datetime.utcnow)


class PairingCode(SQLModel, table=True):
    """A short-lived 6-digit code shown on the parent's phone so the child
    can claim the link from their own phone.
    """

    id: Optional[int] = Field(default=None, primary_key=True)
    code: str = Field(unique=True, index=True)  # 6 digits, e.g. "923471"
    parent_user_id: int = Field(foreign_key="user.id", index=True)
    expires_at: datetime
    used: bool = Field(default=False)
    used_by_child_id: Optional[int] = Field(default=None, foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)


class FavoriteScenario(SQLModel, table=True):
    """Curation by a child for a parent: 'mom usually visits these places, show
    them first on her home screen.'

    Lower ``priority`` value = higher priority. priority=0 means the pinned
    primary card on the elder's home.
    """

    id: Optional[int] = Field(default=None, primary_key=True)
    parent_user_id: int = Field(foreign_key="user.id", index=True)
    child_user_id: int = Field(foreign_key="user.id", index=True)
    brand_slug: str = Field(index=True)
    category_slug: str = Field(index=True)
    priority: int = Field(default=0)
    note: Optional[str] = None  # optional message from child
    created_at: datetime = Field(default_factory=datetime.utcnow)
