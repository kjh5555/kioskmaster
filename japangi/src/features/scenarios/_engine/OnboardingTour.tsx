import { useState } from "react";

import { markOnboardingSeen } from "./onboardingStorage";
import type { BrandTheme, OnboardingStep } from "./types";

interface OnboardingTourProps {
  scenarioId: string;
  steps: OnboardingStep[];
  onComplete: () => void;
  theme?: BrandTheme;
}

export function OnboardingTour({
  scenarioId,
  steps,
  onComplete,
  theme,
}: OnboardingTourProps): React.ReactElement {
  const accentColor = theme != null ? theme.primary : "#3182F6";
  const accentText = theme != null ? theme.onPrimary : "#fff";
  const [index, setIndex] = useState(0);

  const current = steps[index];
  const isFirst = index === 0;
  const isLast = index === steps.length - 1;

  function handleNext(): void {
    if (isLast) {
      markOnboardingSeen(scenarioId);
      onComplete();
    } else {
      setIndex((i) => i + 1);
    }
  }

  function handlePrev(): void {
    if (!isFirst) {
      setIndex((i) => i - 1);
    }
  }

  function handleSkip(): void {
    markOnboardingSeen(scenarioId);
    onComplete();
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          padding: "32px 24px 24px",
          width: "100%",
          maxWidth: 440,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          position: "relative",
        }}
      >
        {/* Skip / close */}
        <button
          onClick={handleSkip}
          aria-label="건너뛰기"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 14,
            color: "#888",
            padding: "4px 8px",
          }}
        >
          ✕ 닫기
        </button>

        {/* Step indicator dots */}
        <div
          style={{
            display: "flex",
            gap: 6,
            justifyContent: "center",
          }}
        >
          {steps.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === index ? 20 : 8,
                height: 8,
                borderRadius: 4,
                background: i === index ? accentColor : "#E0E0E0",
                transition: "all 200ms ease",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            textAlign: "center",
            padding: "8px 0",
          }}
        >
          <span style={{ fontSize: 56, lineHeight: 1 }}>{current.emoji}</span>
          <p
            style={{
              margin: 0,
              fontSize: "var(--font-header)",
              fontWeight: 700,
              color: "#191919",
              lineHeight: 1.3,
            }}
          >
            {current.title}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "var(--font-body)",
              color: "#555",
              lineHeight: 1.6,
            }}
          >
            {current.body}
          </p>
        </div>

        {/* Navigation buttons */}
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={handlePrev}
            disabled={isFirst}
            style={{
              flex: 1,
              minHeight: 56,
              borderRadius: 14,
              border: "1.5px solid #E0E0E0",
              background: "#fff",
              fontSize: "var(--font-button)",
              fontWeight: 600,
              color: isFirst ? "#CCC" : "#191919",
              cursor: isFirst ? "default" : "pointer",
            }}
          >
            이전
          </button>
          <button
            onClick={handleNext}
            style={{
              flex: 2,
              minHeight: 56,
              borderRadius: 14,
              border: "none",
              background: accentColor,
              fontSize: "var(--font-button)",
              fontWeight: 700,
              color: accentText,
              cursor: "pointer",
            }}
          >
            {isLast ? "시작하기" : "다음"}
          </button>
        </div>
      </div>
    </div>
  );
}
