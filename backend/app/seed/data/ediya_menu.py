# Ediya Coffee Korea menu seed data — 저가형 카페 키오스크 (네이비/블루 톤).
# 노인 친화 단순화: 카테고리 4개, 카테고리당 4~6개 메뉴.

EDIYA_CATEGORY_TITLES = {
    "recommend": "이번 주 추천",
    "drink": "음료",
    "smoothie": "스무디/에이드",
    "bakery": "베이커리",
}

EDIYA_CATEGORY_ORDER = [
    "recommend",
    "drink",
    "smoothie",
    "bakery",
]

EDIYA_CATEGORY_ITEMS = {
    "recommend": [
        {"id": "iced-americano-r", "name": "아이스 아메리카노", "price": "₩3,500", "kcal": "10kcal", "emoji": "🧊", "isNew": False, "imageUrl": None},
        {"id": "cafe-latte-r", "name": "카페라떼", "price": "₩4,000", "kcal": "180kcal", "emoji": "☕", "isNew": False, "imageUrl": None},
        {"id": "mango-smoothie-r", "name": "망고 스무디", "price": "₩5,500", "kcal": "260kcal", "emoji": "🥭", "isNew": True, "imageUrl": None},
    ],
    "drink": [
        {"id": "iced-americano", "name": "아이스 아메리카노", "price": "₩3,500", "kcal": "10kcal", "emoji": "🧊", "isNew": False, "imageUrl": None},
        {"id": "hot-americano", "name": "따뜻한 아메리카노", "price": "₩3,500", "kcal": "10kcal", "emoji": "☕", "isNew": False, "imageUrl": None},
        {"id": "cafe-latte", "name": "카페라떼", "price": "₩4,000", "kcal": "180kcal", "emoji": "☕", "isNew": False, "imageUrl": None},
        {"id": "cafe-mocha", "name": "카페모카", "price": "₩4,500", "kcal": "240kcal", "emoji": "☕", "isNew": False, "imageUrl": None},
        {"id": "vanilla-latte", "name": "바닐라라떼", "price": "₩4,500", "kcal": "210kcal", "emoji": "☕", "isNew": False, "imageUrl": None},
        {"id": "green-tea-latte", "name": "녹차라떼", "price": "₩4,500", "kcal": "230kcal", "emoji": "🍵", "isNew": False, "imageUrl": None},
    ],
    "smoothie": [
        {"id": "mango-smoothie", "name": "망고 스무디", "price": "₩5,500", "kcal": "260kcal", "emoji": "🥭", "isNew": False, "imageUrl": None},
        {"id": "strawberry-smoothie", "name": "딸기 스무디", "price": "₩5,500", "kcal": "250kcal", "emoji": "🍓", "isNew": False, "imageUrl": None},
        {"id": "grapefruit-ade", "name": "자몽 에이드", "price": "₩5,000", "kcal": "180kcal", "emoji": "🍊", "isNew": False, "imageUrl": None},
    ],
    "bakery": [
        {"id": "cheese-cake", "name": "치즈 케이크", "price": "₩5,500", "kcal": "330kcal", "emoji": "🍰", "isNew": False, "imageUrl": None},
        {"id": "bagel", "name": "플레인 베이글", "price": "₩3,500", "kcal": "270kcal", "emoji": "🥯", "isNew": False, "imageUrl": None},
        {"id": "croissant", "name": "버터 크루아상", "price": "₩3,800", "kcal": "280kcal", "emoji": "🥐", "isNew": False, "imageUrl": None},
    ],
}
