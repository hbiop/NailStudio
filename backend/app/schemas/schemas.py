from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, model_validator


class RegisterRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8)
    password_confirmation: str = Field(min_length=8)
    phone: str | None = Field(default=None, max_length=30)

    @model_validator(mode="after")
    def passwords_match(self):
        if self.password != self.password_confirmation:
            raise ValueError("Пароли не совпадают")
        return self


class LoginRequest(BaseModel):
    # Тестовый администратор использует домен .local, который EmailStr
    # намеренно считает служебным и отклоняет.
    email: str = Field(min_length=3, max_length=255)
    password: str


class AdminCreateRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8)
    password_confirmation: str = Field(min_length=8)

    @model_validator(mode="after")
    def passwords_match(self):
        if self.password != self.password_confirmation:
            raise ValueError("Пароли не совпадают")
        return self


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str | None = None
    is_admin: bool
    model_config = ConfigDict(from_attributes=True)


class AuthResponse(BaseModel):
    user: UserResponse
    token: str


class SlotResponse(BaseModel):
    id: int
    starts_at: datetime
    ends_at: datetime
    model_config = ConfigDict(from_attributes=True)


class BookingCreate(BaseModel):
    slot_id: int
    service_id: int
    comment: str | None = Field(default=None, max_length=1000)


class BookingStatus(BaseModel):
    status: str = Field(pattern="^(pending|confirmed|cancelled)$")


class SlotCreate(BaseModel):
    starts_at: datetime
    ends_at: datetime

    @model_validator(mode="after")
    def valid_range(self):
        if self.ends_at <= self.starts_at:
            raise ValueError("Окончание должно быть позже начала")
        return self


class ServiceResponse(BaseModel):
    id: int
    name: str
    duration_minutes: int
    price: float
    model_config = ConfigDict(from_attributes=True)


class BookingResponse(BaseModel):
    id: int
    user_id: int
    slot_id: int
    service_id: int
    status: str
    comment: str | None
    model_config = ConfigDict(from_attributes=True)
