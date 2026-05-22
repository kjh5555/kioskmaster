import { css, keyframes } from "@emotion/react";
import { useState } from "react";

import type { CustomLayoutProps } from "./types";
import {
  MCDONALDS_CATEGORY_ITEMS,
  MCDONALDS_CATEGORY_TITLES,
  type MenuItem,
} from "./mcdonaldsMenu";

const shakeKf = keyframes`
  0%   { transform: translateX(0); }
  20%  { transform: translateX(-8px); }
  40%  { transform: translateX(8px); }
  60%  { transform: translateX(-5px); }
  80%  { transform: translateX(5px); }
  100% { transform: translateX(0); }
`;

const SIDEBAR_ITEMS = [
  { id: "home", emoji: "🏠", label: "홈" },
  { id: "recommend", emoji: "⭐", label: "추천메뉴" },
  { id: "lunch", emoji: "🍔", label: "맥런치" },
  { id: "burger", emoji: "🍔", label: "버거" },
  { id: "happysnack", emoji: "🥯", label: "해피스낵" },
  { id: "side", emoji: "🍟", label: "사이드" },
  { id: "coffee", emoji: "☕", label: "커피" },
  { id: "dessert", emoji: "🍦", label: "디저트" },
  { id: "drink", emoji: "🥤", label: "음료" },
  { id: "happymeal", emoji: "🎁", label: "해피밀" },
];

const MENU_CARDS = [
  { id: "recommend", emoji: "⭐", label: "추천메뉴" },
  { id: "lunch", emoji: "🍔🍟", label: "맥런치" },
  { id: "happysnack", emoji: "🥯", label: "이달의\n해피스낵" },
  { id: "coffee-dessert", emoji: "☕🍦", label: "커피&디저트" },
];

function MenuItemCard({
  item,
  onClick,
  isShaking,
}: {
  item: MenuItem;
  onClick?: () => void;
  isShaking?: boolean;
}): React.ReactElement {
  const interactive = onClick !== undefined;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!interactive}
      css={[
        css`
          background: #fff;
          border: 1px solid #e5e8eb;
          border-radius: 12px;
          padding: 12px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          position: relative;
          width: 100%;
          text-align: center;
          cursor: ${interactive ? "pointer" : "default"};
          user-select: none;
          font-family: inherit;
          &:active {
            background: ${interactive ? "#f5f5f5" : "#fff"};
          }
        `,
        isShaking === true &&
          css`
            animation: ${shakeKf} 350ms ease;
          `,
      ]}
    >
      {item.isNew === true && (
        <div
          css={css`
            position: absolute;
            top: 6px;
            left: 6px;
            background: #ffc72c;
            color: #191f28;
            font-size: 9px;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 999px;
          `}
        >
          신제품
        </div>
      )}
      <span
        style={{
          fontSize: 36,
          lineHeight: 1,
          marginTop: item.isNew === true ? 14 : 0,
        }}
      >
        {item.emoji}
      </span>
      <span
        css={css`
          font-size: 13px;
          font-weight: 700;
          color: #191f28;
          text-align: center;
          line-height: 1.3;
          word-break: keep-all;
        `}
      >
        {item.name}
      </span>
      <span
        css={css`
          font-size: 11px;
          color: #888;
          text-align: center;
        `}
      >
        {item.price} · {item.kcal}
      </span>
    </button>
  );
}

