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

const COMBO_PRICE: Record<string, number> = {
  "7111691": 9800,
  "7111052": 9100,
  "1080013": 7100,
};

const STEPS = ["주문 확인", "결제수단 선택", "STEP 3", "STEP 4"];

export function BurgerKingPayMethod({
  step,
  scenario,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const comboStep = scenario.steps.find((s) => s.id === "combo-select");
  const upsellStep = scenario.steps.find((s) => s.id === "upsell-popup");
  let comboId = comboStep?.correctChoiceId ?? "7111691";
  if (upsellStep?.correctChoiceId === "upgrade-to-set") comboId = "7111052";
  else if (upsellStep?.correctChoiceId === "cancel-keep-single")
    comboId = "1080013";
  const orderAmount = COMBO_PRICE[comboId] ?? 9800;
  const fmt = (n: number) => `${n.toLocaleString("ko-KR")}원`;

  return (
    <div
      css={css`
        flex: 1;
        display: flex;
        flex-direction: column;
        background: #ffffff;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
        min-height: 100%;
      `}
    >
      {/* Step indicator */}
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-bottom: 1px solid #e5e8eb;
          padding: 0 4px;
        `}
      >
        {STEPS.map((label, idx) => {
          const isActive = idx === 1;
          return (
            <div
              key={label}
              css={css`
                padding: 12px 6px 10px;
                display: flex;
                flex-direction: column;
                gap: 4px;
                align-items: ${isActive ? "flex-start" : "center"};
                border-bottom: 2px solid
                  ${isActive ? "#d62300" : "transparent"};
              `}
            >
              <span
                css={css`
                  font-size: 11px;
                  font-weight: 700;
                  color: ${isActive ? "#2a1408" : "#8b95a1"};
                  letter-spacing: 0.04em;
                `}
              >
                STEP 0{idx + 1}
              </span>
              <span
                css={css`
                  font-size: 14px;
                  font-weight: ${isActive ? 800 : 600};
                  color: ${isActive ? "#2a1408" : "#8b95a1"};
                `}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Title */}
      <div
        css={css`
          text-align: center;
          padding: 28px 16px 18px;
          font-weight: 800;
          line-height: 1.4;
        `}
      >
        <span
          css={css`
            display: block;
            font-size: 22px;
            color: #d62300;
          `}
        >
          결제수단을
        </span>
        <span
          css={css`
            display: block;
            font-size: 22px;
            color: #2a1408;
          `}
        >
          선택해 주세요
        </span>
      </div>

      {/* Payment method cards */}
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          padding: 0 16px;
        `}
      >
        <button
          type="button"
          onClick={() => onChoice("credit-card")}
          css={[
            payCardBase,
            shakeWhen(rejectedChoiceId, "credit-card"),
            idlePulse(idleHintActive, step.correctChoiceId === "credit-card"),
          ]}
        >
          <svg width="74" height="48" viewBox="0 0 74 48" aria-hidden="true">
            <rect width="74" height="48" rx="6" fill="#2a1408" />
            <rect x="0" y="10" width="74" height="8" fill="#3a1408" />
            <rect x="8" y="30" width="22" height="8" rx="1.5" fill="#7a3a1f" />
          </svg>
          <span css={payLabel}>신용카드</span>
        </button>

        <button
          type="button"
          onClick={() => onChoice("payco")}
          css={[
            payCardBase,
            shakeWhen(rejectedChoiceId, "payco"),
            idlePulse(idleHintActive, step.correctChoiceId === "payco"),
          ]}
        >
          <div
            css={css`
              height: 48px;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0 12px;
            `}
          >
            <span
              css={css`
                font-size: 22px;
                font-weight: 900;
                color: #d62300;
                letter-spacing: 0.02em;
                font-family: "Trebuchet MS", system-ui, sans-serif;
                font-style: italic;
              `}
            >
              PAYCO
            </span>
          </div>
          <span css={payLabel}>페이코</span>
        </button>

        <button
          type="button"
          onClick={() => onChoice("meal-ticket")}
          css={[
            payCardBase,
            shakeWhen(rejectedChoiceId, "meal-ticket"),
            idlePulse(idleHintActive, step.correctChoiceId === "meal-ticket"),
          ]}
        >
          <svg width="74" height="48" viewBox="0 0 74 48" aria-hidden="true">
            <rect x="2" y="6" width="70" height="36" rx="4" fill="#ffffff" stroke="#3a8e3e" strokeWidth="2" />
            <text x="37" y="24" textAnchor="middle" fontSize="9" fontWeight="800" fill="#3a8e3e">식권대장</text>
            <line x1="10" y1="32" x2="64" y2="32" stroke="#3a8e3e" strokeWidth="1.5" />
          </svg>
          <span css={payLabel}>식권대장</span>
        </button>

        <div />
      </div>

      <div css={css`flex: 1;`} />

      {/* Totals */}
      <div
        css={css`
          padding: 12px 18px 8px;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          gap: 4px;
        `}
      >
        <div css={totalRow}>
          <span>주문 금액</span>
          <span>{fmt(orderAmount)}</span>
        </div>
        <div css={totalRow}>
          <span>할인 금액</span>
          <span>0원</span>
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            padding-top: 6px;
            border-top: 1px solid #e5e8eb;
            margin-top: 4px;
          `}
        >
          <span
            css={css`
              font-size: 18px;
              font-weight: 800;
              color: #2a1408;
            `}
          >
            총 결제금액
          </span>
          <span
            css={css`
              font-size: 22px;
              font-weight: 900;
              color: #d62300;
            `}
          >
            {fmt(orderAmount)}
          </span>
        </div>
      </div>

      {/* Cancel button */}
      <div
        css={css`
          padding: 8px 14px 14px;
        `}
      >
        <button
          type="button"
          onClick={() => onChoice("cancel-pay")}
          css={[
            css`
              width: 100%;
              height: 56px;
              background: #4a2412;
              color: #ffffff;
              border: none;
              border-radius: 999px;
              font-size: 18px;
              font-weight: 800;
              cursor: pointer;
              &:active {
                background: #2a1408;
              }
            `,
            shakeWhen(rejectedChoiceId, "cancel-pay"),
          ]}
        >
          결제취소
        </button>
      </div>
    </div>
  );
}

const payCardBase = css`
  background: #ffffff;
  border: 1.5px solid #e5e8eb;
  border-radius: 12px;
  padding: 22px 8px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-family: inherit;
  min-height: 130px;
  &:active {
    background: #f5f5f5;
  }
`;

const payLabel = css`
  font-size: 16px;
  font-weight: 800;
  color: #2a1408;
`;

const totalRow = css`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #4e5968;
`;
