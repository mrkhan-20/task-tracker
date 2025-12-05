from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from api.dep import get_db
from api.core.security import (
    get_password_hash,
    verify_password,
    create_access_token,
)
from api.core.config import settings
from api.models.user import User, UserRole
from api.schemas.auth import RegisterRequest, LoginRequest, TokenResponse
from api.schemas.user import UserBase

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserBase)
def register_user(payload: RegisterRequest, db: Session = Depends(get_db)):
    print("inside register_user")
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    users_count = db.query(User).count()
    role = UserRole.ADMIN if users_count == 0 else UserRole.USER

    user = User(
        name=payload.name,
        email=payload.email,
        hashed_password=get_password_hash(payload.password),
        role=role,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": str(user.id)}, expires_delta=access_token_expires)

    return TokenResponse(access_token=access_token, user=user)


@router.post("/logout")
def logout():
    # JWT is stateless; frontend should just delete token.
    return {"detail": "Logged out"}
