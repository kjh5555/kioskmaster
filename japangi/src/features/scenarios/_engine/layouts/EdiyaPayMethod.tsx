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

export function EdiyaPayMethod({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const card = step.choices.find((c) => c.id === "card")!;
  const others = step.choices.filter((c) => c.id !== "card");
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
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: center;
        `}
      >
        <div
          css={css`
            font-size: 18px;
            font-weight: 900;
          `}
        >
          결제 수단을 골라주세요
        </div>
        <div
          css={css`
            font-size: 12px;
            opacity: 0.9;
            padding: 4px 10px;
            background: rgba(255, 255, 255, 0.18);
            border-radius: 999px;
            align-self: center;
          `}
        >
          ⚠️ 연습이에요. 진짜 돈은 나가지 않아요.
        </div>
      </div>
      <div
        css={css`
          padding: 18px 16px 10px;
        `}
      >
        <button
          type="button"
          onClick={() => onChoice(card.id)}
          css={[
            css`
              width: 100%;
              display: flex;
              align-items: center;
              gap: 14px;
              padding: 22px 18px;
              background: #ffffff;
              border: 3px solid #1a3e72;
              border-radius: 18px;
              color: #1a3e72;
              font-family: inherit;
              font-size: 20px;
              font-weight: 900;
              text-align: left;
              cursor: pointer;
              -webkit-tap-highlight-color: transparent;
              :active {
                transform: scale(0.99);
              }
            `,
            shakeWhen(rejectedChoiceId, card.id),
            idlePulse(idleHintActive, card.id === correctId),
          ]}
        >
          <span style={{ fontSize: 36 }}>💳</span>
          <span style={{ flex: 1 }}>신용/체크카드</span>
          <span style={{ fontSize: 22, color: "#1a3e72" }}>›</span>
        </button>
      </div>
      <div
        css={css`
          flex: 1;
          padding: 0 16px 16px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
          align-content: start;
          overflow-y: auto;
        `}
      >
        {others.map((c) => (
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
                gap: 6px;
                padding: 16px 8px;
                background: #ffffff;
                border: 1.5px solid #c8d6e8;
                border-radius: 14px;
                color: #1a3e72;
                font-family: inherit;
                font-size: 13px;
                font-weight: 800;
                cursor: pointer;
                min-height: 90px;
                -webkit-tap-highlight-color: transparent;
                :active {
                  transform: scale(0.98);
                }
              `,
              shakeWhen(rejectedChoiceId, c.id),
            ]}
          >
            <span style={{ fontSize: 26 }}>{c.emoji}</span>
            <span style={{ textAlign: "center" }}>{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
