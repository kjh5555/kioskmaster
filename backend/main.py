import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.db import init_db
from app.api.categories import router as categories_router
from app.api.brands import router as brands_router
from app.api.menus import router as menus_router
from app.api.users import router as users_router
from app.api.attempts import router as attempts_router
from app.api.family import router as family_router
from app.api.brand_requests import router as brand_requests_router
from app.api.dev import router as dev_router
from app.api.feedback import router as feedback_router

logger = logging.getLogger("uvicorn.error")


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    # Idempotent seed runs on every boot so new menu items and image_url
    # values land in prod without needing manual `python -m app.seed.seed`.
    # Existing rows are updated in place; new rows are inserted.
    try:
        from app.seed.seed import run_seed

        run_seed()
    except Exception as exc:
        logger.warning("Boot-time seed skipped: %s", exc)
    yield


app = FastAPI(title="Kiosk Master API", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(categories_router, prefix="/api")
app.include_router(brands_router, prefix="/api")
app.include_router(menus_router, prefix="/api")
app.include_router(users_router, prefix="/api")
app.include_router(attempts_router, prefix="/api")
app.include_router(family_router, prefix="/api")
app.include_router(brand_requests_router, prefix="/api")
app.include_router(dev_router, prefix="/api")
app.include_router(feedback_router, prefix="/api")


@app.get("/")
def root():
    return {"message": "Kiosk Master API", "version": "0.1.0"}


@app.get("/health")
def health():
    return {"status": "ok"}
