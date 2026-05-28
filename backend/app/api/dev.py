"""Developer/tester-only endpoints.

These are intentionally unauthenticated so testers can quickly fabricate a
family + practice history without going through the real pairing flow.
Safe to leave on in production because the only thing they do is create
rows owned by the calling device — there's no PII exposure and the volumes
are tiny.
"""

import secrets
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import Session, select

from app.db import get_session
from app.models import FamilyLink, PracticeAttempt, User

router = APIRouter(prefix="/dev", tags=["dev"])


class SeedFamilyIn(BaseModel):
    child_external_id: str
    parent_display_name: str | None = None
    nickname: str | None = None


class SeedFamilyOut(BaseModel):
    parent_external_id: str
    parent_display_name: str
    nickname: str
    attempts_created: int


@router.post("/seed-family", response_model=SeedFamilyOut)
def seed_family(
    payload: SeedFamilyIn, session: Session = Depends(get_session)
) -> SeedFamilyOut:
    """Create a fake parent user, link them to the caller (as child), and
    add a handful of practice attempts so the guardian report shows real
    data immediately."""
    child = session.exec(
        select(User).where(User.external_id == payload.child_external_id)
    ).first()
    if child is None:
        raise HTTPException(status_code=404, detail="자식 사용자가 없어요.")

    parent_external_id = f"demo_parent_{secrets.token_hex(4)}"
    display_name = payload.parent_display_name or "테스트 부모"
    nickname = payload.nickname or "어머니"

    parent = User(
        external_id=parent_external_id,
        role="elderly",
        display_name=display_name,
    )
    session.add(parent)
    session.commit()
    session.refresh(parent)

    link = FamilyLink(
        parent_user_id=parent.id,
        child_user_id=child.id,
        nickname=nickname,
    )
    session.add(link)

    fake_attempts = [
        ("mcdonalds", "fastfood", True, 0, 142),
        ("burgerking", "fastfood", True, 1, 215),
        ("lotteria", "fastfood", False, 3, 98),
        ("kfc", "fastfood", True, 0, 178),
        ("mcdonalds", "fastfood", True, 2, 165),
    ]
    base = datetime.utcnow()
    for i, (brand, cat, success, mistakes, dur) in enumerate(fake_attempts):
        started_at = base - timedelta(days=i, hours=i * 2)
        session.add(
            PracticeAttempt(
                user_id=parent.id,
                brand_slug=brand,
                category_slug=cat,
                success=success,
                mistakes=mistakes,
                duration_seconds=dur,
                started_at=started_at,
                completed_at=started_at + timedelta(seconds=dur) if success else None,
            )
        )

    session.commit()

    return SeedFamilyOut(
        parent_external_id=parent_external_id,
        parent_display_name=display_name,
        nickname=nickname,
        attempts_created=len(fake_attempts),
    )
