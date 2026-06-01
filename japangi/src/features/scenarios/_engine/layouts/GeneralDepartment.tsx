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

export function GeneralDepartment({
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
        background: #e8f2fa;
        font-family: system-ui, -apple-system, sans-serif;
        overflow: hidden;
      `}
    >
      <div
        css={css`
          background: #0067a6;
          color: #ffffff;
          padding: 18px 16px;
          text-align: center;
          font-size: 18px;
          font-weight: 900;
        `}
      >
        진료과를 골라주세요
      </div>

      <div
        css={css`
          flex: 1;
          padding: 16px 14px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          align-content: start;
          overflow-y: auto;
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
                justify-content: center;
                gap: 8px;
                padding: 22px 12px;
                background: #ffffff;
                border: 3px solid #0067a6;
                border-radius: 18px;
                color: #0067a6;
                font-family: inherit;
                cursor: pointer;
                min-height: 150px;
                box-shadow: 0 4px 10px rgba(0, 103, 166, 0.1);
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
                font-size: 19px;
                font-weight: 900;
              `}
            >
              {c.label}
            </span>
            {c.sublabel && (
              <span
                css={css`
                  font-size: 12px;
                  color: #5a7a92;
                  text-align: center;
                  line-height: 1.3;
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
