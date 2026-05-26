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

// Real product photos from BK Korea's CDN, keyed by the BK menuCd that the
// combo-select step's correctChoiceId would have picked.
const COMBO_DETAILS: Record<
  string,
  { name: string; price: string; imageUrl: string }
> = {
  "7111691": {
    name: "와퍼 라지세트",
    price: "9,800원",
    imageUrl:
      "https://mob-prd.burgerking.co.kr/images/menu/web/main/2025/01/06/c8784db1-69ae-4a4a-b655-aebd88ef98f4.png",
  },
  "7111052": {
    name: "와퍼 세트",
    price: "9,100원",
    imageUrl:
      "https://mob-prd.burgerking.co.kr/images/menu/web/main/2025/01/06/ff0da2b6-ec36-4f37-ad92-c39eeb0eeec3.png",
  },
  "1080013": {
    name: "와퍼",
    price: "7,100원",
    imageUrl:
      "https://mob-prd.burgerking.co.kr/images/menu/web/main/2025/01/06/c9811022-3678-4988-9fa4-1d3fc6a69bf5.png",
  },
};

export function BurgerKingCartAdd({
  step,
  scenario,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  // Look up which combo the user committed to in the previous combo-select
  // step (or, if they detoured through the upsell, what they ended up with).
  const comboStep = scenario.steps.find((s) => s.id === "combo-select");
  const upsellStep = scenario.steps.find((s) => s.id === "upsell-popup");
  // Default to the scenario goal — combo-select's correctChoiceId.
  let selectedComboId = comboStep?.correctChoiceId ?? "7111691";
  // If the practice goal flows through the upsell path with cancel-keep-single,
  // selectedComboId would stay 1080013. Otherwise upgrade-to-set turns it into
  // 7111052. The cart-add step's own correctChoiceId picks which.
  if (upsellStep?.correctChoiceId === "cancel-keep-single") {
    selectedComboId = "1080013";
  } else if (upsellStep?.correctChoiceId === "upgrade-to-set") {
    selectedComboId = "7111052";
  }
  const detail = COMBO_DETAILS[selectedComboId] ?? COMBO_DETAILS["7111691"];

  const [qty, setQty] = useState(1);
  const totalPrice = (() => {
    const num = Number.parseInt(detail.price.replace(/[^0-9]/g, ""), 10);
    if (Number.isNaN(num)) return detail.price;
    return `${(num * qty).toLocaleString("ko-KR")}원`;
  })();

  return (
    <div
      css={css`
        flex: 1;
        background: #ffffff;
        padding: 18px 18px 8px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
      `}
    >
      {/* ── ① 선택한 메뉴 row ── */}
      <div
        css={css`
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 8px;
          `}
        >
          <span css={badgeCircle}>1</span>
          <span css={sectionLabel}>선택한 메뉴</span>
        </div>
        <span
          css={css`
            font-size: 15px;
            font-weight: 700;
            color: #2a1408;
          `}
        >
          {detail.name} {detail.price}
        </span>
      </div>

      {/* Image + name + 재료변경 */}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        `}
      >
        <img
          src={detail.imageUrl}
          alt={detail.name}
          style={{ width: 140, height: 110, objectFit: "contain" }}
        />
        <span
          css={css`
            font-size: 18px;
            font-weight: 700;
            color: #2a1408;
            margin-top: 4px;
          `}
        >
          {detail.name}
        </span>
        <button
          type="button"
          onClick={() => onChoice("edit-ingredients")}
          css={[
            css`
              margin-top: 4px;
              background: #6a3017;
              color: #ffffff;
              border: none;
              border-radius: 999px;
              padding: 8px 18px;
              font-size: 13px;
              font-weight: 700;
              cursor: pointer;
              &:active {
                background: #4a2412;
              }
            `,
            shakeWhen(rejectedChoiceId, "edit-ingredients"),
          ]}
        >
          재료변경
        </button>
      </div>

      {/* ── ② 주문금액 + 수량선택 row ── */}
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid #e5e8eb;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 8px;
          `}
        >
          <span css={badgeCircle}>2</span>
          <span css={sectionLabel}>주문금액</span>
          <span
            css={css`
              font-size: 18px;
              font-weight: 800;
              color: #d62300;
              margin-left: 4px;
            `}
          >
            {totalPrice}
          </span>
        </div>

        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 8px;
          `}
        >
          <span
            css={css`
              font-size: 12px;
              color: #8b95a1;
            `}
          >
            수량선택
          </span>
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
              font-size: 16px;
              font-weight: 800;
              min-width: 18px;
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

      {/* 카트담기 button — full width brown pill */}
      <button
        type="button"
        onClick={() => onChoice("add-to-cart")}
        css={[
          css`
            width: 100%;
            height: 60px;
            background: #6a3017;
            color: #ffffff;
            border: none;
            border-radius: 999px;
            font-size: 18px;
            font-weight: 800;
            cursor: pointer;
            &:active {
              background: #4a2412;
            }
          `,
          shakeWhen(rejectedChoiceId, "add-to-cart"),
          idlePulse(idleHintActive, step.correctChoiceId === "add-to-cart"),
        ]}
      >
        카트담기
      </button>

      {/* Bottom 총 주문금액 0원 */}
      <div
        css={css`
          margin-top: auto;
          padding-top: 8px;
          border-top: 1px solid #e5e8eb;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 8px;
        `}
      >
        <span
          css={css`
            font-size: 13px;
            color: #8b95a1;
          `}
        >
          총 주문금액
        </span>
        <span
          css={css`
            font-size: 16px;
            font-weight: 800;
            color: #2a1408;
          `}
        >
          0원
        </span>
      </div>
    </div>
  );
}

const badgeCircle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #d62300;
  color: #ffffff;
  font-size: 12px;
  font-weight: 800;
`;

const sectionLabel = css`
  font-size: 15px;
  font-weight: 700;
  color: #2a1408;
`;

const qtyButton = css`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ffffff;
  border: 1.5px solid #d1d6db;
  color: #2a1408;
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &:active {
    background: #f0f0f0;
  }
`;
