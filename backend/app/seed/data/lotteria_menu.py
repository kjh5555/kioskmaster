# Lotteria menu seed data.
# Names + prices supplied by the user from the lotteeatz.com menu listing.
# Image URLs use the Lotteria Wikipedia logo as a uniform placeholder since
# Lotteeatz's CDN images aren't publicly accessible without going through
# their SPA-rendered detail pages. Real photo URLs can be filled in later.

LOTTERIA_CATEGORY_TITLES = {
    "recommend": "추천메뉴",
    "burger": "버거",
    "chicken": "치킨",
    "dessert": "디저트",
    "drink": "음료",
    "ice-shot": "아이스샷",
}

LOTTERIA_CATEGORY_ORDER = [
    "recommend", "burger", "chicken", "dessert", "drink", "ice-shot",
]

_LOGO = "https://upload.wikimedia.org/wikipedia/commons/3/34/Lotteria_logo.svg"


def _item(id_, name, price, kcal="", emoji="🍔", isNew=False):
    return {
        "id": id_, "name": name, "price": price, "kcal": kcal,
        "emoji": emoji, "isNew": isNew, "imageUrl": _LOGO,
    }


LOTTERIA_CATEGORY_ITEMS: dict[str, list[dict[str, object]]] = {
    "recommend": [
        _item("bunt-beef", "번트비프버거", "₩8,800", "602kcal", isNew=True),
        _item("crispy-chicken-greek", "통다리 크리스피치킨버거(그릭랜치)", "₩6,900", "618kcal"),
        _item("crispy-chicken-fire", "통다리 크리스피치킨버거(파이어핫)", "₩6,900", "594kcal", emoji="🌶️"),
        _item("mozza-tomato", "모짜렐라버거 토마토바질", "₩9,100", "733kcal"),
        _item("mozza-balsamic", "모짜렐라버거 발사믹바질", "₩9,100", "733kcal"),
        _item("jeonju-bibim-rice", "전주 비빔라이스 버거", "₩7,300", "574kcal", emoji="🍙"),
        _item("ria-shrimp-bacon", "리아 새우 베이컨", "₩6,100", "519kcal"),
        _item("ria-bulgogi-bacon", "리아 불고기 베이컨", "₩6,100", "508kcal"),
        _item("classic-cheese-double", "더블 클래식치즈버거(버터번)", "₩7,200", "717kcal"),
        _item("teri-double", "더블 데리버거", "₩5,000", "446kcal"),
        _item("hanwoo-bulgogi-double", "더블 한우불고기버거", "₩13,000", "802kcal"),
        _item("hanwoo-bulgogi", "한우불고기버거", "₩9,000", "572kcal"),
        _item("mozza-in-burger-bacon", "모짜렐라 인 더 버거 베이컨", "₩8,000", "696kcal"),
        _item("hanwoo-couple-pack", "한우연인팩", "₩16,700", emoji="🎁"),
        _item("hanwoo-premium-pack", "한우명품팩", "₩18,500", emoji="🎁🌶️"),
    ],
    "burger": [
        # NEW items
        _item("bunt-beef", "번트비프버거", "₩8,800", "602kcal", isNew=True),
        _item("crispy-chicken-fire", "통다리 크리스피치킨버거(파이어핫)", "₩6,900", "594kcal", emoji="🌶️", isNew=True),
        _item("crispy-chicken-greek", "통다리 크리스피치킨버거(그릭랜치)", "₩6,900", "618kcal", isNew=True),
        _item("mozza-balsamic", "모짜렐라버거 발사믹바질", "₩9,100", "733kcal", isNew=True),
        _item("mozza-tomato", "모짜렐라버거 토마토바질", "₩9,100", "733kcal", isNew=True),
        _item("jeonju-bibim-rice", "전주 비빔라이스 버거", "₩7,300", "574kcal", emoji="🍙", isNew=True),
        _item("ria-shrimp-bacon", "리아 새우 베이컨", "₩6,100", "519kcal", isNew=True),
        _item("ria-bulgogi-bacon", "리아 불고기 베이컨", "₩6,100", "508kcal", isNew=True),
        _item("hanwoo-bulgogi-double", "더블 한우불고기버거", "₩13,000", "802kcal", isNew=True),
        # BEST / regular
        _item("hanwoo-bulgogi", "한우불고기버거", "₩9,000", "572kcal"),
        _item("classic-cheese-double", "더블 클래식치즈버거(버터번)", "₩7,200", "717kcal"),
        _item("chicken-burger-double", "더블 치킨버거", "₩5,800", "478kcal"),
        _item("teri-double", "더블 데리버거", "₩5,000", "446kcal"),
        _item("xx2-double", "더블엑스투버거", "₩7,200", "703kcal"),
        _item("ria-bulgogi-double", "리아 불고기 더블 (빅불)", "₩7,600", "721kcal"),
        _item("miracle", "미라클버거", "₩5,700", "382kcal", emoji="🌱"),
        _item("miracle-double", "더블 미라클버거", "₩7,200", "551kcal", emoji="🌱"),
        _item("mozza-in-burger-bacon", "모짜렐라 인 더 버거 베이컨", "₩8,000", "696kcal"),
        _item("hot-crispy-chicken", "핫크리스피치킨버거", "₩6,200", "454kcal", emoji="🌶️"),
        _item("ria-shrimp-square-double", "리아 사각새우 더블", "₩6,100", "534kcal"),
        _item("classic-cheese", "클래식치즈버거(버터번)", "₩5,500", "482kcal"),
        _item("ria-bulgogi", "리아 불고기", "₩5,000", "462kcal"),
        _item("ria-shrimp", "리아 새우", "₩5,000", "473kcal"),
        _item("chicken-burger", "치킨버거", "₩4,300", "355kcal"),
        _item("teri", "데리버거", "₩3,700", "348kcal"),
        _item("hanwoo-couple-pack", "한우연인팩", "₩16,700", emoji="🎁"),
        _item("hanwoo-premium-pack", "한우명품팩", "₩18,500", emoji="🎁"),
    ],
    "chicken": [
        _item("fire-wing", "화이어윙", "₩3,200", emoji="🌶️"),
        _item("chicken-fillet", "치킨휠레", "₩3,100", emoji="🍗"),
        _item("chicken-piece", "치킨 1조각", "₩2,900", emoji="🍗"),
        _item("boneless-half", "순살치킨 하프팩(11조각)", "₩10,500", emoji="🍗"),
        _item("fried-boneless-r", "후라이드 순살치킨 (R)", "₩11,300", emoji="🍗"),
        _item("boneless-full", "순살치킨 풀팩(22조각)", "₩17,500", emoji="🍗"),
        _item("fried-boneless-l", "후라이드 순살치킨 (L)", "₩18,600", emoji="🍗"),
        _item("chicken-leg-half", "치킨다리 하프팩(4조각)", "₩10,900", emoji="🍗"),
    ],
    "dessert": [
        _item("spicy-tonkatsu-hot", "디지게 매운 돈까스(디진다맛)", "₩3,500", emoji="🌶️"),
        _item("spicy-tonkatsu-mild", "디지게 매운 돈까스(양념맛)", "₩3,500", emoji="🌶️"),
        _item("yangnyeom-nugget", "양념너겟", "₩3,300", emoji="🍗"),
        _item("chicken-nugget", "치킨너겟", "₩3,100", emoji="🍗"),
        _item("potato-r", "포테이토", "₩2,000", emoji="🍟"),
        _item("potato-l", "포테이토(L)", "₩2,500", emoji="🍟"),
        _item("yangnyeom-potato", "양념감자", "₩2,600", emoji="🍟"),
        _item("cheese-stick", "치즈스틱", "₩2,800", emoji="🧀"),
        _item("long-cheese-stick", "롱치즈스틱", "₩2,400", emoji="🧀"),
        _item("squid-ring", "통오징어링", "₩2,800", emoji="🦑"),
        _item("g-pie-habanero", "지파이 하바네로(L)", "₩5,500", emoji="🌶️"),
        _item("g-pie-mild-s", "지파이 고소한맛(S)", "₩4,500", emoji="🥧"),
        _item("coleslaw", "코울슬로", "₩1,900", emoji="🥗"),
    ],
    "drink": [
        _item("coke", "콜라", "₩2,000", emoji="🥤"),
        _item("sprite", "사이다", "₩2,000", emoji="🥤"),
        _item("coke-zero", "제로슈거콜라", "₩2,000", emoji="🥤"),
        _item("matcha-latte", "말차라떼", "₩3,600", emoji="🍵", isNew=True),
        _item("ice-tea", "아이스티", "₩2,300", emoji="🧃"),
        _item("lemonade", "레몬에이드", "₩2,700", emoji="🍋"),
        _item("americano", "아메리카노", "₩2,500", "8kcal", emoji="☕"),
        _item("ice-americano", "아이스 아메리카노", "₩2,500", emoji="🧊"),
        _item("cafe-latte", "카페라떼(살균우유)", "₩3,300", emoji="☕"),
        _item("ice-cafe-latte", "아이스카페라떼(살균우유)", "₩3,300", emoji="🧊"),
        _item("orange-juice", "오렌지주스(PET)", "₩2,500", emoji="🧃"),
        _item("hot-choco", "핫초코", "₩2,500", emoji="☕"),
    ],
    "ice-shot": [
        _item("patbingsu-bag", "팥빙수(보냉백 포함)", "₩6,600", emoji="🍧", isNew=True),
        _item("patbingsu", "팥빙수", "₩6,100", emoji="🍧", isNew=True),
        _item("matcha-bingsu-bag", "말차빙수(보냉백 포함)", "₩6,600", emoji="🍧", isNew=True),
        _item("matcha-bingsu", "말차빙수", "₩6,100", emoji="🍧", isNew=True),
        _item("tornado-matcha-cookie", "토네이도 말차쿠키", "₩3,500", emoji="🍦", isNew=True),
        _item("tornado-mango-jelly", "토네이도 망고젤리", "₩3,200", emoji="🍦"),
        _item("tornado-choco-cookie", "토네이도 초코쿠키", "₩3,200", emoji="🍦"),
        _item("tornado-strawberry", "토네이도 스트로베리", "₩3,200", emoji="🍦"),
        _item("tornado-double-choco", "토네이도 더블초코", "₩3,200", emoji="🍦"),
        _item("sundae-plain", "선데아이스크림 플레인", "₩2,100", emoji="🍨"),
        _item("sundae-strawberry", "선데아이스크림 스트로베리", "₩2,300", emoji="🍨"),
        _item("sundae-hershey", "선데 허쉬초코", "₩2,300", emoji="🍨"),
        _item("soft-cone", "소프트콘", "₩1,300", emoji="🍦"),
    ],
}
