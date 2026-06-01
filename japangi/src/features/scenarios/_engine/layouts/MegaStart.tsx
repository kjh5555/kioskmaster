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

export function MegaStart({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const order = step.choices.find((c) => c.id === "order")!;
  const language = step.choices.find((c) => c.id === "language");
  const correctId = step.correctChoiceId;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background: #ffc700;
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
          color: #000000;
          gap: 12px;
        `}
      >
        <div
          css={css`
            background: #000000;
            color: #ffc700;
            padding: 14px 22px;
            border-radius: 12px;
            font-family: "Arial Black", sans-serif;
            font-weight: 900;
            font-size: 30px;
            letter-spacing: 0.04em;
            box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);
          `}
        >
          MEGA COFFEE
        </div>
        <div
          css={css`
            font-size: 17px;
            font-weight: 800;
            text-align: center;
            padding-top: 6px;
          `}
        >
          매일 마시는 커피, 부담 없이
        </div>
        <div
          css={css`
            background: #000000;
            color: #ffc700;
            padding: 6px 14px;
            border-radius: 999px;
            font-size: 14px;
            font-weight: 900;
            margin-top: 4px;
          `}
        >
          ☕ 아메리카노 1,500원
        </div>
      </div>

      <div
        css={css`
          padding: 0 20px 28px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        `}
      >
        <button
          type="button"
          onClick={() => onChoice(order.id)}
          css={[
            css`
              padding: 26px 16px;
              border-radius: 18px;
              background: #000000;
              color: #ffc700;
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
        {language && (
          <button
            type="button"
            onClick={() => onChoice(language.id)}
            css={[
              css`
                padding: 14px 8px;
                border-radius: 14px;
                background: rgba(0, 0, 0, 0.08);
                border: 1.5px solid rgba(0, 0, 0, 0.25);
                color: #000000;
                font-family: inherit;
                font-size: 14px;
                font-weight: 700;
                cursor: pointer;
                -webkit-tap-highlight-color: transparent;
                :active {
                  transform: scale(0.98);
                }
              `,
              shakeWhen(rejectedChoiceId, language.id),
            ]}
          >
            🌐 English
          </button>
        )}
      </div>
    </div>
  );
}
