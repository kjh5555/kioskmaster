import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export const useCategories = () =>
  useQuery({ queryKey: ["categories"], queryFn: api.getCategories });

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
