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

export function BurgerKingReceiptPopup({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  return (
    <div
      css={css`
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.35);
        padding: 16px;
        min-height: calc(100dvh - 80px);
      `}
    >
      <div
        css={css`
          background: #ffffff;
          border-radius: 14px;
          width: 100%;
          max-width: 420px;
          padding: 28px 22px 22px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
          align-items: center;
        `}
      >
        <div
          css={css`
            text-align: center;
            font-size: 17px;
            font-weight: 700;
            color: #2a1408;
            line-height: 1.5;
          `}
        >
          출력할 영수증 또는
          <br />
          주문번호표를 선택해주세요.
        </div>

        <div
          css={css`
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 12px;
            width: 100%;
          `}
        >
          <button
            type="button"
            onClick={() => onChoice("receipt")}
            css={[
              css`
                height: 54px;
                background: #4a2412;
                color: #ffffff;
                border: none;
                border-radius: 999px;
                font-size: 16px;
                font-weight: 800;
                cursor: pointer;
                &:active {
                  background: #2a1408;
                }
              `,
              shakeWhen(rejectedChoiceId, "receipt"),
              idlePulse(idleHintActive, step.correctChoiceId === "receipt"),
            ]}
          >
            영수증 출력
          </button>
          <button
            type="button"
            onClick={() => onChoice("order-number")}
            css={[
              css`
                height: 54px;
                background: #d62300;
                color: #ffffff;
                border: none;
                border-radius: 999px;
                font-size: 16px;
                font-weight: 800;
                cursor: pointer;
                &:active {
                  background: #a91a00;
                }
              `,
              shakeWhen(rejectedChoiceId, "order-number"),
              idlePulse(
                idleHintActive,
                step.correctChoiceId === "order-number",
              ),
            ]}
          >
            주문번호표만 출력
          </button>
        </div>
      </div>
    </div>
  );
}
