from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.dependencies import current_user
from app.core.security import create_access_token, hash_password, verify_password
from app.db.session import get_db
from app.models.models import User
from app.schemas.schemas import AuthResponse, LoginRequest, RegisterRequest, UserResponse

router = APIRouter(tags=["auth"])
Db = Annotated[Session, Depends(get_db)]


@router.post("/register", response_model=AuthResponse, status_code=201)
def register(payload: RegisterRequest, db: Db):
    email = str(payload.email).strip().lower()
    if db.scalar(select(User).where(func.lower(User.email) == email)):
        raise HTTPException(status_code=409, detail="Пользователь с таким email уже существует")
    user = User(name=payload.name, email=email, phone=payload.phone, password_hash=hash_password(payload.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"user": user, "token": create_access_token(str(user.id))}


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, db: Db):
    email = str(payload.email).strip().lower()
    # Поддерживаем старый адрес из предыдущих инструкций и баз данных.
    # Основной адрес системного администратора теперь admin@nailstudio.com.
    if email == "admin@nailstudio.local":
        email = "admin@nailstudio.com"

    user = db.scalar(select(User).where(func.lower(User.email) == email))
    if not user:
        raise HTTPException(status_code=401, detail="Неверный email или пароль")
    try:
        valid_password = verify_password(payload.password, user.password_hash)
    except Exception:
        # Старый или повреждённый хеш не должен превращаться в 500.
        valid_password = False
    if not valid_password:
        raise HTTPException(status_code=401, detail="Неверный email или пароль")
    return {"user": user, "token": create_access_token(str(user.id))}


@router.post("/logout")
def logout(_: Annotated[User, Depends(current_user)]):
    return {"message": "Вы вышли из аккаунта."}


@router.get("/me", response_model=UserResponse)
def me(user: Annotated[User, Depends(current_user)]):
    return user
