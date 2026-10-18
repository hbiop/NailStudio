# NailStudio API

Backend сайта маникюрного салона на **FastAPI** с PostgreSQL, SQLAlchemy и JWT-аутентификацией.

## Запуск

Из корня проекта:

```bash
docker compose up --build
```

После запуска:

- API: http://localhost:8000/api
- Swagger: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
- Healthcheck: http://localhost:8000/health

Приложение автоматически создаёт таблицы и добавляет базовые услуги, свободные окна и администратора при первом запуске.

## Первый администратор

При первом запуске создаётся администратор из переменных окружения:

```text
Email:  admin@nailstudio.com
Пароль: password
```

Значения задаются через `ADMIN_EMAIL` и `ADMIN_PASSWORD`. Для production обязательно заменить их в `.env`.

Если база была создана старой версией backend с bcrypt, при старте новая версия автоматически обновит пароль системного администратора на `ADMIN_PASSWORD` и восстановит ему права администратора. Удалять PostgreSQL volume не требуется.

Если текущий Argon2-хеш неизвестен, выполните принудительное восстановление:

```bash
docker compose exec backend python -m app.reset_admin
```

Команда создаст или обновит администратора с паролем из `ADMIN_PASSWORD`. Альтернативно можно временно установить `RESET_ADMIN_PASSWORD=true` в `backend/.env`, пересоздать backend и затем вернуть значение `false`.

Добавление новых администраторов выполняется авторизованным администратором через `POST /api/admin/users` или форму в `/admin`.

## Стек

- Python 3.12;
- FastAPI;
- SQLAlchemy 2;
- PostgreSQL 16;
- Pydantic Settings;
- JWT (`python-jose`);
- Argon2 (`pwdlib`).

## Переменные окружения

```env
DATABASE_URL=postgresql+psycopg://nailstudio:secret@postgres:5432/nailstudio
SECRET_KEY=change-me-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=1440
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@nailstudio.com
ADMIN_PASSWORD=password
RESET_ADMIN_PASSWORD=false
```

## API

Публичные маршруты:

- `POST /api/register` — регистрация;
- `POST /api/login` — вход;
- `GET /api/slots?date=YYYY-MM-DD` — свободные окна;
- `GET /api/promotions` — акции салона.

Защищённые маршруты используют заголовок:

```http
Authorization: Bearer <jwt-token>
```

Пользовательские маршруты:

- `POST /api/logout`;
- `GET /api/me`;
- `POST /api/bookings`;
- `GET /api/my-bookings`;

Акции доступны без авторизации через `GET /api/promotions`.

Админские маршруты:

- `GET /api/admin/bookings`;
- `POST /api/admin/users` — создание нового администратора;
- `POST /api/admin/slots`;
- `PATCH /api/admin/bookings/{id}/status` — подтверждение или отмена записи;
- `DELETE /api/admin/slots/{id}`.

## Особенности

- JWT-токены совместимы с текущим Next.js frontend: поле ответа называется `token`.
- Свободные окна фильтруются по дате, занятости и прошедшему времени.
- При бронировании используется транзакция и `SELECT ... FOR UPDATE`, поэтому два клиента не смогут занять один слот одновременно.
- Отмена записи освобождает временное окно.
- CORS разрешает frontend из `FRONTEND_URL`.

## Локальный запуск без Docker

Требуется Python 3.12 и доступный PostgreSQL:

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Перед запуском задайте переменную `DATABASE_URL` или создайте `backend/.env`.
