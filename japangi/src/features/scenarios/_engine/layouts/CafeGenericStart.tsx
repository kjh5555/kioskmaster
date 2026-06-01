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

export function CafeGenericStart({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const order = step.choices.find((c) => c.id === "order")!;
  const correctId = step.correctChoiceId;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background: #6f4e37;
        font-family: system-ui, -apple-system, sans-serif;
        overflow: hidden;
      `}
    >
      <div
        css={css`
          flex: 1.4;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px 16px;
          color: #ffffff;
          gap: 14px;
        `}
      >
        <div style={{ fontSize: 96 }}>☕</div>
        <div
          css={css`
            font-size: 28px;
            font-weight: 900;
            letter-spacing: 0.02em;
          `}
        >
          어서오세요
        </div>
        <div
          css={css`
            font-size: 15px;
            font-weight: 600;
            opacity: 0.9;
            text-align: center;
          `}
        >
          오늘도 좋은 하루 되세요
        </div>
      </div>

      <div
        css={css`
          padding: 0 20px 28px;
        `}
      >
        <button
          type="button"
          onClick={() => onChoice(order.id)}
          css={[
            css`
              width: 100%;
              padding: 26px 16px;
              border-radius: 18px;
              background: #d2b48c;
              color: #3d2818;
              border: none;
              font-family: inherit;
              font-size: 26px;
              font-weight: 900;
              cursor: pointer;
              box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);
              -webkit-tap-highlight-color: transparent;
              :active {
                transform: scale(0.98);
              }
            `,
            shakeWhen(rejectedChoiceId, order.id),
            idlePulse(idleHintActive, order.id === correctId),
          ]}
        >
          👆 주문하기
        </button>
      </div>
    </div>
  );
}
