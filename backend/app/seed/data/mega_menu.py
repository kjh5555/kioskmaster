# Mega Coffee Korea menu seed data — 메가커피 공식 사이트(/menu/menu.php)에서 자동 추출.
# 6개 카테고리 × 카테고리당 6개 메뉴. 이미지 URL 은 img.79plus.co.kr/megahp 패턴.
# drink 카테고리 첫번째 = 아메리카노 (시나리오 목표 메뉴).

MEGA_CATEGORY_TITLES = {
    "drink": "음료",
    "tea": "티",
    "ade-juice": "에이드·주스",
    "smoothie": "스무디·프라페",
    "decaf": "디카페인",
    "beverage": "기타 음료",
}

MEGA_CATEGORY_ORDER = [
    "drink",
    "tea",
    "ade-juice",
    "smoothie",
    "decaf",
    "beverage",
]

MEGA_CATEGORY_ITEMS = {
    "drink": [
        {"id": "iced-americano", "name": "아메리카노", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610105645_1717984605982_8i5CoHU2NV.jpg"},
        {"id": "cafe-latte", "name": "카페라떼", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610105821_1717984701991_RUKCqSZ_HO.jpg"},
        {"id": "cappuccino", "name": "카푸치노", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610105852_1717984732750_WEt0KXVcnQ.jpg"},
        {"id": "caramel-macchiato", "name": "카라멜마끼아또", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610105805_1717984685954_T1qos0ocDV.jpg"},
        {"id": "vanilla-latte", "name": "바닐라라떼", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610104603_1717983963750_lApih2z1h0.jpg"},
        {"id": "cafe-mocha", "name": "카페모카", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610105838_1717984718108_ZB6aalHqIU.jpg"},
    ],
    "tea": [
        {"id": "green-tea", "name": "녹차", "price": "", "kcal": "", "emoji": "🍵", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610110331_1717985011036_C6OQGMI7Y4.jpg"},
        {"id": "apple-citron-tea", "name": "사과유자차", "price": "", "kcal": "", "emoji": "🍵", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610110410_1717985050395_RsCDhFOWcr.jpg"},
        {"id": "earl-grey", "name": "얼그레이", "price": "", "kcal": "", "emoji": "🍵", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610110432_1717985072601_SnRpkBYBND.jpg"},
        {"id": "chamomile", "name": "캐모마일", "price": "", "kcal": "", "emoji": "🍵", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610110447_1717985087226_oqJyrTRTBp.jpg"},
        {"id": "peppermint", "name": "페퍼민트", "price": "", "kcal": "", "emoji": "🍵", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610110502_1717985102566_oQg9d4cJix.jpg"},
        {"id": "citron-ginger-tea", "name": "유자생강차", "price": "", "kcal": "", "emoji": "🍵", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610110344_1717985024366_O8DPCRDcwc.jpg"},
    ],
    "ade-juice": [
        {"id": "lemon-ade", "name": "레몬에이드", "price": "", "kcal": "", "emoji": "🍋", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610114648_1717987608030_BeAofM0V_e.jpg"},
        {"id": "grapefruit-ade", "name": "자몽에이드", "price": "", "kcal": "", "emoji": "🍋", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610114738_1717987658800_FYZkS7XX0F.jpg"},
        {"id": "blue-lemon-ade", "name": "블루레몬에이드", "price": "", "kcal": "", "emoji": "🍋", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610114709_1717987629527_LkfPCBlWG_.jpg"},
        {"id": "green-grape-ade", "name": "청포도에이드", "price": "", "kcal": "", "emoji": "🍋", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610114753_1717987673942_7CzkUO_t6Z.jpg"},
        {"id": "strawberry-juice", "name": "딸기주스", "price": "", "kcal": "", "emoji": "🍋", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610114915_1717987755314_1rAv8UqZUm.jpg"},
        {"id": "gold-kiwi-juice", "name": "골드키위주스", "price": "", "kcal": "", "emoji": "🍋", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610114841_1717987721389_g0aOXIeqkN.jpg"},
    ],
    "smoothie": [
        {"id": "milkshake", "name": "밀크쉐이크", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610132041_1717993241921_9XRMjqYBMW.jpg"},
        {"id": "blueberry-yogurt-smoothie", "name": "블루베리요거트스무디", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610132201_1717993321987_zGNB_MoMb_.jpg"},
        {"id": "strawberry-yogurt-smoothie", "name": "딸기요거트스무디", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610132147_1717993307428_a5KGYU2lIQ.jpg"},
        {"id": "gold-mango-smoothie", "name": "골드망고스무디", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610132132_1717993292586_5AHGD9efxL.jpg"},
        {"id": "green-tea-frappe", "name": "녹차프라페", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610132223_1717993343456_4KESgpG57t.jpg"},
        {"id": "real-choco-frappe", "name": "리얼초코프라페", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610132113_1717993273856_w1pnNl_iiP.jpg"},
    ],
    "decaf": [
        {"id": "decaf-americano", "name": "디카페인 아메리카노", "price": "", "kcal": "", "emoji": "☕", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610105207_1717984327186_Sgj9kfKYCi.jpg"},
        {"id": "decaf-cafe-latte", "name": "디카페인 카페라떼", "price": "", "kcal": "", "emoji": "☕", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610105117_1717984277710_7BjonXSBFE.jpg"},
        {"id": "decaf-cappuccino", "name": "디카페인 카푸치노", "price": "", "kcal": "", "emoji": "☕", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610105245_1717984365236_3I3sJWy0OL.jpg"},
        {"id": "decaf-vanilla-latte", "name": "디카페인 바닐라라떼", "price": "", "kcal": "", "emoji": "☕", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610104538_1717983938144_Df8hk7Crpe.jpg"},
        {"id": "decaf-hazelnut-americano", "name": "디카페인 헤이즐넛 아메리카노", "price": "", "kcal": "", "emoji": "☕", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610105046_1717984246492_KeavFH2VTO.jpg"},
        {"id": "decaf-espresso", "name": "디카페인 에스프레소", "price": "", "kcal": "", "emoji": "☕", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610110159_1717984919074_jg4RYBdr_J.jpg"},
    ],
    "beverage": [
        {"id": "strawberry-latte", "name": "딸기라떼", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20250116001724_1736954244791_8qDsY0gj14.jpg"},
        {"id": "sweet-potato-latte", "name": "고구마라떼", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610104240_1717983760778_agCooQEUb4.jpg"},
        {"id": "grain-latte", "name": "곡물라떼", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610104323_1717983803197_Dpwa_RK4_F.jpg"},
        {"id": "toffeenut-latte", "name": "토피넛라떼", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610105954_1717984794244_2JeEMNYiCL.jpg"},
        {"id": "green-tea-latte", "name": "녹차라떼", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610132304_1717993384411_TIYbjAcoOg.jpg"},
        {"id": "hot-chocolate", "name": "핫초코", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://img.79plus.co.kr/megahp/manager/upload/menu/20240610132247_1717993367574_8DCK_ywmZB.jpg"},
    ],
}
