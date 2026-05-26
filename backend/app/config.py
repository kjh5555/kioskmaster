from typing import Optional
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    database_url: str = "sqlite:///./local.db"
    port: int = 8000
    cors_origins: str = "http://localhost:5173"
    gemini_api_key: Optional[str] = None
    # Master switch for Gemini-powered dynamic goal randomization.
    # Off by default while brand menu data is being filled in — when False
    # every dynamic-goal call uses the deterministic scenario fallback so
    # Gemini can't pick choices the layout doesn't support yet.
    # Set USE_LLM=true in env to re-enable.
    use_llm: bool = False

    @property
    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
