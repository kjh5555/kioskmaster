import secrets
from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import Session, select

from app.db import get_session
from app.models import User, FamilyLink, PairingCode, FavoriteScenario, PracticeAttempt

router = APIRouter(prefix="/family", tags=["family"])

PAIRING_TTL_MINUTES = 10


def _resolve_user(external_id: str, session: Session) -> User:
    user = session.exec(
        select(User).where(User.external_id == external_id)
    ).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# ── Pairing flow ──────────────────────────────────────────────────────────────


class PairingStartIn(BaseModel):
    parent_external_id: str


class PairingCodeOut(BaseModel):
    code: str
    expires_at: datetime


@router.post("/pairing/start", response_model=PairingCodeOut)
def start_pairing(
    payload: PairingStartIn, session: Session = Depends(get_session)
) -> PairingCodeOut:
    """Parent device asks for a fresh 6-digit code to show the child."""
    parent = _resolve_user(payload.parent_external_id, session)
    # Invalidate any existing unused codes for this parent.
    existing = session.exec(
        select(PairingCode).where(
            PairingCode.parent_user_id == parent.id,
            PairingCode.used == False,  # noqa: E712
        )
    ).all()
    for c in existing:
        c.used = True
        session.add(c)

    code = f"{secrets.randbelow(1_000_000):06d}"
    expires = datetime.utcnow() + timedelta(minutes=PAIRING_TTL_MINUTES)
    pc = PairingCode(
        code=code,
        parent_user_id=parent.id,
        expires_at=expires,
    )
    session.add(pc)
    session.commit()
    session.refresh(pc)
    return PairingCodeOut(code=pc.code, expires_at=pc.expires_at)


class PairingClaimIn(BaseModel):
    child_external_id: str
    code: str
    nickname: Optional[str] = None


class FamilyLinkOut(BaseModel):
    id: int
    parent_external_id: str
    parent_display_name: Optional[str]
    nickname: Optional[str]
    created_at: datetime


@router.post("/pairing/claim", response_model=FamilyLinkOut)
def claim_pairing(
    payload: PairingClaimIn, session: Session = Depends(get_session)
) -> FamilyLinkOut:
    """Child device redeems the code from the parent's phone, creating the
    confirmed FamilyLink."""
    child = _resolve_user(payload.child_external_id, session)
    pc = session.exec(
        select(PairingCode).where(PairingCode.code == payload.code)
    ).first()
    if pc is None or pc.used:
        raise HTTPException(status_code=400, detail="잘못되거나 이미 사용된 코드예요.")
    if pc.expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="만료된 코드예요. 새 코드로 다시 시도해주세요.")
    if pc.parent_user_id == child.id:
        raise HTTPException(status_code=400, detail="본인 코드는 사용할 수 없어요.")

    # Check for existing link first
    existing = session.exec(
        select(FamilyLink).where(
            FamilyLink.parent_user_id == pc.parent_user_id,
            FamilyLink.child_user_id == child.id,
        )
    ).first()
    if existing is None:
        existing = FamilyLink(
            parent_user_id=pc.parent_user_id,
            child_user_id=child.id,
            nickname=payload.nickname,
        )
        session.add(existing)

    pc.used = True
    pc.used_by_child_id = child.id
    session.add(pc)
    session.commit()
    session.refresh(existing)

    parent = session.get(User, pc.parent_user_id)
    return FamilyLinkOut(
        id=existing.id,
        parent_external_id=parent.external_id if parent else "",
        parent_display_name=parent.display_name if parent else None,
        nickname=existing.nickname,
        created_at=existing.created_at,
    )


# ── Family link queries ───────────────────────────────────────────────────────


@router.get("/links/{child_external_id}", response_model=list[FamilyLinkOut])
def list_my_parents(
    child_external_id: str, session: Session = Depends(get_session)
) -> list[FamilyLinkOut]:
    child = _resolve_user(child_external_id, session)
    rows = session.exec(
        select(FamilyLink).where(FamilyLink.child_user_id == child.id)
    ).all()
    out: list[FamilyLinkOut] = []
    for r in rows:
        p = session.get(User, r.parent_user_id)
        if p is None:
            continue
        out.append(
            FamilyLinkOut(
                id=r.id,
                parent_external_id=p.external_id,
                parent_display_name=p.display_name,
                nickname=r.nickname,
                created_at=r.created_at,
            )
        )
    return out


class ChildLinkOut(BaseModel):
    id: int
    child_external_id: str
    child_display_name: Optional[str]
    nickname: Optional[str]  # how the child set the parent's nickname; here it's the same row
    created_at: datetime


@router.get(
    "/children/{parent_external_id}", response_model=list[ChildLinkOut]
)
def list_my_children(
    parent_external_id: str, session: Session = Depends(get_session)
) -> list[ChildLinkOut]:
    """Parent-side view: who's connected to me as a guardian?"""
    parent = _resolve_user(parent_external_id, session)
    rows = session.exec(
        select(FamilyLink).where(FamilyLink.parent_user_id == parent.id)
    ).all()
    out: list[ChildLinkOut] = []
    for r in rows:
        c = session.get(User, r.child_user_id)
        if c is None:
            continue
        out.append(
            ChildLinkOut(
                id=r.id,
                child_external_id=c.external_id,
                child_display_name=c.display_name,
                nickname=r.nickname,
                created_at=r.created_at,
            )
        )
    return out


