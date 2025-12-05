from pydantic import BaseModel


class CategoryBase(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class CategoryCreate(BaseModel):
    name: str


class CategoryUpdate(BaseModel):
    name: str
