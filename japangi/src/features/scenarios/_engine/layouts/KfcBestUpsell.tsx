import { css } from "@emotion/react";

import { KFC_IMAGE_BY_SLUG } from "./kfcMenuData";
import { idlePulse, type CustomLayoutProps } from "./types";
import { useDecoShake } from "./useDecoShake";

type UpsellItem = {
  id: string;
  label: string;
  price: string;
  imgSlug?: string;
  emoji: string;
  badge?: "인기" | "신메뉴";
};

const ITEMS: UpsellItem[] = [
  { id: "tender-2",          label: "텐더 2조각",       price: "3,000", emoji: "🍗", imgSlug: "tender-2" },
  { id: "butter-biscuit",    label: "버터비스킷",       price: "2,500", emoji: "🥐", imgSlug: "butter-biscuit", badge: "신메뉴" },
  { id: "nugget-4",          label: "치킨너겟 4조각",   price: "2,200", emoji: "🍗", imgSlug: "nugget-4" },
  { id: "egg-tart",          label: "에그타르트(1개)",  price: "2,200", emoji: "🥮", imgSlug: "egg-tart", badge: "인기" },
  { id: "coleslaw",          label: "코울슬로(1개)",    price: "2,000", emoji: "🥗", imgSlug: "coleslaw" },
  { id: "spicy-mayo-sauce",  label: "스파이시마요소스", price: "500",   emoji: "🥫", imgSlug: "spicy-mayo-sauce" },
];

export function KfcBestUpsell({
  step,
  rejectedChoiceId: _rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const correctId = step.correctChoiceId;
  const nextChoice = step.choices.find((c) => c.id === "next");
  const prevChoice = step.choices.find((c) => c.id === "prev");
  const { shakeNow, shakeStyle } = useDecoShake();

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
      {/* KFC red stripe */}
      <div
        css={css`
          display: flex;
          gap: 4px;
          padding: 12px 14px 6px;
        `}
      >
        <span css={stripe} />
        <span css={stripe} />
        <span css={stripe} />
      </div>

      {/* Headline */}
      <div
        css={css`
          padding: 6px 16px 14px;
          font-size: 22px;
          font-weight: 900;
          color: #2a1408;
          letter-spacing: -0.03em;
          line-height: 1.2;
        `}
      >
        함께 하면 좋은 베스트 메뉴
      </div>

      {/* 3-col grid */}
      <div
        css={css`
          padding: 0 14px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 8px;
        `}
      >
        {ITEMS.map((it) => {
          const img = it.imgSlug ? KFC_IMAGE_BY_SLUG[it.imgSlug] : undefined;
          return (
            <div key={it.id} css={card}>
              <div css={cardImg}>
                {img ? (
                  <img
                    src={img}
                    alt={it.label}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                ) : (
                  <span style={{ fontSize: 36 }}>{it.emoji}</span>
                )}
                {it.badge && (
                  <span
                    css={[
                      badgeChip,
                      css`
                        background: ${it.badge === "신메뉴" ? "#1f9d3e" : "#f59f00"};
                      `,
                    ]}
                  >
                    {it.badge}
                  </span>
                )}
              </div>
              <div css={cardName}>{it.label}</div>
              <div css={cardPrice}>{it.price}</div>
            </div>
          );
        })}
        {/* 1 empty cell to keep 3x3 rhythm */}
        <div css={css`visibility: hidden;`} />
      </div>

      {/* Bottom buttons */}
      <div
        css={css`
          margin-top: auto;
          padding: 18px 14px 14px;
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 10px;
        `}
      >
        <button
          type="button"
          onClick={() => prevChoice && onChoice(prevChoice.id)}
          css={prevPill}
        >
          이전
        </button>
        <button
          type="button"
          onClick={() => nextChoice && onChoice(nextChoice.id)}
          css={[
            nextPill,
            idlePulse(idleHintActive, nextChoice?.id === correctId),
          ]}
        >
          다음
        </button>
      </div>

      {/* Footer */}
      <div
        css={css`
          background: #ededed;
          padding: 8px 14px 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12px;
          font-weight: 800;
          color: #2a1408;
        `}
      >
        <button type="button" onClick={() => shakeNow("order-doc")} css={[footerLink, shakeStyle("order-doc")]}>
          📋 주문서
        </button>
        <span css={css`flex: 1;`} />
        <button type="button" onClick={() => shakeNow("cancel-all")} css={[footerLink, css`color: #8b95a1;`, shakeStyle("cancel-all")]}>
          전체취소
        </button>
      </div>
    </div>
  );
}

const stripe = css`
  width: 14px;
  height: 24px;
  background: #e4002b;
  border-radius: 2px;
`;

const card = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 4px 4px 8px;
`;

const cardImg = css`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbfbfb;
  border-radius: 6px;
`;

const badgeChip = css`
  position: absolute;
  top: -4px;
  left: -4px;
  color: #ffffff;
  font-size: 9px;
  font-weight: 900;
  padding: 2px 6px;
  border-radius: 999px;
`;

const cardName = css`
  font-size: 11px;
  font-weight: 800;
  color: #2a1408;
  text-align: center;
  line-height: 1.2;
  word-break: keep-all;
`;

const cardPrice = css`
  font-size: 13px;
  font-weight: 900;
  color: #2a1408;
`;

const footerLink = css`
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: 12px;
  font-weight: 800;
  color: #2a1408;
  cursor: pointer;
  padding: 2px 4px;
  :active {
    filter: brightness(0.85);
  }
`;

const prevPill = css`
  background: #ffffff;
  border: 1.5px solid #d1d5da;
  border-radius: 999px;
  padding: 12px;
  font-size: 13px;
  font-weight: 800;
  color: #2a1408;
  font-family: inherit;
  cursor: pointer;
  :active {
    background: #f6f7f9;
  }
`;

const nextPill = css`
  background: #e4002b;
  color: #ffffff;
  border: none;
  border-radius: 999px;
  padding: 12px;
  font-size: 13px;
  font-weight: 900;
  font-family: inherit;
  cursor: pointer;
  :active {
    filter: brightness(0.92);
  }
`;
