import { css, keyframes } from "@emotion/react";
import { useMemo, useState } from "react";

import {
  KFC_CATEGORY_ITEMS,
  KFC_CATEGORY_ORDER,
  KFC_CATEGORY_TITLES,
  KFC_CHICKEN_GROUPS,
  KFC_IMAGE_BY_SLUG,
  type KfcCategoryKey,
  type KfcChickenGroup,
  type KfcMenuItem,
} from "./kfcMenuData";
import { idlePulse, type CustomLayoutProps } from "./types";
import { useDecoShake } from "./useDecoShake";

const CHICKEN_PAGE_SIZE = 9;

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

  // When this layout is rendered for the "menu-with-cart" step, the cart
  // is pre-populated with the user's chosen set + side; menu cards become
  // inert and the 주문하기 button takes over as the only valid choice.
  const cartPopulated = step.id === "menu-with-cart";

  const [activeTab, setActiveTab] = useState<KfcCategoryKey>("recommend");
  const [pageByTab, setPageByTab] = useState<Record<KfcCategoryKey, number>>({
    recommend: 0,
    burger: 0,
    chicken: 0,
    side: 0,
    drink: 0,
  });
  const [chickenModal, setChickenModal] = useState<KfcChickenGroup | null>(
    null,
  );
  const [dineMode, setDineMode] = useState<"dine-in" | "takeout">("takeout");
  const { shakeNow, shakeStyle } = useDecoShake();

  const isChickenGrouped = activeTab === "chicken";
  const items = isChickenGrouped ? [] : KFC_CATEGORY_ITEMS[activeTab];
  const chickenGroups = isChickenGrouped ? KFC_CHICKEN_GROUPS : [];

  const pageCount = isChickenGrouped
    ? Math.max(1, Math.ceil(chickenGroups.length / CHICKEN_PAGE_SIZE))
    : Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const page = pageByTab[activeTab];
  const visible = useMemo(
    () => items.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [items, page],
  );
  const visibleChicken = useMemo(
    () =>
      chickenGroups.slice(
        page * CHICKEN_PAGE_SIZE,
        (page + 1) * CHICKEN_PAGE_SIZE,
      ),
    [chickenGroups, page],
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
        min-height: 100%;
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
        <button
          type="button"
          onClick={() => setDineMode("dine-in")}
          css={[modeChip, dineMode === "dine-in" && modeChipActive]}
        >
          매장 식사
        </button>
        <button
          type="button"
          onClick={() => setDineMode("takeout")}
          css={[modeChip, dineMode === "takeout" && modeChipActive]}
        >
          포장 주문
        </button>
        <div css={css`flex: 1;`} />
        <button
          type="button"
          onClick={() => shakeNow("info")}
          css={[infoChip, shakeStyle("info")]}
        >
          영양정보
        </button>
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
            {isChickenGrouped
              ? visibleChicken.map((g) => (
                  <ChickenGroupCard
                    key={g.id}
                    group={g}
                    onClick={() => setChickenModal(g)}
                  />
                ))
              : visible.map((item) => {
                  const isCorrect =
                    !cartPopulated &&
                    activeTab === correctCategory &&
                    item.id === correctId;
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
            {Array.from({
              length:
                (isChickenGrouped ? CHICKEN_PAGE_SIZE : PAGE_SIZE) -
                (isChickenGrouped ? visibleChicken.length : visible.length),
            }).map((_, i) => (
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
              {isChickenGrouped
                ? `${page * CHICKEN_PAGE_SIZE + 1}–${Math.min(
                    (page + 1) * CHICKEN_PAGE_SIZE,
                    chickenGroups.length,
                  )} / ${chickenGroups.length}`
                : `${page * PAGE_SIZE + 1}–${Math.min(
                    (page + 1) * PAGE_SIZE,
                    items.length,
                  )} / ${items.length}`}
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
          <span css={css`font-weight: 900; color: #2a1408;`}>주문 수량</span>
          <span
            css={css`
              background: ${cartPopulated ? "#e4002b" : "#2a1408"};
              color: #ffffff;
              font-size: 10px;
              font-weight: 900;
              padding: 1px 6px;
              border-radius: 4px;
            `}
          >
            {cartPopulated ? 2 : 0}
          </span>
        </div>
        <div css={css`display:flex; align-items:center; gap:6px; font-weight: 800;`}>
          <span style={{ color: "#4e5968", fontSize: 10 }}>주문금액</span>
          <span style={{ color: "#2a1408", fontSize: 15, fontWeight: 900 }}>
            {cartPopulated ? "11,600" : "₩0"}
          </span>
        </div>
      </div>

      {cartPopulated ? (
        <div
          css={css`
            background: #ffffff;
            padding: 4px 14px 6px;
            display: flex;
            flex-direction: column;
            gap: 4px;
            font-size: 11px;
            color: #2a1408;
          `}
        >
          <CartLine name="징거세트 (구:스쿨처플러스버거)" qty={1} price="9,300" />
          <CartLine name="프렌치프라이(M)" qty={1} price="2,300" />
        </div>
      ) : (
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
      )}

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
        <button
          type="button"
          onClick={() => shakeNow("coupon")}
          css={[footerBtn, couponBtn, shakeStyle("coupon")]}
        >
          🎟️ 쿠폰사용
        </button>
        <button
          type="button"
          onClick={() => shakeNow("cancel-all")}
          css={[footerBtn, cancelBtn, shakeStyle("cancel-all")]}
        >
          전체취소
        </button>
        {cartPopulated ? (
          <button
            type="button"
            onClick={() => onChoice(correctId)}
            css={[
              footerBtn,
              confirmActiveBtn,
              idlePulse(idleHintActive, true),
            ]}
          >
            🛍️ 주문하기
          </button>
        ) : (
          <button
            type="button"
            onClick={() => shakeNow("confirm-empty")}
            css={[footerBtn, confirmBtn, shakeStyle("confirm-empty")]}
          >
            🛍️ 주문확인
          </button>
        )}
      </div>

      {chickenModal && (
        <ChickenModal
          group={chickenModal}
          onClose={() => setChickenModal(null)}
        />
      )}
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

function ChickenGroupCard({
  group,
  onClick,
}: {
  group: KfcChickenGroup;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} css={[menuCard]}>
      <div css={imgBox}>
        {group.cardImageUrl ? (
          <img
            src={group.cardImageUrl}
            alt={group.name}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ) : (
          <span style={{ fontSize: 28 }}>🍗</span>
        )}
        {group.badge && (
          <span
            css={[
              cardBadge,
              css`
                background: ${group.badge === "추천" ? "#e4002b" : "#f59f00"};
              `,
            ]}
          >
            {group.badge}
          </span>
        )}
      </div>
      <div css={cardLabel}>{group.name}</div>
      <div css={cardPrice}>{group.fromPrice}</div>
    </button>
  );
}

const modalPopIn = keyframes`
  0%   { transform: scale(0.94); opacity: 0; }
  100% { transform: scale(1);    opacity: 1; }
`;

function ChickenModal({
  group,
  onClose,
}: {
  group: KfcChickenGroup;
  onClose: () => void;
}) {
  return (
    <div
      css={css`
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        z-index: 9000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
      `}
      onClick={onClose}
    >
      <div
        css={css`
          width: 100%;
          max-width: 420px;
          max-height: 92vh;
          overflow-y: auto;
          background: #ffffff;
          border-radius: 14px;
          padding: 16px 16px 12px;
          animation: ${modalPopIn} 220ms ease-out;
          display: flex;
          flex-direction: column;
          gap: 12px;
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* KFC red stripe */}
        <div
          css={css`
            display: flex;
            gap: 4px;
          `}
        >
          <span css={modalStripe} />
          <span css={modalStripe} />
          <span css={modalStripe} />
        </div>

        {/* Header row: image + title + description */}
        <div
          css={css`
            display: grid;
            grid-template-columns: 110px 1fr;
            align-items: center;
            gap: 10px;
          `}
        >
          {group.modalImageUrl ? (
            <img
              src={group.modalImageUrl}
              alt={group.name}
              style={{ width: "100%", aspectRatio: "1/1", objectFit: "contain" }}
            />
          ) : (
            <span style={{ fontSize: 52, textAlign: "center" }}>🍗</span>
          )}
          <div css={css`text-align: right;`}>
            <div
              css={css`
                font-size: 22px;
                font-weight: 900;
                color: #2a1408;
                letter-spacing: -0.03em;
                line-height: 1.1;
              `}
            >
              {group.name}
            </div>
            <div
              css={css`
                font-size: 11px;
                font-weight: 700;
                color: #4e5968;
                padding-top: 6px;
                line-height: 1.35;
              `}
            >
              {group.description}
            </div>
          </div>
        </div>

        {/* Variant rows */}
        <div css={css`display: flex; flex-direction: column; gap: 8px;`}>
          {group.variants.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={onClose}
              css={css`
                display: grid;
                grid-template-columns: 24px 1fr 64px;
                align-items: center;
                gap: 10px;
                padding: 8px 10px;
                background: #ffffff;
                border: 1.5px solid #e5e8eb;
                border-radius: 10px;
                cursor: pointer;
                font-family: inherit;
                text-align: left;
                :active {
                  background: #f6f7f9;
                }
              `}
            >
              <div
                css={css`
                  width: 22px;
                  height: 22px;
                  border-radius: 50%;
                  border: 1.5px solid #d1d5da;
                  background: #ffffff;
                  color: #c9cdd2;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 13px;
                `}
              >
                ✓
              </div>
              <div>
                <div
                  css={css`
                    font-size: 14px;
                    font-weight: 900;
                    color: #2a1408;
                    line-height: 1.15;
                  `}
                >
                  {v.label}
                </div>
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    padding-top: 4px;
                    font-size: 10px;
                    font-weight: 700;
                    color: #4e5968;
                  `}
                >
                  <span
                    css={css`
                      background: #e4002b;
                      color: #ffffff;
                      font-size: 9px;
                      font-weight: 900;
                      padding: 1px 5px;
                      border-radius: 3px;
                    `}
                  >
                    구성
                  </span>
                  {v.composition}
                </div>
                <div
                  css={css`
                    font-size: 15px;
                    font-weight: 900;
                    color: #2a1408;
                    padding-top: 4px;
                  `}
                >
                  {v.price}
                </div>
              </div>
              {KFC_IMAGE_BY_SLUG[v.id] ? (
                <img
                  src={KFC_IMAGE_BY_SLUG[v.id]}
                  alt={v.label}
                  style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <span style={{ fontSize: 32, textAlign: "right" }}>🍗</span>
              )}
            </button>
          ))}
        </div>

        {/* Pagination dots (decorative) */}
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 4px 0 2px;
          `}
        >
          <span css={modalDot}>▲</span>
          <span css={[modalDot, modalDotMuted]}>▼</span>
        </div>

        {/* Close buttons */}
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1.6fr;
            gap: 10px;
          `}
        >
          <button type="button" onClick={onClose} css={modalPrev}>
            이전
          </button>
          <button type="button" onClick={onClose} css={modalNext}>
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

const modalStripe = css`
  width: 14px;
  height: 22px;
  background: #e4002b;
  border-radius: 2px;
`;

const modalDot = css`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #e5e8eb;
  color: #2a1408;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 800;
`;

const modalDotMuted = css`
  background: #f2f3f4;
  color: #c9cdd2;
`;

const modalPrev = css`
  background: #ffffff;
  border: 1.5px solid #d1d5da;
  border-radius: 999px;
  padding: 10px;
  font-size: 13px;
  font-weight: 800;
  color: #2a1408;
  font-family: inherit;
  cursor: pointer;
  :active {
    background: #f6f7f9;
  }
`;

const modalNext = css`
  background: #e4002b;
  color: #ffffff;
  border: none;
  border-radius: 999px;
  padding: 10px;
  font-size: 13px;
  font-weight: 900;
  font-family: inherit;
  cursor: pointer;
  :active {
    filter: brightness(0.92);
  }
`;

function CartLine({
  name,
  qty,
  price,
}: {
  name: string;
  qty: number;
  price: string;
}) {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 1fr auto auto;
        align-items: center;
        gap: 8px;
        padding: 3px 0;
        border-bottom: 1px dashed #e5e8eb;
      `}
    >
      <span
        css={css`
          font-size: 11px;
          font-weight: 800;
          color: #2a1408;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        `}
      >
        {name}
      </span>
      <span
        css={css`
          background: #e4002b;
          color: #ffffff;
          font-size: 10px;
          font-weight: 900;
          padding: 1px 6px;
          border-radius: 3px;
        `}
      >
        +{qty}
      </span>
      <span
        css={css`
          font-size: 12px;
          font-weight: 900;
          color: #2a1408;
          min-width: 48px;
          text-align: right;
        `}
      >
        {price}
      </span>
    </div>
  );
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

const confirmActiveBtn = css`
  background: #e4002b;
  color: #ffffff;
`;