function CategoryGridView({
  categoryId,
  onItemChoice,
  rejectedChoiceId,
}: {
  categoryId: string;
  onItemChoice: (itemId: string) => void;
  rejectedChoiceId: string | null;
}): React.ReactElement {
  const title = MCDONALDS_CATEGORY_TITLES[categoryId] ?? categoryId;
  const items = MCDONALDS_CATEGORY_ITEMS[categoryId] ?? [];

  return (
    <div
      css={css`
        padding: 16px 12px 12px;
        flex: 1;
      `}
    >
      <div
        css={css`
          font-size: 22px;
          font-weight: 800;
          color: #191f28;
          line-height: 1.2;
          margin-bottom: 14px;
        `}
      >
        {title}
      </div>
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        `}
      >
        {items.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onClick={() => onItemChoice(item.id)}
            isShaking={rejectedChoiceId === item.id}
          />
        ))}
      </div>
    </div>
  );
}

export function McdonaldsCategory({
  step,
  onChoice,
  rejectedChoiceId,
}: CustomLayoutProps): React.ReactElement {
  const isCartPopulated = step.id === "post-cart-category";
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  function handleSidebarClick(id: string): void {
    if (id === "home") {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(id);
    }
  }

  function isActive(id: string): boolean {
    if (id === "home") return selectedCategory === null;
    return selectedCategory === id;
  }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        min-height: calc(100dvh - 80px);
        width: 100%;
        overflow: hidden;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
        background: #fff;
      `}
    >
      {/* ── Left sidebar ── */}
      <div
        css={css`
          width: 22%;
          min-width: 72px;
          max-width: 100px;
          background: #f5f5f5;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          border-right: 1px solid #e5e8eb;
          flex-shrink: 0;
        `}
      >
        {/* M logo */}
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 12px 0 10px;
            border-bottom: 1px solid #e5e8eb;
          `}
        >
          <span
            css={css`
              font-size: 38px;
              font-weight: 900;
              color: #ffc72c;
              line-height: 1;
              font-family:
                system-ui,
                -apple-system,
                sans-serif;
            `}
          >
            M
          </span>
        </div>

        {/* Category buttons */}
        {SIDEBAR_ITEMS.map((item) => {
          const active = isActive(item.id);
          return (
            <button
              key={item.id}
              css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 2px;
                padding: 8px 4px;
                min-height: 44px;
                background: ${active ? "#FFF8E1" : "transparent"};
                border: none;
                border-bottom: 1px solid #e5e8eb;
                border-left: ${active
                  ? "3px solid #FFC72C"
                  : "3px solid transparent"};
                cursor: pointer;
                user-select: none;
                transition: background 100ms ease;

                &:active {
                  background: #fff3cd;
                }
              `}
              onClick={() => {
                handleSidebarClick(item.id);
              }}
            >
              <span style={{ fontSize: 16, lineHeight: 1 }}>{item.emoji}</span>
              <span
                css={css`
                  font-size: 11px;
                  color: #333;
                  font-weight: ${active ? 700 : 500};
                  line-height: 1.2;
                  text-align: center;
                  word-break: keep-all;
                `}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Main content area ── */}
      <div
        css={css`
          flex: 1;
          overflow-y: auto;
          background: #fff;
          display: flex;
          flex-direction: column;
        `}
      >
        {selectedCategory === null ? (
          /* ── Default home view ── */
          <>
            {/* A. Top heading */}
            <div
              css={css`
                padding: 16px 16px 10px;
              `}
            >
              <div
                css={css`
                  font-size: 22px;
                  font-weight: 800;
                  color: #191f28;
                  line-height: 1.2;
                `}
              >
                탁월한 선택! 맥런치
              </div>
              <div
                css={css`
                  font-size: 14px;
                  color: #555;
                  margin-top: 4px;
                `}
              >
                메뉴 알아보기
              </div>
            </div>

            {/* B. 2x2 menu cards */}
            <div
              css={css`
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
                padding: 0 12px 12px;
              `}
            >
              {MENU_CARDS.map((card) => (
                <button
                  key={card.id}
                  css={css`
                    background: #fff;
                    border: 1px solid #e5e8eb;
                    border-radius: 14px;
                    padding: 16px;
                    min-height: 90px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: space-between;
                    cursor: pointer;
                    user-select: none;
                    text-align: left;
                    transition: background 100ms ease;

                    &:active {
                      background: #fffbea;
                    }
                  `}
                  onClick={() => {
                    setSelectedCategory(card.id);
                  }}
                >
                  <span
                    css={css`
                      font-size: 13px;
                      font-weight: 700;
                      color: #191f28;
                      line-height: 1.4;
                      white-space: pre-line;
                    `}
                  >
                    {card.label}
                  </span>
                  <span style={{ fontSize: 22, lineHeight: 1, marginTop: 6 }}>
                    {card.emoji}
                  </span>
                </button>
              ))}
            </div>

            {/* C. Promo banners (decorative) */}
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 8px;
                padding: 0 12px 12px;
              `}
            >
              {/* Banner 1: ice cream latte */}
              <div
                css={css`
                  background: linear-gradient(135deg, #4a9fd4, #6bb6dc);
                  border-radius: 14px;
                  min-height: 88px;
                  padding: 14px 16px;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: space-between;
                  position: relative;
                  overflow: hidden;
                `}
              >
                <div
                  css={css`
                    position: absolute;
                    top: 10px;
                    left: 12px;
                    background: #fff;
                    color: #4a9fd4;
                    font-size: 10px;
                    font-weight: 800;
                    padding: 2px 8px;
                    border-radius: 20px;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                  `}
                >
                  new
                </div>
                <div
                  css={css`
                    margin-top: 14px;
                  `}
                >
                  <div
                    css={css`
                      font-size: 13px;
                      font-weight: 800;
                      color: #fff;
                      line-height: 1.4;
                      white-space: pre-line;
                    `}
                  >
                    {"달콤한 아이스크림과\n진한 라떼의 만남!"}
                  </div>
                </div>
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 2px;
                    flex-shrink: 0;
                  `}
                >
                  <span style={{ fontSize: 32, lineHeight: 1 }}>🍦</span>
                  <span
                    css={css`
                      font-size: 10px;
                      color: #e0f0ff;
                      font-weight: 600;
                    `}
                  >
                    Ice Cream Latte
                  </span>
                </div>
              </div>

              {/* Banner 2: mcwing */}
              <div
                css={css`
                  background: linear-gradient(135deg, #d4b070, #e8c588);
                  border-radius: 14px;
                  min-height: 88px;
                  padding: 14px 16px;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: space-between;
                  position: relative;
                  overflow: hidden;
                `}
              >
                <div
                  css={css`
                    position: absolute;
                    top: 10px;
                    left: 12px;
                    background: #fff;
                    color: #b07a20;
                    font-size: 10px;
                    font-weight: 800;
                    padding: 2px 8px;
                    border-radius: 20px;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                  `}
                >
                  new
                </div>
                <div
                  css={css`
                    margin-top: 14px;
                  `}
                >
                  <div
                    css={css`
                      font-size: 13px;
                      font-weight: 800;
                      color: #4a2e00;
                      line-height: 1.4;
                      white-space: pre-line;
                    `}
                  >
                    {"겉은 바삭! 속은 쫄깃!\n여름엔 역시 맥윙"}
                  </div>
                </div>
                <div
                  css={css`
                    font-size: 32px;
                    line-height: 1;
                    flex-shrink: 0;
                  `}
                >
                  🍗🍗
                </div>
              </div>
            </div>

            {/* D. Popular menu section (decorative) */}
            <div
              css={css`
                padding: 0 12px 12px;
              `}
            >
              <div
                css={css`
                  font-size: 16px;
                  font-weight: 700;
                  color: #191f28;
                  margin-bottom: 10px;
                `}
              >
                인기 메뉴
              </div>
              <div
                css={css`
                  display: flex;
                  flex-direction: row;
                  gap: 8px;
                `}
              >
                {/* Card: 빅맥 */}
                <div
                  css={css`
                    flex: 1;
                    background: #fff;
                    border: 1px solid #e5e8eb;
                    border-radius: 12px;
                    padding: 12px 8px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    min-height: 90px;
                  `}
                >
                  <span style={{ fontSize: 28, lineHeight: 1 }}>🍔</span>
                  <span
                    css={css`
                      font-size: 12px;
                      font-weight: 700;
                      color: #191f28;
                      text-align: center;
                      line-height: 1.3;
                    `}
                  >
                    빅맥
                  </span>
                  <span
                    css={css`
                      font-size: 10px;
                      color: #888;
                      text-align: center;
                      line-height: 1.3;
                    `}
                  >
                    ₩4,800 · 583kcal
                  </span>
                </div>

                {/* Card: 맥스파이시 상하이버거 */}
                <div
                  css={css`
                    flex: 1;
                    background: #fff;
                    border: 1px solid #e5e8eb;
                    border-radius: 12px;
                    padding: 12px 8px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    min-height: 90px;
                  `}
                >
                  <span style={{ fontSize: 28, lineHeight: 1 }}>🍔</span>
                  <span
                    css={css`
                      font-size: 11px;
                      font-weight: 700;
                      color: #191f28;
                      text-align: center;
                      line-height: 1.3;
                    `}
                  >
                    맥스파이시
                    <br />
                    상하이버거
                  </span>
                  <span
                    css={css`
                      font-size: 10px;
                      color: #888;
                      text-align: center;
                      line-height: 1.3;
                    `}
                  >
                    ₩4,800 · 694kcal
                  </span>
                </div>

                {/* Card: 세븐 메가존 코카-콜라 */}
                <div
                  css={css`
                    flex: 1;
                    background: #fff;
                    border: 1px solid #e5e8eb;
                    border-radius: 12px;
                    padding: 12px 8px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    min-height: 90px;
                    position: relative;
                  `}
                >
                  <div
                    css={css`
                      position: absolute;
                      top: 6px;
                      right: 6px;
                      background: #ffc72c;
                      color: #191f28;
                      font-size: 9px;
                      font-weight: 700;
                      padding: 1px 5px;
                      border-radius: 10px;
                    `}
                  >
                    해피스낵
                  </div>
                  <span style={{ fontSize: 28, lineHeight: 1 }}>🥤</span>
                  <span
                    css={css`
                      font-size: 11px;
                      font-weight: 700;
                      color: #191f28;
                      text-align: center;
                      line-height: 1.3;
                    `}
                  >
                    세븐 메가존
                    <br />
                    코카-콜라
                  </span>
                  <span
                    css={css`
                      font-size: 10px;
                      color: #888;
                      text-align: center;
                      line-height: 1.3;
                    `}
                  >
                    ₩1,900 · 219kcal
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* ── Category grid view ── */
          <CategoryGridView
            categoryId={selectedCategory}
            onItemChoice={onChoice}
            rejectedChoiceId={rejectedChoiceId}
          />
        )}

        {/* E. Bottom bar */}
        {isCartPopulated ? (
          /* ── Post-cart bottom bar ── */
          <div
            css={css`
              margin-top: auto;
              border-top: 1px solid #e5e8eb;
              background: #fff;
            `}
          >
            {/* Main 3-col row */}
            <div
              css={css`
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 10px 10px 6px;
                gap: 8px;
              `}
            >
              {/* Left: bag icon + price (~30%) */}
              <div
                css={css`
                  flex: 3;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  gap: 6px;
                `}
              >
                <div
                  css={css`
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                  `}
                >
                  <span style={{ fontSize: 28, lineHeight: 1 }}>🛍️</span>
                  <div
                    css={css`
                      position: absolute;
                      top: -2px;
                      right: -4px;
                      width: 14px;
                      height: 14px;
                      background: #da291c;
                      color: #fff;
                      font-size: 9px;
                      font-weight: 700;
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      line-height: 1;
                    `}
                  >
                    1
                  </div>
                </div>
                <span
                  css={css`
                    font-size: 16px;
                    font-weight: 800;
                    color: #191f28;
                    line-height: 1;
                  `}
                >
                  ₩7,800
                </span>
              </div>

              {/* Center: yellow CTA (~40%) */}
              <div
                css={css`
                  flex: 4;
                `}
              >
                <button
                  type="button"
                  onClick={() => {
                    onChoice("confirm-cart");
                  }}
                  css={[
                    css`
                      width: 100%;
                      height: 52px;
                      background: #ffc72c;
                      border: none;
                      border-radius: 10px;
                      font-size: 13px;
                      font-weight: 700;
                      color: #191f28;
                      cursor: pointer;
                      font-family: inherit;
                      line-height: 1.3;
                      word-break: keep-all;
                      &:active {
                        background: #e6b000;
                      }
                    `,
                    rejectedChoiceId === "confirm-cart" &&
                      css`
                        animation: ${shakeKf} 350ms ease;
                      `,
                  ]}
                >
                  주문내역확인 후 결제하기
                </button>
              </div>

              {/* Right: QR/points card (~30%) */}
              <button
                type="button"
                onClick={() => {
                  onChoice("point-qr");
                }}
                css={css`
                  flex: 3;
                  background: #fffbea;
                  border: 1px solid #e5e8eb;
                  border-radius: 8px;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  gap: 4px;
                  padding: 6px 6px;
                  cursor: pointer;
                  font-family: inherit;
                  &:active {
                    background: #fff3cd;
                  }
                `}
              >
                <span
                  css={css`
                    font-size: 14px;
                    font-family: monospace;
                    line-height: 1;
                    color: #191f28;
                    letter-spacing: -2px;
                    flex-shrink: 0;
                  `}
                >
                  ▣▣
                  <br />
                  ▣▢
                </span>
                <div
                  css={css`
                    text-align: left;
                  `}
                >
                  <div
                    css={css`
                      font-size: 9px;
                      font-weight: 700;
                      color: #191f28;
                      line-height: 1.3;
                    `}
                  >
                    포인트를 적립하세요
                  </div>
                  <div
                    css={css`
                      font-size: 8px;
                      color: #888;
                    `}
                  >
                    결제 전 선택 필수
                  </div>
                </div>
                <span
                  css={css`
                    font-size: 10px;
                    color: #aaa;
                    margin-left: auto;
                  `}
                >
                  ∨
                </span>
              </button>
            </div>

            {/* 처음으로 / 도움 기능 row */}
            <div
              css={css`
                display: flex;
                flex-direction: row;
                gap: 6px;
                padding: 0 10px 6px;
              `}
            >
              <button
                type="button"
                onClick={() => {
                  onChoice("home");
                }}
                css={css`
                  flex: 1;
                  font-size: 11px;
                  color: #555;
                  border: 1px solid #ddd;
                  border-radius: 6px;
                  padding: 3px 6px;
                  text-align: center;
                  background: transparent;
                  cursor: pointer;
                  font-family: inherit;
                `}
              >
                ↺ 처음으로
              </button>
              <button
                type="button"
                onClick={() => {
                  onChoice("help");
                }}
                css={css`
                  flex: 1;
                  font-size: 11px;
                  color: #555;
                  border: 1px solid #ddd;
                  border-radius: 6px;
                  padding: 3px 6px;
                  text-align: center;
                  background: transparent;
                  cursor: pointer;
                  font-family: inherit;
                `}
              >
                ♿ 도움 기능
              </button>
            </div>

            {/* Caloric note */}
            <div
              css={css`
                font-size: 9px;
                color: #aaa;
                text-align: center;
                padding: 0 10px 8px;
              `}
            >
              1일 영양성분 기준치에 대한 비율(%)은 2,000kcal 기준이므로 개인의
              필요 열량에 따라 다를 수 있습니다.
            </div>
          </div>
        ) : (
          /* ── Default (empty-cart) bottom bar ── */
          <div
            css={css`
              margin-top: auto;
              display: flex;
              flex-direction: row;
              align-items: stretch;
              border-top: 1px solid #e5e8eb;
              background: #fff;
              min-height: 56px;
            `}
          >
            {/* Left: QR / points */}
            <div
              css={css`
                flex: 3;
                background: #fffbea;
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 8px;
                padding: 8px 10px;
              `}
            >
              <span
                css={css`
                  font-size: 20px;
                  font-family: monospace;
                  line-height: 1;
                  color: #191f28;
                  letter-spacing: -2px;
                `}
              >
                ▣▣
                <br />
                ▣▢
              </span>
              <div>
                <div
                  css={css`
                    font-size: 11px;
                    font-weight: 700;
                    color: #191f28;
                    line-height: 1.3;
                  `}
                >
                  포인트를 적립하세요
                </div>
                <div
                  css={css`
                    font-size: 10px;
                    color: #888;
                  `}
                >
                  결제 전 선택 필수
                </div>
              </div>
              <span
                css={css`
                  font-size: 12px;
                  color: #aaa;
                  margin-left: auto;
                `}
              >
                ∨
              </span>
            </div>

            {/* Center: cart */}
            <div
              css={css`
                flex: 2;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border-left: 1px solid #e5e8eb;
                border-right: 1px solid #e5e8eb;
                padding: 6px 8px;
                gap: 1px;
              `}
            >
              <span style={{ fontSize: 18 }}>🛍</span>
              <span
                css={css`
                  font-size: 12px;
                  font-weight: 700;
                  color: #191f28;
                `}
              >
                ₩0
              </span>
              <span
                css={css`
                  font-size: 10px;
                  color: #888;
                `}
              >
                주문내역
              </span>
            </div>

            {/* Right: two thin buttons */}
            <div
              css={css`
                flex: 2;
                display: flex;
                flex-direction: column;
                gap: 4px;
                padding: 6px 8px;
                justify-content: center;
              `}
            >
              <div
                css={css`
                  font-size: 11px;
                  color: #555;
                  border: 1px solid #ddd;
                  border-radius: 6px;
                  padding: 3px 6px;
                  text-align: center;
                `}
              >
                ↺ 처음으로
              </div>
              <div
                css={css`
                  font-size: 11px;
                  color: #555;
                  border: 1px solid #ddd;
                  border-radius: 6px;
                  padding: 3px 6px;
                  text-align: center;
                `}
              >
                ♿ 도움 기능
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
