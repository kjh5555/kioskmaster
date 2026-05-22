import { css, keyframes } from "@emotion/react";
import { useState } from "react";

import { lookupCorrectLabel, type CustomLayoutProps } from "./types";

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

export function McdonaldsOrderConfirmSingle({
  scenario,
  rejectedChoiceId,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const burgerLabel = lookupCorrectLabel(scenario, "category") ?? "버거";
  const [qty, setQty] = useState(1);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        min-height: 100%;
        width: 100%;
        background: #ffffff;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
      `}
    >
      {/* ── A. Burger image area ── */}
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px 0 12px;
        `}
      >
        <span style={{ fontSize: 96, lineHeight: 1 }}>🍔</span>
      </div>

      {/* ── B. Title + price ── */}
      <div
        css={css`
          padding: 0 20px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        `}
      >
        <span
          css={css`
            font-size: 20px;
            font-weight: 700;
            color: #191f28;
            text-align: center;
            line-height: 1.3;
          `}
        >
          {burgerLabel}
        </span>
        <span
          css={css`
            font-size: 18px;
            font-weight: 700;
            color: #191f28;
          `}
        >
          ₩5,500 &nbsp;525 Kcal
        </span>
      </div>

      {/* ── C. Action rows ── */}
      <div
        css={css`
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        `}
      >
        {/* 영양정보 */}
        <button
          css={[
            css`
              width: 100%;
              height: 44px;
              background: #ffffff;
              border: 1px solid #d1d6db;
              border-radius: 10px;
              font-size: 14px;
              color: #4e5968;
              cursor: pointer;
              &:active {
                background: #f5f5f5;
              }
            `,
            shakeWhen(rejectedChoiceId, "nutrition"),
          ]}
          onClick={() => onChoice("nutrition")}
        >
          영양정보
        </button>

        {/* 재료추가/변경 */}
        <button
          css={[
            css`
              width: 100%;
              height: 44px;
              background: #ffffff;
              border: 1px solid #d1d6db;
              border-radius: 10px;
              font-size: 14px;
              color: #4e5968;
              cursor: pointer;
              &:active {
                background: #f5f5f5;
              }
            `,
            shakeWhen(rejectedChoiceId, "edit-burger"),
          ]}
          onClick={() => onChoice("edit-burger")}
        >
          재료추가/변경
        </button>

        {/* Quantity selector */}
        <div
          css={css`
            display: grid;
            grid-template-columns: 44px 1fr 44px;
            border: 1px solid #d1d6db;
            border-radius: 10px;
            height: 44px;
            overflow: hidden;
          `}
        >
          <button
            css={css`
              background: #ffffff;
              border: none;
              font-size: 18px;
              color: #4e5968;
              cursor: pointer;
              &:active {
                background: #f5f5f5;
              }
            `}
            onClick={() => {
              setQty((q) => Math.max(1, q - 1));
            }}
          >
            −
          </button>
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              font-weight: 600;
              color: #191f28;
              border-left: 1px solid #d1d6db;
              border-right: 1px solid #d1d6db;
            `}
          >
            {qty}
          </div>
          <button
            css={css`
              background: #ffffff;
              border: none;
              font-size: 18px;
              color: #4e5968;
              cursor: pointer;
              &:active {
                background: #f5f5f5;
              }
            `}
            onClick={() => {
              setQty((q) => q + 1);
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* ── D. Bottom 취소 + 장바구니에 담기 ── */}
      <div
        css={css`
          margin-top: auto;
          padding: 16px 20px 16px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr);
          gap: 10px;
        `}
      >
        <button
          css={[
            css`
              height: 52px;
              background: #ffffff;
              border: 1px solid #d1d6db;
              border-radius: 10px;
              font-size: 16px;
              font-weight: 600;
              color: #4e5968;
              cursor: pointer;
              &:active {
                background: #f5f5f5;
              }
            `,
            shakeWhen(rejectedChoiceId, "cancel"),
          ]}
          onClick={() => onChoice("cancel")}
        >
          취소
        </button>
        <button
          css={[
            css`
              height: 52px;
              background: #ffc72c;
              border: none;
              border-radius: 10px;
              font-size: 16px;
              font-weight: 700;
              color: #191f28;
              cursor: pointer;
              &:active {
                background: #e6b000;
              }
            `,
            shakeWhen(rejectedChoiceId, "add-to-cart"),
          ]}
          onClick={() => onChoice("add-to-cart")}
        >
          장바구니에 담기
        </button>
      </div>
    </div>
  );
}
