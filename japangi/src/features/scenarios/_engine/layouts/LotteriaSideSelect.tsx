import { css, keyframes } from "@emotion/react";
import { useState } from "react";

import { idlePulse, lookupCorrectLabel, type CustomLayoutProps } from "./types";

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
  // Sides / desserts
  "potato-r": `${CDN}/2024/11/20/20241120200342965_4.png/dims/resize/x420/optimize`,
  "potato-l": `${CDN}/2024/11/20/20241120200401294_9.png/dims/resize/x420/optimize`,
  "yangnyeom-potato": `${CDN}/2024/11/20/20241120200429258_0.png/dims/resize/x420/optimize`,
  "cheese-stick": `${CDN}/2024/11/20/20241120200451610_3.png/dims/resize/x420/optimize`,
  "long-cheese-stick": `${CDN}/2019/12/20/20191220164604550_2.png/dims/resize/x420/optimize`,
  "squid-ring": `${CDN}/2023/02/10/20230210180512639_0.png/dims/resize/x420/optimize`,
  "g-pie-mild-s": `${CDN}/2019/12/20/20191220165208212_3.png/dims/resize/x420/optimize`,
  coleslaw: `${CDN}/2025/02/19/20250219202403231_5.png/dims/resize/x420/optimize`,
  "chicken-nugget": `${CDN}/2024/11/20/20241120195357957_4.png/dims/resize/x420/optimize`,
  "chicken-piece": `${CDN}/2020/11/03/20201103152250708_4.png/dims/resize/x420/optimize`,
  "fire-wing": `${CDN}/2023/06/21/20230621175453874_9.png/dims/resize/x420/optimize`,
  "chicken-fillet": `${CDN}/2020/11/03/20201103152232421_6.png/dims/resize/x420/optimize`,
  "sundae-hershey": `${CDN}/2025/05/22/20250522132401853_0.png/dims/resize/x420/optimize`,
  "sundae-strawberry": `${CDN}/2025/05/22/20250522132414156_0.png/dims/resize/x420/optimize`,
  "sundae-plain": `${CDN}/2025/05/22/20250522132349844_6.png/dims/resize/x420/optimize`,
  "tornado-choco-cookie": `${CDN}/2025/05/22/20250522132322744_9.png/dims/resize/x420/optimize`,
  // Drinks
  coke: `${CDN}/2024/02/28/20240228145257542_2.png/dims/resize/x420/optimize`,
  sprite: `${CDN}/2024/05/08/20240508172732913_1.png/dims/resize/x420/optimize`,
  "coke-zero": `${CDN}/2023/03/14/202303141158073_1.png/dims/resize/x420/optimize`,
  "ice-tea": `${CDN}/2025/09/08/20250908091242562_7.png/dims/resize/x420/optimize`,
  "ice-americano": `${CDN}/2025/01/24/20250124102006301_3.png/dims/resize/x420/optimize`,
  americano: `${CDN}/2025/01/24/20250124101000339_9.png/dims/resize/x420/optimize`,
  "cafe-latte": `${CDN}/2025/01/24/20250124100825669_5.png/dims/resize/x420/optimize`,
  "ice-cafe-latte": `${CDN}/2025/01/24/20250124101201439_7.png/dims/resize/x420/optimize`,
  "orange-juice": `${CDN}/2020/03/26/2020032610450342_0.png/dims/resize/x420/optimize`,
  "hot-choco": `${CDN}/2020/09/22/20200922082554944_3.png/dims/resize/x420/optimize`,
  "matcha-latte": `${CDN}/2026/05/14/20260514094947663_6.png/dims/resize/x420/optimize`,
  lemonade: `${CDN}/2025/01/24/20250124101144899_1.png/dims/resize/x420/optimize`,
};

const BADGES: Record<string, string> = {
  "g-pie-mild-s": "🌶️",
  "fire-wing": "🌶️",
};

type Item = { id: string; label: string; price: string };

