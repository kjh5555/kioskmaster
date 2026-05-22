export interface Choice {
  id: string;
  label: string;
  sublabel?: string;
  emoji?: string;
}

export type StepLayout = "start" | "duo" | "list" | "grid";

export interface Step {
  id: string;
  instruction: string;
  helpText: string;
  layout: StepLayout;
  /**
   * If set, StepEngine renders the step using a registered custom layout component
   * instead of the generic `layout` switch. Keep `correctChoiceId` and `choices` —
   * the custom layout still calls back into the engine with the chosen id.
   */
  customLayoutId?: string;
  choices: Choice[];
  correctChoiceId: string;
  successMessage: string;
  hintMessage: string;
}

export interface OnboardingStep {
  emoji: string;
  title: string;
  body: string;
}

export interface BrandTheme {
  /** Brand display name, e.g., "맥도날드" */
  name: string;
  /** Primary background color (header bar, big CTA) — hex */
  primary: string;
  /** Secondary accent color — hex */
  secondary: string;
  /** Best contrasting text color over primary — "#FFFFFF" | "#191F28" */
  onPrimary: string;
  /** Goal headline color (usually primary or a strong tone) — hex */
  accent: string;
}

export interface ScenarioScript {
  id: string;
  goalSummary: string;
  onboarding: OnboardingStep[];
  steps: Step[];
  theme?: BrandTheme;
}
