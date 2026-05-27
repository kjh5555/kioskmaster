import { css, keyframes } from "@emotion/react";
import { useMemo, useState } from "react";

import {
  KFC_CATEGORY_ITEMS,
  KFC_CATEGORY_ORDER,
  KFC_CATEGORY_TITLES,
  type KfcCategoryKey,
  type KfcMenuItem,
} from "./kfcMenuData";
import { idlePulse, type CustomLayoutProps } from "./types";

const PAGE_SIZE = 9; // 3 columns × 3 rows

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

const SIDEBAR_ICON: Record<KfcCategoryKey, string> = {
  recommend: "🍗",
  burger: "🍔",
  chicken: "🍗",
  side: "🍟",
  drink: "🥤",
};

export function KfcMenu({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  // The scenario's correct burger lives in the "burger" category.
  // We render every category's real data (with pagination), and only
  // attach the onChoice handler to the correct item.
  const correctId = step.correctChoiceId;
  const correctCategory: KfcCategoryKey = "burger";

  const [activeTab, setActiveTab] = useState<KfcCategoryKey>("recommend");
  const [pageByTab, setPageByTab] = useState<Record<KfcCategoryKey, number>>({
    recommend: 0,
    burger: 0,
    chicken: 0,
    side: 0,
    drink: 0,
  });

  const items = KFC_CATEGORY_ITEMS[activeTab];
  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const page = pageByTab[activeTab];
  const visible = useMemo(
    () => items.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [items, page],
  );

  const setPage = (next: number) => {
    setPageByTab((prev) => ({
      ...prev,
      [activeTab]: Math.max(0, Math.min(pageCount - 1, next)),
    }));
  };

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
          padding: 8px 10px;
          position: relative;
        `}
      >
        <div
          css={css`
            background: #ffffff;
            color: #e4002b;
            border-radius: 4px;
            padding: 3px 6px;
            font-family: "Arial Black", sans-serif;
            font-weight: 900;
            font-style: italic;
            font-size: 12px;
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
            font-size: 16px;
            letter-spacing: 0.04em;
          `}
        >
          찍먹스 Cheers! 🍺
        </div>
        <span style={{ fontSize: 20 }}>🍗</span>
      </div>

      {/* Mode + language row ------------------------------------- */}
      <div
        css={css`
          display: flex;
          align-items: center;
          padding: 6px 10px;
          border-bottom: 1px solid #e5e8eb;
          background: #ffffff;
          gap: 6px;
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
            gap: 3px;
            border: 1px solid #d1d5da;
            border-radius: 4px;
            padding: 3px 5px;
            font-size: 9px;
            font-weight: 700;
            color: #2a1408;
          `}
        >
          <span>🇰🇷</span>
          <span style={{ opacity: 0.5 }}>🇺🇸</span>
          <span style={{ opacity: 0.5 }}>🇯🇵</span>
          <span>| KO</span>
        </div>
      </div>

      {/* Main: sidebar + grid ------------------------------------ */}
      <div
        css={css`
          flex: 1;
          display: grid;
          grid-template-columns: 64px 1fr;
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
          {KFC_CATEGORY_ORDER.map((key) => {
            const active = activeTab === key;
            const shouldPulse = !active && key === correctCategory;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                css={[
                  css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 3px;
                    padding: 14px 4px;
                    border: none;
                    background: ${active ? "#fafafa" : "transparent"};
                    border-left: 4px solid ${active ? "#e4002b" : "transparent"};
                    border-bottom: 1px solid #f0f1f3;
                    cursor: pointer;
                    font-family: inherit;
                  `,
                  idlePulse(idleHintActive, shouldPulse),
                ]}
              >
                <span style={{ fontSize: 18 }}>{SIDEBAR_ICON[key]}</span>
                <span
                  css={css`
                    font-size: 10px;
                    font-weight: ${active ? 900 : 700};
                    color: ${active ? "#e4002b" : "#4e5968"};
                    text-align: center;
                    line-height: 1.15;
                    word-break: keep-all;
                  `}
                >
                  {KFC_CATEGORY_TITLES[key]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid area --------------------------------------------- */}
        <div
          css={css`
            padding: 8px 10px 6px;
            background: #ffffff;
            display: flex;
            flex-direction: column;
            min-width: 0;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 6px;
              padding: 2px 0 6px;
              font-size: 14px;
              font-weight: 900;
              color: #2a1408;
            `}
          >
            <span style={{ fontSize: 16 }}>{SIDEBAR_ICON[activeTab]}</span>
            {KFC_CATEGORY_TITLES[activeTab]}
            <span
              css={css`
                font-size: 10px;
                font-weight: 700;
                color: #8b95a1;
                margin-left: auto;
              `}
            >
              {page + 1} / {pageCount}
            </span>
          </div>

          {/* 3 × 3 grid */}
          <div
            css={css`
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 6px;
            `}
          >
            {visible.map((item) => {
              const isCorrect =
                activeTab === correctCategory && item.id === correctId;
              const interactive = isCorrect;
              return (
                <MenuCard
                  key={item.id}
                  item={item}
                  interactive={interactive}
                  pulse={isCorrect}
                  idleHintActive={idleHintActive}
                  rejectedChoiceId={rejectedChoiceId}
                  onClick={() => {
                    if (interactive) onChoice(item.id);
                  }}
                />
              );
            })}
            {/* Fill empty cells so the grid keeps a 3-col rhythm */}
            {Array.from({ length: PAGE_SIZE - visible.length }).map((_, i) => (
              <div key={`empty-${i}`} css={emptyCell} />
            ))}
          </div>

          {/* Pagination row */}
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-top: 1px solid #e5e8eb;
              padding: 6px 0 2px;
              margin-top: 6px;
              font-size: 12px;
              font-weight: 800;
              color: #4e5968;
            `}
          >
            <button
              type="button"
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
              css={[pageBtn, page === 0 && pageBtnDisabled]}
            >
              ‹ 이전
            </button>
            <span
              css={css`
                font-size: 11px;
                color: #8b95a1;
                font-weight: 700;
              `}
            >
              {page * PAGE_SIZE + 1}–
              {Math.min((page + 1) * PAGE_SIZE, items.length)} / {items.length}
            </span>
            <button
              type="button"
              onClick={() => setPage(page + 1)}
              disabled={page >= pageCount - 1}
              css={[pageBtn, page >= pageCount - 1 && pageBtnDisabled]}
            >
              다음 ›
            </button>
          </div>
        </div>
      </div>

      {/* Cart summary -------------------------------------------- */}
      <div
        css={css`
          background: #ffffff;
          border-top: 1px solid #e5e8eb;
          padding: 6px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
        `}
      >
        <div css={css`display:flex; align-items:center; gap:6px;`}>
          <span css={css`font-weight: 900; color: #2a1408;`}>장바구니</span>
          <span
            css={css`
              background: #2a1408;
              color: #ffffff;
              font-size: 10px;
              font-weight: 900;
              padding: 1px 6px;
              border-radius: 4px;
            `}
          >
            0
          </span>
        </div>
        <div css={css`display:flex; align-items:center; gap:6px; font-weight: 800;`}>
          <span style={{ color: "#4e5968", fontSize: 10 }}>주문금액</span>
          <span style={{ color: "#2a1408", fontSize: 15, fontWeight: 900 }}>₩0</span>
        </div>
      </div>

      <div
        css={css`
          background: #ffffff;
          padding: 4px 14px;
          font-size: 10px;
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
          padding: 8px 12px 14px;
          display: grid;
          grid-template-columns: 1fr 1.4fr 1.4fr;
          gap: 6px;
        `}
      >
        <button type="button" css={[footerBtn, couponBtn]}>🎟️ 쿠폰</button>
        <button type="button" css={[footerBtn, cancelBtn]}>전체취소</button>
        <button type="button" css={[footerBtn, confirmBtn]}>🛍️ 주문확인</button>
      </div>
    </div>
  );

  function MenuCard({
    item,
    interactive,
    pulse,
    idleHintActive,
    rejectedChoiceId,
    onClick,
  }: {
    item: KfcMenuItem;
    interactive: boolean;
    pulse: boolean;
    idleHintActive: boolean;
    rejectedChoiceId: string | null;
    onClick: () => void;
  }) {
    return (
      <button
        type="button"
        onClick={onClick}
        css={[
          menuCard,
          !interactive && menuCardInert,
          shakeWhen(rejectedChoiceId, item.id),
          idlePulse(idleHintActive, pulse),
        ]}
      >
        <div css={imgBox}>
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          ) : (
            <span style={{ fontSize: 28 }}>{item.emoji}</span>
          )}
          {item.isNew && (
            <span css={[cardBadge, css`background: #1f9d3e;`]}>신메뉴</span>
          )}
        </div>
        <div css={cardLabel}>{item.name}</div>
        <div css={cardPrice}>{item.price}</div>
      </button>
    );
  }
}

const modeChip = css`
  border: 1.5px solid #d1d5da;
  background: #ffffff;
  color: #2a1408;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 800;
  padding: 5px 8px;
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
  font-size: 10px;
  font-weight: 700;
  padding: 3px 6px;
  cursor: pointer;
  font-family: inherit;
`;

const menuCard = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 6px 3px 4px;
  border: 1.5px solid transparent;
  border-radius: 6px;
  background: #ffffff;
  cursor: pointer;
  text-align: center;
  font-family: inherit;
  min-width: 0;
  :active {
    background: #f6f7f9;
  }
`;

const menuCardInert = css`
  cursor: default;
  :active {
    background: #ffffff;
  }
`;

const imgBox = css`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbfbfb;
  border-radius: 4px;
`;

const cardBadge = css`
  position: absolute;
  top: -3px;
  left: -3px;
  color: #ffffff;
  font-size: 8px;
  font-weight: 900;
  padding: 1px 4px;
  border-radius: 3px;
  line-height: 1.4;
`;

const cardLabel = css`
  font-size: 10px;
  font-weight: 800;
  color: #2a1408;
  line-height: 1.15;
  white-space: normal;
  word-break: keep-all;
  min-height: 22px;
`;

const cardPrice = css`
  font-size: 12px;
  font-weight: 900;
  color: #2a1408;
`;

const emptyCell = css`
  visibility: hidden;
  aspect-ratio: 1 / 1.4;
`;

const pageBtn = css`
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: 12px;
  font-weight: 800;
  color: #2a1408;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  :active {
    background: #f0f1f3;
  }
`;

const pageBtnDisabled = css`
  color: #c9cdd2;
  cursor: not-allowed;
`;

const footerBtn = css`
  height: 38px;
  border-radius: 999px;
  font-size: 12px;
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
