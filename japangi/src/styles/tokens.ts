export type FontSizeLevel = "normal" | "large" | "xlarge";

export const FONT_SIZE_LABELS: Record<FontSizeLevel, string> = {
  normal: "보통",
  large: "큼",
  xlarge: "매우 큼",
};

// Base px values used as CSS variables on the root.
// Components reference these via var(--font-body), var(--font-button), var(--font-header).
export const FONT_SIZE_TOKENS: Record<
  FontSizeLevel,
  { body: number; button: number; header: number }
> = {
  normal: { body: 18, button: 22, header: 28 },
  large: { body: 20, button: 26, header: 32 },
  xlarge: { body: 24, button: 30, header: 38 },
};
