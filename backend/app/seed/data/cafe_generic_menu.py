# Generic neighborhood cafe menu seed data — 브랜드 없는 동네 카페 키오스크.
# 노인이 동네 카페에서 마주칠 가장 보편적 메뉴들로 단순화.
# 브라운/베이지 톤, 격식 없는 친근한 분위기.

CAFE_GENERIC_CATEGORY_TITLES = {
    "drink": "음료",
    "ade": "에이드/주스",
    "dessert": "디저트",
}

CAFE_GENERIC_CATEGORY_ORDER = [
    "drink",
    "ade",
    "dessert",
]

CAFE_GENERIC_CATEGORY_ITEMS = {
    "drink": [
        {"id": "iced-americano", "name": "아이스 아메리카노", "price": "₩3,000", "kcal": "10kcal", "emoji": "🧊", "isNew": False, "imageUrl": None},
        {"id": "hot-americano", "name": "따뜻한 아메리카노", "price": "₩3,000", "kcal": "10kcal", "emoji": "☕", "isNew": False, "imageUrl": None},
        {"id": "cafe-latte", "name": "카페라떼", "price": "₩3,500", "kcal": "180kcal", "emoji": "☕", "isNew": False, "imageUrl": None},
        {"id": "cappuccino", "name": "카푸치노", "price": "₩3,500", "kcal": "150kcal", "emoji": "☕", "isNew": False, "imageUrl": None},
        {"id": "hot-chocolate", "name": "핫 초콜릿", "price": "₩3,500", "kcal": "280kcal", "emoji": "🍫", "isNew": False, "imageUrl": None},
        {"id": "green-tea-latte", "name": "녹차라떼", "price": "₩4,000", "kcal": "220kcal", "emoji": "🍵", "isNew": False, "imageUrl": None},
    ],
    "ade": [
        {"id": "grapefruit-ade", "name": "자몽 에이드", "price": "₩4,500", "kcal": "180kcal", "emoji": "🍊", "isNew": False, "imageUrl": None},
        {"id": "lemon-ade", "name": "레몬 에이드", "price": "₩4,500", "kcal": "170kcal", "emoji": "🍋", "isNew": False, "imageUrl": None},
        {"id": "orange-juice", "name": "오렌지 주스", "price": "₩4,000", "kcal": "120kcal", "emoji": "🧃", "isNew": False, "imageUrl": None},
    ],
    "dessert": [
        {"id": "cheesecake", "name": "치즈 케이크", "price": "₩5,000", "kcal": "330kcal", "emoji": "🍰", "isNew": False, "imageUrl": None},
        {"id": "tiramisu", "name": "티라미수", "price": "₩5,500", "kcal": "320kcal", "emoji": "🍰", "isNew": False, "imageUrl": None},
        {"id": "croissant", "name": "버터 크루아상", "price": "₩3,500", "kcal": "280kcal", "emoji": "🥐", "isNew": False, "imageUrl": None},
    ],
}
