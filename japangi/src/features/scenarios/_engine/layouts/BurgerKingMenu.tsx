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

// Image placeholders sourced from Wikimedia Commons (BK Korea's CDN content
// is JS-rendered and not directly fetchable). The two URLs below are
// repeated across items as visual stand-ins.
const WHOPPER_A =
  "https://upload.wikimedia.org/wikipedia/commons/c/c8/Whopper.jpg";
const WHOPPER_B =
  "https://upload.wikimedia.org/wikipedia/commons/1/1a/Burger_King_Whopper.jpg";
const BK_LOGO =
  "https://upload.wikimedia.org/wikipedia/commons/c/cc/Burger_King_2020.svg";

interface MenuItem {
  id: string;
  name: string;
  price: string;
  isNew?: boolean;
  imageUrl: string;
}

const TABS: ReadonlyArray<{
  id: string;
  label: string;
  items: ReadonlyArray<MenuItem>;
}> = [
  {
    id: "recommend",
    label: "추천메뉴",
    items: [
      { id: "white-feta-single", name: "오리지널스 화이트 페타 싱글", price: "9,900원~", isNew: true, imageUrl: WHOPPER_A },
      { id: "white-feta-double", name: "오리지널스 화이트 페타 더블", price: "13,900원~", isNew: true, imageUrl: WHOPPER_B },
      { id: "truffle-pack", name: "트러플 머쉬룸 와퍼 팩", price: "17,900원~", isNew: true, imageUrl: WHOPPER_A },
      { id: "truffle-whopper", name: "트러플 머쉬룸 와퍼", price: "8,500원~", isNew: true, imageUrl: WHOPPER_B },
      { id: "deep-truffle-double", name: "딥 트러플 머쉬룸 더블", price: "9,500원~", isNew: true, imageUrl: WHOPPER_A },
      { id: "truffle-junior", name: "트러플 머쉬룸 와퍼 주니어", price: "5,500원~", isNew: true, imageUrl: WHOPPER_B },
      { id: "doottoom", name: "두툼버거", price: "12,500원~", isNew: true, imageUrl: WHOPPER_A },
      { id: "doottoom-double", name: "두툼버거 더블", price: "15,000원~", isNew: true, imageUrl: WHOPPER_B },
      { id: "monster-whopper", name: "몬스터 와퍼", price: "9,300원~", isNew: true, imageUrl: WHOPPER_A },
    ],
  },
  {
    id: "originals",
    label: "오리지널스&맥시멈",
    items: [
      { id: "originals-classic", name: "오리지널스 클래식", price: "7,900원~", imageUrl: WHOPPER_A },
      { id: "originals-bbq", name: "오리지널스 바베큐", price: "8,500원~", imageUrl: WHOPPER_B },
      { id: "maximum-bulgogi", name: "맥시멈 불고기", price: "9,800원~", imageUrl: WHOPPER_A },
    ],
  },
  {
    id: "premium",
    label: "프리미엄",
    items: [
      { id: "premium-blackbean", name: "콰트로치즈와퍼", price: "10,100원~", imageUrl: WHOPPER_A },
      { id: "premium-quattro", name: "스태커 4", price: "11,500원~", imageUrl: WHOPPER_B },
    ],
  },
  {
    id: "whopper-junior",
    label: "와퍼&주니어",
    items: [
      { id: "whopper", name: "와퍼", price: "8,400원~", imageUrl: WHOPPER_B },
      { id: "cheesewhopper", name: "치즈와퍼", price: "8,900원~", imageUrl: WHOPPER_A },
      { id: "tendercrisp", name: "텐더크리스프", price: "7,300원~", imageUrl: WHOPPER_B },
      { id: "shrimpwhopper", name: "통새우와퍼", price: "9,500원~", imageUrl: WHOPPER_A },
      { id: "whopper-junior", name: "와퍼 주니어", price: "5,500원~", imageUrl: WHOPPER_B },
    ],
  },
  {
    id: "chicken-shrimp",
    label: "치킨&슈림프\n버거",
    items: [
      { id: "chickenking", name: "치킨킹", price: "7,900원~", imageUrl: WHOPPER_A },
      { id: "chickenking-blt", name: "치킨킹 BLT", price: "8,500원~", imageUrl: WHOPPER_B },
    ],
  },
  {
    id: "allday",
    label: "올데이킹\n&킹모닝",
    items: [
      { id: "allday-king", name: "올데이킹", price: "4,300원~", imageUrl: WHOPPER_A },
      { id: "morning-king", name: "킹모닝 머핀", price: "3,500원~", imageUrl: WHOPPER_B },
    ],
  },
  {
    id: "side",
    label: "사이드",
    items: [
      { id: "side-fries", name: "후렌치 후라이", price: "2,500원~", imageUrl: WHOPPER_A },
      { id: "side-onion", name: "어니언링", price: "2,800원~", imageUrl: WHOPPER_B },
      { id: "side-nuggets", name: "치킨너겟", price: "3,200원~", imageUrl: WHOPPER_A },
    ],
  },
  {
    id: "drink-dessert",
    label: "음료&디저트",
    items: [
      { id: "drink-coke", name: "코카콜라", price: "2,200원~", imageUrl: BK_LOGO },
      { id: "drink-sprite", name: "스프라이트", price: "2,200원~", imageUrl: BK_LOGO },
      { id: "dessert-sundae", name: "선데", price: "1,800원~", imageUrl: BK_LOGO },
    ],
  },
];

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
            {item.isNew === true && (
              <span
                css={css`
                  position: absolute;
                  top: 6px;
                  left: 6px;
                  background: #d62300;
                  color: #ffffff;
                  font-size: 9px;
                  font-weight: 800;
                  padding: 2px 6px;
                  border-radius: 4px;
                  letter-spacing: 0.04em;
                `}
              >
                NEW
              </span>
            )}
            <img
              src={item.imageUrl}
              alt={item.name}
              loading="lazy"
              style={{
                width: 72,
                height: 72,
                objectFit: "contain",
                marginTop: item.isNew === true ? 14 : 6,
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
            <span
              css={css`
                font-size: 13px;
                font-weight: 800;
                color: #d62300;
              `}
            >
              {item.price}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
