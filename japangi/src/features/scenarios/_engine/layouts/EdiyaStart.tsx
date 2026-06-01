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

export function EdiyaStart({
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
        background: #1a3e72;
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
        <div
          css={css`
            background: #ffffff;
            color: #1a3e72;
            padding: 12px 20px;
            border-radius: 12px;
            font-family: "Arial Black", sans-serif;
            font-style: italic;
            font-weight: 900;
            font-size: 32px;
            letter-spacing: 0.04em;
            box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);
          `}
        >
          EDIYA COFFEE
        </div>
        <div
          css={css`
            font-size: 17px;
            font-weight: 700;
            opacity: 0.9;
            text-align: center;
            padding-top: 6px;
          `}
        >
          오늘 한 잔 어떠세요?
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
              background: #ffffff;
              color: #1a3e72;
              border: none;
              font-family: inherit;
              font-size: 26px;
              font-weight: 900;
              cursor: pointer;
              box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
              -webkit-tap-highlight-color: transparent;
              :active {
                transform: scale(0.98);
              }
            `,
            shakeWhen(rejectedChoiceId, order.id),
            idlePulse(idleHintActive, order.id === correctId),
          ]}
        >
          👆 주문 시작하기
        </button>
        {language && (
          <button
            type="button"
            onClick={() => onChoice(language.id)}
            css={[
              css`
                padding: 14px 8px;
                border-radius: 14px;
                background: rgba(255, 255, 255, 0.12);
                border: 1.5px solid rgba(255, 255, 255, 0.35);
                color: #ffffff;
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
