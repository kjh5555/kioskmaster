# Generic neighborhood cafe menu seed data — 브랜드 없는 동네 카페 키오스크.
# 노인이 동네 카페에서 마주칠 가장 보편적 메뉴들로 단순화.
# 이미지는 Unsplash 무료 hotlink (브랜드 없는 generic 음료 사진).

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
        {"id": "iced-americano", "name": "아이스 아메리카노", "price": "₩3,000", "kcal": "10kcal", "emoji": "🧊", "isNew": False,
         "imageUrl": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80"},
        {"id": "hot-americano", "name": "따뜻한 아메리카노", "price": "₩3,000", "kcal": "10kcal", "emoji": "☕", "isNew": False,
         "imageUrl": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80"},
        {"id": "cafe-latte", "name": "카페라떼", "price": "₩3,500", "kcal": "180kcal", "emoji": "☕", "isNew": False,
         "imageUrl": "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80"},
        {"id": "cappuccino", "name": "카푸치노", "price": "₩3,500", "kcal": "150kcal", "emoji": "☕", "isNew": False,
         "imageUrl": "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=400&q=80"},
        {"id": "hot-chocolate", "name": "핫 초콜릿", "price": "₩3,500", "kcal": "280kcal", "emoji": "🍫", "isNew": False,
         "imageUrl": "https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=400&q=80"},
        {"id": "green-tea-latte", "name": "녹차라떼", "price": "₩4,000", "kcal": "220kcal", "emoji": "🍵", "isNew": False,
         "imageUrl": "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&q=80"},
    ],
    "ade": [
        {"id": "grapefruit-ade", "name": "자몽 에이드", "price": "₩4,500", "kcal": "180kcal", "emoji": "🍊", "isNew": False,
         "imageUrl": "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400&q=80"},
        {"id": "lemon-ade", "name": "레몬 에이드", "price": "₩4,500", "kcal": "170kcal", "emoji": "🍋", "isNew": False,
         "imageUrl": "https://images.unsplash.com/photo-1556881286-fc6915169721?w=400&q=80"},
        {"id": "orange-juice", "name": "오렌지 주스", "price": "₩4,000", "kcal": "120kcal", "emoji": "🧃", "isNew": False,
         "imageUrl": "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&q=80"},
    ],
    "dessert": [
        {"id": "cheesecake", "name": "치즈 케이크", "price": "₩5,000", "kcal": "330kcal", "emoji": "🍰", "isNew": False,
         "imageUrl": "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80"},
        {"id": "tiramisu", "name": "티라미수", "price": "₩5,500", "kcal": "320kcal", "emoji": "🍰", "isNew": False,
         "imageUrl": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80"},
        {"id": "croissant", "name": "버터 크루아상", "price": "₩3,500", "kcal": "280kcal", "emoji": "🥐", "isNew": False,
         "imageUrl": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80"},
    ],
}
