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

export function StarbucksMenu({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const correctId = step.correctChoiceId;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background: #f5f0e8;
        font-family: system-ui, -apple-system, sans-serif;
        overflow: hidden;
      `}
    >
      {/* Active category tab strip */}
      <div
        css={css`
          background: #006241;
          color: #ffffff;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        `}
      >
        <span style={{ fontSize: 22 }}>☕</span>
        <span
          css={css`
            font-size: 17px;
            font-weight: 900;
          `}
        >
          음료
        </span>
      </div>

      {/* Menu grid — 2 columns, scrollable */}
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
                border: 2px solid #d9cdb8;
                border-radius: 16px;
                color: #1e3932;
                font-family: inherit;
                cursor: pointer;
                min-height: 160px;
                box-shadow: 0 3px 8px rgba(0, 0, 0, 0.06);
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
                  color: #006241;
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
