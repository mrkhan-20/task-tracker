from datetime import datetime
from typing import Optional

from pydantic import BaseModel
from api.models.task import TaskStatus
from .category import CategoryBase


class TaskBase(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    status: TaskStatus
    due_date: datetime
    category: CategoryBase

    class Config:
        from_attributes = True


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    status: TaskStatus
    due_date: datetime
    category_id: int


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None
    due_date: Optional[datetime] = None
    category_id: Optional[int] = None


class AdminTaskOut(TaskBase):
    owner_id: int
    owner_name: str
    owner_email: str
