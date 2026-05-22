const BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

async function jget<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

// Matches backend CategoryRead schema
export interface ApiCategory {
  slug: string;
  title: string;
  description: string;
  emoji: string;
  order: number;
  brand_count: number;
}

// Matches backend BrandSummary schema (used in CategoryDetail.brands)
export interface ApiBrandSummary {
  slug: string;
  name: string;
  emoji: string;
  goal_summary: string;
}

// Matches backend CategoryDetail schema
export interface ApiCategoryDetail {
  slug: string;
  title: string;
  description: string;
  emoji: string;
  order: number;
  brands: ApiBrandSummary[];
}

// Matches backend BrandRead schema
export interface ApiBrand {
  slug: string;
  name: string;
  emoji: string;
  category_slug: string;
  goal_summary: string;
}

// Matches backend BrandDetail schema
export interface ApiBrandDetail {
  slug: string;
  name: string;
  emoji: string;
  category_slug: string;
  goal_summary: string;
  scenario_json: unknown;
}

// Matches backend ScenarioOnly schema
export interface ApiScenarioOnly {
  scenario_json: unknown;
}

// Matches backend DynamicGoalResponse schema
export interface ApiDynamicGoal {
  goal_summary: string;
  selections: Record<string, string>;
  used_gemini: boolean;
  scenario_json: unknown;
}

// Matches backend MenuCategorySummary schema
export interface ApiMenuCategorySummary {
  slug: string;
  title: string;
  order: number;
}

// Matches backend MenuItemRead schema
export interface ApiMenuItemRead {
  slug: string;
  name: string;
  price: string;
  kcal: string;
  emoji: string;
  is_new: boolean;
  order: number;
}

// Matches backend MenuCategoryRead schema
export interface ApiMenuCategoryRead {
  slug: string;
  title: string;
  order: number;
  items: ApiMenuItemRead[];
}

export const api = {
  getCategories: () => jget<ApiCategory[]>("/api/categories"),
  getCategory: (slug: string) =>
    jget<ApiCategoryDetail>(`/api/categories/${slug}`),
  getBrands: () => jget<ApiBrand[]>("/api/brands"),
  getBrand: (slug: string) => jget<ApiBrandDetail>(`/api/brands/${slug}`),
  getBrandScenario: (slug: string) =>
    jget<ApiScenarioOnly>(`/api/brands/${slug}/scenario`),
  getBrandMenus: (slug: string) =>
    jget<ApiMenuCategorySummary[]>(`/api/brands/${slug}/menus`),
  getBrandMenuCategory: (brandSlug: string, categorySlug: string) =>
    jget<ApiMenuCategoryRead>(`/api/brands/${brandSlug}/menus/${categorySlug}`),
  getDynamicGoal: (slug: string) =>
    jget<ApiDynamicGoal>(`/api/brands/${slug}/dynamic-goal`),
};
