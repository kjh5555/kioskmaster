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

const CDN = "https://kfcapi.inicis.com/kfcs_api_img/KFCS/goods";

// Static lookup so the menu grid can show real KFC photos.
const KFC_IMG: Record<string, string> = {
  jinger: `${CDN}/DL_1249126_20230131182918680.png`,
  "jinger-tower": `${CDN}/DL_1249122_20230131175906956.png`,
  twister: `${CDN}/DL_1249130_20230131190836071.png`,
  "jinger-blt": `${CDN}/DL_1249121_20230131175039544.png`,
  "cheese-jinger-tongdari": `${CDN}/DL_1249529_20260311152451715.png`,
  "chipotle-jingertower": `${CDN}/DL_1249582_20260518114639285.png`,
};

const BADGES: Record<string, string> = {
  jinger: "🏆",
  "cheese-jinger-tongdari": "🆕",
  "chipotle-jingertower": "🆕",
};

const SIDEBAR = [
  { id: "best", label: "베스트\n메뉴", icon: "🍗" },
  { id: "burger-box", label: "버거박스" },
  { id: "burger-twist", label: "버거\n트위스트" },
  { id: "chibap", label: "치밥" },
  { id: "chicken", label: "치킨" },
  { id: "side-snack", label: "사이드\n스낵" },
  { id: "drink", label: "음료" },
  { id: "alcohol", label: "주류" },
];

