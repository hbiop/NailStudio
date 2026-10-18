from fastapi import APIRouter

router = APIRouter(tags=["promotions"])


@router.get("/promotions")
def promotions():
    return [
        {
            "id": 1,
            "title": "Первый визит",
            "description": "Скидка 15% на первое посещение салона.",
            "badge": "-15%",
            "valid_until": "Постоянная акция",
        },
        {
            "id": 2,
            "title": "Комплексный уход",
            "description": "Маникюр + покрытие по специальной цене при записи в будни.",
            "badge": "Выгодно",
            "valid_until": "Пн–Пт до 16:00",
        },
        {
            "id": 3,
            "title": "Приведи подругу",
            "description": "Получите по 500 ₽ бонусами за рекомендацию нового клиента.",
            "badge": "500 ₽",
            "valid_until": "До конца месяца",
        },
    ]
