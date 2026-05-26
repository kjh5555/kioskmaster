import { css, keyframes } from "@emotion/react";
import { useState } from "react";

import { BK_MENU_TABS } from "./burgerKingMenuData";
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


const TABS = BK_MENU_TABS;

export function BurgerKingMenu({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const [activeTab, setActiveTab] = useState<string>("recommend");

  // Row 1 + Row 2 of tabs (4 each)
  const row1 = TABS.slice(0, 4);
  const row2 = TABS.slice(4);
  const activeItems = TABS.find((t) => t.id === activeTab)?.items ?? [];

  // Where does the correct burger live? If correctChoiceId matches an item
  // in some other tab, pulse that tab to nudge the user there.
  const correctTab = TABS.find((t) =>
    t.items.some((i) => i.id === step.correctChoiceId),
  );
  const tabPulseId =
    idleHintActive && correctTab !== undefined && correctTab.id !== activeTab
      ? correctTab.id
      : null;
  const itemPulseId =
    idleHintActive && correctTab !== undefined && correctTab.id === activeTab
      ? step.correctChoiceId
      : null;

  function renderTab(tab: { id: string; label: string }, isActive: boolean) {
    return (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        css={[
          css`
            background: ${isActive ? "#ffffff" : "#3a1408"};
            color: ${isActive ? "#d62300" : "#ffffff"};
            border: none;
            padding: 10px 4px;
            font-size: 13px;
            font-weight: ${isActive ? 800 : 600};
            cursor: pointer;
            border-bottom: ${isActive ? "3px solid #d62300" : "3px solid transparent"};
            line-height: 1.15;
            white-space: pre-line;
            min-width: 0;
            &:active {
              background: ${isActive ? "#ffffff" : "#502314"};
            }
          `,
          idlePulse(tabPulseId === tab.id, true),
        ]}
      >
        {tab.label}
      </button>
    );
  }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        width: 100%;
        background: #ffffff;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
      `}
    >
      {/* ── A. Tab navigation (2 rows × 4 columns) ── */}
      <div
        css={css`
          display: grid;
          grid-template-rows: auto auto;
        `}
      >
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
          `}
        >
          {row1.map((t) => renderTab(t, activeTab === t.id))}
        </div>
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
          `}
        >
          {row2.map((t) => renderTab(t, activeTab === t.id))}
        </div>
      </div>

      {/* ── B. Menu item grid (3 columns) ── */}
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1px;
          background: #e5e8eb;
          padding: 1px;
          flex: 1;
        `}
      >
        {activeItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onChoice(item.id)}
            css={[
              css`
                background: #f5f5f5;
                border: none;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
                padding: 10px 6px 12px;
                cursor: pointer;
                position: relative;
                min-height: 150px;
                font-family: inherit;
                &:active {
                  background: #ececec;
                }
              `,
              shakeWhen(rejectedChoiceId, item.id),
              idlePulse(itemPulseId === item.id, true),
            ]}
          >
            {item.badge !== undefined && (
              <span
                css={css`
                  position: absolute;
                  top: 6px;
                  left: 6px;
                  background: ${item.badge === "BEST" ? "#e07a1a" : "#d62300"};
                  color: #ffffff;
                  font-size: 9px;
                  font-weight: 800;
                  padding: 2px 6px;
                  border-radius: 4px;
                  letter-spacing: 0.04em;
                `}
              >
                {item.badge}
              </span>
            )}
            <img
              src={item.imageUrl}
              alt={item.name}
              loading="lazy"
              style={{
                width: 80,
                height: 80,
                objectFit: "contain",
                marginTop: item.badge !== undefined ? 14 : 6,
              }}
            />
            <span
              css={css`
                font-size: 12px;
                font-weight: 700;
                color: #2a1408;
                text-align: center;
                line-height: 1.25;
                white-space: pre-line;
                word-break: keep-all;
              `}
            >
              {item.name}
            </span>
          </button>
        ))}
      </div>

      {/* ── C. Cart info row ── */}
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px 10px;
          background: #ffffff;
          border-top: 1px solid #e5e8eb;
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
          <div
            css={css`
              position: relative;
              width: 36px;
              height: 36px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              background: #f3f4f5;
              border-radius: 8px;
              font-size: 18px;
            `}
          >
            🛒
            <span
              css={css`
                position: absolute;
                top: -4px;
                right: -4px;
                min-width: 16px;
                height: 16px;
                padding: 0 4px;
                background: #d62300;
                color: #fff;
                font-size: 10px;
                font-weight: 800;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
              `}
            >
              0
            </span>
          </div>
          <span
            css={css`
              font-size: 12px;
              color: #8b95a1;
            `}
          >
            카트
          </span>
        </div>
        <div
          css={css`
            display: flex;
            align-items: baseline;
            gap: 6px;
          `}
        >
          <span
            css={css`
              font-size: 12px;
              color: #8b95a1;
            `}
          >
            총 주문금액
          </span>
          <span
            css={css`
              font-size: 18px;
              font-weight: 800;
              color: #2a1408;
            `}
          >
            0원
          </span>
        </div>
      </div>

      {/* ── D. Bottom action bar (utility buttons, all "wrong" picks) ── */}
      <div
        css={css`
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 0.8fr);
          background: #e07a1a;
          color: #ffffff;
          font-weight: 700;
          font-size: 13px;
        `}
      >
        <button
          type="button"
          onClick={() => onChoice("use-coupon")}
          css={[
            css`
              padding: 14px 10px;
              background: transparent;
              border: none;
              color: inherit;
              font: inherit;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 6px;
              border-right: 1px solid rgba(255, 255, 255, 0.2);
              &:active {
                background: rgba(0, 0, 0, 0.08);
              }
            `,
            shakeWhen(rejectedChoiceId, "use-coupon"),
          ]}
        >
          🎟️ 쿠폰사용하기
        </button>
        <button
          type="button"
          onClick={() => onChoice("nutrition")}
          css={[
            css`
              padding: 14px 8px;
              background: transparent;
              border: none;
              color: inherit;
              font: inherit;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 4px;
              border-right: 1px solid rgba(255, 255, 255, 0.2);
              line-height: 1.2;
              &:active {
                background: rgba(0, 0, 0, 0.08);
              }
            `,
            shakeWhen(rejectedChoiceId, "nutrition"),
          ]}
        >
          ⓘ 알레르기/
          <br />
          영양성분
        </button>
        <button
          type="button"
          onClick={() => onChoice("exit")}
          css={[
            css`
              padding: 14px 10px;
              background: transparent;
              border: none;
              color: inherit;
              font: inherit;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 6px;
              &:active {
                background: rgba(0, 0, 0, 0.08);
              }
            `,
            shakeWhen(rejectedChoiceId, "exit"),
          ]}
        >
          ← 나가기
        </button>
      </div>
    </div>
  );
}
