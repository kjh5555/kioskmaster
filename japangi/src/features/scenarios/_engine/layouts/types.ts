import { css, keyframes, type SerializedStyles } from "@emotion/react";

import type { BrandTheme, ScenarioScript, Step } from "../types";

export interface CustomLayoutProps {
  step: Step;
  scenario: ScenarioScript;
  theme?: BrandTheme;
  rejectedChoiceId: string | null;
  /**
   * True when the user has been idle on this step for ~5s.
   * Custom layouts should visually signal the correct next button
   * (typically a soft yellow pulsing glow).
   */
  idleHintActive: boolean;
  onChoice: (choiceId: string) => void;
}

export type CustomLayoutComponent = React.FC<CustomLayoutProps>;

/**
 * Strong pulsing glow used to point users at the button they should tap when
 * they've been idle for too long. Tuned to be hard to miss for elderly users
 * — a thick yellow halo plus a gentle scale heartbeat.
 */
const pulseKf = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(255, 199, 44, 0.95), 0 0 0 4px rgba(255, 199, 44, 0.85); transform: scale(1); }
  50%  { box-shadow: 0 0 0 18px rgba(255, 199, 44, 0), 0 0 0 4px rgba(255, 199, 44, 0.95); transform: scale(1.04); }
  100% { box-shadow: 0 0 0 0 rgba(255, 199, 44, 0), 0 0 0 4px rgba(255, 199, 44, 0.85); transform: scale(1); }
`;

// Shared pulse styles — pre-computed so StepEngine can locate the pulsing
// element in the DOM by its Emotion-generated class name and scroll it into
// view when idle hint activates.
const pulseStyles = css`
  animation: ${pulseKf} 1.2s ease-in-out infinite;
  position: relative;
  z-index: 1;
`;

/**
 * Class-name fragment that Emotion injects on whichever button is currently
 * pulsing. Used by StepEngine to find and scroll to the target.
 */
export const IDLE_PULSE_CLASS_FRAGMENT = pulseStyles.name;

export function idlePulse(
  active: boolean,
  isTarget: boolean,
): SerializedStyles | false {
  if (!active || !isTarget) return false;
  return pulseStyles;
}

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