export function KfcMenu({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const [activeTab, setActiveTab] = useState<string>("burger-box");
  const correctId = step.correctChoiceId;

  // Only show real step.choices on the burger-box tab. Other tabs are
  // decorative (empty grid + hint to come back).
  const showChoices = activeTab === "burger-box";

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        min-height: 100dvh;
        background: #ffffff;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
        display: flex;
        flex-direction: column;
      `}
    >
      {/* Top promo banner ----------------------------------------- */}
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(90deg, #c1121f 0%, #e4002b 100%);
          color: #ffffff;
          padding: 10px 12px;
          position: relative;
        `}
      >
        <div
          css={css`
            background: #ffffff;
            color: #e4002b;
            border-radius: 4px;
            padding: 4px 7px;
            font-family: "Arial Black", sans-serif;
            font-weight: 900;
            font-style: italic;
            font-size: 13px;
            line-height: 1;
            letter-spacing: -0.04em;
          `}
        >
          KFC
        </div>
        <div
          css={css`
            flex: 1;
            text-align: center;
            font-family: "Georgia", serif;
            font-style: italic;
            font-weight: 900;
            font-size: 18px;
            letter-spacing: 0.04em;
          `}
        >
          찍먹스 Cheers! 🍺
        </div>
        <span style={{ fontSize: 24 }}>🍗</span>
        <button type="button" css={arrowChip}>‹</button>
        <button type="button" css={arrowChip}>›</button>
      </div>

      {/* Top controls row ---------------------------------------- */}
      <div
        css={css`
          display: flex;
          align-items: center;
          padding: 8px 10px;
          border-bottom: 1px solid #e5e8eb;
          background: #ffffff;
          gap: 8px;
        `}
      >
        <button type="button" css={[modeChip]}>매장 식사</button>
        <button type="button" css={[modeChip, modeChipActive]}>포장 주문</button>
        <div css={css`flex: 1;`} />
        <button type="button" css={infoChip}>영양정보</button>
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 4px;
            border: 1px solid #d1d5da;
            border-radius: 4px;
            padding: 4px 6px;
            font-size: 10px;
            font-weight: 700;
            color: #2a1408;
          `}
        >
          <span>🇰🇷</span>
          <span style={{ opacity: 0.5 }}>🇺🇸</span>
          <span style={{ opacity: 0.5 }}>🇯🇵</span>
          <span style={{ opacity: 0.5 }}>🇨🇳</span>
          <span>| KO</span>
        </div>
      </div>

      {/* Main: sidebar + grid ------------------------------------ */}
      <div
        css={css`
          flex: 1;
          display: grid;
          grid-template-columns: 70px 1fr;
        `}
      >
        {/* Vertical sidebar -------------------------------------- */}
        <div
          css={css`
            background: #ffffff;
            display: flex;
            flex-direction: column;
            border-right: 1px solid #e5e8eb;
          `}
        >
          {SIDEBAR.map((s) => {
            const active = activeTab === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveTab(s.id)}
                css={[
                  css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 2px;
                    padding: 12px 4px;
                    border: none;
                    background: ${active ? "#fafafa" : "transparent"};
                    border-left: 4px solid ${active ? "#e4002b" : "transparent"};
                    border-bottom: 1px solid #f0f1f3;
                    cursor: pointer;
                    font-family: inherit;
                  `,
                  // Pulse the active "burger-box" tab when user wanders off
                  idlePulse(idleHintActive, s.id === "burger-box" && !active),
                ]}
              >
                {s.icon && <span style={{ fontSize: 20 }}>{s.icon}</span>}
                <span
                  css={css`
                    font-size: 10px;
                    font-weight: ${active ? 900 : 700};
                    color: ${active ? "#e4002b" : "#4e5968"};
                    text-align: center;
                    line-height: 1.2;
                    white-space: pre-line;
                  `}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid area --------------------------------------------- */}
        <div
          css={css`
            padding: 10px 12px 6px;
            background: #ffffff;
            display: flex;
            flex-direction: column;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 6px;
              padding: 4px 0 8px;
              font-size: 16px;
              font-weight: 900;
              color: #2a1408;
            `}
          >
            <span style={{ fontSize: 18 }}>🍗</span>
            {SIDEBAR.find((s) => s.id === activeTab)?.label.replace("\n", " ")}
          </div>

          {showChoices ? (
            <div
              css={css`
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 8px;
              `}
            >
              {step.choices.map((choice) => {
                const isCorrect = choice.id === correctId;
                const img = KFC_IMG[choice.id];
                const badge = BADGES[choice.id];
                return (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => onChoice(choice.id)}
                    css={[
                      css`
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 4px;
                        padding: 8px 4px;
                        border: 1.5px solid transparent;
                        border-radius: 8px;
                        background: #ffffff;
                        cursor: pointer;
                        text-align: center;
                        font-family: inherit;
                        :active {
                          background: #f6f7f9;
                        }
                      `,
                      shakeWhen(rejectedChoiceId, choice.id),
                      idlePulse(idleHintActive, isCorrect),
                    ]}
                  >
                    <div
                      css={css`
                        position: relative;
                        width: 76px;
                        height: 76px;
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
                        <span style={{ fontSize: 44 }}>🍔</span>
                      )}
                      {badge && (
                        <span
                          css={css`
                            position: absolute;
                            top: -4px;
                            left: -4px;
                            background: #e4002b;
                            color: #ffffff;
                            font-size: 9px;
                            font-weight: 900;
                            padding: 2px 6px;
                            border-radius: 4px;
                          `}
                        >
                          {badge === "🆕" ? "신메뉴" : "이벤트"}
                        </span>
                      )}
                    </div>
                    <div
                      css={css`
                        font-size: 11px;
                        font-weight: 800;
                        color: #2a1408;
                        line-height: 1.15;
                        white-space: pre-line;
                        word-break: keep-all;
                      `}
                    >
                      {choice.label}
                    </div>
                    <div
                      css={css`
                        font-size: 13px;
                        font-weight: 900;
                        color: #2a1408;
                      `}
                    >
                      ₩{(choice.sublabel ?? "").replace(/[^0-9,]/g, "")}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div
              css={css`
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 40px 0;
                font-size: 13px;
                color: #8b95a1;
                font-weight: 700;
                text-align: center;
              `}
            >
              ← 왼쪽 사이드바에서{"\n"}
              <span style={{ color: "#e4002b", padding: "0 4px" }}>버거박스</span>{" "}
              탭을 눌러주세요
            </div>
          )}

          {/* Pagination bar */}
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-top: 1px solid #e5e8eb;
              padding: 8px 0;
              margin-top: auto;
              font-size: 12px;
              font-weight: 700;
              color: #4e5968;
            `}
          >
            <span>‹ 이전</span>
            <span>다음 ›</span>
          </div>
        </div>
      </div>

      {/* Cart summary -------------------------------------------- */}
      <div
        css={css`
          background: #ffffff;
          border-top: 1px solid #e5e8eb;
          padding: 8px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 6px;
          `}
        >
          <span
            css={css`
              font-weight: 900;
              color: #2a1408;
            `}
          >
            장바구니
          </span>
          <span
            css={css`
              background: #2a1408;
              color: #ffffff;
              font-size: 11px;
              font-weight: 900;
              padding: 1px 6px;
              border-radius: 4px;
            `}
          >
            0
          </span>
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 800;
          `}
        >
          <span style={{ color: "#4e5968", fontSize: 11 }}>주문금액</span>
          <span style={{ color: "#2a1408", fontSize: 16, fontWeight: 900 }}>₩0</span>
        </div>
      </div>

      <div
        css={css`
          background: #ffffff;
          padding: 6px 14px 4px;
          font-size: 11px;
          font-weight: 700;
          color: #8b95a1;
          text-align: center;
        `}
      >
        🛒 장바구니가 비어있습니다. 메뉴를 담아주세요!
      </div>

      {/* Footer buttons ------------------------------------------ */}
      <div
        css={css`
          background: #ffffff;
          padding: 10px 14px 16px;
          display: grid;
          grid-template-columns: 1fr 1.4fr 1.4fr;
          gap: 8px;
        `}
      >
        <button type="button" css={[footerBtn, couponBtn]}>
          🎟️ 쿠폰
        </button>
        <button type="button" css={[footerBtn, cancelBtn]}>
          전체취소
        </button>
        <button type="button" css={[footerBtn, confirmBtn]}>
          🛍️ 주문확인
        </button>
      </div>
    </div>
  );
}

const arrowChip = css`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  border: none;
  color: #ffffff;
  font-size: 13px;
  cursor: pointer;
  font-family: inherit;
`;

const modeChip = css`
  border: 1.5px solid #d1d5da;
  background: #ffffff;
  color: #2a1408;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 800;
  padding: 6px 10px;
  cursor: pointer;
  font-family: inherit;
`;

const modeChipActive = css`
  border-color: #e4002b;
  color: #e4002b;
`;

const infoChip = css`
  border: 1px solid #d1d5da;
  background: #ffffff;
  color: #2a1408;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  cursor: pointer;
  font-family: inherit;
`;

const footerBtn = css`
  height: 42px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 900;
  font-family: inherit;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  :active {
    filter: brightness(0.92);
  }
`;

const couponBtn = css`
  background: #2a1408;
  color: #ffffff;
`;

const cancelBtn = css`
  background: #ffffff;
  color: #2a1408;
  border: 1.5px solid #2a1408;
`;

const confirmBtn = css`
  background: #b0b8c1;
  color: #ffffff;
`;
