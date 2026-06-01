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

export function GeneralMode({
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
          font-size: 19px;
          font-weight: 900;
        `}
      >
        어떻게 오셨나요?
      </div>

      <div
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 20px 16px;
          justify-content: center;
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
                align-items: center;
                gap: 16px;
                padding: 24px 20px;
                background: #ffffff;
                border: 3px solid #0067a6;
                border-radius: 18px;
                color: #0067a6;
                font-family: inherit;
                text-align: left;
                cursor: pointer;
                box-shadow: 0 6px 14px rgba(0, 103, 166, 0.12);
                -webkit-tap-highlight-color: transparent;
                :active {
                  transform: scale(0.99);
                }
              `,
              shakeWhen(rejectedChoiceId, c.id),
              idlePulse(idleHintActive, c.id === correctId),
            ]}
          >
            <span style={{ fontSize: 48 }}>{c.emoji}</span>
            <div
              css={css`
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 4px;
              `}
            >
              <span
                css={css`
                  font-size: 22px;
                  font-weight: 900;
                `}
              >
                {c.label}
              </span>
              {c.sublabel && (
                <span
                  css={css`
                    font-size: 14px;
                    color: #5a7a92;
                  `}
                >
                  {c.sublabel}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
