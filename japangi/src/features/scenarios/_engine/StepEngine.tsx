import { css, keyframes } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { useToast } from "@toss/tds-mobile";
import { graniteEvent } from "@apps-in-toss/web-framework";
import { useEffect, useState } from "react";

import { HelpOverlay } from "../../../components/HelpOverlay";
import { useConfetti } from "../../../hooks/useConfetti";
import { useSFX } from "../../../hooks/useSFX";
import { getCustomLayout } from "./layouts/index";
import { idlePulse, IDLE_PULSE_CLASS_FRAGMENT } from "./layouts/types";
import type { BrandTheme, Choice, ScenarioScript, Step } from "./types";

// Shake keyframe for wrong-answer feedback
const shakeKf = keyframes`
  0%   { transform: translateX(0); }
  20%  { transform: translateX(-6px); }
  40%  { transform: translateX(6px); }
  60%  { transform: translateX(-4px); }
  80%  { transform: translateX(4px); }
  100% { transform: translateX(0); }
`;

interface StepEngineProps {
  scenario: ScenarioScript;
  onScenarioComplete: () => void;
  onExit: () => void;
}

function sublabelSuffix(sublabel: string | undefined): string {
  if (sublabel == null || sublabel.trim() === "") return "";
  return ` (${sublabel.trim()})`;
}

// ── Card shared styles ────────────────────────────────────────────────────────

function makeCardBase(theme?: BrandTheme) {
  const activeColor = theme != null ? theme.primary : adaptive.blue500;
  return css`
    background: ${adaptive.greyBackground};
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 20px 16px;
    cursor: pointer;
    user-select: none;
    transition:
      transform 120ms ease,
      box-shadow 120ms ease;
    text-align: center;
    border: none;
    width: 100%;

    &:active {
      transform: scale(0.97);
      box-shadow: 0 0 0 2px ${activeColor};
      background: ${activeColor}1a;
    }
  `;
}

const cardLabel = css`
  font-size: var(--font-button);
  font-weight: 700;
  color: ${adaptive.grey900};
  line-height: 1.3;
  white-space: pre-line;
`;

const cardSublabel = css`
  font-size: var(--font-body);
  color: ${adaptive.grey600};
`;

// ── Layout renderers ──────────────────────────────────────────────────────────

interface ChoiceCardProps {
  choice: Choice;
  shaking: boolean;
  pulse: boolean;
  onTap: (id: string) => void;
  theme?: BrandTheme;
}

function ChoiceCard({
  choice,
  shaking,
  pulse,
  onTap,
  theme,
}: ChoiceCardProps): React.ReactElement {
  return (
    <button
      css={[
        makeCardBase(theme),
        shaking &&
          css`
            animation: ${shakeKf} 300ms ease;
          `,
        idlePulse(pulse, true),
      ]}
      onClick={() => onTap(choice.id)}
    >
      {choice.emoji != null && (
        <span style={{ fontSize: 36, lineHeight: 1 }}>{choice.emoji}</span>
      )}
      <span css={cardLabel}>{choice.label}</span>
      {choice.sublabel != null && (
        <span css={cardSublabel}>{choice.sublabel}</span>
      )}
    </button>
  );
}

function StartLayout({
  step,
  shakingId,
  onTap,
  theme,
}: {
  step: Step;
  shakingId: string | null;
  onTap: (id: string) => void;
  theme?: BrandTheme;
}): React.ReactElement {
  const bgColor = theme != null ? theme.primary : adaptive.blue500;
  const textColor = theme != null ? theme.onPrimary : "#fff";
  const choice = step.choices[0];
  return (
    <button
      css={[
        css`
          flex: 1;
          width: 100%;
          min-height: 280px;
          border-radius: 24px;
          background: ${bgColor};
          gap: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          user-select: none;
          border: none;
          padding: 20px 16px;
        `,
        shakingId === choice.id &&
          css`
            animation: ${shakeKf} 300ms ease;
          `,
      ]}
      onClick={() => onTap(choice.id)}
    >
      {choice.emoji != null && (
        <span style={{ fontSize: 56, lineHeight: 1 }}>{choice.emoji}</span>
      )}
      <span
        css={css`
          font-size: var(--font-header);
          font-weight: 700;
          color: ${textColor};
          line-height: 1.4;
          white-space: pre-line;
          text-align: center;
        `}
      >
        {choice.label}
      </span>
    </button>
  );
}

