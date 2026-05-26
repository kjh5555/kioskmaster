// Maps every scenario choice id used in McDonald's custom layouts to a real
// product photo from the McD Korea CDN. Layouts call lookupMcdImage(id) to
// swap emoji for the matching image; if no entry exists they keep the emoji.

const _PCFILE = "https://www.mcdonalds.co.kr/upload/product/pcfile";

const MCDONALDS_IMAGE_MAP: Record<string, string> = {
  // ── Burgers (category step / order-confirm-single / set-or-single)
  bigmac: "https://www.mcdonalds.co.kr/upload/2025/08/빅맥®_세트.png",
  "1955": `${_PCFILE}/1723564262197.png`,
  doublecheese: `${_PCFILE}/1723563512104.png`,
  mcchicken: `${_PCFILE}/1723563415066.png`,
  fileofish:
    "https://upload.wikimedia.org/wikipedia/commons/b/bd/McDonald%27s_Filet-O-Fish_sandwich_%282%29.jpg",
  shubi: `${_PCFILE}/1723564188909.png`,
  "shanghai-spicy": `${_PCFILE}/1723562660091.png`,
  "double-shanghai":
    "https://www.mcdonalds.co.kr/upload/2026/02/Corp_PC_VIEW_772x530_더블상하이_EVM.png",
  "wasabi-crab":
    "https://www.mcdonalds.co.kr/upload/2026/04/Corp_PC_VIEW_772x530_와사비게살_EVM.png",
  "wasabi-shubi":
    "https://www.mcdonalds.co.kr/upload/2026/04/Corp_PC_VIEW_772x530_와사비슈림프_EVM.png",
  "mccrispy-deluxe":
    "https://www.mcdonalds.co.kr/upload/2026/02/Corp_PC_VIEW_맥크리피_치킨_디럭스_772x530_new.png",
  "mccrispy-classic":
    "https://www.mcdonalds.co.kr/upload/2026/02/Corp_PC_VIEW_맥크리피_치킨_클래식_772x530_new.png",
  "double-quarter-cheese": `${_PCFILE}/1723563759418.png`,
  "quarter-cheese": `${_PCFILE}/1723563812629.png`,
  bulgogi: `${_PCFILE}/1723564031536.png`,
  "double-bulgogi": `${_PCFILE}/1723563975095.png`,
  "triple-cheese": `${_PCFILE}/1744956010637.png`,
  cheeseburger: `${_PCFILE}/1723563067813.png`,
  hamburger: "https://www.mcdonalds.co.kr/upload/2025/08/햄버거.png",

  // ── Sides (side-select step + upsell choices)
  "fries-large": "https://www.mcdonalds.co.kr/upload/2025/08/후렌치_후라이_Large.png",
  "fries-l": "https://www.mcdonalds.co.kr/upload/2025/08/후렌치_후라이_Large.png",
  coleslaw: `${_PCFILE}/1680761626050.png`,
  "fries-cheese": `${_PCFILE}/1742426888535.png`, // approximate: hashbrown stands in
  "snack-wrap":
    "https://www.mcdonalds.co.kr/upload/2026/05/Corp_PC_View_772x530_26_해피스낵Q2_게살크림스낵랩.png",
  mcnuggets:
    "https://www.mcdonalds.co.kr/upload/2026/03/Corp_PC_view_772x530_맥윙-4pc.png",
  "ice-drip-discount": `${_PCFILE}/1610889861261.png`,

  // ── Drinks (drink-select step)
  "coke-large": "https://www.mcdonalds.co.kr/upload/2025/08/코카-콜라_Large.png",
  coke: "https://www.mcdonalds.co.kr/upload/2025/08/코카-콜라_Large.png",
  "coke-zero": `${_PCFILE}/1583890021601.png`,
  "sprite-large": `${_PCFILE}/1583889967380.png`, // sprite approximate
  "fanta-large": "https://www.mcdonalds.co.kr/upload/2025/08/환타_Large.png",
  "lemon-coke": `${_PCFILE}/1583889967380.png`,
  "lemon-sprite": `${_PCFILE}/1583889967380.png`,
  "lemon-coke-zero": `${_PCFILE}/1583890021601.png`,
  "ice-drip": `${_PCFILE}/1610889861261.png`,
  "ice-americano": `${_PCFILE}/1610887631017.png`,
  "ice-latte": `${_PCFILE}/1610885477469.png`,
  "ice-vanilla-latte": `${_PCFILE}/1677678794782.png`,
  "ice-cream-latte": `${_PCFILE}/1657246845162.png`,
};

export function lookupMcdImage(id: string | undefined): string | null {
  if (id === undefined) return null;
  return MCDONALDS_IMAGE_MAP[id] ?? null;
}
