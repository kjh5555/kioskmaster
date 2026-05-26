import { css, keyframes } from "@emotion/react";
import { useState } from "react";

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

const COMBO_DETAILS: Record<
  string,
  { name: string; price: number; imageUrl: string }
> = {
  "7111691": {
    name: "와퍼 라지세트",
    price: 9800,
    imageUrl:
      "https://mob-prd.burgerking.co.kr/images/menu/web/main/2025/01/06/c8784db1-69ae-4a4a-b655-aebd88ef98f4.png",
  },
  "7111052": {
    name: "와퍼 세트",
    price: 9100,
    imageUrl:
      "https://mob-prd.burgerking.co.kr/images/menu/web/main/2025/01/06/ff0da2b6-ec36-4f37-ad92-c39eeb0eeec3.png",
  },
  "1080013": {
    name: "와퍼",
    price: 7100,
    imageUrl:
      "https://mob-prd.burgerking.co.kr/images/menu/web/main/2025/01/06/c9811022-3678-4988-9fa4-1d3fc6a69bf5.png",
  },
};

const STEPS = ["주문 확인", "STEP 2", "STEP 3", "STEP 4"];

export function BurgerKingOrderConfirm({
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
  else if (upsellStep?.correctChoiceId === "cancel-keep-single") comboId = "1080013";
  const detail = COMBO_DETAILS[comboId] ?? COMBO_DETAILS["7111691"];

  const [qty, setQty] = useState(1);
  const orderAmount = detail.price * qty;
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
      {/* ── Step indicator ── */}
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-bottom: 1px solid #e5e8eb;
          padding: 0 4px;
        `}
      >
        {STEPS.map((label, idx) => {
          const isActive = idx === 0;
          return (
            <div
              key={label}
              css={css`
                padding: 12px 6px 10px;
                display: flex;
                flex-direction: column;
                gap: 4px;
                align-items: ${idx === 0 ? "flex-start" : "center"};
                border-bottom: 2px solid
                  ${isActive ? "#d62300" : "transparent"};
                font-size: 12px;
                color: ${isActive ? "#2a1408" : "#8b95a1"};
                font-weight: ${isActive ? 800 : 600};
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
                `}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Order item row ── */}
      <div
        css={css`
          padding: 16px;
          background: #f3f4f5;
          margin: 14px 14px 0;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        `}
      >
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 80px;
            align-items: center;
            gap: 10px;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 6px;
            `}
          >
            <span
              css={css`
                font-size: 15px;
                font-weight: 700;
                color: #2a1408;
              `}
            >
              {detail.name}
            </span>
            <span
              css={css`
                font-size: 18px;
                font-weight: 800;
                color: #d62300;
              `}
            >
              {fmt(detail.price)}
            </span>
          </div>
          <img
            src={detail.imageUrl}
            alt={detail.name}
            style={{ width: 80, height: 60, objectFit: "contain" }}
          />
        </div>

        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <span
            css={css`
              font-size: 13px;
              color: #4e5968;
            `}
          >
            수량
          </span>
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 8px;
            `}
          >
            <button
              type="button"
              aria-label="수량 줄이기"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              css={qtyButton}
            >
              −
            </button>
            <span
              css={css`
                font-size: 15px;
                font-weight: 800;
                min-width: 16px;
                text-align: center;
              `}
            >
              {qty}
            </span>
            <button
              type="button"
              aria-label="수량 늘리기"
              onClick={() => setQty((q) => q + 1)}
              css={qtyButton}
            >
              +
            </button>
          </div>
        </div>

        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 12px;
            border-top: 1px solid #d1d6db;
          `}
        >
          <span
            css={css`
              font-size: 13px;
              color: #4e5968;
            `}
          >
            합계금액
          </span>
          <span
            css={css`
              font-size: 18px;
              font-weight: 800;
              color: #d62300;
            `}
          >
            {fmt(orderAmount)}
          </span>
        </div>
      </div>

      {/* Spacer */}
      <div
        css={css`
          flex: 1;
        `}
      />

      {/* ── Totals ── */}
      <div
        css={css`
          padding: 12px 18px 8px;
          background: #ffffff;
          border-top: 1px solid #e5e8eb;
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

      {/* ── Action row ── */}
      <div
        css={css`
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr);
          gap: 12px;
          padding: 8px 14px 14px;
          background: #ffffff;
        `}
      >
        <button
          type="button"
          onClick={() => onChoice("cancel-order")}
          css={[
            css`
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
            shakeWhen(rejectedChoiceId, "cancel-order"),
          ]}
        >
          취소
        </button>
        <button
          type="button"
          onClick={() => onChoice("pay")}
          css={[
            css`
              height: 56px;
              background: #d62300;
              color: #ffffff;
              border: none;
              border-radius: 999px;
              font-size: 18px;
              font-weight: 800;
              cursor: pointer;
              &:active {
                background: #a91a00;
              }
            `,
            shakeWhen(rejectedChoiceId, "pay"),
            idlePulse(idleHintActive, step.correctChoiceId === "pay"),
          ]}
        >
          결제
        </button>
      </div>
    </div>
  );
}

const qtyButton = css`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #ffffff;
  border: 1.5px solid #d1d6db;
  color: #2a1408;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &:active {
    background: #f0f0f0;
  }
`;

const totalRow = css`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #4e5968;
`;
