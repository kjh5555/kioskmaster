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

const DRINKS = [
  {
    id: "coke-large",
    label: "코카콜라 라지",
    emoji: "🥤",
    sublabel: "196 Kcal",
    badge: null,
  },
  {
    id: "sprite-large",
    label: "스프라이트 라지",
    emoji: "🥤",
    sublabel: "204 Kcal",
    badge: null,
  },
  {
    id: "fanta-large",
    label: "환타 라지",
    emoji: "🥤",
    sublabel: "86 Kcal",
    badge: null,
  },
  {
    id: "coke-zero",
    label: "코카콜라 제로",
    emoji: "🥤",
    sublabel: "0 Kcal",
    badge: null,
  },
  {
    id: "lemon-coke",
    label: "레몬 액티즈 코카콜라 라지",
    emoji: "🥤",
    sublabel: "+₩1,500 214 Kcal",
    badge: "신제품",
  },
  {
    id: "lemon-sprite",
    label: "레몬 액티즈 스프라이트 라지",
    emoji: "🥤",
    sublabel: "+₩500 321 Kcal",
    badge: "신제품",
  },
  {
    id: "lemon-coke-zero",
    label: "레몬 액티즈 코카콜라 제로 라지",
    emoji: "🥤",
    sublabel: "+₩500 172 Kcal",
    badge: "신제품",
  },
  {
    id: "ice-drip",
    label: "아이스 드립 커피 라지",
    emoji: "☕",
    sublabel: "14 Kcal",
    badge: "해피 스낵",
  },
  {
    id: "ice-americano",
    label: "아이스 아메리카노 라지 (해피 스낵 할인)",
    emoji: "☕",
    sublabel: "+₩500 10 Kcal",
    badge: null,
  },
  {
    id: "ice-latte",
    label: "아이스 카페라떼 라지",
    emoji: "☕",
    sublabel: "+₩1,500 1326 Kcal",
    badge: null,
  },
  {
    id: "ice-vanilla-latte",
    label: "아이스 바닐라 라떼 라지",
    emoji: "☕",
    sublabel: "+₩2,100 263 Kcal",
    badge: null,
  },
  {
    id: "ice-cream-latte",
    label: "아이스크림 라떼 라지 (단일 사이즈 판매)",
    emoji: "🥤",
    sublabel: "+₩2,100 238 Kcal",
    badge: "신제품",
  },
] as const;

export function McdonaldsDrinkSelect({
  scenario,
  rejectedChoiceId,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const burgerLabel = lookupCorrectLabel(scenario, "category") ?? "버거";
  const sizeLabel = lookupCorrectLabel(scenario, "set-size") ?? "세트";
  const sideLabel = lookupCorrectLabel(scenario, "side-select") ?? "사이드";
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

          {/* Step 2: Completed with subselection */}
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
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 2px;
              `}
            >
              <span
                css={css`
                  font-size: 11px;
                  font-weight: 600;
                  color: #191f28;
                  line-height: 1.4;
                `}
              >
                세트메뉴 사이드를 선택하세요
              </span>
              <span
                css={css`
                  font-size: 11px;
                  color: #4e5968;
                  font-style: italic;
                  line-height: 1.3;
                `}
              >
                {sideLabel}
              </span>
            </div>
          </div>

          {/* Step 3: Active (current) */}
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

        {/* Right cards grid (~72%) */}
        <div
          css={css`
            flex: 1;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            padding: 12px 16px 12px 8px;
            align-content: start;
          `}
        >
          {DRINKS.map((drink) => (
            <button
              key={drink.id}
              css={[
                css`
                  background: #ffffff;
                  border: 1px solid #e5e8eb;
                  border-radius: 10px;
                  padding: 10px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: 4px;
                  cursor: pointer;
                  min-height: 140px;
                  text-align: center;
                  position: relative;

                  &:active {
                    background: #f9f9f9;
                  }
                `,
                shakeWhen(rejectedChoiceId, drink.id),
              ]}
              onClick={() => onChoice(drink.id)}
            >
              {drink.badge !== null && (
                <span
                  css={css`
                    position: absolute;
                    top: 6px;
                    left: 6px;
                    background: ${drink.badge === "해피 스낵"
                      ? "#da291c"
                      : "#ffc72c"};
                    color: ${drink.badge === "해피 스낵"
                      ? "#ffffff"
                      : "#191f28"};
                    font-size: 10px;
                    font-weight: 700;
                    padding: 2px 6px;
                    border-radius: 999px;
                    line-height: 1.4;
                  `}
                >
                  {drink.badge}
                </span>
              )}
              <div
                css={css`
                  font-size: 44px;
                  line-height: 1;
                  margin-top: ${drink.badge !== null ? "18px" : "0"};
                `}
              >
                {drink.emoji}
              </div>
              <span
                css={css`
                  font-size: 11px;
                  font-weight: 700;
                  color: #191f28;
                  line-height: 1.3;
                `}
              >
                {drink.label}
              </span>
              <span
                css={css`
                  font-size: 10px;
                  color: #8b95a1;
                `}
              >
                {drink.sublabel}
              </span>
            </button>
          ))}
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
