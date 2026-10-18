from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from app.core.dependencies import admin_user
from app.core.security import hash_password
from app.db.session import get_db
from app.models.models import AvailabilitySlot, Booking, User
from app.schemas.schemas import AdminCreateRequest, BookingStatus, SlotCreate, SlotResponse, UserResponse

router = APIRouter(prefix="/admin", tags=["admin"])
Db = Annotated[Session, Depends(get_db)]
Admin = Annotated[User, Depends(admin_user)]


@router.post("/users", response_model=UserResponse, status_code=201)
def create_admin(payload: AdminCreateRequest, db: Db, _: Admin):
    if db.scalar(select(User).where(User.email == payload.email)):
        raise HTTPException(status_code=409, detail="Пользователь с таким email уже существует")
    user = User(
        name=payload.name,
        email=payload.email,
        password_hash=hash_password(payload.password),
        is_admin=True,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.get("/bookings")
def all_bookings(db: Db, _: Admin):
    bookings = db.scalars(select(Booking).options(joinedload(Booking.user), joinedload(Booking.slot), joinedload(Booking.service)).order_by(Booking.id.desc())).all()
    return {"data": [{"id": b.id, "status": b.status, "user": {"name": b.user.name, "email": b.user.email}, "slot": SlotResponse.model_validate(b.slot), "service": {"name": b.service.name}} for b in bookings]}


@router.post("/slots", response_model=SlotResponse, status_code=201)
def add_slot(payload: SlotCreate, db: Db, _: Admin):
    slot = AvailabilitySlot(starts_at=payload.starts_at, ends_at=payload.ends_at)
    db.add(slot)
    db.commit()
    db.refresh(slot)
    return slot


@router.delete("/slots/{slot_id}", status_code=204)
def delete_slot(slot_id: int, db: Db, _: Admin):
    slot = db.get(AvailabilitySlot, slot_id)
    if not slot:
        raise HTTPException(status_code=404, detail="Окно не найдено")
    if slot.is_booked:
        raise HTTPException(status_code=409, detail="Занятое окно нельзя удалить")
    db.delete(slot)
    db.commit()
    return Response(status_code=204)


@router.patch("/bookings/{booking_id}/status")
def update_booking_status(booking_id: int, payload: BookingStatus, db: Db, _: Admin):
    booking = db.get(Booking, booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail="Запись не найдена")
    booking.status = payload.status
    if payload.status == "cancelled":
        booking.slot.is_booked = False
    db.commit()
    return {"id": booking.id, "status": booking.status}
