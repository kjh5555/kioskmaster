# Starbucks Korea menu seed data — 실제 매장 키오스크에서 보이는 카테고리/메뉴를
# 노인 친화적으로 단순화. 핵심 카테고리(음료/푸드/디저트/MD)와 대표 메뉴만.
# 이미지 URL 은 공식 스타벅스 코리아 사이트에 안정적으로 노출되는 항목만 포함.
# 노인 사용자는 화면이 너무 많은 옵션으로 가득 차면 멈추므로, 한 카테고리당
# 5~7개 메뉴로 제한한다 (PRD 7.4 "한 화면 정보량 제한").

STARBUCKS_CATEGORY_TITLES = {
    "recommend": "추천",
    "drink": "음료",
    "food": "푸드",
    "dessert": "디저트",
    "md": "MD/카드",
    "reserve": "리저브",
}

STARBUCKS_CATEGORY_ORDER = [
    "recommend",
    "drink",
    "food",
    "dessert",
    "md",
    "reserve",
]

STARBUCKS_CATEGORY_ITEMS = {
    "recommend": [
        {"id": "iced-americano-r", "name": "아이스 카페 아메리카노", "price": "₩4,500", "kcal": "10kcal", "emoji": "🧊", "isNew": False,
         "imageUrl": None},
        {"id": "cafe-latte-r", "name": "카페 라떼", "price": "₩5,000", "kcal": "190kcal", "emoji": "☕", "isNew": False,
         "imageUrl": None},
        {"id": "caramel-macchiato-r", "name": "카라멜 마키아토", "price": "₩5,900", "kcal": "230kcal", "emoji": "☕", "isNew": False,
         "imageUrl": None},
        {"id": "vanilla-latte-r", "name": "바닐라 라떼", "price": "₩5,500", "kcal": "210kcal", "emoji": "☕", "isNew": False,
         "imageUrl": None},
        {"id": "grapefruit-tea-r", "name": "자몽 허니 블랙티", "price": "₩5,900", "kcal": "200kcal", "emoji": "🍵", "isNew": False,
         "imageUrl": None},
    ],
    "drink": [
        {"id": "iced-americano", "name": "아이스 카페 아메리카노", "price": "₩4,500", "kcal": "10kcal", "emoji": "🧊", "isNew": False,
         "imageUrl": None},
        {"id": "hot-americano", "name": "따뜻한 카페 아메리카노", "price": "₩4,500", "kcal": "10kcal", "emoji": "☕", "isNew": False,
         "imageUrl": None},
        {"id": "cafe-latte", "name": "카페 라떼", "price": "₩5,000", "kcal": "190kcal", "emoji": "☕", "isNew": False,
         "imageUrl": None},
        {"id": "cappuccino", "name": "카푸치노", "price": "₩5,000", "kcal": "120kcal", "emoji": "☕", "isNew": False,
         "imageUrl": None},
        {"id": "caramel-macchiato", "name": "카라멜 마키아토", "price": "₩5,900", "kcal": "230kcal", "emoji": "☕", "isNew": False,
         "imageUrl": None},
        {"id": "vanilla-latte", "name": "바닐라 라떼", "price": "₩5,500", "kcal": "210kcal", "emoji": "☕", "isNew": False,
         "imageUrl": None},
        {"id": "grapefruit-tea", "name": "자몽 허니 블랙티", "price": "₩5,900", "kcal": "200kcal", "emoji": "🍵", "isNew": False,
         "imageUrl": None},
        {"id": "chamomile", "name": "캐모마일", "price": "₩5,500", "kcal": "0kcal", "emoji": "🌼", "isNew": False,
         "imageUrl": None},
    ],
    "food": [
        {"id": "ham-cheese-bagel", "name": "햄 & 치즈 베이글", "price": "₩4,900", "kcal": "320kcal", "emoji": "🥯", "isNew": False,
         "imageUrl": None},
        {"id": "soft-castella", "name": "부드러운 생크림 카스테라", "price": "₩4,500", "kcal": "300kcal", "emoji": "🧁", "isNew": False,
         "imageUrl": None},
        {"id": "tuna-sandwich", "name": "참치 샌드위치", "price": "₩6,500", "kcal": "410kcal", "emoji": "🥪", "isNew": False,
         "imageUrl": None},
    ],
    "dessert": [
        {"id": "choco-cake", "name": "클래식 초콜릿 카페 케이크", "price": "₩6,500", "kcal": "440kcal", "emoji": "🍫", "isNew": False,
         "imageUrl": None},
        {"id": "ny-cheesecake", "name": "뉴욕 치즈케이크", "price": "₩6,900", "kcal": "350kcal", "emoji": "🍰", "isNew": False,
         "imageUrl": None},
        {"id": "tiramisu", "name": "티라미수 케이크", "price": "₩6,900", "kcal": "320kcal", "emoji": "🍰", "isNew": False,
         "imageUrl": None},
    ],
    "md": [
        {"id": "starbucks-card", "name": "스타벅스 카드", "price": "₩10,000", "kcal": "", "emoji": "💳", "isNew": False,
         "imageUrl": None},
        {"id": "tumbler", "name": "리유저블 텀블러", "price": "₩19,000", "kcal": "", "emoji": "🥤", "isNew": False,
         "imageUrl": None},
    ],
    "reserve": [
        {"id": "reserve-drip", "name": "리저브 핸드드립", "price": "₩7,500", "kcal": "10kcal", "emoji": "☕", "isNew": False,
         "imageUrl": None},
    ],
}
