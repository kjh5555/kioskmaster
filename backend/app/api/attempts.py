from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import Session, select, func

from app.db import get_session
from app.models import User, PracticeAttempt

router = APIRouter(prefix="/attempts", tags=["attempts"])


class AttemptIn(BaseModel):
    external_id: str
    brand_slug: str
    category_slug: str
    success: bool = True
    mistakes: int = 0
    duration_seconds: int = 0


class AttemptRead(BaseModel):
    id: int
    brand_slug: str
    category_slug: str
    success: bool
    mistakes: int
    duration_seconds: int
    started_at: datetime
    completed_at: Optional[datetime]


class UserStats(BaseModel):
    total_attempts: int
    total_success: int
    by_brand: dict  # { brand_slug: { attempts, success, last_played } }
    this_week_count: int


def _resolve_user(external_id: str, session: Session) -> User:
    user = session.exec(
        select(User).where(User.external_id == external_id)
    ).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.post("/", response_model=AttemptRead)
def submit_attempt(
    payload: AttemptIn, session: Session = Depends(get_session)
) -> PracticeAttempt:
    user = _resolve_user(payload.external_id, session)
    attempt = PracticeAttempt(
        user_id=user.id,
        brand_slug=payload.brand_slug,
        category_slug=payload.category_slug,
        success=payload.success,
        mistakes=payload.mistakes,
        duration_seconds=payload.duration_seconds,
        completed_at=datetime.utcnow() if payload.success else None,
    )
    session.add(attempt)
    session.commit()
    session.refresh(attempt)
    return attempt


@router.get("/stats/{external_id}", response_model=UserStats)
def user_stats(external_id: str, session: Session = Depends(get_session)) -> UserStats:
    user = _resolve_user(external_id, session)
    attempts = session.exec(
        select(PracticeAttempt).where(PracticeAttempt.user_id == user.id)
    ).all()

    by_brand: dict[str, dict] = {}
    week_ago = datetime.utcnow() - timedelta(days=7)
    this_week = 0
    for a in attempts:
        key = a.brand_slug
        entry = by_brand.setdefault(
            key,
            {"attempts": 0, "success": 0, "last_played": None},
        )
        entry["attempts"] += 1
        if a.success:
            entry["success"] += 1
        if entry["last_played"] is None or (
            a.started_at and a.started_at > entry["last_played"]
        ):
            entry["last_played"] = a.started_at
        if a.started_at and a.started_at >= week_ago:
            this_week += 1

    return UserStats(
        total_attempts=len(attempts),
        total_success=sum(1 for a in attempts if a.success),
        by_brand=by_brand,
        this_week_count=this_week,
    )


@router.get("/recent/{external_id}", response_model=list[AttemptRead])
def recent_attempts(
    external_id: str,
    limit: int = 20,
    session: Session = Depends(get_session),
) -> list[PracticeAttempt]:
    user = _resolve_user(external_id, session)
    rows = session.exec(
        select(PracticeAttempt)
        .where(PracticeAttempt.user_id == user.id)
        .order_by(PracticeAttempt.started_at.desc())
        .limit(limit)
    ).all()
    return rows
