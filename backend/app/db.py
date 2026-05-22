from sqlalchemy import text
from sqlmodel import SQLModel, create_engine, Session

from app.config import settings

engine = create_engine(
    settings.database_url,
    connect_args={"check_same_thread": False} if "sqlite" in settings.database_url else {},
)


def init_db():
    SQLModel.metadata.create_all(engine)
    # Lightweight column-add migrations for tables that already exist in prod
    # from before a model field was added. Wrapped in try/except because
    # older SQLite versions don't support `ADD COLUMN IF NOT EXISTS`.
    column_adds = [
        "ALTER TABLE menuitem ADD COLUMN IF NOT EXISTS image_url VARCHAR",
        "ALTER TABLE brand ADD COLUMN IF NOT EXISTS image_url VARCHAR",
    ]
    with engine.begin() as conn:
        for stmt in column_adds:
            try:
                conn.execute(text(stmt))
            except Exception:
                pass


def get_session():
    with Session(engine) as session:
        yield session
