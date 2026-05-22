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

export function McdonaldsSideSelect({
  scenario,
  rejectedChoiceId,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const burgerLabel = lookupCorrectLabel(scenario, "category") ?? "버거";
  const sizeLabel = lookupCorrectLabel(scenario, "set-size") ?? "세트";
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
          display: flex;
          align-items: flex-start;
          gap: 10px;
        `}
      >
        {/* M logo */}
        <span
          css={css`
            font-size: 28px;
            font-weight: 900;
            color: #ffc72c;
            line-height: 1;
            flex-shrink: 0;
          `}
        >
          M
        </span>

        {/* Center: title + price/kcal */}
        <div
          css={css`
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 6px;
          `}
        >
          <span
            css={css`
              font-size: 18px;
              font-weight: 700;
              color: #191f28;
              line-height: 1.2;
            `}
          >
            {burgerLabel} - {sizeLabel}
          </span>
          <span
            css={css`
              font-size: 16px;
              font-weight: 700;
              color: #191f28;
            `}
          >
            ₩7,600&nbsp;&nbsp;674 Kcal
          </span>
        </div>

        {/* 영양정보 pill — decorative */}
        <button
          css={css`
            flex-shrink: 0;
            background: #ffffff;
            border: 1px solid #d1d6db;
            border-radius: 999px;
            font-size: 10px;
            color: #4e5968;
            padding: 4px 10px;
            cursor: default;
            white-space: nowrap;
          `}
          tabIndex={-1}
          onClick={(e) => e.preventDefault()}
        >
          영양정보
        </button>
      </div>

      {/* ── B. Main content row ── */}
      <div
        css={css`
          display: flex;
          flex: 1;
          min-height: 0;
        `}
      >
        {/* Left decorative stepper (~28%) */}
        <div
          css={css`
            width: 28%;
            padding: 12px 0 12px 12px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          `}
        >
          {/* Step 1: Completed */}
          <div
            css={css`
              background: #e5e8eb;
              border-radius: 10px;
              padding: 10px 10px;
              display: flex;
              align-items: flex-start;
              gap: 8px;
            `}
          >
            <div
              css={css`
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: #191f28;
                flex-shrink: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 1px;
              `}
            >
              <span
                css={css`
                  color: #ffffff;
                  font-size: 10px;
                  font-weight: 700;
                  line-height: 1;
                `}
              >
                ✓
              </span>
            </div>
            <span
              css={css`
                font-size: 11px;
                font-weight: 600;
                color: #191f28;
                line-height: 1.4;
              `}
            >
              {burgerLabel}
              <br />- {sizeLabel}
            </span>
          </div>

          {/* Step 2: Active (current) */}
          <div
            css={css`
              background: #fff8e1;
              border-radius: 10px;
              border-left: 3px solid #ffc72c;
              padding: 10px 10px;
              display: flex;
              align-items: flex-start;
              gap: 8px;
            `}
          >
            <div
              css={css`
                width: 18px;
                height: 18px;
                border-radius: 50%;
                border: 2px solid #ffc72c;
                background: transparent;
                flex-shrink: 0;
                margin-top: 1px;
              `}
            />
            <span
              css={css`
                font-size: 11px;
                font-weight: 700;
                color: #191f28;
                line-height: 1.4;
              `}
            >
              세트메뉴
              <br />
              사이드를
              <br />
              선택하세요
            </span>
          </div>

          {/* Step 3: Future */}
          <div
            css={css`
              background: #f5f5f5;
              border-radius: 10px;
              padding: 10px 10px;
              display: flex;
              align-items: flex-start;
              gap: 8px;
            `}
          >
            <div
              css={css`
                width: 18px;
                height: 18px;
                border-radius: 50%;
                border: 2px solid #d1d6db;
                background: transparent;
                flex-shrink: 0;
                margin-top: 1px;
              `}
            />
            <span
              css={css`
                font-size: 11px;
                color: #8b95a1;
                line-height: 1.4;
              `}
            >
              세트메뉴
              <br />
              음료를
              <br />
              선택하세요
            </span>
          </div>

          {/* Step 4: Future */}
          <div
            css={css`
              background: #f5f5f5;
              border-radius: 10px;
              padding: 10px 10px;
              display: flex;
              align-items: flex-start;
              gap: 8px;
            `}
          >
            <div
              css={css`
                width: 18px;
                height: 18px;
                border-radius: 50%;
                border: 2px solid #d1d6db;
                background: transparent;
                flex-shrink: 0;
                margin-top: 1px;
              `}
            />
            <span
              css={css`
                font-size: 11px;
                color: #8b95a1;
                line-height: 1.4;
              `}
            >
              주문
              <br />
              확인하기
            </span>
          </div>
        </div>

        {/* Right cards area (~72%) */}
        <div
          css={css`
            flex: 1;
            display: flex;
            flex-direction: row;
            gap: 10px;
            padding: 12px 16px 12px 8px;
            align-items: stretch;
          `}
        >
          {/* Card 1: 후렌치 후라이 라지 (CORRECT) */}
          <button
            css={[
              css`
                flex: 1;
                background: #ffffff;
                border: 1px solid #e5e8eb;
                border-radius: 12px;
                padding: 12px 8px;
                display: grid;
                grid-template-rows: 52px auto auto;
                row-gap: 6px;
                align-items: center;
                justify-items: center;
                cursor: pointer;
                height: 170px;
                text-align: center;
                position: relative;

                &:active {
                  background: #f9f9f9;
                }
              `,
              shakeWhen(rejectedChoiceId, "fries-large"),
            ]}
            onClick={() => onChoice("fries-large")}
          >
            <div
              css={css`
                font-size: 48px;
                line-height: 1;
              `}
            >
              🍟
            </div>
            <span
              css={css`
                font-size: 13px;
                font-weight: 700;
                color: #191f28;
                line-height: 1.25;
                word-break: keep-all;
              `}
            >
              후렌치 후라이 라지
            </span>
            <span
              css={css`
                font-size: 11px;
                color: #8b95a1;
              `}
            >
              408 Kcal
            </span>
          </button>

          {/* Card 2: 코울슬로 (with 신제품 badge) */}
          <button
            css={[
              css`
                flex: 1;
                background: #ffffff;
                border: 1px solid #e5e8eb;
                border-radius: 12px;
                padding: 12px 8px;
                display: grid;
                grid-template-rows: 52px auto auto;
                row-gap: 6px;
                align-items: center;
                justify-items: center;
                cursor: pointer;
                height: 170px;
                text-align: center;
                position: relative;

                &:active {
                  background: #f9f9f9;
                }
              `,
              shakeWhen(rejectedChoiceId, "coleslaw"),
            ]}
            onClick={() => onChoice("coleslaw")}
          >
            {/* 신제품 badge — top-left */}
            <span
              css={css`
                position: absolute;
                top: 6px;
                left: 6px;
                background: #ffc72c;
                color: #191f28;
                font-size: 9px;
                font-weight: 700;
                padding: 1px 6px;
                border-radius: 999px;
                line-height: 1.4;
              `}
            >
              신제품
            </span>
            <div
              css={css`
                font-size: 48px;
                line-height: 1;
              `}
            >
              🥗
            </div>
            <span
              css={css`
                font-size: 13px;
                font-weight: 700;
                color: #191f28;
                line-height: 1.25;
                word-break: keep-all;
              `}
            >
              코울슬로
            </span>
            <span
              css={css`
                font-size: 11px;
                color: #8b95a1;
              `}
            >
              179 Kcal
            </span>
          </button>

          {/* Card 3: 후렌치 후라이 + 골든 모짤라 치즈스틱 */}
          <button
            css={[
              css`
                flex: 1;
                background: #ffffff;
                border: 1px solid #e5e8eb;
                border-radius: 12px;
                padding: 12px 8px;
                display: grid;
                grid-template-rows: 52px auto auto;
                row-gap: 6px;
                align-items: center;
                justify-items: center;
                cursor: pointer;
                height: 170px;
                text-align: center;

                &:active {
                  background: #f9f9f9;
                }
              `,
              shakeWhen(rejectedChoiceId, "fries-cheese"),
            ]}
            onClick={() => onChoice("fries-cheese")}
          >
            <div
              css={css`
                display: flex;
                gap: 2px;
                font-size: 40px;
                line-height: 1;
              `}
            >
              <span>🍟</span>
              <span>🧀</span>
            </div>
            <span
              css={css`
                font-size: 12px;
                font-weight: 700;
                color: #191f28;
                line-height: 1.2;
                word-break: keep-all;
              `}
            >
              후렌치+치즈스틱
            </span>
            <span
              css={css`
                font-size: 11px;
                color: #8b95a1;
              `}
            >
              ₩1,500 630 Kcal
            </span>
          </button>
        </div>
      </div>

      {/* ── C. Bottom area ── */}
      <div
        css={css`
          padding: 0 16px 0;
          margin-top: auto;
        `}
      >
        {/* 취소 button */}
        <button
          css={[
            css`
              width: 100%;
              height: 46px;
              background: #ffffff;
              border: 1px solid #d1d6db;
              border-radius: 10px;
              font-size: 16px;
              font-weight: 500;
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

        {/* 처음으로 + 도움 기능 row */}
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-top: 10px;
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

        {/* Caloric note */}
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
