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

const CDN = "https://img.lotteeatz.com/upload/product";

const IMG: Record<string, string> = {
  // Real-choice burgers (햄버거 page 2)
  "miracle-double": `${CDN}/2025/10/16/20251016134709789_6.png/dims/resize/x420/optimize`,
  miracle: `${CDN}/2025/10/16/20251016134637371_3.png/dims/resize/x420/optimize`,
  "hot-crispy-chicken": `${CDN}/2023/06/21/20230621174724947_5.png/dims/resize/x420/optimize`,
  "classic-cheese-double": `${CDN}/2023/03/21/20230321152358223_1.png/dims/resize/x420/optimize`,
  "classic-cheese": `${CDN}/2022/05/19/20220519092203878_5.png/dims/resize/x420/optimize`,
  "ria-shrimp-square-double": `${CDN}/2020/12/31/20201231115111151_3.png/dims/resize/x420/optimize`,
  "ria-bulgogi": `${CDN}/2021/07/23/20210723103917912_2.png/dims/resize/x420/optimize`,
  "ria-shrimp": `${CDN}/2019/12/20/20191220163836176_9.png/dims/resize/x420/optimize`,
  // Decorative items used in other tabs / pages
  "bunt-beef": `${CDN}/2026/04/17/20260417142700466_3.png/dims/resize/x420/optimize`,
  "crispy-chicken-greek": `${CDN}/2026/01/06/20260106083745809_0.png/dims/resize/x420/optimize`,
  "crispy-chicken-fire": `${CDN}/2026/01/06/20260106083759930_0.png/dims/resize/x420/optimize`,
  "mozza-tomato": `${CDN}/2025/01/15/20250115162931395_8.png/dims/resize/x420/optimize`,
  "mozza-balsamic": `${CDN}/2025/01/15/20250115163300416_3.png/dims/resize/x420/optimize`,
  "jeonju-bibim-rice": `${CDN}/2023/02/03/20230203180810686_7.png/dims/resize/x420/optimize`,
  "ria-shrimp-bacon": `${CDN}/2023/08/11/20230811165041889_8.png/dims/resize/x420/optimize`,
  "ria-bulgogi-bacon": `${CDN}/2023/07/12/20230712163805886_0.png/dims/resize/x420/optimize`,
  // Dessert/chicken
  "spicy-tonkatsu-hot": `${CDN}/2026/03/11/20260311110817134_1.png/dims/resize/x420/optimize`,
  "chicken-nugget": `${CDN}/2024/11/20/20241120195357957_4.png/dims/resize/x420/optimize`,
  "potato-r": `${CDN}/2024/11/20/20241120200342965_4.png/dims/resize/x420/optimize`,
  "cheese-stick": `${CDN}/2024/11/20/20241120200451610_3.png/dims/resize/x420/optimize`,
  "fire-wing": `${CDN}/2023/06/21/20230621175453874_9.png/dims/resize/x420/optimize`,
  "chicken-fillet": `${CDN}/2020/11/03/20201103152232421_6.png/dims/resize/x420/optimize`,
  "boneless-half": `${CDN}/2019/12/20/20191220165930895_6.png/dims/resize/x420/optimize`,
  "g-pie-mild-s": `${CDN}/2019/12/20/20191220165208212_3.png/dims/resize/x420/optimize`,
  // Drinks
  coke: `${CDN}/2024/02/28/20240228145257542_2.png/dims/resize/x420/optimize`,
  sprite: `${CDN}/2024/05/08/20240508172732913_1.png/dims/resize/x420/optimize`,
  "coke-zero": `${CDN}/2023/03/14/202303141158073_1.png/dims/resize/x420/optimize`,
  "ice-tea": `${CDN}/2025/09/08/20250908091242562_7.png/dims/resize/x420/optimize`,
  "ice-americano": `${CDN}/2025/01/24/20250124102006301_3.png/dims/resize/x420/optimize`,
  "cafe-latte": `${CDN}/2025/01/24/20250124100825669_5.png/dims/resize/x420/optimize`,
  "ice-cafe-latte": `${CDN}/2025/01/24/20250124101201439_7.png/dims/resize/x420/optimize`,
  "hot-choco": `${CDN}/2020/09/22/20200922082554944_3.png/dims/resize/x420/optimize`,
};

const BADGES: Record<string, string> = {
  "miracle-double": "🌱",
  miracle: "🌱",
  "hot-crispy-chicken": "🌶️",
  "crispy-chicken-fire": "🌶️",
  "spicy-tonkatsu-hot": "🌶️",
  "fire-wing": "🌶️",
};

