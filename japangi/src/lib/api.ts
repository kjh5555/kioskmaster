const BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

async function jget<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

async function jpost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let detail = "";
    try {
      const j = await res.json();
      detail = typeof j?.detail === "string" ? j.detail : "";
    } catch {
      // ignore
    }
    throw new Error(detail || `API ${path} failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

async function jdelete<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { method: "DELETE" });
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
  image_url: string | null;
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
  image_url: string | null;
  category_slug: string;
  goal_summary: string;
}

// Matches backend BrandDetail schema
export interface ApiBrandDetail {
  slug: string;
  name: string;
  emoji: string;
  image_url: string | null;
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
  image_url: string | null;
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

// ── Phase 2: users / attempts / family / brand-requests ────────────────────

export interface ApiUser {
  id: number;
  external_id: string;
  role: string; // "elderly" | "guardian"
  display_name: string | null;
  created_at: string;
}

export interface ApiAttempt {
  id: number;
  brand_slug: string;
  category_slug: string;
  success: boolean;
  mistakes: number;
  duration_seconds: number;
  started_at: string;
  completed_at: string | null;
}

export interface ApiUserStats {
  total_attempts: number;
  total_success: number;
  by_brand: Record<
    string,
    { attempts: number; success: number; last_played: string | null }
  >;
  this_week_count: number;
}

export interface ApiPairingCode {
  code: string;
  expires_at: string;
}

export interface ApiFamilyLink {
  id: number;
  parent_external_id: string;
  parent_display_name: string | null;
  nickname: string | null;
  created_at: string;
}

export interface ApiParentReport {
  parent_external_id: string;
  parent_display_name: string | null;
  nickname: string | null;
  total_attempts: number;
  total_success: number;
  this_week_count: number;
  by_brand: Record<
    string,
    { attempts: number; success: number; last_played: string | null }
  >;
  recent: Array<{
    brand_slug: string;
    success: boolean;
    mistakes: number;
    started_at: string;
  }>;
}

export interface ApiFavorite {
  id: number;
  parent_external_id: string;
  brand_slug: string;
  category_slug: string;
  priority: number;
  note: string | null;
  created_at: string;
}

export interface ApiBrandRequest {
  id: number;
  brand_name: string;
  branch: string | null;
  category_hint: string | null;
  description: string | null;
  status: string;
  operator_note: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApiFeedback {
  id: number;
  category: string;
  message: string;
  contact: string | null;
  status: string;
  operator_note: string | null;
  created_at: string;
  updated_at: string;
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

  // Users
  ensureUser: (payload: {
    external_id: string;
    role?: string;
    display_name?: string | null;
  }) => jpost<ApiUser>("/api/users/ensure", payload),
  getUser: (externalId: string) =>
    jget<ApiUser>(`/api/users/${externalId}`),

  // Attempts
  submitAttempt: (payload: {
    external_id: string;
    brand_slug: string;
    category_slug: string;
    success: boolean;
    mistakes?: number;
    duration_seconds?: number;
  }) => jpost<ApiAttempt>("/api/attempts/", payload),
  getUserStats: (externalId: string) =>
    jget<ApiUserStats>(`/api/attempts/stats/${externalId}`),
  getRecentAttempts: (externalId: string, limit = 20) =>
    jget<ApiAttempt[]>(`/api/attempts/recent/${externalId}?limit=${limit}`),

  // Family
  startPairing: (parentExternalId: string) =>
    jpost<ApiPairingCode>("/api/family/pairing/start", {
      parent_external_id: parentExternalId,
    }),
  claimPairing: (payload: {
    child_external_id: string;
    code: string;
    nickname?: string | null;
  }) => jpost<ApiFamilyLink>("/api/family/pairing/claim", payload),
  listParents: (childExternalId: string) =>
    jget<ApiFamilyLink[]>(`/api/family/links/${childExternalId}`),
  getParentReport: (childExternalId: string, parentExternalId: string) =>
    jget<ApiParentReport>(
      `/api/family/parent-report/${childExternalId}/${parentExternalId}`,
    ),
  setFavorite: (payload: {
    child_external_id: string;
    parent_external_id: string;
    brand_slug: string;
    category_slug: string;
    priority?: number;
    note?: string | null;
  }) => jpost<ApiFavorite>("/api/family/favorites", payload),
  deleteFavorite: (favoriteId: number, childExternalId: string) =>
    jdelete<{ deleted: number }>(
      `/api/family/favorites/${favoriteId}?child_external_id=${childExternalId}`,
    ),
  listParentFavorites: (parentExternalId: string) =>
    jget<ApiFavorite[]>(
      `/api/family/favorites/parent/${parentExternalId}`,
    ),

  // Brand requests
  submitBrandRequest: (payload: {
    external_id: string;
    brand_name: string;
    branch?: string | null;
    category_hint?: string | null;
    description?: string | null;
    image_urls?: string | null;
  }) => jpost<ApiBrandRequest>("/api/brand-requests/", payload),
  listMyBrandRequests: (externalId: string) =>
    jget<ApiBrandRequest[]>(`/api/brand-requests/mine/${externalId}`),

  // Dev / tester helpers
  devSeedFamily: (payload: {
    child_external_id: string;
    parent_display_name?: string | null;
    nickname?: string | null;
  }) =>
    jpost<{
      parent_external_id: string;
      parent_display_name: string;
      nickname: string;
      attempts_created: number;
    }>("/api/dev/seed-family", payload),

  // Feedback
  submitFeedback: (payload: {
    external_id: string;
    category: "bug" | "feature" | "other";
    message: string;
    contact?: string | null;
  }) => jpost<ApiFeedback>("/api/feedback/", payload),
  listMyFeedback: (externalId: string) =>
    jget<ApiFeedback[]>(`/api/feedback/mine/${externalId}`),
};
