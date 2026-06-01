# Ediya Korea menu seed data — 이디야 공식 사이트(/inc/ajax_brand.php) 에서 자동 추출.
# 10개 카테고리 × 카테고리당 대표 6개 메뉴 (L 사이즈 + ICED 우선, 콜라보·시즌 콜라보 제외).
# 이미지 URL 은 ediya.com/files/menu/IMG_*.png 패턴 그대로.

EDIYA_CATEGORY_TITLES = {
    "drink": "음료",
    "beverage": "기타 음료",
    "tea": "티",
    "flatccino": "플랫치노",
    "shake-ade": "쉐이크 / 에이드",
    "ice-flakes": "빙수",
    "rtd": "병음료",
    "ice-cream": "아이스크림",
    "decaf": "디카페인",
    "topping": "토핑",
}

EDIYA_CATEGORY_ORDER = [
    "drink",
    "beverage",
    "tea",
    "flatccino",
    "shake-ade",
    "ice-flakes",
    "rtd",
    "ice-cream",
    "decaf",
    "topping",
]

EDIYA_CATEGORY_ITEMS = {
    "drink": [
        # 목표 메뉴 - 첫 번째 위치
        {"id": "iced-americano", "name": "(L) ICED 카페 아메리카노", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1671581786293.png"},
        {"id": "cafe-latte", "name": "(L) ICED 카페 라떼", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1671582134737.png"},
        {"id": "caramel-macchiato", "name": "(L) ICED 카라멜 마끼아또", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1671585861402.png"},
        {"id": "vanilla-latte", "name": "(L) ICED 바닐라 라떼", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1764057139672.png"},
        {"id": "cafe-mocha", "name": "(L) ICED 카페 모카", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1671586141487.png"},
        {"id": "condensed-latte", "name": "(L) ICED 연유 카페 라떼", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1671585023298.png"},
    ],
    "beverage": [
        {"id": "matcha-latte", "name": "(L) ICED 말차라떼", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1765781949718.png"},
        {"id": "matcha-choco-latte", "name": "(L) ICED 말차초코라떼", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1765785925140.png"},
        {"id": "strawberry-choco-latte", "name": "(L) ICED 딸기 초코 라떼", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1765786253491.png"},
        {"id": "ediya-674", "name": "(L) ICED 토피넛 라떼", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1765782452900.png"},
        {"id": "ediya-309", "name": "(L) ICED 흑당 라떼", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1765786427682.png"},
        {"id": "ediya-313", "name": "(L) ICED 버블 흑당 라떼", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1765786494516.png"},
    ],
    "tea": [
        {"id": "sikhye", "name": "(L) ICED 살얼음 식혜", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1765784140538.png"},
        {"id": "rooibos", "name": "(L) ICED 루이보스", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1765777099660.png"},
        {"id": "hibiscus", "name": "(L) ICED 히비스커스", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1765777455699.png"},
        {"id": "chamomile", "name": "(L) ICED 캐모마일", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1765776632124.png"},
        {"id": "ediya-501", "name": "(L) ICED 페퍼민트", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1765776837499.png"},
        {"id": "ediya-486", "name": "(L) ICED 복분자 뱅쇼", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1765784598699.png"},
    ],
    "flatccino": [
        {"id": "mango-flatccino", "name": "(L) 망고 플랫치노", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1765786567175.png"},
        {"id": "blueberry-yogurt-flatccino", "name": "(L) 블루베리 요거트 플랫치노", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1765789146688.png"},
        {"id": "toffee-flatccino", "name": "(L) 토피넛 플랫치노", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1765787846122.png"},
        {"id": "mint-choco-flatccino", "name": "(L) 민트 초콜릿칩 플랫치노", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1765788293786.png"},
        {"id": "ediya-1162", "name": "(L) 꿀복숭아 요거트 플랫치노", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1765789418557.png"},
        {"id": "choco-chip-flatccino", "name": "(L) 초콜릿 칩 플랫치노", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1765788074734.png"},
    ],
    "shake-ade": [
        {"id": "strawberry-shake", "name": "(L) 딸기 쉐이크", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1765789826353.png"},
        {"id": "espresso-shake", "name": "(L) 에스프레소 쉐이크", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1765791015694.png"},
        {"id": "choco-cookie-shake", "name": "(L) 초코쿠키 쉐이크", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1765789999101.png"},
        {"id": "sangria-ade", "name": "(L) 샹그리아 에이드", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1765774751841.png"},
        {"id": "muscat-mojito-ade", "name": "(L) 머스캣 모히또 에이드", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1721096519205.png"},
        {"id": "citrus-lemon-ade", "name": "(L) 감귤 레몬 에이드", "price": "", "kcal": "", "emoji": "🥤", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1765773540652.png"},
    ],
    "ice-flakes": [
        {"id": "cup-patjeolbing", "name": "컵 팥절빙", "price": "", "kcal": "", "emoji": "🍧", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1777424070507.png"},
        {"id": "cup-mangkobing", "name": "컵 망코빙", "price": "", "kcal": "", "emoji": "🍧", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1777423915788.png"},
        {"id": "cup-duchobing", "name": "컵 두초빙", "price": "", "kcal": "", "emoji": "🍧", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1777423770639.png"},
        {"id": "plate-patjeolbing", "name": "접시 팥절빙", "price": "", "kcal": "", "emoji": "🍧", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1777423610111.png"},
        {"id": "plate-mangkobing", "name": "접시 망코빙", "price": "", "kcal": "", "emoji": "🍧", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1777423393615.png"},
        {"id": "plate-duchobing", "name": "접시 두초빙", "price": "", "kcal": "", "emoji": "🍧", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1777423232646.png"},
    ],
    "rtd": [
        {"id": "mogu-mogu", "name": "모구모구(리치)", "price": "", "kcal": "", "emoji": "🧃", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1779322754749.png"},
        {"id": "fruit-sparkling-apple", "name": "(병)프루츠 스파클링 사과", "price": "", "kcal": "", "emoji": "🧃", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1772604360699.png"},
        {"id": "fruit-sparkling-peach", "name": "(병)프루츠 스파클링 복숭아", "price": "", "kcal": "", "emoji": "🧃", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1772604519491.png"},
        {"id": "fruit-sparkling-cherry", "name": "(병)프루츠 스파클링 체리", "price": "", "kcal": "", "emoji": "🧃", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1772604508412.png"},
        {"id": "vitamin-juice-applemango", "name": "비타민 주스 애플망고", "price": "", "kcal": "", "emoji": "🧃", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1722475731399.png"},
        {"id": "vitamin-juice-mixberry", "name": "비타민 주스 믹스베리", "price": "", "kcal": "", "emoji": "🧃", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1722475826757.png"},
    ],
    "ice-cream": [
        {"id": "smoothie-bowl-strawberry", "name": "아이스크림 스무디볼 딸기", "price": "", "kcal": "", "emoji": "🍦", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1779088558734.png"},
        {"id": "smoothie-bowl-mango", "name": "아이스크림 스무디볼 망고", "price": "", "kcal": "", "emoji": "🍦", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1779088647303.png"},
        {"id": "smoothie-bowl-blueberry", "name": "아이스크림 스무디볼 블루베리", "price": "", "kcal": "", "emoji": "🍦", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1779088447486.png"},
        {"id": "ediya-1184", "name": "(콘)소프트 아이스크림(일부 매장 판매)", "price": "", "kcal": "", "emoji": "🍦", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1770252417504.png"},
        {"id": "double-berry-parfait", "name": "더블베리 아이스크림 파르페", "price": "", "kcal": "", "emoji": "🍦", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1767924695793.png"},
        {"id": "double-choco-parfait", "name": "더블초코 아이스크림 파르페", "price": "", "kcal": "", "emoji": "🍦", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1767924703224.png"},
    ],
    "decaf": [
        {"id": "decaf-hazelnut-americano", "name": "(L) ICED 디카페인 헤이즐넛 아메리카노", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1756702033875.png"},
        {"id": "decaf-condensed-latte", "name": "(L) ICED 디카페인 연유 카페 라떼", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1721112356312.png"},
        {"id": "decaf-honey-white-americano", "name": "(L) ICED 디카페인 꿀화이트 아메리카노", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1742279237605.png"},
        {"id": "decaf-cafe-mocha", "name": "(L) ICED 디카페인 카페 모카", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1721113857534.png"},
        {"id": "decaf-signature-latte", "name": "(L) ICED 디카페인 시그니처 라떼", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1730081473743.png"},
        {"id": "decaf-mint-mocha", "name": "(L) ICED 디카페인 민트 모카", "price": "", "kcal": "", "emoji": "🧊", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1721117254570.png"},
    ],
    "topping": [
        {"id": "popping-candy", "name": "팝핑캔디", "price": "", "kcal": "", "emoji": "🍯", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1750840560494.png"},
        {"id": "frozen-banana", "name": "냉동 바나나", "price": "", "kcal": "", "emoji": "🍯", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1750839565367.png"},
        {"id": "frozen-grapefruit", "name": "냉동 자몽", "price": "", "kcal": "", "emoji": "🍯", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1750839810420.png"},
        {"id": "frozen-mango", "name": "냉동망고", "price": "", "kcal": "", "emoji": "🍯", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1750838700191.png"},
        {"id": "peach-base", "name": "복숭아 베이스", "price": "", "kcal": "", "emoji": "🍯", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1750838472664.png"},
        {"id": "almond-slice", "name": "아몬드슬라이스", "price": "", "kcal": "", "emoji": "🍯", "isNew": False, "imageUrl": "https://ediya.com/files/menu/IMG_1750840275834.png"},
    ],
}