type DecorItem = { id: string; label: string; price: string };

const TAB_HAMBURGER = "햄버거";
const TABS = ["추천메뉴", TAB_HAMBURGER, "디저트/치킨", "음료/커피"];

// Decorative items shown on non-target views. Selecting these does nothing
// (no onChoice call) — they exist so users can freely explore the kiosk UI.
const DECOR: Record<string, DecorItem[][]> = {
  추천메뉴: [
    [
      { id: "bunt-beef", label: "번트비프버거", price: "8,800" },
      { id: "crispy-chicken-fire", label: "크리스피치킨\n(파이어)", price: "6,900" },
      { id: "mozza-balsamic", label: "모짜렐라\n(발사믹)", price: "9,100" },
      { id: "jeonju-bibim-rice", label: "전주비빔\n라이스버거", price: "7,300" },
      { id: "ria-shrimp-bacon", label: "리아 새우\n베이컨", price: "6,100" },
      { id: "ria-bulgogi-bacon", label: "리아 불고기\n베이컨", price: "6,100" },
      { id: "mozza-tomato", label: "모짜렐라\n(토마토)", price: "9,100" },
      { id: "crispy-chicken-greek", label: "크리스피치킨\n(그릭랜치)", price: "6,900" },
    ],
  ],
  // 햄버거 page 1 — decorative. Page 2 uses step.choices (real scenario items).
  [TAB_HAMBURGER]: [
    [
      { id: "bunt-beef", label: "번트비프버거", price: "8,800" },
      { id: "crispy-chicken-fire", label: "크리스피치킨\n(파이어)", price: "6,900" },
      { id: "crispy-chicken-greek", label: "크리스피치킨\n(그릭랜치)", price: "6,900" },
      { id: "mozza-balsamic", label: "모짜렐라\n(발사믹)", price: "9,100" },
      { id: "mozza-tomato", label: "모짜렐라\n(토마토)", price: "9,100" },
      { id: "jeonju-bibim-rice", label: "전주비빔\n라이스버거", price: "7,300" },
      { id: "ria-shrimp-bacon", label: "리아 새우\n베이컨", price: "6,100" },
      { id: "ria-bulgogi-bacon", label: "리아 불고기\n베이컨", price: "6,100" },
    ],
    [], // page 2 sentinel — replaced at render-time with step.choices
  ],
  "디저트/치킨": [
    [
      { id: "spicy-tonkatsu-hot", label: "디지게 매운 돈까스", price: "3,500" },
      { id: "chicken-nugget", label: "치킨너겟", price: "3,100" },
      { id: "potato-r", label: "포테이토", price: "2,000" },
      { id: "cheese-stick", label: "치즈스틱", price: "2,800" },
      { id: "fire-wing", label: "화이어윙", price: "3,200" },
      { id: "chicken-fillet", label: "치킨휠레", price: "3,100" },
      { id: "boneless-half", label: "순살치킨 하프팩", price: "10,500" },
      { id: "g-pie-mild-s", label: "G파이", price: "2,400" },
    ],
  ],
  "음료/커피": [
    [
      { id: "coke", label: "코카콜라", price: "2,300" },
      { id: "sprite", label: "스프라이트", price: "2,300" },
      { id: "coke-zero", label: "코카콜라 제로", price: "2,300" },
      { id: "ice-tea", label: "아이스 티", price: "2,500" },
      { id: "ice-americano", label: "아이스 아메리카노", price: "2,500" },
      { id: "cafe-latte", label: "카페라떼", price: "3,000" },
      { id: "ice-cafe-latte", label: "아이스 카페라떼", price: "3,200" },
      { id: "hot-choco", label: "핫초코", price: "3,000" },
    ],
  ],
};

