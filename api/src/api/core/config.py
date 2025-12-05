from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    PROJECT_NAME: str = "Task Tracker Lite"
    SECRET_KEY: str = os.getenv("SECRET_KEY") or "super-secret-dev-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day
    SQLALCHEMY_DATABASE_URL: str = os.getenv("DATABASE_URL") or "postgresql://postgres:1234@localhost:5432/task-tracker"
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:5173"]


settings = Settings()
