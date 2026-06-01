# Mega Coffee Korea menu seed data — 저가형 카페 (옐로/블랙 톤).
# 가격이 저렴해 노인이 가장 자주 마주칠 가능성이 큰 브랜드.

MEGA_CATEGORY_TITLES = {
    "recommend": "메가 추천",
    "drink": "음료",
    "ade": "에이드/주스",
    "bakery": "베이커리",
}

MEGA_CATEGORY_ORDER = [
    "recommend",
    "drink",
    "ade",
    "bakery",
]

MEGA_CATEGORY_ITEMS = {
    "recommend": [
        {"id": "iced-americano-r", "name": "아이스 아메리카노", "price": "₩1,500", "kcal": "10kcal", "emoji": "🧊", "isNew": False, "imageUrl": None},
        {"id": "mega-spanner-r", "name": "메가 슈페너", "price": "₩2,900", "kcal": "320kcal", "emoji": "☕", "isNew": True, "imageUrl": None},
        {"id": "cafe-latte-r", "name": "카페라떼", "price": "₩2,200", "kcal": "170kcal", "emoji": "☕", "isNew": False, "imageUrl": None},
    ],
    "drink": [
        {"id": "iced-americano", "name": "아이스 아메리카노", "price": "₩1,500", "kcal": "10kcal", "emoji": "🧊", "isNew": False, "imageUrl": None},
        {"id": "hot-americano", "name": "따뜻한 아메리카노", "price": "₩1,500", "kcal": "10kcal", "emoji": "☕", "isNew": False, "imageUrl": None},
        {"id": "cafe-latte", "name": "카페라떼", "price": "₩2,200", "kcal": "170kcal", "emoji": "☕", "isNew": False, "imageUrl": None},
        {"id": "cafe-mocha", "name": "카페모카", "price": "₩2,700", "kcal": "240kcal", "emoji": "☕", "isNew": False, "imageUrl": None},
        {"id": "mega-spanner", "name": "메가 슈페너", "price": "₩2,900", "kcal": "320kcal", "emoji": "☕", "isNew": False, "imageUrl": None},
        {"id": "vanilla-latte", "name": "바닐라라떼", "price": "₩2,700", "kcal": "210kcal", "emoji": "☕", "isNew": False, "imageUrl": None},
    ],
    "ade": [
        {"id": "grapefruit-ade", "name": "자몽 에이드", "price": "₩2,500", "kcal": "180kcal", "emoji": "🍊", "isNew": False, "imageUrl": None},
        {"id": "lemon-ade", "name": "레몬 에이드", "price": "₩2,500", "kcal": "170kcal", "emoji": "🍋", "isNew": False, "imageUrl": None},
        {"id": "strawberry-smoothie", "name": "딸기 스무디", "price": "₩3,500", "kcal": "260kcal", "emoji": "🍓", "isNew": False, "imageUrl": None},
    ],
    "bakery": [
        {"id": "bagel", "name": "메가 베이글", "price": "₩2,500", "kcal": "280kcal", "emoji": "🥯", "isNew": False, "imageUrl": None},
        {"id": "croissant", "name": "버터 크루아상", "price": "₩2,800", "kcal": "270kcal", "emoji": "🥐", "isNew": False, "imageUrl": None},
    ],
}
