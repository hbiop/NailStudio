from datetime import date, datetime, time, timezone
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from app.core.dependencies import current_user
from app.db.session import get_db
from app.models.models import AvailabilitySlot, Booking, Service, User
from app.schemas.schemas import BookingCreate, BookingResponse, ServiceResponse, SlotResponse

router = APIRouter(tags=["bookings"])
Db = Annotated[Session, Depends(get_db)]
UserDep = Annotated[User, Depends(current_user)]


@router.get("/services", response_model=list[ServiceResponse])
def services(db: Db):
    return db.scalars(select(Service).where(Service.is_active.is_(True)).order_by(Service.id)).all()


@router.get("/slots", response_model=list[SlotResponse])
def slots(db: Db, requested_date: date = Query(alias="date")):
    start = datetime.combine(requested_date, time.min).replace(tzinfo=timezone.utc)
    end = datetime.combine(requested_date, time.max).replace(tzinfo=timezone.utc)
    return db.scalars(select(AvailabilitySlot).where(AvailabilitySlot.starts_at >= start, AvailabilitySlot.starts_at <= end, AvailabilitySlot.is_booked.is_(False), AvailabilitySlot.starts_at > datetime.now(timezone.utc)).order_by(AvailabilitySlot.starts_at)).all()


@router.post("/bookings", response_model=BookingResponse, status_code=201)
def create_booking(payload: BookingCreate, db: Db, user: UserDep):
    slot = db.scalar(select(AvailabilitySlot).where(AvailabilitySlot.id == payload.slot_id).with_for_update())
    if not slot or slot.is_booked or slot.starts_at <= datetime.now(timezone.utc):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Это окно уже недоступно")
    if not db.get(Service, payload.service_id):
        raise HTTPException(status_code=422, detail="Услуга не найдена")
    booking = Booking(user_id=user.id, slot_id=slot.id, service_id=payload.service_id, comment=payload.comment)
    slot.is_booked = True
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking


@router.get("/my-bookings")
def my_bookings(db: Db, user: UserDep):
    bookings = db.scalars(select(Booking).options(joinedload(Booking.slot), joinedload(Booking.service)).where(Booking.user_id == user.id).order_by(Booking.id.desc())).all()
    return {"id": user.id, "name": user.name, "email": user.email, "bookings": [{"id": b.id, "status": b.status, "slot": SlotResponse.model_validate(b.slot), "service": ServiceResponse.model_validate(b.service)} for b in bookings]}
