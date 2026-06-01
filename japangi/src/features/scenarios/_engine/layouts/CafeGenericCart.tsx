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

export function CafeGenericCart({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const pay = step.choices.find((c) => c.id === "pay")!;
  const more = step.choices.find((c) => c.id === "more");
  const cancel = step.choices.find((c) => c.id === "cancel");
  const correctId = step.correctChoiceId;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background: #faf6f0;
        font-family: system-ui, -apple-system, sans-serif;
        overflow: hidden;
      `}
    >
      <div
        css={css`
          background: #6f4e37;
          color: #ffffff;
          padding: 16px;
          text-align: center;
          font-size: 18px;
          font-weight: 900;
        `}
      >
        주문 내역
      </div>
      <div
        css={css`
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 16px 18px;
            background: #ffffff;
            border: 1.5px solid #d2b48c;
            border-radius: 16px;
          `}
        >
          <span style={{ fontSize: 40 }}>🧊</span>
          <div style={{ flex: 1 }}>
            <div
              css={css`
                font-size: 16px;
                font-weight: 900;
                color: #3d2818;
                line-height: 1.3;
              `}
            >
              아이스 아메리카노
            </div>
            <div
              css={css`
                font-size: 13px;
                color: #6e6e6e;
                padding-top: 2px;
              `}
            >
              보통 · 매장
            </div>
          </div>
          <div
            css={css`
              font-size: 18px;
              font-weight: 900;
              color: #6f4e37;
            `}
          >
            3,000원
          </div>
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 14px 18px;
            background: #6f4e37;
            color: #ffffff;
            border-radius: 14px;
          `}
        >
          <span
            css={css`
              font-size: 16px;
              font-weight: 800;
            `}
          >
            결제 금액
          </span>
          <span
            css={css`
              font-size: 22px;
              font-weight: 900;
            `}
          >
            3,000원
          </span>
        </div>
      </div>
      {(more || cancel) && (
        <div
          css={css`
            flex: 1;
            padding: 0 16px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            align-content: start;
          `}
        >
          {more && (
            <button
              type="button"
              onClick={() => onChoice(more.id)}
              css={[
                css`
                  padding: 14px;
                  background: #ffffff;
                  border: 1.5px solid #6f4e37;
                  border-radius: 14px;
                  color: #6f4e37;
                  font-family: inherit;
                  font-size: 14px;
                  font-weight: 800;
                  cursor: pointer;
                  -webkit-tap-highlight-color: transparent;
                `,
                shakeWhen(rejectedChoiceId, more.id),
              ]}
            >
              ➕ 메뉴 추가
            </button>
          )}
          {cancel && (
            <button
              type="button"
              onClick={() => onChoice(cancel.id)}
              css={[
                css`
                  padding: 14px;
                  background: #ffffff;
                  border: 1.5px solid #b0a89a;
                  border-radius: 14px;
                  color: #6e6e6e;
                  font-family: inherit;
                  font-size: 14px;
                  font-weight: 800;
                  cursor: pointer;
                  -webkit-tap-highlight-color: transparent;
                `,
                shakeWhen(rejectedChoiceId, cancel.id),
              ]}
            >
              ✖️ 전체 취소
            </button>
          )}
        </div>
      )}
      <div
        css={css`
          padding: 14px 16px calc(env(safe-area-inset-bottom, 0px) + 18px);
          background: #ffffff;
          border-top: 1px solid #e8dec8;
        `}
      >
        <button
          type="button"
          onClick={() => onChoice(pay.id)}
          css={[
            css`
              width: 100%;
              padding: 22px 16px;
              background: #6f4e37;
              color: #ffffff;
              border: none;
              border-radius: 16px;
              font-family: inherit;
              font-size: 22px;
              font-weight: 900;
              cursor: pointer;
              -webkit-tap-highlight-color: transparent;
              :active {
                transform: scale(0.98);
              }
            `,
            shakeWhen(rejectedChoiceId, pay.id),
            idlePulse(idleHintActive, pay.id === correctId),
          ]}
        >
          💳 결제하기
        </button>
      </div>
    </div>
  );
}
