export type ScenarioId = "fastfood" | "cafe" | "hospital" | "train";

export interface Brand {
  id: string;
  name: string;
  emoji: string;
}

export interface ScenarioMeta {
  id: ScenarioId;
  title: string;
  description: string;
  emoji: string;
  brands: readonly Brand[];
}

export const SCENARIOS: readonly ScenarioMeta[] = [
  {
    id: "fastfood",
    title: "햄버거 가게",
    description: "맥도날드 같은 매장 키오스크 연습",
    emoji: "🍔",
    brands: [
      { id: "mcdonalds", name: "맥도날드", emoji: "🍔" },
      { id: "burgerking", name: "버거킹", emoji: "👑" },
      { id: "lotteria", name: "롯데리아", emoji: "🥤" },
      { id: "kfc", name: "KFC", emoji: "🍗" },
    ],
  },
  {
    id: "cafe",
    title: "카페",
    description: "스타벅스 같은 음료 주문 키오스크",
    emoji: "☕",
    brands: [
      { id: "starbucks", name: "스타벅스", emoji: "☕" },
      { id: "ediya", name: "이디야", emoji: "🥤" },
      { id: "mega", name: "메가커피", emoji: "🧋" },
      { id: "cafe-generic", name: "일반 카페", emoji: "🥐" },
    ],
  },
  {
    id: "hospital",
    title: "병원 접수",
    description: "병원 무인 접수기 연습",
    emoji: "🏥",
    brands: [
      { id: "general", name: "종합병원", emoji: "🏥" },
      { id: "clinic", name: "동네 의원", emoji: "🩺" },
    ],
  },
  {
    id: "train",
    title: "기차표",
    description: "KTX 같은 표 사기 연습",
    emoji: "🚆",
    brands: [
      { id: "ktx", name: "KTX", emoji: "🚄" },
      { id: "srt", name: "SRT", emoji: "🚅" },
    ],
  },
] as const;

export function getScenario(id: string): ScenarioMeta | undefined {
  return SCENARIOS.find((s) => s.id === id);
}

export function getBrand(
  categoryId: string,
  brandId: string,
): { category: ScenarioMeta; brand: Brand } | undefined {
  const category = getScenario(categoryId);
  if (category === undefined) return undefined;
  const brand = category.brands.find((b) => b.id === brandId);
  if (brand === undefined) return undefined;
  return { category, brand };
}