const DESSERT_ITEMS: Item[] = [
  { id: "potato-r", label: "포테이토", price: "0" },
  { id: "cheese-stick", label: "치즈스틱", price: "600" },
  { id: "yangnyeom-potato", label: "양념감자", price: "500" },
  { id: "potato-l", label: "포테이토(L)", price: "400" },
  { id: "squid-ring", label: "통오징어링", price: "800" },
  { id: "g-pie-mild-s", label: "지파이", price: "2,500" },
  { id: "coleslaw", label: "콘샐러드", price: "100" },
  { id: "chicken-nugget", label: "치킨너겟", price: "1,100" },
  { id: "chicken-piece", label: "치킨 1조각", price: "1,000" },
  { id: "fire-wing", label: "화이어윙·2", price: "1,300" },
  { id: "chicken-fillet", label: "치킨휠레·2", price: "1,300" },
  { id: "long-cheese-stick", label: "롱치즈스틱", price: "200" },
  { id: "sundae-hershey", label: "선데 허쉬초코", price: "100" },
  { id: "sundae-strawberry", label: "선데 스트로베리", price: "100" },
  { id: "sundae-plain", label: "선데 플레인", price: "100" },
  { id: "tornado-choco-cookie", label: "토네이도 초코쿠키", price: "1,000" },
];

const DRINK_ITEMS: Item[] = [
  { id: "coke", label: "코카콜라", price: "0" },
  { id: "coke-zero", label: "코카콜라 제로", price: "0" },
  { id: "sprite", label: "스프라이트", price: "0" },
  { id: "ice-tea", label: "아이스티", price: "0" },
  { id: "orange-juice", label: "오렌지주스", price: "300" },
  { id: "lemonade", label: "레모네이드", price: "500" },
  { id: "americano", label: "아메리카노", price: "200" },
  { id: "ice-americano", label: "아이스 아메리카노", price: "200" },
  { id: "cafe-latte", label: "카페라떼", price: "700" },
  { id: "ice-cafe-latte", label: "아이스 카페라떼", price: "900" },
  { id: "matcha-latte", label: "말차라떼", price: "900" },
  { id: "hot-choco", label: "핫초코", price: "700" },
];

type Tab = "dessert" | "drink";

