from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from api.session import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)

    tasks = relationship("Task", back_populates="category")
