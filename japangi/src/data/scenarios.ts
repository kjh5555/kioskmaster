// Keep the TYPE definitions only. Data is fetched from the API.
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