function DuoLayout({
  step,
  shakingId,
  idleHintActive,
  onTap,
  theme,
}: {
  step: Step;
  shakingId: string | null;
  idleHintActive: boolean;
  onTap: (id: string) => void;
  theme?: BrandTheme;
}): React.ReactElement {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        width: 100%;
      `}
    >
      {step.choices.map((choice) => (
        <ChoiceCard
          key={choice.id}
          choice={choice}
          shaking={shakingId === choice.id}
          pulse={idleHintActive && choice.id === step.correctChoiceId}
          onTap={onTap}
          theme={theme}
        />
      ))}
    </div>
  );
}

function GridLayout({
  step,
  shakingId,
  idleHintActive,
  onTap,
  theme,
}: {
  step: Step;
  shakingId: string | null;
  idleHintActive: boolean;
  onTap: (id: string) => void;
  theme?: BrandTheme;
}): React.ReactElement {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        width: 100%;
      `}
    >
      {step.choices.map((choice) => (
        <ChoiceCard
          key={choice.id}
          choice={choice}
          shaking={shakingId === choice.id}
          pulse={idleHintActive && choice.id === step.correctChoiceId}
          onTap={onTap}
          theme={theme}
        />
      ))}
    </div>
  );
}

function ListLayout({
  step,
  shakingId,
  idleHintActive,
  onTap,
  theme,
}: {
  step: Step;
  shakingId: string | null;
  idleHintActive: boolean;
  onTap: (id: string) => void;
  theme?: BrandTheme;
}): React.ReactElement {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: 100%;
      `}
    >
      {step.choices.map((choice) => {
        const activeColor = theme != null ? theme.primary : adaptive.blue500;
        return (
          <button
            key={choice.id}
            css={[
              css`
                background: ${adaptive.greyBackground};
                border-radius: 20px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                gap: 16px;
                padding: 20px 20px;
                cursor: pointer;
                user-select: none;
                transition:
                  transform 120ms ease,
                  box-shadow 120ms ease;
                text-align: left;
                border: none;
                width: 100%;
                min-height: 72px;

                &:active {
                  transform: scale(0.97);
                  box-shadow: 0 0 0 2px ${activeColor};
                  background: ${activeColor}1a;
                }
              `,
              shakingId === choice.id &&
                css`
                  animation: ${shakeKf} 300ms ease;
                `,
              idlePulse(idleHintActive, choice.id === step.correctChoiceId),
            ]}
            onClick={() => onTap(choice.id)}
          >
            {choice.emoji != null && (
              <span style={{ fontSize: 32, lineHeight: 1, flexShrink: 0 }}>
                {choice.emoji}
              </span>
            )}
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 2px;
              `}
            >
              <span css={cardLabel}>{choice.label}</span>
              {choice.sublabel != null && (
                <span css={cardSublabel}>{choice.sublabel}</span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ── StepEngine ────────────────────────────────────────────────────────────────

const IDLE_HINT_DELAY_MS = 5000;

export function StepEngine({
  scenario,
  onScenarioComplete,
  onExit,
}: StepEngineProps): React.ReactElement {
  const [stepIndex, setStepIndex] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const [shakingId, setShakingId] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [idleHintActive, setIdleHintActive] = useState(false);

  // Restart 5-second idle timer whenever the user lands on a new step or taps.
  // After 5s without correct progress, the matching button starts pulsing.
  useEffect(() => {
    setIdleHintActive(false);
    const timer = window.setTimeout(() => {
      setIdleHintActive(true);
    }, IDLE_HINT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [stepIndex, shakingId]);

  // When idle hint activates, scroll the pulsing button into view so the user
  // can actually see the signal even if the target sits below the fold.
  // Detected by the 1.2s+infinite animation duration that's unique to pulseKf.
  //
  // Re-runs whenever the user scrolls away: after 1s of no scroll, we slide
  // the target back to center so elderly users can't lose sight of it.
  useEffect(() => {
    if (!idleHintActive) return;

    function findPulseTarget(): HTMLElement | null {
      const buttons = document.querySelectorAll<HTMLElement>("button");
      for (const btn of Array.from(buttons)) {
        const cs = window.getComputedStyle(btn);
        if (
          cs.animationName !== "none" &&
          cs.animationDuration === "1.2s" &&
          cs.animationIterationCount === "infinite"
        ) {
          return btn;
        }
      }
      return null;
    }

    function scrollToTarget(): void {
      const target = findPulseTarget();
      if (target !== null) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    // Initial scroll once the pulse has had a beat to render.
    const initialTimer = window.setTimeout(scrollToTarget, 120);

    // Treat user scrolls as "they're trying to look elsewhere" — wait 1s
    // after their last scroll, then bring the pulse target back to center.
    let scrollDebounceTimer: number | null = null;
    let suppress = true; // ignore the initial smooth-scroll's own scroll events
    const releaseSuppress = window.setTimeout(() => {
      suppress = false;
    }, 900);

    function onScroll(): void {
      if (suppress) return;
      if (scrollDebounceTimer !== null) {
        window.clearTimeout(scrollDebounceTimer);
      }
      scrollDebounceTimer = window.setTimeout(() => {
        scrollToTarget();
      }, 1000);
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(initialTimer);
      window.clearTimeout(releaseSuppress);
      if (scrollDebounceTimer !== null) {
        window.clearTimeout(scrollDebounceTimer);
      }
      window.removeEventListener("scroll", onScroll);
    };
  }, [idleHintActive, stepIndex]);

  const sfx = useSFX();
  const confetti = useConfetti();
  // useToast() is provided by TDSMobileAITProvider (already wrapping the app in main.tsx).
  // API confirmed from types: openToast(message: string, options?: OpenToastOptions) => void
  const { openToast } = useToast();

  function handleBack(): void {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((h) => h.slice(0, -1));
      setStepIndex(prev);
      setShakingId(null);
    } else {
      onExit();
    }
  }

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    try {
      cleanup = graniteEvent.addEventListener("backEvent", {
        onEvent: () => {
          handleBack();
        },
      });
    } catch {
      // Not running inside Apps in Toss WebView (e.g., plain browser dev).
    }
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex]);

  const step = scenario.steps[stepIndex];
  const totalSteps = scenario.steps.length;
  const progressPct = ((stepIndex + 1) / totalSteps) * 100;

  const correctChoice = step.choices.find((c) => c.id === step.correctChoiceId);
  const correctLabel =
    correctChoice != null
      ? correctChoice.label.replace(/\n/g, " ").trim()
      : null;

  function showToast(message: string): void {
    openToast(message);
  }

  // Dynamic messages based on the actual correct choice's label,
  // so the toast always matches what the hint banner tells the user.
  const dynamicSuccess =
    correctLabel != null ? `잘하셨어요! ${correctLabel} 골랐어요.` : step.successMessage;
  const dynamicHint =
    correctLabel != null ? `${correctLabel} 카드를 한 번 눌러주세요.` : step.hintMessage;

  function handleTap(choiceId: string): void {
    if (locked) return;

    // Detour: an "if you tap this non-goal choice, the kiosk shows this
    // pop-up first" path. Navigate silently — no shake, no toast, no
    // success sound. The user can recover from the pop-up.
    const detourTargetId = step.detourTo?.[choiceId];
    if (detourTargetId !== undefined) {
      setLocked(true);
      setTimeout(() => {
        const idx = scenario.steps.findIndex((s) => s.id === detourTargetId);
        if (idx >= 0) {
          setHistory((h) => [...h, stepIndex]);
          setStepIndex(idx);
        }
        setLocked(false);
      }, 200);
      return;
    }

    if (choiceId === step.correctChoiceId) {
      setLocked(true);
      sfx.playSuccess();
      confetti.burst();
      showToast(dynamicSuccess);

      setTimeout(() => {
        const branchTargetId = step.branchTo?.[choiceId];
        let nextIndex = stepIndex + 1;
        if (branchTargetId !== undefined) {
          const idx = scenario.steps.findIndex((s) => s.id === branchTargetId);
          if (idx >= 0) nextIndex = idx;
        }
        if (nextIndex >= totalSteps) {
          onScenarioComplete();
        } else {
          setHistory((h) => [...h, stepIndex]);
          setStepIndex(nextIndex);
          setLocked(false);
        }
      }, 700);
    } else {
      sfx.playError();
      setShakingId(choiceId);
      showToast(dynamicHint);

      setTimeout(() => {
        setShakingId(null);
      }, 350);
    }
  }

  const theme = scenario.theme;
  const progressColor = theme != null ? theme.accent : adaptive.blue500;

  function renderLayout(): React.ReactElement {
    if (step.customLayoutId != null) {
      const CustomLayout = getCustomLayout(step.customLayoutId);
      if (CustomLayout != null) {
        return (
          <CustomLayout
            step={step}
            scenario={scenario}
            theme={theme}
            rejectedChoiceId={shakingId}
            idleHintActive={idleHintActive}
            onChoice={handleTap}
          />
        );
      }
    }

    switch (step.layout) {
      case "start":
        return (
          <StartLayout
            step={step}
            shakingId={shakingId}
            onTap={handleTap}
            theme={theme}
          />
        );
      case "duo":
        return (
          <DuoLayout
            step={step}
            shakingId={shakingId}
            idleHintActive={idleHintActive}
            onTap={handleTap}
            theme={theme}
          />
        );
      case "grid":
        return (
          <GridLayout
            step={step}
            shakingId={shakingId}
            idleHintActive={idleHintActive}
            onTap={handleTap}
            theme={theme}
          />
        );
      case "list":
        return (
          <ListLayout
            step={step}
            shakingId={shakingId}
            idleHintActive={idleHintActive}
            onTap={handleTap}
            theme={theme}
          />
        );
    }
  }

  const hasCustomLayout =
    step.customLayoutId != null && getCustomLayout(step.customLayoutId) != null;

  const backButton = (
    <button
      onClick={handleBack}
      aria-label="이전 단계로"
      css={css`
        display: flex;
        align-items: center;
        gap: 4px;
        height: 40px;
        padding: 0 12px;
        background: ${adaptive.greyBackground};
        border: 1px solid ${adaptive.grey200};
        border-radius: 10px;
        cursor: pointer;
        font-size: var(--font-body);
        color: ${adaptive.grey900};
        align-self: flex-start;
        margin-bottom: 8px;
      `}
    >
      <span style={{ fontSize: 18 }}>←</span>
      <span>이전</span>
    </button>
  );

  // Show the correct answer label so elderly users know what to tap.
  // On the very first start step (single CTA) we show the FULL goal summary
  // ("오늘은 1955버거 라지세트, 코울슬로, 콜라를 주문할 거예요") instead of
  // a single-item hint, because there's nothing to choose yet.
  const accentColor = theme != null ? theme.primary : adaptive.blue500;
  const isStart = step.layout === "start";
  const goalHint = (() => {
    if (isStart) {
      return (
        <div
          css={css`
            background: ${accentColor}14;
            border-left: 4px solid ${accentColor};
            border-radius: 12px;
            padding: 14px 16px;
            display: flex;
            flex-direction: column;
            gap: 4px;
          `}
        >
          <span
            css={css`
              font-size: 13px;
              font-weight: 700;
              color: ${accentColor};
              letter-spacing: 0.02em;
            `}
          >
            🎯 오늘의 주문 목표
          </span>
          <span
            css={css`
              font-size: var(--font-body);
              color: ${adaptive.grey900};
              line-height: 1.45;
            `}
          >
            {scenario.goalSummary}
          </span>
        </div>
      );
    }
    if (correctChoice == null) return null;
    return (
      <div
        css={css`
          background: ${accentColor}14;
          border-left: 4px solid ${accentColor};
          border-radius: 12px;
          padding: 12px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        `}
      >
        <span style={{ fontSize: 22, lineHeight: 1 }}>🎯</span>
        <span
          css={css`
            font-size: var(--font-body);
            color: ${adaptive.grey900};
            line-height: 1.4;
          `}
        >
          오늘은{" "}
          <strong
            css={css`
              color: ${accentColor};
              font-weight: 700;
            `}
          >
            {correctChoice.label.replace(/\n/g, " ")}
          </strong>
          {sublabelSuffix(correctChoice.sublabel)} 을(를) 골라주세요
        </span>
      </div>
    );
  })();

  if (hasCustomLayout) {
    return (
      <>
        <div
          css={css`
            padding: 8px 0 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
          `}
        >
          {backButton}
          {goalHint}
        </div>
        {/* Card frame for custom kiosk layouts: rounded corners,
            shadow, and clipped overflow so each screen paints inside
            a clear outer container (instead of bleeding into the page
            background and looking unframed). */}
        <div
          css={css`
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
            background: #ffffff;
            border: 1px solid rgba(0, 0, 0, 0.06);
          `}
        >
          {renderLayout()}
        </div>
        <HelpOverlay helpText={step.helpText} />
      </>
    );
  }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        flex: 1;
        gap: 20px;
      `}
    >
      {backButton}

      {/* Brand banner */}
      {theme != null && (
        <div
          css={css`
            background: ${theme.primary};
            color: ${theme.onPrimary};
            height: 48px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-weight: 700;
            letter-spacing: 0.01em;
            margin-bottom: -4px;
          `}
        >
          {theme.name}
        </div>
      )}

      {/* Progress bar */}
      <div>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
          `}
        >
          <span
            css={css`
              font-size: 15px;
              color: ${adaptive.grey600};
              font-weight: 600;
            `}
          >
            {stepIndex + 1} / {totalSteps}
          </span>
        </div>
        <div
          css={css`
            height: 8px;
            border-radius: 4px;
            background: ${adaptive.grey200};
            overflow: hidden;
          `}
        >
          <div
            css={css`
              height: 100%;
              border-radius: 4px;
              background: ${progressColor};
              transition: width 300ms ease;
            `}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Step instruction */}
      <p
        css={css`
          margin: 0;
          font-size: var(--font-button);
          font-weight: 700;
          color: ${adaptive.grey900};
          line-height: 1.4;
        `}
      >
        {step.instruction}
      </p>

      {goalHint}

      {/* Choice layout */}
      <div
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
        `}
      >
        {renderLayout()}
      </div>

      {/* Help button (fixed, per step) */}
      <HelpOverlay helpText={step.helpText} />
    </div>
  );
}
