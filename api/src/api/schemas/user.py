from pydantic import BaseModel, EmailStr
from api.models.user import UserRole


class UserBase(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: UserRole

    class Config:
        from_attributes = True
