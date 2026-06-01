---
name: fastapi-patterns
description: 「자판기 어렵지않아요」 FastAPI 백엔드(FastAPI + SQLModel + Pydantic) 라우터·모델·서비스·시드 데이터 작성 패턴. backend/app/{models,api,schemas,services,seed} 구조를 따라 새 도메인을 추가하거나 기존 엔드포인트를 수정할 때 반드시 사용. external_id 기반 사용자 식별, X-Admin-Token 인증, idempotent boot-time seed, 한국어 에러 메시지 톤 등 프로젝트 고유 규칙을 담는다. fastapi-builder 에이전트의 작업 가이드.
---

# fastapi-patterns — FastAPI 백엔드 작성 가이드

## 1. 디렉토리 구조

```
backend/
├── main.py              # FastAPI 진입점, router 등록, lifespan, CORS
├── app/
│   ├── config.py        # settings (env 기반)
│   ├── db.py            # SQLModel engine, get_session, init_db
│   ├── models/          # SQLModel 테이블 모델
│   │   ├── __init__.py  # 모든 모델 re-export
│   │   ├── user.py
│   │   ├── feedback.py
│   │   └── ...
│   ├── api/             # APIRouter 정의
│   │   ├── users.py
│   │   ├── feedback.py
│   │   └── ...
│   ├── schemas/         # (선택) 라우터 외부에서 재사용할 Pydantic 모델
│   ├── services/        # 비즈니스 로직 (필요할 때만)
│   └── seed/
│       ├── seed.py      # boot-time idempotent seed runner
│       └── data/        # 시드 정적 데이터
```

## 2. 새 라우터 추가 절차

### Step 1. 모델 정의 (`app/models/{name}.py`)

```python
from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field


class MyModel(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", index=True)
    name: str
    status: str = Field(default="active", index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
```

**규칙**:
- 모든 테이블에 `id`(PK), `created_at`, `updated_at` 포함
- 외래키는 `Field(foreign_key="...", index=True)`
- 자주 조회되는 컬럼은 `index=True`
- `__tablename__` 명시 안 함 → SQLModel이 클래스명 lowercase로 자동 설정

### Step 2. `models/__init__.py`에 export 추가

```python
from app.models.my_model import MyModel
```

빠뜨리면 `from app.models import MyModel`이 깨진다.

### Step 3. 라우터 작성 (`app/api/{name}.py`)

기존 `feedback.py` 패턴을 그대로 따른다:

```python
from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Depends, Header, HTTPException
from pydantic import BaseModel
from sqlmodel import Session, select

from app.config import settings
from app.db import get_session
from app.models import MyModel, User

router = APIRouter(prefix="/my-resource", tags=["my-resource"])


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
        raise HTTPException(status_code=503, detail="Admin token not configured on the server.")
    if x_admin_token != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")


# ── Request / Response models ────────────────────────────────────────
class MyModelIn(BaseModel):
    external_id: str
    name: str


class MyModelOut(BaseModel):
    id: int
    name: str
    status: str
    created_at: datetime
    updated_at: datetime


# ── Endpoints ────────────────────────────────────────────────────────
@router.post("/", response_model=MyModelOut)
def create(payload: MyModelIn, session: Session = Depends(get_session)) -> MyModel:
    user = _resolve_user(payload.external_id, session)
    if not payload.name.strip():
        raise HTTPException(status_code=400, detail="이름을 적어주세요.")
    row = MyModel(user_id=user.id, name=payload.name.strip())
    session.add(row)
    session.commit()
    session.refresh(row)
    return row
```

### Step 4. `main.py`에 라우터 등록

```python
from app.api.my_resource import router as my_resource_router

# 기존 include_router 아래에
app.include_router(my_resource_router, prefix="/api")
```

## 3. Pydantic 모델 작명 규칙

- 요청: `{Name}In`
- 응답: `{Name}Out`
- 부분 업데이트: `{Name}UpdateIn` (모든 필드 Optional)
- 관리자 전용 변형: `Admin{Name}In`

**클라이언트와의 shape 일치는 integration-qa가 검증**. snake_case로 정의하고, 프론트는 그대로 받아 쓴다 (camelCase 변환 안 함).

## 4. 인증 패턴

| 사용자 식별 | 방식 |
|----------|------|
| 일반 사용자 | `external_id` (요청 body 또는 URL path) → `_resolve_user` 조회 |
| 관리자 | `X-Admin-Token` 헤더 → `_require_admin` Depends |
| 인증 불필요 | `/api/health`, `/` 등 공개 엔드포인트 |

내부 PK(`user.id`)는 클라이언트에 노출하지 않음. 응답에 `external_id`를 포함시키더라도 PK는 제외.

## 5. 한국어 에러 메시지

`HTTPException(detail="...")`은 사용자에게 노출되므로 한국어 친절체:

| 상황 | 메시지 예 |
|------|---------|
| 빈 필드 | `"내용을 적어주세요."` |
| 잘못된 카테고리 | `"잘못된 카테고리예요."` |
| 권한 없음 | `"권한이 없어요."` (또는 영어 `"Unauthorized"`) |
| 리소스 없음 | `"User not found"` (영어 OK — 사용자 직접 노출 흔치 않음) |

코드 주석·로그·내부 변수명은 영어 OK.

## 6. 시드 데이터 (idempotent)

`backend/main.py`의 lifespan에서 boot-time `run_seed()` 실행. 매번 호출되므로 **반드시 idempotent**:

```python
# 잘못된 예 — 중복 insert 위험
def seed_brands(session):
    session.add(Brand(name="McDonalds"))

# 올바른 예 — 존재 확인 후 update or insert
def seed_brands(session):
    existing = session.exec(select(Brand).where(Brand.name == "McDonalds")).first()
    if existing is None:
        session.add(Brand(name="McDonalds"))
    else:
        existing.image_url = "..."  # 갱신
```

신규 시드 항목 추가 시 위 패턴 따름. `seed.py`의 함수에 추가하거나 새 함수를 만들고 `run_seed()`에서 호출.

## 7. DB 마이그레이션

- SQLModel은 `init_db()`로 누락된 테이블/컬럼만 자동 생성 (alembic 없음)
- 기존 row의 NOT NULL 컬럼 추가는 깨질 수 있음 → `nullable=True` 또는 default 값
- 컬럼명/타입 변경은 수동 SQL 스크립트 + README 안내 (Railway 배포 환경 고려)

## 8. CORS / 환경

- `settings.cors_origins_list` 사용 (env: `CORS_ORIGINS`)
- 로컬: `http://localhost:5173` (Vite dev)
- 프로덕션: Apps in Toss WebView origin

## 9. 자주 하는 실수

- ❌ `models/__init__.py` export 빠뜨림 → import 에러
- ❌ `main.py` `include_router` 빠뜨림 → 엔드포인트 404
- ❌ 시드가 idempotent 아님 → 매 부팅마다 중복 row
- ❌ HTTPException detail 영어로 (사용자 노출인데)
- ❌ Pydantic `{Name}In`만 만들고 `{Name}Out` 안 만듦 → SQLModel 객체 직접 반환 시 의도치 않은 필드 노출
- ❌ 내부 PK를 응답에 포함시킴 (`user.id` 노출)

## 10. 추가 참고

- 라우터 작성 체크리스트: `references/router-checklist.md`
- 시드 패턴 예시: `references/seed-patterns.md`
