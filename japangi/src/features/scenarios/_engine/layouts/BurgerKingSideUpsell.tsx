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

const CDN = "https://mob-prd.burgerking.co.kr/images/menu/web/main";

interface SideItem {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  badge?: string;
}

const SIDE_ITEMS: ReadonlyArray<SideItem> = [
  {
    id: "creamy-mozzaball",
    name: "크리미모짜볼 (5조각)",
    price: "2,600원",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Mozzarella_sticks.jpg/200px-Mozzarella_sticks.jpg",
  },
  {
    id: "2030348",
    name: "코코넛슈림프(3조각)\n+스위트칠리소스",
    price: "3,900원",
    imageUrl: `${CDN}/2025/01/06/b0eb0ebd-7603-4a03-ab2e-dcb2bb7506d1.png`,
    badge: "스위트칠리소스",
  },
  {
    id: "2030420",
    name: "바삭킹 2조각",
    price: "3,000원",
    imageUrl: `${CDN}/2025/01/06/f3792d8c-339f-47fd-bb5b-f40733991c1f.png`,
  },
  {
    id: "6080072",
    name: "디아블로소스",
    price: "500원",
    imageUrl: `${CDN}/2025/01/06/e97ab984-e2f0-48e8-8a28-47bb41e1fa7e.png`,
  },
];

export function BurgerKingSideUpsell({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const hasSelection = selectedIds.size > 0;

  function toggleItem(id: string): void {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div
      css={css`
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.35);
        padding: 16px;
        min-height: calc(100dvh - 80px);
      `}
    >
      <div
        css={css`
          background: #ffffff;
          border-radius: 18px;
          width: 100%;
          max-width: 420px;
          padding: 22px 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
        `}
      >
        {/* Title */}
        <div
          css={css`
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 6px;
            padding-bottom: 8px;
            border-bottom: 1px solid #e5e8eb;
          `}
        >
          <span
            css={css`
              font-size: 20px;
              font-weight: 800;
              color: #2a1408;
            `}
          >
            추가 선택하기
          </span>
          <span
            css={css`
              font-size: 13px;
              font-weight: 600;
              color: #4e5968;
            `}
          >
            함께하면 더 맛있어지는 베스트메뉴
          </span>
        </div>

        {/* Side items grid */}
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px 10px;
            padding: 4px 0;
          `}
        >
          {SIDE_ITEMS.map((item) => {
            const selected = selectedIds.has(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleItem(item.id)}
                css={[
                  css`
                    background: ${selected ? "#fff5e6" : "transparent"};
                    border: 1.5px solid ${selected ? "#e07a1a" : "transparent"};
                    border-radius: 12px;
                    padding: 8px 4px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 6px;
                    cursor: pointer;
                    position: relative;
                    font-family: inherit;
                    &:active {
                      background: #fff5e6;
                    }
                  `,
                  shakeWhen(rejectedChoiceId, item.id),
                ]}
              >
                {item.badge !== undefined && (
                  <span
                    css={css`
                      position: absolute;
                      top: -4px;
                      left: 50%;
                      transform: translateX(-50%);
                      font-size: 8px;
                      color: #2a1408;
                      white-space: nowrap;
                    `}
                  >
                    {item.badge} ↗
                  </span>
                )}
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  loading="lazy"
                  style={{
                    width: 72,
                    height: 60,
                    objectFit: "contain",
                    marginTop: item.badge !== undefined ? 6 : 0,
                  }}
                />
                <span
                  css={css`
                    font-size: 11px;
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
            );
          })}
        </div>

        {/* Bottom actions */}
        <div
          css={css`
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 10px;
            padding-top: 6px;
          `}
        >
          <button
            type="button"
            onClick={() => onChoice("decline-side")}
            css={[
              css`
                height: 54px;
                background: #4a2412;
                color: #ffffff;
                border: none;
                border-radius: 999px;
                font-size: 17px;
                font-weight: 800;
                cursor: pointer;
                &:active {
                  background: #2a1408;
                }
              `,
              shakeWhen(rejectedChoiceId, "decline-side"),
              idlePulse(
                idleHintActive,
                step.correctChoiceId === "decline-side",
              ),
            ]}
          >
            아니오
          </button>
          <button
            type="button"
            disabled={!hasSelection}
            onClick={() => onChoice("add-side")}
            css={[
              css`
                height: 54px;
                background: ${hasSelection ? "#e07a1a" : "#d8d8d8"};
                color: ${hasSelection ? "#ffffff" : "#8b95a1"};
                border: none;
                border-radius: 999px;
                font-size: 17px;
                font-weight: 800;
                cursor: ${hasSelection ? "pointer" : "not-allowed"};
                &:active {
                  background: ${hasSelection ? "#c66614" : "#d8d8d8"};
                }
              `,
              shakeWhen(rejectedChoiceId, "add-side"),
            ]}
          >
            추가하기
          </button>
        </div>
      </div>
    </div>
  );
}
