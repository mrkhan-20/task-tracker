from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from api.core.config import settings

engine = create_engine(
    settings.SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
