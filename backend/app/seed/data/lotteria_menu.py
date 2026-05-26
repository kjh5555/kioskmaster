# Lotteria menu seed data.
# Names + prices supplied by the user from the lotteeatz.com menu listing.
# Image URLs use the Lotteria Wikipedia logo as a uniform placeholder since
# Lotteeatz's CDN images aren't publicly accessible without going through
# their SPA-rendered detail pages. Real photo URLs can be filled in later.

LOTTERIA_CATEGORY_TITLES = {
    "recommend": "추천메뉴",
    "burger": "버거",
    "side": "사이드",
    "drink": "음료",
}

LOTTERIA_CATEGORY_ORDER = ["recommend", "burger", "side", "drink"]

_LOGO = "https://upload.wikimedia.org/wikipedia/commons/3/34/Lotteria_logo.svg"

LOTTERIA_CATEGORY_ITEMS: dict[str, list[dict[str, object]]] = {
    "recommend": [
        {"id": "bulgogi-burger", "name": "리아 불고기", "price": "₩5,000", "kcal": "462kcal", "emoji": "🍔", "isNew": False, "imageUrl": _LOGO},
        {"id": "hanwoo-bulgogi", "name": "한우불고기버거", "price": "₩9,000", "kcal": "572kcal", "emoji": "🍔", "isNew": False, "imageUrl": _LOGO},
        {"id": "mozza-in-burger-bacon", "name": "모짜렐라 인 더 버거 베이컨", "price": "₩8,000", "kcal": "696kcal", "emoji": "🍔", "isNew": False, "imageUrl": _LOGO},
        {"id": "shrimp-burger", "name": "리아 새우", "price": "₩5,000", "kcal": "473kcal", "emoji": "🍔", "isNew": False, "imageUrl": _LOGO},
        {"id": "bunt-beef", "name": "번트비프버거", "price": "₩8,800", "kcal": "602kcal", "emoji": "🍔", "isNew": True, "imageUrl": _LOGO},
    ],
    "burger": [
        # NEW items first
        {"id": "bunt-beef", "name": "번트비프버거", "price": "₩8,800", "kcal": "602kcal", "emoji": "🍔", "isNew": True, "imageUrl": _LOGO},
        {"id": "crispy-chicken-fire", "name": "통다리 크리스피치킨버거(파이어핫)", "price": "₩6,900", "kcal": "594kcal", "emoji": "🍔", "isNew": True, "imageUrl": _LOGO},
        {"id": "crispy-chicken-greek", "name": "통다리 크리스피치킨버거(그릭랜치)", "price": "₩6,900", "kcal": "618kcal", "emoji": "🍔", "isNew": True, "imageUrl": _LOGO},
        {"id": "mozza-balsamic", "name": "모짜렐라버거 발사믹바질", "price": "₩9,100", "kcal": "733kcal", "emoji": "🍔", "isNew": True, "imageUrl": _LOGO},
        {"id": "mozza-tomato", "name": "모짜렐라버거 토마토바질", "price": "₩9,100원", "kcal": "733kcal", "emoji": "🍔", "isNew": True, "imageUrl": _LOGO},
        {"id": "jeonju-bibim-rice", "name": "전주 비빔라이스 버거", "price": "₩7,300", "kcal": "574kcal", "emoji": "🍙", "isNew": True, "imageUrl": _LOGO},
        {"id": "ria-shrimp-bacon", "name": "리아 새우 베이컨", "price": "₩6,100", "kcal": "519kcal", "emoji": "🍔", "isNew": True, "imageUrl": _LOGO},
        {"id": "ria-bulgogi-bacon", "name": "리아 불고기 베이컨", "price": "₩6,100", "kcal": "508kcal", "emoji": "🍔", "isNew": True, "imageUrl": _LOGO},
        {"id": "hanwoo-bulgogi-double", "name": "더블 한우불고기버거", "price": "₩13,000", "kcal": "802kcal", "emoji": "🍔", "isNew": True, "imageUrl": _LOGO},
        # BEST / regular
        {"id": "hanwoo-bulgogi", "name": "한우불고기버거", "price": "₩9,000", "kcal": "572kcal", "emoji": "🍔", "isNew": False, "imageUrl": _LOGO},
        {"id": "classic-cheese-double", "name": "더블 클래식치즈버거(버터번)", "price": "₩7,200", "kcal": "717kcal", "emoji": "🍔", "isNew": False, "imageUrl": _LOGO},
        {"id": "chicken-burger-double", "name": "더블 치킨버거", "price": "₩5,800", "kcal": "478kcal", "emoji": "🍔", "isNew": False, "imageUrl": _LOGO},
        {"id": "teri-double", "name": "더블 데리버거", "price": "₩5,000", "kcal": "446kcal", "emoji": "🍔", "isNew": False, "imageUrl": _LOGO},
        {"id": "xx2-double", "name": "더블엑스투버거", "price": "₩7,200", "kcal": "703kcal", "emoji": "🍔", "isNew": False, "imageUrl": _LOGO},
        {"id": "ria-bulgogi-double", "name": "리아 불고기 더블 (빅불)", "price": "₩7,600", "kcal": "721kcal", "emoji": "🍔", "isNew": False, "imageUrl": _LOGO},
        {"id": "miracle", "name": "미라클버거", "price": "₩5,700", "kcal": "382kcal", "emoji": "🌱", "isNew": False, "imageUrl": _LOGO},
        {"id": "miracle-double", "name": "더블 미라클버거", "price": "₩7,200", "kcal": "551kcal", "emoji": "🌱", "isNew": False, "imageUrl": _LOGO},
        {"id": "mozza-in-burger-bacon", "name": "모짜렐라 인 더 버거 베이컨", "price": "₩8,000", "kcal": "696kcal", "emoji": "🍔", "isNew": False, "imageUrl": _LOGO},
        {"id": "hot-crispy-chicken", "name": "핫크리스피치킨버거", "price": "₩6,200", "kcal": "454kcal", "emoji": "🌶️", "isNew": False, "imageUrl": _LOGO},
        {"id": "ria-shrimp-square-double", "name": "리아 사각새우 더블", "price": "₩6,100", "kcal": "534kcal", "emoji": "🍔", "isNew": False, "imageUrl": _LOGO},
        {"id": "classic-cheese", "name": "클래식치즈버거(버터번)", "price": "₩5,500", "kcal": "482kcal", "emoji": "🍔", "isNew": False, "imageUrl": _LOGO},
        {"id": "ria-bulgogi", "name": "리아 불고기", "price": "₩5,000", "kcal": "462kcal", "emoji": "🍔", "isNew": False, "imageUrl": _LOGO},
        {"id": "ria-shrimp", "name": "리아 새우", "price": "₩5,000", "kcal": "473kcal", "emoji": "🍔", "isNew": False, "imageUrl": _LOGO},
        {"id": "chicken-burger", "name": "치킨버거", "price": "₩4,300", "kcal": "355kcal", "emoji": "🍔", "isNew": False, "imageUrl": _LOGO},
        {"id": "teri", "name": "데리버거", "price": "₩3,700", "kcal": "348kcal", "emoji": "🍔", "isNew": False, "imageUrl": _LOGO},
        {"id": "hanwoo-couple-pack", "name": "한우연인팩", "price": "₩16,700", "kcal": "", "emoji": "🎁", "isNew": False, "imageUrl": _LOGO},
        {"id": "hanwoo-premium-pack", "name": "한우명품팩", "price": "₩18,500", "kcal": "", "emoji": "🎁", "isNew": False, "imageUrl": _LOGO},
    ],
    "side": [
        {"id": "fries-r", "name": "후렌치 후라이 (R)", "price": "₩2,300", "kcal": "", "emoji": "🍟", "isNew": False, "imageUrl": _LOGO},
        {"id": "fries-l", "name": "후렌치 후라이 (L)", "price": "₩2,800", "kcal": "", "emoji": "🍟", "isNew": False, "imageUrl": _LOGO},
        {"id": "onion-ring", "name": "양념감자", "price": "₩2,800", "kcal": "", "emoji": "🧅", "isNew": False, "imageUrl": _LOGO},
        {"id": "chicken-nugget", "name": "치킨너겟", "price": "₩2,500", "kcal": "", "emoji": "🍗", "isNew": False, "imageUrl": _LOGO},
    ],
    "drink": [
        {"id": "coke-r", "name": "코카콜라 (R)", "price": "₩2,000", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": _LOGO},
        {"id": "coke-l", "name": "코카콜라 (L)", "price": "₩2,500", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": _LOGO},
        {"id": "sprite-r", "name": "스프라이트 (R)", "price": "₩2,000", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": _LOGO},
        {"id": "fanta-r", "name": "환타 (R)", "price": "₩2,000", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": _LOGO},
        {"id": "americano", "name": "아메리카노", "price": "₩2,500", "kcal": "8kcal", "emoji": "☕", "isNew": False, "imageUrl": _LOGO},
    ],
}
