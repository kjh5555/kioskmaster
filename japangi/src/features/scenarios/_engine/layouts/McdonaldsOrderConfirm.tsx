import { css, keyframes } from "@emotion/react";

import {
  idlePulse,
  lookupCorrectLabel,
  type CustomLayoutProps,
} from "./types";

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

export function McdonaldsOrderConfirm({
  step,
  scenario,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const burgerLabel = lookupCorrectLabel(scenario, "category") ?? "버거";
  const sizeLabel = lookupCorrectLabel(scenario, "set-size") ?? "세트";
  const sideLabel = lookupCorrectLabel(scenario, "side-select") ?? "사이드";
  const drinkLabel = lookupCorrectLabel(scenario, "drink-select") ?? "음료";

  const ITEMS = [
    { emoji: "🍔", name: burgerLabel, kcal: "" },
    { emoji: "🍟", name: sideLabel, kcal: "" },
    { emoji: "🥤", name: drinkLabel, kcal: "" },
  ];
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
      {/* ── A. Top header ── */}
      <div
        css={css`
          padding: 16px 16px 10px;
        `}
      >
        {/* Logo + 영양정보 row */}
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
          `}
        >
          <span
            css={css`
              font-size: 28px;
              font-weight: 900;
              color: #ffc72c;
              line-height: 1;
            `}
          >
            M
          </span>
          <button
            css={[
              css`
                background: #ffffff;
                border: 1px solid #d1d6db;
                border-radius: 999px;
                font-size: 10px;
                color: #4e5968;
                padding: 4px 12px;
                cursor: pointer;
                white-space: nowrap;
              `,
              shakeWhen(rejectedChoiceId, "nutrition"),
            ]}
            onClick={() => onChoice("nutrition")}
          >
            영양정보
          </button>
        </div>

        {/* Title */}
        <div
          css={css`
            font-size: 26px;
            font-weight: 700;
            color: #191f28;
            line-height: 1.25;
            margin-bottom: 4px;
          `}
        >
          {burgerLabel} - {sizeLabel}
        </div>

        {/* Price + kcal */}
        <div
          css={css`
            font-size: 20px;
            font-weight: 700;
            color: #191f28;
          `}
        >
          ₩7,600&nbsp;&nbsp;1,280 Kcal
        </div>
      </div>

      {/* ── B. Product hero illustration ── */}
      <div
        css={css`
          position: relative;
          height: 120px;
          margin: 4px 0;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        {/* Fries — top-left */}
        <span
          css={css`
            position: absolute;
            font-size: 96px;
            line-height: 1;
            left: calc(50% - 80px);
            top: 0;
          `}
        >
          🍟
        </span>
        {/* Drink — top-right */}
        <span
          css={css`
            position: absolute;
            font-size: 96px;
            line-height: 1;
            left: calc(50% + 0px);
            top: 0;
          `}
        >
          🥤
        </span>
        {/* Burger — center-bottom overlap */}
        <span
          css={css`
            position: absolute;
            font-size: 120px;
            line-height: 1;
            left: calc(50% - 60px);
            bottom: -10px;
          `}
        >
          🍔
        </span>
      </div>

      {/* ── C. Item breakdown row ── */}
      <div
        css={css`
          display: flex;
          gap: 10px;
          padding: 8px 16px 4px;
          margin-top: 16px;
        `}
      >
        {ITEMS.map((item) => (
          <div
            key={item.name}
            css={css`
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 2px;
              background: #f9f9f9;
              border-radius: 8px;
              padding: 8px 4px;
            `}
          >
            <span
              css={css`
                font-size: 32px;
                line-height: 1;
              `}
            >
              {item.emoji}
            </span>
            <span
              css={css`
                font-size: 11px;
                font-weight: 700;
                color: #191f28;
                text-align: center;
                line-height: 1.3;
              `}
            >
              {item.name}
            </span>
            <span
              css={css`
                font-size: 10px;
                color: #8b95a1;
              `}
            >
              {item.kcal}
            </span>
          </div>
        ))}
      </div>

      {/* ── D. Edit buttons row ── */}
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 8px;
          padding: 8px 16px 4px;
        `}
      >
        {/* Column 1: Burger — single button */}
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 4px;
          `}
        >
          <button
            css={[
              css`
                height: 32px;
                background: #ffffff;
                border: 1px solid #d1d6db;
                border-radius: 8px;
                font-size: 11px;
                color: #191f28;
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
        </div>

        {/* Column 2: Fries */}
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 4px;
          `}
        >
          <button
            css={[
              css`
                height: 32px;
                background: #ffffff;
                border: 1px solid #d1d6db;
                border-radius: 8px;
                font-size: 11px;
                color: #191f28;
                cursor: pointer;
                &:active {
                  background: #f5f5f5;
                }
              `,
              shakeWhen(rejectedChoiceId, "edit-fries-ingredient"),
            ]}
            onClick={() => onChoice("edit-fries-ingredient")}
          >
            재료추가/변경
          </button>
          <button
            css={[
              css`
                height: 32px;
                background: #ffffff;
                border: 1px solid #d1d6db;
                border-radius: 8px;
                font-size: 11px;
                color: #191f28;
                cursor: pointer;
                &:active {
                  background: #f5f5f5;
                }
              `,
              shakeWhen(rejectedChoiceId, "edit-fries"),
            ]}
            onClick={() => onChoice("edit-fries")}
          >
            수정
          </button>
        </div>

        {/* Column 3: Drink */}
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 4px;
          `}
        >
          <button
            css={[
              css`
                height: 32px;
                background: #ffffff;
                border: 1px solid #d1d6db;
                border-radius: 8px;
                font-size: 11px;
                color: #191f28;
                cursor: pointer;
                &:active {
                  background: #f5f5f5;
                }
              `,
              shakeWhen(rejectedChoiceId, "edit-drink-ingredient"),
            ]}
            onClick={() => onChoice("edit-drink-ingredient")}
          >
            재료추가/변경
          </button>
          <button
            css={[
              css`
                height: 32px;
                background: #ffffff;
                border: 1px solid #d1d6db;
                border-radius: 8px;
                font-size: 11px;
                color: #191f28;
                cursor: pointer;
                &:active {
                  background: #f5f5f5;
                }
              `,
              shakeWhen(rejectedChoiceId, "edit-drink"),
            ]}
            onClick={() => onChoice("edit-drink")}
          >
            수정
          </button>
        </div>
      </div>

      {/* ── E. Quantity selector ── */}
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          padding: 8px 16px 4px;
        `}
      >
        <button
          css={[
            css`
              width: 44px;
              height: 44px;
              background: #ffffff;
              border: 1px solid #d1d6db;
              border-radius: 8px;
              font-size: 18px;
              color: #191f28;
              cursor: pointer;
              flex-shrink: 0;
              &:active {
                background: #f5f5f5;
              }
            `,
            shakeWhen(rejectedChoiceId, "qty-minus"),
          ]}
          onClick={() => onChoice("qty-minus")}
        >
          −
        </button>
        <div
          css={css`
            flex: 1;
            height: 44px;
            border-top: 1px solid #d1d6db;
            border-bottom: 1px solid #d1d6db;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            color: #191f28;
            background: #ffffff;
            margin: 0 -1px;
          `}
        >
          1
        </div>
        <button
          css={[
            css`
              width: 44px;
              height: 44px;
              background: #ffffff;
              border: 1px solid #d1d6db;
              border-radius: 8px;
              font-size: 18px;
              color: #191f28;
              cursor: pointer;
              flex-shrink: 0;
              &:active {
                background: #f5f5f5;
              }
            `,
            shakeWhen(rejectedChoiceId, "qty-plus"),
          ]}
          onClick={() => onChoice("qty-plus")}
        >
          +
        </button>
      </div>

      {/* ── F. Primary action row ── */}
      <div
        css={css`
          display: flex;
          gap: 10px;
          padding: 8px 16px 4px;
        `}
      >
        <button
          css={[
            css`
              flex: 1;
              height: 52px;
              background: #ffffff;
              border: 1px solid #d1d6db;
              border-radius: 10px;
              font-size: 16px;
              color: #191f28;
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
              flex: 2;
              height: 52px;
              background: #ffc72c;
              border: none;
              border-radius: 10px;
              font-size: 18px;
              font-weight: 700;
              color: #191f28;
              cursor: pointer;
              &:active {
                background: #e6b025;
              }
            `,
            shakeWhen(rejectedChoiceId, "add-to-cart"),
            idlePulse(idleHintActive, step.correctChoiceId === "add-to-cart"),
          ]}
          onClick={() => onChoice("add-to-cart")}
        >
          장바구니 추가
        </button>
      </div>

      {/* ── G. Bottom strip ── */}
      <div
        css={css`
          padding: 4px 16px 0;
          margin-top: auto;
        `}
      >
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          `}
        >
          <button
            css={[
              css`
                height: 40px;
                background: #ffffff;
                border: 1px solid #d1d6db;
                border-radius: 10px;
                font-size: 13px;
                color: #4e5968;
                cursor: pointer;
                &:active {
                  background: #f5f5f5;
                }
              `,
              shakeWhen(rejectedChoiceId, "home"),
            ]}
            onClick={() => onChoice("home")}
          >
            ↺ 처음으로
          </button>
          <button
            css={[
              css`
                height: 40px;
                background: #ffffff;
                border: 1px solid #d1d6db;
                border-radius: 10px;
                font-size: 13px;
                color: #4e5968;
                cursor: pointer;
                &:active {
                  background: #f5f5f5;
                }
              `,
              shakeWhen(rejectedChoiceId, "help"),
            ]}
            onClick={() => onChoice("help")}
          >
            ♿ 도움 기능
          </button>
        </div>
        <p
          css={css`
            margin: 8px 0 12px;
            font-size: 9px;
            color: #b0b8c1;
            text-align: center;
            line-height: 1.4;
          `}
        >
          일일 영양 권장량은 보통 2,000 칼로리이지만 필요한 칼로리는 다를 수
          있습니다.
        </p>
      </div>
    </div>
  );
}
