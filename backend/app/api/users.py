from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import Session, select

from app.db import get_session
from app.models import User

router = APIRouter(prefix="/users", tags=["users"])


class EnsureUserIn(BaseModel):
    external_id: str
    role: str = "elderly"
    display_name: Optional[str] = None


class UserRead(BaseModel):
    id: int
    external_id: str
    role: str
    display_name: Optional[str]
    created_at: datetime


@router.post("/ensure", response_model=UserRead)
def ensure_user(
    payload: EnsureUserIn, session: Session = Depends(get_session)
) -> User:
    """Upsert a user by external_id.

    The mini-app calls this on first launch with either the Apps in Toss
    user id or a locally generated anonymous device id. Subsequent calls
    return the existing row. ``role`` updates if the caller provides a
    different value (e.g. switching device into guardian mode).
    """
    user = session.exec(
        select(User).where(User.external_id == payload.external_id)
    ).first()
    if user is None:
        user = User(
            external_id=payload.external_id,
            role=payload.role,
            display_name=payload.display_name,
        )
        session.add(user)
    else:
        if payload.role and payload.role != user.role:
            user.role = payload.role
        if payload.display_name:
            user.display_name = payload.display_name
    session.commit()
    session.refresh(user)
    return user


@router.get("/{external_id}", response_model=UserRead)
def get_user(external_id: str, session: Session = Depends(get_session)) -> User:
    user = session.exec(
        select(User).where(User.external_id == external_id)
    ).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
