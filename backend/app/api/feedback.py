from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Depends, Header, HTTPException
from pydantic import BaseModel
from sqlmodel import Session, select

from app.config import settings
from app.db import get_session
from app.models import Feedback, User

router = APIRouter(prefix="/feedback", tags=["feedback"])


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


# ── Public submit ───────────────────────────────────────────────────────────


class FeedbackIn(BaseModel):
    external_id: str
    category: str = "other"  # bug | feature | other
    message: str
    contact: Optional[str] = None


class FeedbackOut(BaseModel):
    id: int
    category: str
    message: str
    contact: Optional[str]
    status: str
    operator_note: Optional[str]
    created_at: datetime
    updated_at: datetime


@router.post("/", response_model=FeedbackOut)
def submit_feedback(
    payload: FeedbackIn, session: Session = Depends(get_session)
) -> Feedback:
    user = _resolve_user(payload.external_id, session)
    if not payload.message.strip():
        raise HTTPException(status_code=400, detail="내용을 적어주세요.")
    if payload.category not in {"bug", "feature", "other"}:
        raise HTTPException(status_code=400, detail="잘못된 카테고리예요.")
    fb = Feedback(
        requester_user_id=user.id,
        category=payload.category,
        message=payload.message.strip(),
        contact=payload.contact.strip() if payload.contact else None,
    )
    session.add(fb)
    session.commit()
    session.refresh(fb)
    return fb


@router.get("/mine/{external_id}", response_model=list[FeedbackOut])
def list_my_feedback(
    external_id: str, session: Session = Depends(get_session)
) -> list[Feedback]:
    user = _resolve_user(external_id, session)
    rows = session.exec(
        select(Feedback)
        .where(Feedback.requester_user_id == user.id)
        .order_by(Feedback.created_at.desc())
    ).all()
    return rows


# ── Admin ───────────────────────────────────────────────────────────────────


class AdminUpdateIn(BaseModel):
    status: Optional[str] = None  # new | read | resolved
    operator_note: Optional[str] = None


@router.get(
    "/admin/all",
    response_model=list[FeedbackOut],
    dependencies=[Depends(_require_admin)],
)
def admin_list_all(
    status: Optional[str] = None,
    session: Session = Depends(get_session),
) -> list[Feedback]:
    q = select(Feedback).order_by(Feedback.created_at.desc())
    if status:
        q = q.where(Feedback.status == status)
    return session.exec(q).all()


@router.patch(
    "/admin/{feedback_id}",
    response_model=FeedbackOut,
    dependencies=[Depends(_require_admin)],
)
def admin_update(
    feedback_id: int,
    payload: AdminUpdateIn,
    session: Session = Depends(get_session),
) -> Feedback:
    fb = session.get(Feedback, feedback_id)
    if fb is None:
        raise HTTPException(status_code=404, detail="Feedback not found")
    if payload.status:
        fb.status = payload.status
    if payload.operator_note is not None:
        fb.operator_note = payload.operator_note
    fb.updated_at = datetime.utcnow()
    session.add(fb)
    session.commit()
    session.refresh(fb)
    return fb
