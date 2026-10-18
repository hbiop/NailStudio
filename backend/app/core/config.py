from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "postgresql+psycopg://nailstudio:secret@localhost:5432/nailstudio"
    secret_key: str = "change-me-in-production"
    access_token_expire_minutes: int = 1440
    frontend_url: str = "http://localhost:3000"
    admin_email: str = "admin@nailstudio.com"
    admin_password: str = "password"
    reset_admin_password: bool = False

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
