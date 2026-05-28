from datetime import datetime
from typing import Optional

from sqlmodel import SQLModel, Field


class User(SQLModel, table=True):
    """A kiosk practice user.

    The ``external_id`` is what we receive from Apps in Toss (toss user id)
    when available; otherwise it's a device-anonymous id generated and stored
    in localStorage by the mini-app. Either way the back end treats it as the
    stable identity key.
    """

    id: Optional[int] = Field(default=None, primary_key=True)
    external_id: str = Field(unique=True, index=True)
    # "elderly" = the person actually practicing kiosks.
    # "guardian" = a family member viewing the elder's records.
    role: str = Field(default="elderly")
    display_name: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
