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

const IMG: Record<string, string> = {
  "miracle-double":
    "https://img.lotteeatz.com/upload/product/2025/10/16/20251016134709789_6.png/dims/resize/x420/optimize",
  miracle:
    "https://img.lotteeatz.com/upload/product/2025/10/16/20251016134637371_3.png/dims/resize/x420/optimize",
  "hot-crispy-chicken":
    "https://img.lotteeatz.com/upload/product/2023/06/21/20230621174724947_5.png/dims/resize/x420/optimize",
  "classic-cheese-double":
    "https://img.lotteeatz.com/upload/product/2023/03/21/20230321152358223_1.png/dims/resize/x420/optimize",
  "classic-cheese":
    "https://img.lotteeatz.com/upload/product/2022/05/19/20220519092203878_5.png/dims/resize/x420/optimize",
  "ria-shrimp-square-double":
    "https://img.lotteeatz.com/upload/product/2020/12/31/20201231115111151_3.png/dims/resize/x420/optimize",
  "ria-bulgogi":
    "https://img.lotteeatz.com/upload/product/2021/07/23/20210723103917912_2.png/dims/resize/x420/optimize",
  "ria-shrimp":
    "https://img.lotteeatz.com/upload/product/2019/12/20/20191220163836176_9.png/dims/resize/x420/optimize",
};

// Decorative tabs in the screenshot. Only "햄버거" is active.
const TABS = ["추천메뉴", "햄버거", "디저트/치킨", "음료/커피"];

// Badge icon next to a few product names: 🌱 for plant-based (Miracle), 🌶️ for spicy.
const BADGES: Record<string, string> = {
  "miracle-double": "🌱",
  miracle: "🌱",
  "hot-crispy-chicken": "🌶️",
};

