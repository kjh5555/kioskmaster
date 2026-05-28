from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Depends, Header, HTTPException
from pydantic import BaseModel
from sqlmodel import Session, select

from app.config import settings
from app.db import get_session
from app.models import User, BrandRequest

router = APIRouter(prefix="/brand-requests", tags=["brand-requests"])


def _resolve_user(external_id: str, session: Session) -> User:
    user = session.exec(
        select(User).where(User.external_id == external_id)
    ).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def _require_admin(x_admin_token: Optional[str] = Header(default=None)) -> None:
    expected = getattr(settings, "admin_token", None)
    if not expected:
        raise HTTPException(
            status_code=503,
            detail="Admin token not configured on the server.",
        )
    if x_admin_token != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")


# ── Public submit ────────────────────────────────────────────────────────────


class BrandRequestIn(BaseModel):
    external_id: str  # requester
    brand_name: str
    branch: Optional[str] = None
    category_hint: Optional[str] = None
    description: Optional[str] = None
    image_urls: Optional[str] = None


class BrandRequestOut(BaseModel):
    id: int
    brand_name: str
    branch: Optional[str]
    category_hint: Optional[str]
    description: Optional[str]
    status: str
    operator_note: Optional[str]
    created_at: datetime
    updated_at: datetime


@router.post("/", response_model=BrandRequestOut)
def submit_request(
    payload: BrandRequestIn, session: Session = Depends(get_session)
) -> BrandRequest:
    user = _resolve_user(payload.external_id, session)
    req = BrandRequest(
        requester_user_id=user.id,
        brand_name=payload.brand_name,
        branch=payload.branch,
        category_hint=payload.category_hint,
        description=payload.description,
        image_urls=payload.image_urls,
    )
    session.add(req)
    session.commit()
    session.refresh(req)
    return req


@router.get("/mine/{external_id}", response_model=list[BrandRequestOut])
def list_my_requests(
    external_id: str, session: Session = Depends(get_session)
) -> list[BrandRequest]:
    user = _resolve_user(external_id, session)
    rows = session.exec(
        select(BrandRequest)
        .where(BrandRequest.requester_user_id == user.id)
        .order_by(BrandRequest.created_at.desc())
    ).all()
    return rows


# ── Admin: list + update status ──────────────────────────────────────────────


class AdminUpdateIn(BaseModel):
    status: Optional[str] = None  # received | in_progress | live | rejected
    operator_note: Optional[str] = None


@router.get(
    "/admin/all",
    response_model=list[BrandRequestOut],
    dependencies=[Depends(_require_admin)],
)
def admin_list_all(
    status: Optional[str] = None,
    session: Session = Depends(get_session),
) -> list[BrandRequest]:
    q = select(BrandRequest).order_by(BrandRequest.created_at.desc())
    if status:
        q = q.where(BrandRequest.status == status)
    return session.exec(q).all()


@router.patch(
    "/admin/{request_id}",
    response_model=BrandRequestOut,
    dependencies=[Depends(_require_admin)],
)
def admin_update(
    request_id: int,
    payload: AdminUpdateIn,
    session: Session = Depends(get_session),
) -> BrandRequest:
    req = session.get(BrandRequest, request_id)
    if req is None:
        raise HTTPException(status_code=404, detail="Request not found")
    if payload.status:
        req.status = payload.status
    if payload.operator_note is not None:
        req.operator_note = payload.operator_note
    req.updated_at = datetime.utcnow()
    session.add(req)
    session.commit()
    session.refresh(req)
    return req
