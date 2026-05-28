import { css } from "@emotion/react";

import { KFC_IMAGE_BY_SLUG } from "./kfcMenuData";
import { idlePulse, type CustomLayoutProps } from "./types";
import { useDecoShake } from "./useDecoShake";

export function KfcSideSize({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const correctId = step.correctChoiceId;
  const friesL = step.choices.find((c) => c.id === "fries-l");
  const friesM = step.choices.find((c) => c.id === "fries-m");
  const nextChoice = step.choices.find((c) => c.id === "next");
  const prevChoice = step.choices.find((c) => c.id === "prev");
  const { shakeNow, shakeStyle } = useDecoShake();

  const friesLImg = KFC_IMAGE_BY_SLUG["french-fries-l"];
  const friesMImg = KFC_IMAGE_BY_SLUG["french-fries-m"];

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
      {/* KFC red stripe header */}
      <div
        css={css`
          display: flex;
          gap: 4px;
          padding: 10px 14px;
        `}
      >
        <span css={stripe} />
        <span css={stripe} />
        <span css={stripe} />
      </div>

      {/* Title row */}
      <div
        css={css`
          display: grid;
          grid-template-columns: 110px 1fr;
          align-items: center;
          padding: 8px 18px 6px;
          gap: 12px;
        `}
      >
        {friesLImg ? (
          <img
            src={friesLImg}
            alt="프렌치프라이"
            style={{ width: "100%", aspectRatio: "1/1", objectFit: "contain" }}
          />
        ) : (
          <span style={{ fontSize: 56 }}>🍟</span>
        )}
        <div css={css`text-align: right;`}>
          <div
            css={css`
              font-size: 26px;
              font-weight: 900;
              color: #2a1408;
              letter-spacing: -0.03em;
              line-height: 1.1;
            `}
          >
            프렌치프라이
          </div>
          <div
            css={css`
              font-size: 13px;
              font-weight: 700;
              color: #8b95a1;
              padding-top: 4px;
            `}
          >
            KFC의 다양한 감자튀김 종류
          </div>
        </div>
      </div>

      {/* Options list */}
      <div css={css`padding: 18px 18px 8px; display: flex; flex-direction: column; gap: 10px;`}>
        {friesL && (
          <SizeRow
            checked={false}
            label="프렌치프라이(L)"
            price="2,800"
            imgUrl={friesLImg}
            highlight={idleHintActive && friesL.id === correctId}
            rejected={rejectedChoiceId === friesL.id}
            onClick={() => onChoice(friesL.id)}
          />
        )}
        {friesM && (
          <SizeRow
            checked={false}
            label="프렌치프라이(M)"
            price="2,300"
            imgUrl={friesMImg}
            highlight={idleHintActive && friesM.id === correctId}
            rejected={rejectedChoiceId === friesM.id}
            onClick={() => onChoice(friesM.id)}
          />
        )}
      </div>

      {/* Pagination dots */}
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 0 6px;
        `}
      >
        <button type="button" onClick={() => shakeNow("page-up")} css={[pagDot, pagDotBtn, shakeStyle("page-up")]}>▲</button>
        <button type="button" onClick={() => shakeNow("page-down")} css={[pagDot, pagDotMuted, pagDotBtn, shakeStyle("page-down")]}>▼</button>
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

      {/* Footer ribbon */}
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

function SizeRow({
  checked,
  label,
  price,
  imgUrl,
  highlight,
  rejected,
  onClick,
}: {
  checked: boolean;
  label: string;
  price: string;
  imgUrl?: string;
  highlight: boolean;
  rejected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      css={[
        css`
          display: grid;
          grid-template-columns: 24px 1fr 60px;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          background: #ffffff;
          border: 1.5px solid ${checked ? "#e4002b" : "#e5e8eb"};
          border-radius: 10px;
          cursor: pointer;
          font-family: inherit;
          :active {
            background: #f6f7f9;
          }
        `,
        highlight &&
          css`
            box-shadow: 0 0 0 4px rgba(228, 0, 43, 0.32);
            animation: kfcSidePulse 1.2s ease-in-out infinite;
            @keyframes kfcSidePulse {
              0%, 100% { box-shadow: 0 0 0 4px rgba(228, 0, 43, 0.32); }
              50%      { box-shadow: 0 0 0 8px rgba(228, 0, 43, 0.12); }
            }
          `,
        rejected &&
          css`
            border-color: #e4002b;
          `,
      ]}
    >
      <div
        css={css`
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 1.5px solid ${checked ? "#e4002b" : "#d1d5da"};
          background: ${checked ? "#e4002b" : "#ffffff"};
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        `}
      >
        ✓
      </div>
      <div css={css`text-align: left;`}>
        <div css={css`font-size: 15px; font-weight: 900; color: #2a1408;`}>{label}</div>
        <div css={css`font-size: 16px; font-weight: 800; color: #2a1408; padding-top: 6px;`}>
          {price}
        </div>
      </div>
      {imgUrl ? (
        <img
          src={imgUrl}
          alt={label}
          style={{ width: "100%", aspectRatio: "1/1", objectFit: "contain" }}
        />
      ) : (
        <span style={{ fontSize: 36, textAlign: "right" }}>🍟</span>
      )}
    </button>
  );
}

const stripe = css`
  width: 16px;
  height: 28px;
  background: #e4002b;
  border-radius: 2px;
`;

const pagDot = css`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #e5e8eb;
  color: #2a1408;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
`;

const pagDotBtn = css`
  border: none;
  cursor: pointer;
  font-family: inherit;
  :active {
    filter: brightness(0.85);
  }
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

const pagDotMuted = css`
  background: #f2f3f4;
  color: #c9cdd2;
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
