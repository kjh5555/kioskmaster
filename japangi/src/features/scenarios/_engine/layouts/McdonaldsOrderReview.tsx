import { css, keyframes } from "@emotion/react";

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

export function McdonaldsOrderReview({
  scenario,
  rejectedChoiceId,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const burgerLabel = lookupCorrectLabel(scenario, "category") ?? "버거";
  const sizeLabel = lookupCorrectLabel(scenario, "set-size") ?? "세트";
  const sideLabel = lookupCorrectLabel(scenario, "side-select") ?? "사이드";
  const drinkLabel = lookupCorrectLabel(scenario, "drink-select") ?? "음료";
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
      {/* A. Top header */}
      <div
        css={css`
          padding: 16px 20px;
          flex-shrink: 0;
        `}
      >
        <span
          css={css`
            font-size: 22px;
            font-weight: 700;
            color: #191f28;
            line-height: 1;
          `}
        >
          🛍️ 주문
        </span>
      </div>

      {/* B. Order item row */}
      <div
        css={css`
          padding: 0 20px;
          flex-shrink: 0;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 8px;
          `}
        >
          {/* 취소 button */}
          <button
            css={[
              css`
                width: 36px;
                height: 28px;
                background: #ffffff;
                border: 1px solid #d1d6db;
                border-radius: 6px;
                font-size: 11px;
                color: #4e5968;
                cursor: pointer;
                flex-shrink: 0;
                &:active {
                  background: #f5f5f5;
                }
              `,
              shakeWhen(rejectedChoiceId, "cancel-item"),
            ]}
            onClick={() => onChoice("cancel-item")}
          >
            취소
          </button>

          {/* Burger thumbnail */}
          <span
            css={css`
              font-size: 48px;
              line-height: 1;
              flex-shrink: 0;
              padding: 4px;
            `}
          >
            🍔
          </span>

          {/* Middle text block */}
          <div
            css={css`
              flex: 1;
              display: flex;
              flex-direction: column;
              gap: 2px;
              min-width: 0;
            `}
          >
            <span
              css={css`
                font-size: 13px;
                font-weight: 700;
                color: #191f28;
                line-height: 1.3;
              `}
            >
              {burgerLabel} - {sizeLabel}
            </span>
            <span
              css={css`
                font-size: 11px;
                color: #8b95a1;
              `}
            >
              674 Kcal
            </span>
            <span
              css={css`
                font-size: 10px;
                color: #8b95a1;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              `}
            >
              {sideLabel}, {drinkLabel}
            </span>
            <button
              css={[
                css`
                  align-self: flex-start;
                  background: #ffffff;
                  border: 1px solid #d1d6db;
                  border-radius: 999px;
                  font-size: 11px;
                  color: #4e5968;
                  padding: 2px 8px;
                  cursor: pointer;
                  margin-top: 2px;
                  &:active {
                    background: #f5f5f5;
                  }
                `,
                shakeWhen(rejectedChoiceId, "nutrition"),
              ]}
              onClick={() => onChoice("nutrition")}
            >
              예약정보 표시
            </button>
          </div>

          {/* Quantity selector */}
          <div
            css={css`
              display: flex;
              align-items: center;
              flex-shrink: 0;
            `}
          >
            <button
              css={[
                css`
                  width: 28px;
                  height: 28px;
                  background: #ffffff;
                  border: 1px solid #d1d6db;
                  border-radius: 6px 0 0 6px;
                  font-size: 14px;
                  color: #191f28;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  justify-content: center;
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
                width: 30px;
                height: 28px;
                border-top: 1px solid #d1d6db;
                border-bottom: 1px solid #d1d6db;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 13px;
                color: #191f28;
                background: #ffffff;
              `}
            >
              1
            </div>
            <button
              css={[
                css`
                  width: 28px;
                  height: 28px;
                  background: #ffffff;
                  border: 1px solid #d1d6db;
                  border-radius: 0 6px 6px 0;
                  font-size: 14px;
                  color: #191f28;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  justify-content: center;
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

          {/* Price */}
          <span
            css={css`
              font-size: 13px;
              font-weight: 700;
              color: #191f28;
              flex-shrink: 0;
              margin-left: 4px;
            `}
          >
            ₩7,800
          </span>
        </div>
      </div>

      {/* C. Middle spacer */}
      <div
        css={css`
          flex: 1;
        `}
      />

      {/* D. Totals row */}
      <div
        css={css`
          padding: 20px 20px 16px;
          flex-shrink: 0;
          display: flex;
          align-items: baseline;
          justify-content: flex-end;
          gap: 12px;
          border-top: 1px solid #e5e8eb;
        `}
      >
        <span
          css={css`
            font-size: 12px;
            color: #8b95a1;
          `}
        >
          1개
        </span>
        <span
          css={css`
            font-size: 20px;
            font-weight: 700;
            color: #191f28;
          `}
        >
          합계 ₩7,800
        </span>
      </div>

      {/* E. Action buttons row */}
      <div
        css={css`
          display: flex;
          gap: 12px;
          padding: 8px 20px 0;
          flex-shrink: 0;
        `}
      >
        <button
          css={[
            css`
              flex: 1;
              height: 60px;
              background: #ffffff;
              border: 1.5px solid #d1d6db;
              border-radius: 10px;
              font-size: 16px;
              color: #191f28;
              cursor: pointer;
              &:active {
                background: #f5f5f5;
              }
            `,
            shakeWhen(rejectedChoiceId, "add-more"),
          ]}
          onClick={() => onChoice("add-more")}
        >
          추가 주문
        </button>
        <button
          css={[
            css`
              flex: 2;
              height: 60px;
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
            shakeWhen(rejectedChoiceId, "order-complete"),
          ]}
          onClick={() => onChoice("order-complete")}
        >
          주문 완료
        </button>
      </div>

      {/* F. Bottom strip */}
      <div
        css={css`
          padding: 28px 20px 28px;
          flex-shrink: 0;
        `}
      >
        <div
          css={css`
            display: flex;
            gap: 8px;
            align-items: center;
          `}
        >
          <button
            css={[
              css`
                height: 40px;
                flex: 1;
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
                flex: 1;
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
          <button
            css={[
              css`
                height: 40px;
                flex: 1;
                background: #ffc72c;
                border: none;
                border-radius: 10px;
                font-size: 12px;
                font-weight: 700;
                color: #191f28;
                cursor: pointer;
                &:active {
                  background: #e6b025;
                }
              `,
              shakeWhen(rejectedChoiceId, "point-qr"),
            ]}
            onClick={() => onChoice("point-qr")}
          >
            ▣ 포인트 적립
          </button>
        </div>
        <p
          css={css`
            margin: 8px 0 0;
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
