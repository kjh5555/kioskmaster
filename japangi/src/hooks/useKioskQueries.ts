import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export const useCategories = () =>
  useQuery({ queryKey: ["categories"], queryFn: api.getCategories });

// Pro 모드 — LLM 추천 시나리오. enabled 가 false 면 fetch 안 함.
// staleTime 30s 라 같은 세션에서 모드 토글 토글 해도 즉시 캐시 사용.
export const useRecommendation = (enabled: boolean) =>
  useQuery({
    queryKey: ["recommendation"],
    queryFn: api.getRecommendation,
    enabled,
    staleTime: 30_000,
  });

export const useCategory = (slug: string) =>
  useQuery({
    queryKey: ["category", slug],
    queryFn: () => api.getCategory(slug),
    enabled: !!slug,
  });

export const useBrands = () =>
  useQuery({ queryKey: ["brands"], queryFn: api.getBrands });

export const useBrand = (slug: string) =>
  useQuery({
    queryKey: ["brand", slug],
    queryFn: () => api.getBrand(slug),
    enabled: !!slug,
  });

export const useBrandScenario = (slug: string) =>
  useQuery({
    queryKey: ["brand-scenario", slug],
    queryFn: () => api.getBrandScenario(slug),
    enabled: !!slug,
  });

export const useBrandMenus = (slug: string) =>
  useQuery({
    queryKey: ["brand-menus", slug],
    queryFn: () => api.getBrandMenus(slug),
    enabled: !!slug,
  });

export const useBrandMenuCategory = (brandSlug: string, categorySlug: string) =>
  useQuery({
    queryKey: ["brand-menu-category", brandSlug, categorySlug],
    queryFn: () => api.getBrandMenuCategory(brandSlug, categorySlug),
    enabled: !!brandSlug && !!categorySlug,
  });

export const useDynamicGoal = (slug: string) =>
  useQuery({
    queryKey: ["dynamic-goal", slug],
    queryFn: () => api.getDynamicGoal(slug),
    enabled: !!slug,
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
  });

export const useUserStats = (externalId: string) =>
  useQuery({
    queryKey: ["user-stats", externalId],
    queryFn: () => api.getUserStats(externalId),
    enabled: !!externalId,
    staleTime: 30 * 1000,
  });

export const useParentFavorites = (parentExternalId: string) =>
  useQuery({
    queryKey: ["parent-favorites", parentExternalId],
    queryFn: () => api.listParentFavorites(parentExternalId),
    enabled: !!parentExternalId,
    staleTime: 30 * 1000,
  });

export const useMyParents = (childExternalId: string) =>
  useQuery({
    queryKey: ["my-parents", childExternalId],
    queryFn: () => api.listParents(childExternalId),
    enabled: !!childExternalId,
  });

export const useParentReport = (
  childExternalId: string,
  parentExternalId: string,
) =>
  useQuery({
    queryKey: ["parent-report", childExternalId, parentExternalId],
    queryFn: () => api.getParentReport(childExternalId, parentExternalId),
    enabled: !!childExternalId && !!parentExternalId,
    staleTime: 30 * 1000,
  });