export function LotteriaMenu({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  // 햄버거 탭 page 2가 정답이 살아있는 화면. 그 외 페이지/탭은 자유 탐색용.
  const [activeTab, setActiveTab] = useState<string>(TAB_HAMBURGER);
  const [pageByTab, setPageByTab] = useState<Record<string, number>>({
    [TAB_HAMBURGER]: 1, // start on page 2 (zero-indexed = 1) — that's the screenshot view
  });

  const pages = DECOR[activeTab] ?? [[]];
  const totalPages = pages.length;
  const page = pageByTab[activeTab] ?? 0;

  const onHamburgerPage2 =
    activeTab === TAB_HAMBURGER && page === 1;

  // Render items: real step.choices on 햄버거 page 2, decorative everywhere else.
  const items: Array<{
    id: string;
    label: string;
    price: string;
    isReal: boolean;
  }> = onHamburgerPage2
    ? step.choices.map((c) => ({
        id: c.id,
        label: c.label,
        price: c.sublabel ?? "",
        isReal: true,
      }))
    : pages[page].map((d) => ({ ...d, isReal: false }));

  function switchTab(tab: string) {
    setActiveTab(tab);
    // Reset to the first page of the new tab. 햄버거 stays on its remembered
    // page so users don't lose progress jumping back.
    if (pageByTab[tab] === undefined) {
      setPageByTab((prev) => ({ ...prev, [tab]: 0 }));
    }
  }

  function shiftPage(delta: number) {
    const next = Math.min(totalPages - 1, Math.max(0, page + delta));
    setPageByTab((prev) => ({ ...prev, [activeTab]: next }));
  }

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
      {/* Top sanitation banner ------------------------------------- */}
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

      {/* Tabs row -------------------------------------------------- */}
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
            justify-content: flex-start;
            align-items: stretch;
            min-width: 0;
            overflow-x: auto;
            scrollbar-width: none;
            ::-webkit-scrollbar {
              display: none;
            }
          `}
        >
          {TABS.map((tab) => {
            const active = tab === activeTab;
            // Pulse 햄버거 tab when user has wandered off it; pulse off
            // when already there (no point hinting at a tab you're on).
            const shouldPulseTab =
              tab === TAB_HAMBURGER && activeTab !== TAB_HAMBURGER;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => switchTab(tab)}
                css={[
                  css`
                    border: none;
                    background: transparent;
                    font-size: 14px;
                    font-weight: ${active ? 900 : 600};
                    color: ${active ? "#d62300" : "#4e5968"};
                    padding: 12px 8px 10px;
                    position: relative;
                    white-space: nowrap;
                    flex: 1;
                    cursor: pointer;
                    border-radius: 6px;
                    font-family: inherit;
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
                  idlePulse(idleHintActive, shouldPulseTab),
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

      {/* Burger grid + side prev/next ----------------------------- */}
      <div
        css={css`
          position: relative;
          flex: 1;
          padding: 12px 28px 8px;
          background: #ffffff;
        `}
      >
        {/* "이전" */}
        <button
          type="button"
          onClick={() => shiftPage(-1)}
          disabled={page === 0}
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
            opacity: ${page === 0 ? 0.35 : 1};
            :active {
              background: #4a2818;
            }
          `}
        >
          이전
        </button>

        {/* "다음" — pulses on 햄버거 page 1 to nudge toward page 2 */}
        <button
          type="button"
          onClick={() => shiftPage(1)}
          disabled={page === totalPages - 1}
          css={[
            css`
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
              opacity: ${page === totalPages - 1 ? 0.35 : 1};
              :active {
                background: #4a2818;
              }
            `,
            idlePulse(
              idleHintActive,
              activeTab === TAB_HAMBURGER && page === 0,
            ),
          ]}
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
          {items.map((item) => {
            const slug = item.id;
            const img = IMG[slug];
            const badge = BADGES[slug];
            const isCorrect =
              item.isReal && slug === step.correctChoiceId;
            return (
              <button
                key={`${activeTab}-${page}-${item.id}`}
                type="button"
                onClick={() => {
                  if (item.isReal) onChoice(item.id);
                  // decorative items are tappable but inert
                }}
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
                    font-family: inherit;
                    :active {
                      background: #f6f7f9;
                    }
                  `,
                  item.isReal && shakeWhen(rejectedChoiceId, item.id),
                  idlePulse(idleHintActive, isCorrect),
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
                      alt={item.label}
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
                    min-width: 0;
                    overflow: hidden;
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
                      white-space: pre-line;
                      word-break: keep-all;
                      min-width: 0;
                    `}
                  >
                    <span>{item.label}</span>
                    {badge && <span style={{ fontSize: 11 }}>{badge}</span>}
                  </div>
                  <div
                    css={css`
                      font-size: 14px;
                      font-weight: 900;
                      color: #d62300;
                    `}
                  >
                    {item.price} ~
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
          {Array.from({ length: totalPages }).map((_, i) => (
            <span
              key={i}
              css={css`
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: ${i === page ? "#d62300" : "#d1d5da"};
              `}
            />
          ))}
        </div>
      </div>

      {/* Cart summary --------------------------------------------- */}
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

      {/* Footer ---------------------------------------------------- */}
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