export function LotteriaMenu({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 100dvh;
        background: #ffffff;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
        position: relative;
      `}
    >
      {/* Top sanitation banner (red bar) ----------------------------- */}
      <div
        css={css`
          background: linear-gradient(180deg, #d62300 0%, #b81f00 100%);
          color: #ffffff;
          padding: 10px 16px 14px;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            gap: 14px;
            font-size: 11px;
            font-weight: 700;
            opacity: 0.95;
            padding-bottom: 6px;
          `}
        >
          <span style={{ color: "#fff" }}>한국어</span>
          <span style={{ opacity: 0.7 }}>English</span>
          <span style={{ opacity: 0.7 }}>中国语</span>
          <span style={{ opacity: 0.7 }}>日本语</span>
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            padding: 8px 12px;
          `}
        >
          <span style={{ fontSize: 24 }}>💧</span>
          <div
            css={css`
              font-size: 13px;
              font-weight: 700;
              line-height: 1.4;
              flex: 1;
              text-align: center;
            `}
          >
            고객님들의
            <br />
            안전과 질병 예방을 위해
            <br />
            <span style={{ background: "#ffd400", color: "#2a1408", padding: "0 4px", borderRadius: 2 }}>
              무인포스
            </span>
            는 <span style={{ background: "#ffd400", color: "#2a1408", padding: "0 4px", borderRadius: 2 }}>매시간 살균, 소독</span>을
            <br />
            실시하고 있습니다.
          </div>
          <span style={{ fontSize: 24 }}>🧼</span>
        </div>
      </div>

      {/* Tabs row ---------------------------------------------------- */}
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 4px;
          border-bottom: 2px solid #e5e8eb;
          background: #ffffff;
        `}
      >
        <div
          css={css`
            display: flex;
            flex: 1;
            overflow-x: auto;
            scrollbar-width: none;
            ::-webkit-scrollbar {
              display: none;
            }
          `}
        >
          {TABS.map((tab) => {
            const active = tab === "햄버거";
            return (
              <button
                key={tab}
                type="button"
                css={[
                  css`
                    border: none;
                    background: transparent;
                    font-size: 14px;
                    font-weight: ${active ? 900 : 600};
                    color: ${active ? "#d62300" : "#4e5968"};
                    padding: 12px 10px 10px;
                    position: relative;
                    white-space: nowrap;
                    flex-shrink: 0;
                    cursor: pointer;
                    border-radius: 6px;
                    :active {
                      background: #f6f7f9;
                    }
                    ${active &&
                    css`
                      &::after {
                        content: "";
                        position: absolute;
                        left: 8px;
                        right: 8px;
                        bottom: -2px;
                        height: 3px;
                        background: #d62300;
                        border-radius: 2px;
                      }
                    `}
                  `,
                  idlePulse(idleHintActive, active),
                ]}
              >
                {tab}
              </button>
            );
          })}
        </div>
        <div
          css={css`
            font-size: 18px;
            color: #4e5968;
            padding: 0 10px;
          `}
        >
          ›
        </div>
      </div>

      {/* Burger grid + side prev/next ------------------------------- */}
      <div
        css={css`
          position: relative;
          flex: 1;
          padding: 12px 36px 8px;
          background: #ffffff;
        `}
      >
        {/* Left "이전" tab */}
        <button
          type="button"
          css={css`
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            background: #2a1408;
            color: #ffffff;
            font-size: 12px;
            font-weight: 800;
            writing-mode: vertical-rl;
            text-orientation: upright;
            padding: 14px 6px;
            border-radius: 0 8px 8px 0;
            letter-spacing: 0.1em;
            border: none;
            cursor: pointer;
            :active {
              background: #4a2818;
            }
          `}
        >
          이전
        </button>

        {/* Right "다음" tab */}
        <button
          type="button"
          css={css`
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            background: #2a1408;
            color: #ffffff;
            font-size: 12px;
            font-weight: 800;
            writing-mode: vertical-rl;
            text-orientation: upright;
            padding: 14px 6px;
            border-radius: 8px 0 0 8px;
            letter-spacing: 0.1em;
            border: none;
            cursor: pointer;
            :active {
              background: #4a2818;
            }
          `}
        >
          다음
        </button>

        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr;
            row-gap: 6px;
            column-gap: 6px;
          `}
        >
          {step.choices.map((choice) => {
            const slug = choice.id;
            const img = IMG[slug];
            const badge = BADGES[slug];
            return (
              <button
                key={choice.id}
                onClick={() => onChoice(choice.id)}
                css={[
                  css`
                    display: grid;
                    grid-template-columns: 64px 1fr;
                    align-items: center;
                    gap: 8px;
                    padding: 6px;
                    border: 1px solid transparent;
                    border-radius: 8px;
                    background: #ffffff;
                    cursor: pointer;
                    text-align: left;
                    :active {
                      background: #f6f7f9;
                    }
                  `,
                  shakeWhen(rejectedChoiceId, choice.id),
                  idlePulse(idleHintActive, choice.id === step.correctChoiceId),
                ]}
              >
                <div
                  css={css`
                    width: 64px;
                    height: 64px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  `}
                >
                  {img ? (
                    <img
                      src={img}
                      alt={choice.label}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  ) : (
                    <span style={{ fontSize: 36 }}>🍔</span>
                  )}
                </div>
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                  `}
                >
                  <div
                    css={css`
                      display: flex;
                      align-items: center;
                      gap: 4px;
                      font-size: 13px;
                      font-weight: 700;
                      color: #2a1408;
                      line-height: 1.2;
                    `}
                  >
                    <span>{choice.label}</span>
                    {badge && <span style={{ fontSize: 11 }}>{badge}</span>}
                  </div>
                  <div
                    css={css`
                      font-size: 14px;
                      font-weight: 900;
                      color: #d62300;
                    `}
                  >
                    {choice.sublabel ?? ""} ~
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Page dots */}
        <div
          css={css`
            display: flex;
            justify-content: center;
            gap: 6px;
            padding: 10px 0 6px;
          `}
        >
          <span
            css={css`
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: #d1d5da;
            `}
          />
          <span
            css={css`
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: #d62300;
            `}
          />
        </div>
      </div>

      {/* Cart summary row ------------------------------------------- */}
      <div
        css={css`
          background: #f6f7f9;
          padding: 10px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #e5e8eb;
        `}
      >
        <div
          css={css`
            font-size: 18px;
            font-weight: 800;
            color: #2a1408;
          `}
        >
          0 <span style={{ fontSize: 14, fontWeight: 700 }}>개</span>
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 14px;
          `}
        >
          <div
            css={css`
              font-size: 22px;
              font-weight: 900;
              color: #2a1408;
            `}
          >
            0
          </div>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 2px;
            `}
          >
            <span css={arrowChip}>∧</span>
            <span css={arrowChip}>∨</span>
          </div>
        </div>
      </div>

      {/* Footer action buttons -------------------------------------- */}
      <div
        css={css`
          background: #ffffff;
          padding: 10px 14px 16px;
          display: flex;
          gap: 8px;
        `}
      >
        <button type="button" css={[footerBtn, couponBtn]}>
          <span style={{ fontSize: 12, fontWeight: 800 }}>쿠폰</span>
          <span style={{ fontSize: 11, fontWeight: 700 }}>교환권</span>
        </button>
        <button type="button" css={[footerBtn, cancelBtn]}>
          취소하기
        </button>
        <button type="button" css={[footerBtn, payBtn]}>
          결제하기
        </button>
      </div>
    </div>
  );
}

const arrowChip = css`
  width: 22px;
  height: 14px;
  border-radius: 4px;
  background: #ffffff;
  border: 1px solid #d1d5da;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #4e5968;
`;

const footerBtn = css`
  flex: 1;
  height: 44px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
  border: none;
  cursor: pointer;
  font-family: inherit;
  :active {
    filter: brightness(0.92);
  }
`;

const couponBtn = css`
  background: #ffd400;
  color: #2a1408;
  flex: 0.7;
`;

const cancelBtn = css`
  background: #ffffff;
  color: #2a1408;
  border: 1.5px solid #2a1408;
`;

const payBtn = css`
  background: #d62300;
  color: #ffffff;
`;
