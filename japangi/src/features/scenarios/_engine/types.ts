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
  /**
   * Optional branching: when the user picks the correct answer and that
   * choiceId is a key here, jump to the step with the mapped id instead of
   * advancing linearly. Used for 세트/단품 fork (set-or-single's "single"
   * jumps straight to order-confirm-single, skipping set-size/side/drink).
   */
  branchTo?: Record<string, string>;
  /**
   * Optional detour map: fires regardless of correctness. When the user picks
   * an id that has an entry here, jump to that step (no shake/toast). Used
   * for kiosk pop-ups that appear when a non-goal choice is picked — e.g.
   * BK's "upgrade to set?" modal when 단품 is selected.
   */
  detourTo?: Record<string, string>;
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
