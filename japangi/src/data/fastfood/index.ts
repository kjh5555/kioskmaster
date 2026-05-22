export { MCDONALDS_SCENARIO } from "./mcdonalds";
export { BURGERKING_SCENARIO } from "./burgerking";
export { LOTTERIA_SCENARIO } from "./lotteria";
export { KFC_SCENARIO } from "./kfc";

import { MCDONALDS_SCENARIO } from "./mcdonalds";
import { BURGERKING_SCENARIO } from "./burgerking";
import { LOTTERIA_SCENARIO } from "./lotteria";
import { KFC_SCENARIO } from "./kfc";
import type { ScenarioScript } from "../../features/scenarios/_engine/types";

export const FASTFOOD_BRAND_SCENARIOS: Record<string, ScenarioScript> = {
  mcdonalds: MCDONALDS_SCENARIO,
  burgerking: BURGERKING_SCENARIO,
  lotteria: LOTTERIA_SCENARIO,
  kfc: KFC_SCENARIO,
};

export function getFastfoodScenario(
  brandId: string,
): ScenarioScript | undefined {
  return FASTFOOD_BRAND_SCENARIOS[brandId];
}
