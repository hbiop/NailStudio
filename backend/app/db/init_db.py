from datetime import UTC, datetime, timedelta

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import hash_password
from app.db.session import Base, engine
from app.models.models import AvailabilitySlot, Service, User


def init_db() -> None:
    Base.metadata.create_all(bind=engine)
    with Session(engine) as db:
        admin_email = settings.admin_email.strip().lower()
        admin = db.scalar(select(User).where(User.email == admin_email))
        if not admin and admin_email == "admin@nailstudio.com":
            # Переносим администратора, созданного старой версией с .local.
            admin = db.scalar(select(User).where(User.email == "admin@nailstudio.local"))
            if admin:
                admin.email = admin_email
        if not admin:
            db.add(User(name="Администратор", email=admin_email, password_hash=hash_password(settings.admin_password), is_admin=True))
        else:
            # Старые версии backend использовали bcrypt через passlib. После перехода
            # на Argon2 такой хеш нельзя проверить, поэтому восстанавливаем пароль
            # системного администратора из ADMIN_PASSWORD при первом старте новой версии.
            admin.is_admin = True
            if settings.reset_admin_password or not admin.password_hash.startswith("$argon2"):
                admin.password_hash = hash_password(settings.admin_password)
        if not db.scalar(select(Service)):
            db.add_all([
                Service(name="Комплекс (маникюр + покрытие)", duration_minutes=90, price=3500),
                Service(name="Маникюр без покрытия", duration_minutes=60, price=2000),
                Service(name="Дизайн ногтей", duration_minutes=30, price=1200),
            ])
        if not db.scalar(select(AvailabilitySlot)):
            tomorrow = datetime.now(UTC).replace(hour=0, minute=0, second=0, microsecond=0) + timedelta(days=1)
            for hour in range(10, 18):
                start = tomorrow + timedelta(hours=hour)
                db.add(AvailabilitySlot(starts_at=start, ends_at=start + timedelta(hours=1)))
        db.commit()