class ParentReportOut(BaseModel):
    parent_external_id: str
    parent_display_name: Optional[str]
    nickname: Optional[str]
    total_attempts: int
    total_success: int
    this_week_count: int
    by_brand: dict
    recent: list[dict]


@router.get(
    "/parent-report/{child_external_id}/{parent_external_id}",
    response_model=ParentReportOut,
)
def parent_report(
    child_external_id: str,
    parent_external_id: str,
    session: Session = Depends(get_session),
) -> ParentReportOut:
    """Guardian views a parent's practice stats. Requires an existing
    FamilyLink between the two."""
    child = _resolve_user(child_external_id, session)
    parent = _resolve_user(parent_external_id, session)
    link = session.exec(
        select(FamilyLink).where(
            FamilyLink.parent_user_id == parent.id,
            FamilyLink.child_user_id == child.id,
        )
    ).first()
    if link is None:
        raise HTTPException(status_code=403, detail="연결되지 않은 가족이에요.")

    attempts = session.exec(
        select(PracticeAttempt).where(PracticeAttempt.user_id == parent.id)
    ).all()
    week_ago = datetime.utcnow() - timedelta(days=7)
    by_brand: dict[str, dict] = {}
    this_week = 0
    for a in attempts:
        e = by_brand.setdefault(
            a.brand_slug, {"attempts": 0, "success": 0, "last_played": None}
        )
        e["attempts"] += 1
        if a.success:
            e["success"] += 1
        if e["last_played"] is None or (
            a.started_at and a.started_at > e["last_played"]
        ):
            e["last_played"] = a.started_at
        if a.started_at and a.started_at >= week_ago:
            this_week += 1
    recent = sorted(attempts, key=lambda x: x.started_at, reverse=True)[:10]
    return ParentReportOut(
        parent_external_id=parent.external_id,
        parent_display_name=parent.display_name,
        nickname=link.nickname,
        total_attempts=len(attempts),
        total_success=sum(1 for a in attempts if a.success),
        this_week_count=this_week,
        by_brand=by_brand,
        recent=[
            {
                "brand_slug": a.brand_slug,
                "success": a.success,
                "mistakes": a.mistakes,
                "started_at": a.started_at,
            }
            for a in recent
        ],
    )


# ── Favorite (curated) scenarios ──────────────────────────────────────────────


class FavoriteIn(BaseModel):
    child_external_id: str
    parent_external_id: str
    brand_slug: str
    category_slug: str
    priority: int = 0
    note: Optional[str] = None


class FavoriteOut(BaseModel):
    id: int
    parent_external_id: str
    brand_slug: str
    category_slug: str
    priority: int
    note: Optional[str]
    created_at: datetime


@router.post("/favorites", response_model=FavoriteOut)
def set_favorite(
    payload: FavoriteIn, session: Session = Depends(get_session)
) -> FavoriteOut:
    child = _resolve_user(payload.child_external_id, session)
    parent = _resolve_user(payload.parent_external_id, session)
    link = session.exec(
        select(FamilyLink).where(
            FamilyLink.parent_user_id == parent.id,
            FamilyLink.child_user_id == child.id,
        )
    ).first()
    if link is None:
        raise HTTPException(status_code=403, detail="연결되지 않은 가족이에요.")

    existing = session.exec(
        select(FavoriteScenario).where(
            FavoriteScenario.parent_user_id == parent.id,
            FavoriteScenario.child_user_id == child.id,
            FavoriteScenario.brand_slug == payload.brand_slug,
        )
    ).first()
    if existing is None:
        existing = FavoriteScenario(
            parent_user_id=parent.id,
            child_user_id=child.id,
            brand_slug=payload.brand_slug,
            category_slug=payload.category_slug,
            priority=payload.priority,
            note=payload.note,
        )
        session.add(existing)
    else:
        existing.category_slug = payload.category_slug
        existing.priority = payload.priority
        existing.note = payload.note
    session.commit()
    session.refresh(existing)
    return FavoriteOut(
        id=existing.id,
        parent_external_id=parent.external_id,
        brand_slug=existing.brand_slug,
        category_slug=existing.category_slug,
        priority=existing.priority,
        note=existing.note,
        created_at=existing.created_at,
    )


@router.delete("/favorites/{favorite_id}")
def delete_favorite(
    favorite_id: int,
    child_external_id: str,
    session: Session = Depends(get_session),
) -> dict:
    child = _resolve_user(child_external_id, session)
    fav = session.get(FavoriteScenario, favorite_id)
    if fav is None or fav.child_user_id != child.id:
        raise HTTPException(status_code=404, detail="Favorite not found")
    session.delete(fav)
    session.commit()
    return {"deleted": favorite_id}


@router.get("/favorites/parent/{parent_external_id}", response_model=list[FavoriteOut])
def list_parent_favorites(
    parent_external_id: str, session: Session = Depends(get_session)
) -> list[FavoriteOut]:
    """Parent's home screen calls this to get child-curated scenarios in
    priority order. No auth required (the parent owns this data)."""
    parent = _resolve_user(parent_external_id, session)
    rows = session.exec(
        select(FavoriteScenario)
        .where(FavoriteScenario.parent_user_id == parent.id)
        .order_by(FavoriteScenario.priority.asc(), FavoriteScenario.created_at.asc())
    ).all()
    return [
        FavoriteOut(
            id=r.id,
            parent_external_id=parent.external_id,
            brand_slug=r.brand_slug,
            category_slug=r.category_slug,
            priority=r.priority,
            note=r.note,
            created_at=r.created_at,
        )
        for r in rows
    ]
