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

export function StarbucksCategory({
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
      {/* Top tab bar — real Starbucks kiosk uses horizontal tabs */}
      <div
        css={css`
          background: #006241;
          color: #ffffff;
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
        {step.choices.map((c) => {
          const active = c.id === correctId;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onChoice(c.id)}
              css={[
                css`
                  padding: 12px 16px;
                  border-radius: 999px;
                  background: ${active ? "#ffffff" : "rgba(255, 255, 255, 0.12)"};
                  border: 1.5px solid
                    ${active ? "#ffffff" : "rgba(255, 255, 255, 0.35)"};
                  color: ${active ? "#006241" : "#ffffff"};
                  font-family: inherit;
                  font-size: 15px;
                  font-weight: 800;
                  white-space: nowrap;
                  cursor: pointer;
                  flex-shrink: 0;
                  -webkit-tap-highlight-color: transparent;
                  :active {
                    transform: scale(0.97);
                  }
                `,
                shakeWhen(rejectedChoiceId, c.id),
                idlePulse(idleHintActive, c.id === correctId),
              ]}
            >
              {c.emoji} {c.label}
            </button>
          );
        })}
      </div>

      {/* Body — guidance */}
      <div
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px 24px;
          text-align: center;
          gap: 16px;
        `}
      >
        <div style={{ fontSize: 56 }}>👆</div>
        <div
          css={css`
            font-size: 18px;
            font-weight: 800;
            color: #1e3932;
            line-height: 1.4;
          `}
        >
          위쪽 메뉴 탭에서<br />
          '음료'를 한 번 눌러주세요
        </div>
      </div>
    </div>
  );
}
