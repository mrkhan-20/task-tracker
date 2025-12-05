from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session, joinedload

from api.dep import get_db, get_current_admin
from api.models.task import Task
from api.schemas.task import AdminTaskOut

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/tasks", response_model=List[AdminTaskOut])
def admin_list_tasks(
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin),
    user_id: Optional[int] = Query(default=None),
    status: Optional[str] = Query(default=None),
    due_date_from: Optional[datetime] = Query(default=None),
    due_date_to: Optional[datetime] = Query(default=None),
):
    q = db.query(Task).options(joinedload(Task.owner), joinedload(Task.category))

    if user_id is not None:
        q = q.filter(Task.owner_id == user_id)
    if status is not None:
        q = q.filter(Task.status == status)
    if due_date_from is not None:
        q = q.filter(Task.due_date >= due_date_from)
    if due_date_to is not None:
        q = q.filter(Task.due_date <= due_date_to)

    tasks = q.order_by(Task.due_date.asc()).all()

    result: List[AdminTaskOut] = []
    for t in tasks:
        result.append(
            AdminTaskOut(
                id=t.id,
                title=t.title,
                description=t.description,
                status=t.status,
                due_date=t.due_date,
                category=t.category,
                owner_id=t.owner_id,
                owner_name=t.owner.name,
                owner_email=t.owner.email,
            )
        )
    return result
