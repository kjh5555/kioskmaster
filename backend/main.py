from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.db import init_db
from app.api.categories import router as categories_router
from app.api.brands import router as brands_router
from app.api.menus import router as menus_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
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


@app.get("/")
def root():
    return {"message": "Kiosk Master API", "version": "0.1.0"}


@app.get("/health")
def health():
    return {"status": "ok"}
