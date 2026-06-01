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

export function StarbucksStart({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const order = step.choices.find((c) => c.id === "order")!;
  const card = step.choices.find((c) => c.id === "card");
  const language = step.choices.find((c) => c.id === "language");
  const correctId = step.correctChoiceId;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background: #006241;
        font-family: system-ui, -apple-system, sans-serif;
        overflow: hidden;
      `}
    >
      {/* Top brand area — Siren-style emblem + 환영 카피 */}
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
            width: 110px;
            height: 110px;
            border-radius: 50%;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 64px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
          `}
        >
          ☕
        </div>
        <div
          css={css`
            font-size: 22px;
            font-weight: 900;
            letter-spacing: 0.04em;
          `}
        >
          STARBUCKS
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

      {/* Action buttons — 주문하기 가장 큼 */}
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
              color: #006241;
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
          👆 주문하기
        </button>
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          `}
        >
          {card && (
            <button
              type="button"
              onClick={() => onChoice(card.id)}
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
                shakeWhen(rejectedChoiceId, card.id),
              ]}
            >
              💳 카드 충전
            </button>
          )}
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
    </div>
  );
}
