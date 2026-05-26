# Burger King Korea menu seed data.
# Image URLs are the actual BK Korea CDN (mob-prd.burgerking.co.kr) endpoints
# discovered via their kiosk API. Korean characters in URLs are encoded by
# the browser when set on <img src>.

BURGERKING_CATEGORY_TITLES = {
    "recommend": "추천메뉴",
    "burger": "버거",
    "side": "사이드",
    "drink": "음료",
}

BURGERKING_CATEGORY_ORDER = ["recommend", "burger", "side", "drink"]

_CDN = "https://mob-prd.burgerking.co.kr/images/menu/web/main"

# IDs here are the BK menuCd values (used as scenario choice ids).
# Burger menu drives the `menu` step's randomization once gemini_goal.py
# maps "menu" -> "burger".
BURGERKING_CATEGORY_ITEMS: dict[str, list[dict[str, object]]] = {
    "recommend": [
        {"id": "1080013-r", "name": "와퍼", "price": "₩7,100", "kcal": "", "emoji": "🍔", "isNew": False,
         "imageUrl": f"{_CDN}/2025/01/06/c9811022-3678-4988-9fa4-1d3fc6a69bf5.png"},
        {"id": "1100826-r", "name": "오리지널스 엘파소 치폴레", "price": "₩9,500", "kcal": "", "emoji": "🍔", "isNew": True,
         "imageUrl": f"{_CDN}/2026/05/20/ea8f8fca-c784-4795-ab83-cad5bb16ad0b.png"},
        {"id": "1100730-r", "name": "오리지널스 뉴욕 스테이크", "price": "₩9,200", "kcal": "", "emoji": "🍔", "isNew": False,
         "imageUrl": f"{_CDN}/2025/05/16/de79cfd1-e414-4bf7-9e5f-c7a5afcd80c5.png"},
    ],
    "burger": [
        {"id": "1080013", "name": "와퍼", "price": "₩7,100", "kcal": "", "emoji": "🍔", "isNew": False,
         "imageUrl": f"{_CDN}/2025/01/06/c9811022-3678-4988-9fa4-1d3fc6a69bf5.png"},
        {"id": "1080010", "name": "치즈와퍼", "price": "₩7,600", "kcal": "", "emoji": "🍔", "isNew": False,
         "imageUrl": f"{_CDN}/2025/01/06/d14c3a22-568d-41f8-ba30-02ee39bfe647.png"},
        {"id": "1100385", "name": "불고기와퍼", "price": "₩7,000", "kcal": "", "emoji": "🍔", "isNew": False,
         "imageUrl": f"{_CDN}/2025/01/06/fc969a33-3281-4601-91bb-b3aa789afc11.png"},
        {"id": "1080121", "name": "통새우와퍼", "price": "₩8,400", "kcal": "", "emoji": "🍔", "isNew": False,
         "imageUrl": f"{_CDN}/2025/01/06/b29489df-fafb-43f1-b0e1-21ab7b0c19e3.png"},
        {"id": "1080215", "name": "몬스터와퍼", "price": "₩10,500", "kcal": "", "emoji": "🍔", "isNew": False,
         "imageUrl": f"{_CDN}/2025/01/06/ffefc938-62f3-4bc0-8a54-bad31db5d63a.png"},
        {"id": "1100197", "name": "콰트로치즈와퍼", "price": "₩9,400", "kcal": "", "emoji": "🍔", "isNew": False,
         "imageUrl": f"{_CDN}/2025/01/06/fe3b84c2-1e1c-47c1-aea2-a8a7f6d5a069.png"},
        {"id": "1115459", "name": "치킨킹", "price": "₩7,900", "kcal": "", "emoji": "🍔", "isNew": False,
         "imageUrl": f"{_CDN}/2025/01/06/b24d04e3-96d6-4cc1-b07d-fc171a7fc6b8.png"},
        {"id": "1115480", "name": "더 크리스퍼", "price": "₩6,500", "kcal": "", "emoji": "🍗", "isNew": False,
         "imageUrl": f"{_CDN}/2026/01/13/d895878b-82cf-4563-8b0e-ae369eabd10f.png"},
        {"id": "1100826", "name": "오리지널스 엘파소 치폴레", "price": "₩9,500", "kcal": "", "emoji": "🍔", "isNew": True,
         "imageUrl": f"{_CDN}/2026/05/20/ea8f8fca-c784-4795-ab83-cad5bb16ad0b.png"},
        {"id": "1100809", "name": "스모크 비프립 와퍼", "price": "₩9,800", "kcal": "", "emoji": "🍔", "isNew": True,
         "imageUrl": f"{_CDN}/2026/03/25/b6f4b216-8e21-47b8-8707-3d80f1d1f6a0.png"},
    ],
    "side": [
        {"id": "2030018", "name": "프렌치프라이(R)", "price": "₩2,500", "kcal": "", "emoji": "🍟", "isNew": False,
         "imageUrl": f"{_CDN}/2024/12/05/d601acd4-19ac-4462-9fdc-0d170e4d04e4.png"},
        {"id": "2030015", "name": "프렌치프라이(L)", "price": "₩3,200", "kcal": "", "emoji": "🍟", "isNew": False,
         "imageUrl": f"{_CDN}/2024/12/05/bb859c97-0a00-4082-8fb7-0a8e67fe0ab5.png"},
        {"id": "2200247", "name": "리얼 어니언링(R)", "price": "₩2,800", "kcal": "", "emoji": "🧅", "isNew": False,
         "imageUrl": f"{_CDN}/2025/01/06/ad192026-f0d0-45c7-bcad-1ffc043c8d02.png"},
        {"id": "2030054", "name": "너겟킹 4조각", "price": "₩2,500", "kcal": "", "emoji": "🍗", "isNew": False,
         "imageUrl": f"{_CDN}/2025/01/06/dfc0294f-d53b-4dfc-b2eb-eaf313d4f77b.png"},
        {"id": "4020014", "name": "코울슬로", "price": "₩2,200", "kcal": "", "emoji": "🥗", "isNew": False,
         "imageUrl": f"{_CDN}/2025/01/06/d5da97e1-c516-4ebc-bbae-a41502e2b4d9.png"},
    ],
    "drink": [
        {"id": "3040016", "name": "코카콜라(R)", "price": "₩2,200", "kcal": "", "emoji": "🥤", "isNew": False,
         "imageUrl": f"{_CDN}/2025/01/06/bd5158be-277d-483e-a5af-b3827feaf821.png"},
        {"id": "3040012", "name": "코카콜라(L)", "price": "₩2,700", "kcal": "", "emoji": "🥤", "isNew": False,
         "imageUrl": f"{_CDN}/2025/01/06/be1dfb8d-4ca6-4c23-a46e-b9ffc70999c0.png"},
        {"id": "3040017", "name": "코카콜라 제로(R)", "price": "₩2,200", "kcal": "", "emoji": "🥤", "isNew": False,
         "imageUrl": f"{_CDN}/2025/01/06/bd7340ae-59d5-4b43-a638-e41fe1d77717.png"},
        {"id": "3040019", "name": "스프라이트(R)", "price": "₩2,200", "kcal": "", "emoji": "🥤", "isNew": False,
         "imageUrl": f"{_CDN}/2025/01/06/bd460290-b640-47a8-8e26-0351951a1f80.png"},
        {"id": "3030086", "name": "아메리카노", "price": "₩2,400", "kcal": "", "emoji": "☕", "isNew": False,
         "imageUrl": f"{_CDN}/2025/01/06/c77ae44c-30a2-4b09-9438-4a072ce7299e.png"},
    ],
}
