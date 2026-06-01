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

const CUP_SIZE: Record<string, number> = {
  regular: 90,
  large: 130,
};

export function MegaSize({
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
        background: #fffbe6;
        font-family: system-ui, -apple-system, sans-serif;
        overflow: hidden;
      `}
    >
      <div
        css={css`
          background: #000000;
          color: #ffc700;
          padding: 16px;
          text-align: center;
          font-size: 18px;
          font-weight: 900;
        `}
      >
        사이즈를 골라주세요
      </div>
      <div
        css={css`
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          padding: 18px 14px;
          align-content: center;
        `}
      >
        {step.choices.map((c) => {
          const cupH = CUP_SIZE[c.id] ?? 100;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onChoice(c.id)}
              css={[
                css`
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: flex-end;
                  gap: 10px;
                  padding: 18px 10px;
                  background: #ffffff;
                  border: 3px solid #000000;
                  border-radius: 18px;
                  color: #000000;
                  font-family: inherit;
                  cursor: pointer;
                  min-height: 260px;
                  -webkit-tap-highlight-color: transparent;
                  :active {
                    transform: scale(0.98);
                  }
                `,
                shakeWhen(rejectedChoiceId, c.id),
                idlePulse(idleHintActive, c.id === correctId),
              ]}
            >
              <div
                css={css`
                  width: 72px;
                  height: ${cupH}px;
                  background: #ffc700;
                  border: 2px solid #000000;
                  border-radius: 8px 8px 16px 16px;
                  position: relative;
                `}
              >
                <div
                  css={css`
                    position: absolute;
                    top: -8px;
                    left: -4px;
                    right: -4px;
                    height: 14px;
                    background: #ffffff;
                    border: 3px solid #000000;
                    border-radius: 4px;
                  `}
                />
              </div>
              <span
                css={css`
                  font-size: 18px;
                  font-weight: 900;
                  text-align: center;
                `}
              >
                {c.label}
              </span>
              {c.sublabel && (
                <span
                  css={css`
                    font-size: 12px;
                    color: #6e6e6e;
                  `}
                >
                  {c.sublabel}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
