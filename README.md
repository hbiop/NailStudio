# NailStudio

Сайт маникюрного салона с онлайн-записью, авторизацией клиентов и административной панелью.

## Стек

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend:** Python 3.12, FastAPI, SQLAlchemy, JWT
- **Database:** PostgreSQL 16
- **Инфраструктура:** Docker Compose

## Возможности

- регистрация и вход клиента по email и паролю;
- выбор даты, услуги и свободного временного окна;
- создание записи с защитой от двойного бронирования;
- JWT-аутентификация;
- безопасное хеширование паролей через Argon2;
- кнопка «Войти» в шапке вместо «Записаться»;
- личный кабинет пользователя на `/account`;
- просмотр истории записей и их статусов;
- персональный блок актуальных акций;
- админ-панель `/admin`;
- просмотр записей и управление свободными окнами;
- подтверждение или отмена записей из админ-панели;
- сообщение «Нет доступа» для неавторизованных пользователей и клиентов без роли администратора;
- Swagger-документация API.

## Структура

```text
NailStudio/
├── app/                         # Next.js frontend
│   ├── admin/page.tsx           # админ-панель
│   ├── components/              # компоненты сайта
│   └── page.tsx                 # главная страница
├── backend/                     # FastAPI backend
│   ├── app/main.py              # точка входа FastAPI
│   ├── app/models/              # SQLAlchemy-модели
│   ├── app/routers/             # API-маршруты
│   ├── app/schemas/             # Pydantic-схемы
│   ├── requirements.txt
│   └── Dockerfile
└── docker-compose.yml           # PostgreSQL + FastAPI
```

## Требования

- Node.js 20+ и npm;
- Docker Desktop с Docker Compose.

Python локально устанавливать не нужно, если backend запускается в Docker.

## Быстрый запуск через Docker Compose

Из корня проекта:

```bash
docker compose up --build
```

Если контейнеры уже запущены после старой версии backend, перезапустите только backend:

```bash
docker compose up -d --build backend
```

Удалять volume PostgreSQL не требуется.

Compose запускает три сервиса:

1. `postgres` — PostgreSQL 16;
2. `backend` — FastAPI на порту `8000`;
3. `frontend` — Next.js на порту `3000`.

При запуске backend автоматически создаёт таблицы и seed-данные, а frontend собирается и запускается в production-режиме.

- Сайт: [http://localhost:3000](http://localhost:3000)
- API: [http://localhost:8000/api](http://localhost:8000/api)
- Swagger: [http://localhost:8000/docs](http://localhost:8000/docs)
- Healthcheck: [http://localhost:8000/health](http://localhost:8000/health)

Frontend получает URL API во время сборки через `NEXT_PUBLIC_API_URL`. Для другого адреса измените `build.args` и `environment` у сервиса `frontend` в `docker-compose.yml`.

Остановка контейнеров:

```bash
docker compose down
```

Для пересборки frontend после изменений:

```bash
docker compose build --no-cache frontend
docker compose up -d
```

### Локальный запуск frontend без Docker

Если frontend нужно запускать отдельно:

```bash
npm install
npm run dev
```

По умолчанию он использует `http://localhost:8000/api`. Для другого адреса создайте `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Остановка контейнеров:

```bash
docker compose down
```

Остановка с удалением данных PostgreSQL:

```bash
docker compose down -v
```

## Администраторы

При первом запуске автоматически создаётся первый администратор:

```text
Email:  admin@nailstudio.com
Пароль: password
```

Вход в админ-панель: [http://localhost:3000/admin](http://localhost:3000/admin).

Чтобы добавить нового администратора:

1. войдите под существующим администратором;
2. откройте `/admin`;
3. в блоке «Добавить администратора» укажите имя, email и пароль;
4. нажмите «Создать администратора».

Создание доступно только пользователю с ролью администратора. Новый администратор сможет войти через `/account` и открыть `/admin`.

После первого запуска обязательно замените пароль тестового администратора в production. Если база была создана старой версией backend с bcrypt, при следующем запуске backend автоматически обновит пароль системного администратора на значение `ADMIN_PASSWORD` и восстановит ему права администратора.

## API

Защищённые запросы передают JWT:

```http
Authorization: Bearer <token>
```

Основные маршруты:

```text
POST   /api/register
POST   /api/login
POST   /api/logout
GET    /api/me
GET    /api/services
GET    /api/slots?date=YYYY-MM-DD
POST   /api/bookings
GET    /api/my-bookings
GET    /api/promotions
GET    /api/admin/bookings
POST   /api/admin/users
POST   /api/admin/slots
DELETE /api/admin/slots/{id}
PATCH  /api/admin/bookings/{id}/status
```

Пример регистрации:

```json
{
  "name": "Анна",
  "email": "anna@example.com",
  "password": "password123",
  "password_confirmation": "password123",
  "phone": "+7 999 000-00-00"
}
```

Пример записи:

```json
{
  "slot_id": 1,
  "service_id": 1,
  "comment": "Предпочтительно нюдовый оттенок"
}
```

Доступные статусы записи: `pending`, `confirmed`, `cancelled`.

Акции для кабинета загружаются через `GET /api/promotions`.

Личный кабинет пользователя находится по адресу [http://localhost:3000/account](http://localhost:3000/account). Запись, выбор даты, услуги и свободного окна выполняются внутри кабинета. Все кнопки записи на главной странице ведут в раздел записи кабинета.

Подробное описание backend находится в [`backend/README.md`](backend/README.md).

## Локальный запуск FastAPI без Docker

Если PostgreSQL и Python установлены локально:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

В `backend/.env` укажите локальный адрес PostgreSQL, например:

```env
DATABASE_URL=postgresql+psycopg://nailstudio:secret@localhost:5432/nailstudio
```

## Проверка

Frontend:

```bash
npm run lint
npm run build
```

Backend:

```bash
docker compose exec backend python -m compileall app
docker compose exec backend python -c "from app.main import app; print(app.title)"
```

## Production

Перед production-развёртыванием необходимо:

- заменить `SECRET_KEY`, `ADMIN_PASSWORD` и пароль PostgreSQL;
- не публиковать `.env`;
- ограничить `FRONTEND_URL` фактическим доменом;
- включить HTTPS;
- добавить миграции Alembic вместо автоматического `create_all`;
- настроить email-уведомления и восстановление пароля.
