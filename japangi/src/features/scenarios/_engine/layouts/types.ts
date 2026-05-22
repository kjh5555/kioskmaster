import type { BrandTheme, ScenarioScript, Step } from "../types";

export interface CustomLayoutProps {
  step: Step;
  scenario: ScenarioScript;
  theme?: BrandTheme;
  rejectedChoiceId: string | null;
  onChoice: (choiceId: string) => void;
}

export type CustomLayoutComponent = React.FC<CustomLayoutProps>;

/**
 * Look up the label of the correct answer for an earlier step in the scenario.
 * Used by custom layouts that want to render the chosen burger / side / drink
 * name dynamically (e.g. McdonaldsSetSingle showing the burger picked in the
 * category step instead of a hardcoded "빅맥").
 */
export function lookupCorrectLabel(
  scenario: ScenarioScript,
  stepId: string,
): string | null {
  const step = scenario.steps.find((s) => s.id === stepId);
  if (step === undefined) return null;
  const choice = step.choices.find((c) => c.id === step.correctChoiceId);
  if (choice === undefined) return null;
  return choice.label.replace(/\n/g, " ").trim();
}