export function LotteriaSideSelect({
  step,
  scenario,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const [tab, setTab] = useState<Tab>("dessert");
  const [dessertId, setDessertId] = useState<string | null>(null);
  const [drinkId, setDrinkId] = useState<string | null>(null);
  const [internalShake, setInternalShake] = useState(false);

  const burgerName =
    lookupCorrectLabel(scenario, "burger-choice") ?? "불고기버거";

  const correctDessertId = step.correctChoiceId;
  // Default drink the kiosk teaches — 코카콜라.
  const correctDrinkId = "coke";

  const items = tab === "dessert" ? DESSERT_ITEMS : DRINK_ITEMS;
  const selectedId = tab === "dessert" ? dessertId : drinkId;
  const correctIdForTab = tab === "dessert" ? correctDessertId : correctDrinkId;

  function handleSelect(id: string) {
    if (tab === "dessert") setDessertId(id);
    else setDrinkId(id);
  }

  function flashInternalShake() {
    setInternalShake(true);
    setTimeout(() => setInternalShake(false), 350);
  }

  function handleConfirm() {
    if (tab === "dessert") {
      if (dessertId == null) {
        flashInternalShake();
        return;
      }
      if (dessertId !== correctDessertId) {
        // Wrong dessert — let the engine shake the chosen card via onChoice.
        onChoice(dessertId);
        return;
      }
      // Dessert correct → auto-switch to drink tab. User must also pick a drink.
      setTab("drink");
      return;
    }
    // Drink tab
    if (drinkId == null) {
      flashInternalShake();
      return;
    }
    // Any drink completes the step — advance with the dessert id (which is
    // the engine's correctChoiceId).
    onChoice(correctDessertId);
  }

  const dessertDone = dessertId === correctDessertId;
  const drinkDone = drinkId != null;
  const confirmEnabled =
    tab === "dessert" ? selectedId != null : drinkDone;

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        min-height: 100dvh;
        background: #f3e9e1;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
        display: flex;
        flex-direction: column;
      `}
    >
      {/* Top red bar with burger name (dimmed background context) */}
      <div
        css={css`
          background: linear-gradient(180deg, #d62300 0%, #b81f00 100%);
          color: #ffffff;
          padding: 14px 14px 16px;
          opacity: 0.7;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            gap: 14px;
            font-size: 11px;
            font-weight: 700;
            padding-bottom: 8px;
          `}
        >
          <span>한국어</span>
          <span style={{ opacity: 0.7 }}>English</span>
          <span style={{ opacity: 0.7 }}>中国语</span>
          <span style={{ opacity: 0.7 }}>日本语</span>
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 22px;
            font-weight: 900;
            letter-spacing: -0.02em;
          `}
        >
          <span>{burgerName.replace(/\n/g, " ")}</span>
          <span
            css={css`
              background: rgba(0, 0, 0, 0.35);
              color: #ffd400;
              font-size: 11px;
              font-weight: 800;
              padding: 4px 8px;
              border-radius: 4px;
            `}
          >
            영양성분
          </span>
        </div>
      </div>

      {/* Popup overlay --------------------------------------------- */}
      <div
        css={css`
          position: absolute;
          inset: 70px 8px 4px;
          background: #ffffff;
          border-radius: 14px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        `}
      >
        {/* Title */}
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 16px 4px;
          `}
        >
          <span
            css={css`
              font-size: 15px;
              font-weight: 900;
              color: #2a1408;
              letter-spacing: -0.01em;
            `}
          >
            {tab === "dessert" ? "세트디저트" : "세트드링크"}{" "}
            <span style={{ color: "#d62300" }}>1</span> 개를 선택해 주세요
          </span>
          <span
            css={css`
              font-size: 18px;
              color: #4e5968;
            `}
          >
            ›
          </span>
        </div>

        {/* Tab bar — both clickable; current tab is yellow */}
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr;
            border-bottom: 1px solid #e5e8eb;
          `}
        >
          <button
            type="button"
            onClick={() => setTab("dessert")}
            css={[
              tabBtn,
              css`
                background: ${tab === "dessert" ? "#ffd400" : "#ffffff"};
                color: ${tab === "dessert" ? "#2a1408" : "#8b95a1"};
                font-weight: ${tab === "dessert" ? 900 : 700};
              `,
            ]}
          >
            세트_디저트
            {dessertDone && <span style={{ marginLeft: 4, color: "#0a7a3b" }}>✓</span>}
          </button>
          <button
            type="button"
            onClick={() => setTab("drink")}
            css={[
              tabBtn,
              css`
                background: ${tab === "drink" ? "#ffd400" : "#ffffff"};
                color: ${tab === "drink" ? "#2a1408" : "#8b95a1"};
                font-weight: ${tab === "drink" ? 900 : 700};
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
              `,
              // After picking dessert, gently pulse the drink tab so the user
              // knows to switch over and complete the second selection.
              idlePulse(idleHintActive, dessertDone && !drinkDone && tab === "dessert"),
            ]}
          >
            세트_드링크
            {drinkDone && <span style={{ color: "#0a7a3b" }}>✓</span>}
            <span style={{ fontSize: 14, color: "#4e5968" }}>›</span>
          </button>
        </div>

        {/* Grid + side prev/next ----------------------------------- */}
        <div
          css={css`
            position: relative;
            flex: 1;
            padding: 8px 28px 8px;
            overflow-y: auto;
          `}
        >
          <button
            type="button"
            disabled
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
              opacity: 0.35;
              cursor: not-allowed;
            `}
          >
            이전
          </button>
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
              grid-template-columns: repeat(4, 1fr);
              gap: 6px;
            `}
          >
            {items.map((item) => {
              const selected = selectedId === item.id;
              const isCorrect = item.id === correctIdForTab;
              const img = IMG[item.id];
              const badge = BADGES[item.id];
              const showPulse =
                isCorrect &&
                ((tab === "dessert" && dessertId == null) ||
                  (tab === "drink" && drinkId == null));
              return (
                <button
                  key={`${tab}-${item.id}`}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  css={[
                    css`
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      gap: 2px;
                      padding: 6px 2px 8px;
                      border: 2px solid ${selected ? "#d62300" : "transparent"};
                      border-radius: 8px;
                      background: ${selected ? "#fff3e0" : "#ffffff"};
                      cursor: pointer;
                      font-family: inherit;
                      :active {
                        background: #f6f7f9;
                      }
                    `,
                    tab === "dessert" && shakeWhen(rejectedChoiceId, item.id),
                    idlePulse(idleHintActive, showPulse),
                  ]}
                >
                  <div
                    css={css`
                      width: 52px;
                      height: 52px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      position: relative;
                    `}
                  >
                    {img ? (
                      <img
                        src={img}
                        alt={item.label}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    ) : (
                      <span style={{ fontSize: 30 }}>{tab === "drink" ? "🥤" : "🍟"}</span>
                    )}
                    {badge && (
                      <span
                        css={css`
                          position: absolute;
                          top: -2px;
                          right: -2px;
                          font-size: 10px;
                        `}
                      >
                        {badge}
                      </span>
                    )}
                  </div>
                  <div
                    css={css`
                      font-size: 10px;
                      font-weight: 700;
                      color: #2a1408;
                      text-align: center;
                      line-height: 1.15;
                      min-height: 24px;
                      white-space: pre-line;
                      word-break: keep-all;
                    `}
                  >
                    {item.label}
                  </div>
                  <div
                    css={css`
                      font-size: 11px;
                      font-weight: 900;
                      color: #d62300;
                    `}
                  >
                    {item.price}
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
              padding: 8px 0 4px;
            `}
          >
            <span
              css={css`
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: #d62300;
              `}
            />
            <span
              css={css`
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: #d1d5da;
              `}
            />
          </div>
        </div>

        {/* Bottom action bar */}
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 8px;
            padding: 8px 10px 12px;
            border-top: 1px solid #e5e8eb;
            background: #ffffff;
            align-items: center;
          `}
        >
          <div
            css={css`
              border: 1.5px solid #ffd400;
              border-radius: 8px;
              padding: 6px 8px;
              font-size: 11px;
              font-weight: 700;
              color: #2a1408;
              line-height: 1.3;
            `}
          >
            <div>· 선택수량 : {selectedId == null ? "0" : "1"}</div>
            <div>· 잔여수량 : {selectedId == null ? "1" : "0"}</div>
          </div>
          <button
            type="button"
            css={css`
              height: 44px;
              border-radius: 8px;
              border: 1.5px solid #2a1408;
              background: #ffffff;
              color: #2a1408;
              font-size: 14px;
              font-weight: 900;
              font-family: inherit;
              cursor: pointer;
              :active {
                background: #f6f7f9;
              }
            `}
            onClick={() => {
              if (tab === "dessert") setDessertId(null);
              else setDrinkId(null);
            }}
          >
            취소하기
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            css={[
              css`
                height: 44px;
                border-radius: 8px;
                border: none;
                background: ${confirmEnabled ? "#ffd400" : "#f0f1f3"};
                color: #2a1408;
                font-size: 14px;
                font-weight: 900;
                font-family: inherit;
                cursor: pointer;
                :active {
                  filter: brightness(0.92);
                }
              `,
              internalShake &&
                css`
                  animation: ${shakeKf} 350ms ease;
                `,
              idlePulse(
                idleHintActive,
                (tab === "dessert" && dessertId === correctDessertId) ||
                  (tab === "drink" && drinkId != null),
              ),
            ]}
          >
            선택완료
          </button>
        </div>
      </div>
    </div>
  );
}

const tabBtn = css`
  border: none;
  text-align: center;
  padding: 8px 0;
  font-size: 14px;
  cursor: pointer;
  font-family: inherit;
  :active {
    filter: brightness(0.95);
  }
`;
