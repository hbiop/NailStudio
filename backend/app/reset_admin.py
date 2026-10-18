"""Reset or create the system administrator from environment variables."""

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import hash_password
from app.db.session import Base, engine
from app.models.models import User


def main() -> None:
    Base.metadata.create_all(bind=engine)
    email = settings.admin_email.strip().lower()
    with Session(engine) as db:
        user = db.scalar(select(User).where(User.email == email))
        if user is None and email == "admin@nailstudio.com":
            user = db.scalar(select(User).where(User.email == "admin@nailstudio.local"))
            if user:
                user.email = email
        if user is None:
            user = User(name="Администратор", email=email, is_admin=True, password_hash=hash_password(settings.admin_password))
            db.add(user)
            action = "created"
        else:
            user.is_admin = True
            user.password_hash = hash_password(settings.admin_password)
            action = "updated"
        db.commit()
        print(f"Admin {action}: {email}")


if __name__ == "__main__":
    main()
