import { css, keyframes } from "@emotion/react";

import { idlePulse, type CustomLayoutProps } from "./types";

const shakeKf = keyframes`
  0%   { transform: translateX(0); }
  20%  { transform: translateX(-8px); }
  40%  { transform: translateX(8px); }
  60%  { transform: translateX(-5px); }
  80%  { transform: translateX(5px); }
  100% { transform: translateX(0); }
`;

function shakeWhen(rejected: string | null, id: string) {
  return (
    rejected === id &&
    css`
      animation: ${shakeKf} 350ms ease;
    `
  );
}

export function MegaMenu({
  step,
  scenario,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const correctId = step.correctChoiceId;
  const categoryStep = scenario.steps.find((s) => s.id === "category");
  const categories = categoryStep?.choices ?? [];
  const activeCategoryId = categoryStep?.correctChoiceId;
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background: #fffbe6;
        font-family: system-ui, -apple-system, sans-serif;
        overflow: hidden;
      `}
    >
      <div
        css={css`
          background: #000000;
          color: #ffc700;
          padding: 14px 12px 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
        `}
      >
        <div
          css={css`
            font-size: 14px;
            font-weight: 800;
            opacity: 0.85;
            white-space: nowrap;
            padding-right: 6px;
          `}
        >
          MENU
        </div>
        {categories.map((c) => {
          const active = c.id === activeCategoryId;
          return (
            <div
              key={c.id}
              css={css`
                padding: 12px 16px;
                border-radius: 999px;
                background: ${active ? "#ffc700" : "rgba(255, 199, 0, 0.18)"};
                border: 1.5px solid
                  ${active ? "#ffc700" : "rgba(255, 199, 0, 0.4)"};
                color: ${active ? "#000000" : "#ffc700"};
                font-size: 15px;
                font-weight: 800;
                white-space: nowrap;
                flex-shrink: 0;
                opacity: ${active ? 1 : 0.65};
              `}
            >
              {c.emoji} {c.label}
            </div>
          );
        })}
      </div>
      <div
        css={css`
          flex: 1;
          overflow-y: auto;
          padding: 14px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          align-content: start;
        `}
      >
        {step.choices.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onChoice(c.id)}
            css={[
              css`
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                gap: 8px;
                padding: 14px 10px;
                background: #ffffff;
                border: 2px solid #f0e0a0;
                border-radius: 16px;
                color: #000000;
                font-family: inherit;
                cursor: pointer;
                min-height: 160px;
                box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
                -webkit-tap-highlight-color: transparent;
                :active {
                  transform: scale(0.98);
                }
              `,
              shakeWhen(rejectedChoiceId, c.id),
              idlePulse(idleHintActive, c.id === correctId),
            ]}
          >
            <span style={{ fontSize: 44 }}>{c.emoji}</span>
            <span
              css={css`
                font-size: 14px;
                font-weight: 800;
                text-align: center;
                line-height: 1.3;
              `}
            >
              {c.label}
            </span>
            {c.sublabel && (
              <span
                css={css`
                  font-size: 14px;
                  font-weight: 900;
                  color: #e60012;
                `}
              >
                {c.sublabel}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
