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
  tall: 70,
  grande: 90,
  venti: 110,
};

export function StarbucksSize({
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
      {/* Header */}
      <div
        css={css`
          background: #006241;
          color: #ffffff;
          padding: 16px 16px;
          text-align: center;
          font-size: 18px;
          font-weight: 900;
        `}
      >
        사이즈를 골라주세요
      </div>

      {/* 3 sizes side-by-side with cup illustrations */}
      <div
        css={css`
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 8px;
          padding: 16px 12px;
          align-content: center;
        `}
      >
        {step.choices.map((c) => {
          const cupH = CUP_SIZE[c.id] ?? 80;
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
                  padding: 14px 6px;
                  background: #ffffff;
                  border: 3px solid #006241;
                  border-radius: 16px;
                  color: #1e3932;
                  font-family: inherit;
                  cursor: pointer;
                  min-height: 240px;
                  -webkit-tap-highlight-color: transparent;
                  :active {
                    transform: scale(0.98);
                  }
                `,
                shakeWhen(rejectedChoiceId, c.id),
                idlePulse(idleHintActive, c.id === correctId),
              ]}
            >
              {/* Cup illustration — size differentiates visually */}
              <div
                css={css`
                  width: 56px;
                  height: ${cupH}px;
                  background: #006241;
                  border-radius: 6px 6px 14px 14px;
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
                    border: 3px solid #006241;
                    border-radius: 4px;
                  `}
                />
              </div>
              <span
                css={css`
                  font-size: 15px;
                  font-weight: 900;
                  text-align: center;
                  line-height: 1.2;
                `}
              >
                {c.label}
              </span>
              {c.sublabel && (
                <span
                  css={css`
                    font-size: 11px;
                    color: #6e6e6e;
                    text-align: center;
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
