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

export function EdiyaDineMode({
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
        background: #f5f8fc;
        font-family: system-ui, -apple-system, sans-serif;
        overflow: hidden;
      `}
    >
      <div
        css={css`
          background: #1a3e72;
          color: #ffffff;
          padding: 18px 16px;
          text-align: center;
          font-size: 18px;
          font-weight: 800;
        `}
      >
        어디서 드시나요?
      </div>
      <div
        css={css`
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          padding: 20px 16px;
          align-content: center;
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
                gap: 14px;
                padding: 26px 12px;
                background: #ffffff;
                border: 3px solid #1a3e72;
                border-radius: 20px;
                color: #1a3e72;
                font-family: inherit;
                font-size: 22px;
                font-weight: 900;
                cursor: pointer;
                min-height: 180px;
                box-shadow: 0 6px 14px rgba(26, 62, 114, 0.12);
                -webkit-tap-highlight-color: transparent;
                :active {
                  transform: scale(0.98);
                }
              `,
              shakeWhen(rejectedChoiceId, c.id),
              idlePulse(idleHintActive, c.id === correctId),
            ]}
          >
            <span style={{ fontSize: 60 }}>{c.emoji}</span>
            <span>{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
