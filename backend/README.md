# Kiosk Master API

키오스크 연습 앱의 백엔드 API 서버입니다. 브랜드, 시나리오, 메뉴 데이터를 제공합니다.

## 로컬 실행

```bash
cd backend
pip install -r requirements.txt
python -m app.seed.seed
uvicorn main:app --reload
```

서버는 http://localhost:8000 에서 실행됩니다.

## 환경 변수

| 변수 | 기본값 | 설명 |
|------|--------|------|
| `DATABASE_URL` | `sqlite:///./local.db` | DB 연결 문자열 (Railway에서 PostgreSQL URL로 자동 설정) |
| `PORT` | `8000` | 서버 포트 |
| `CORS_ORIGINS` | `http://localhost:5173` | 허용할 CORS 출처 (쉼표로 구분) |

## API 엔드포인트

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/` | API 정보 |
| GET | `/health` | 헬스체크 (Railway용) |
| GET | `/api/categories` | 전체 카테고리 목록 |
| GET | `/api/categories/{slug}` | 카테고리 상세 + 브랜드 목록 |
| GET | `/api/brands` | 전체 브랜드 목록 |
| GET | `/api/brands/{slug}` | 브랜드 상세 + 시나리오 JSON |
| GET | `/api/brands/{slug}/scenario` | 시나리오 JSON만 반환 |
| GET | `/api/brands/{slug}/menus` | 브랜드의 메뉴 카테고리 목록 |
| GET | `/api/brands/{slug}/menus/{category_slug}` | 특정 메뉴 카테고리의 아이템 목록 |

## Railway 배포 가이드

1. Railway 대시보드에서 새 서비스 생성
2. GitHub 레포 연결
3. **Service Settings → Root Directory: `backend`** 로 설정
4. PostgreSQL 플러그인 추가 → `DATABASE_URL` 환경 변수가 자동으로 주입됨
5. 첫 배포 후 Railway 콘솔에서 시드 실행:
   ```bash
   python -m app.seed.seed
   ```
6. `/health` 엔드포인트로 헬스체크 자동 수행

> `railway.json`에 빌드/배포 설정이 모두 포함되어 있습니다.
