import { css, keyframes } from "@emotion/react";

import type { CustomLayoutProps } from "./types";

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

export function McdonaldsSetSingle({
  rejectedChoiceId,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        min-height: 100%;
        width: 100%;
        background: #ffffff;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
      `}
    >
      {/* ── A. Top breadcrumb area ── */}
      <div
        css={css`
          padding: 20px 20px 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        `}
      >
        <span
          css={css`
            font-size: 28px;
            font-weight: 900;
            color: #ffc72c;
            line-height: 1;
          `}
        >
          M
        </span>
        <span
          css={css`
            font-size: 13px;
            color: #8b95a1;
          `}
        >
          ·
        </span>
        <span
          css={css`
            font-size: 16px;
            font-weight: 500;
            color: #191f28;
          `}
        >
          빅맥
        </span>
      </div>

      {/* ── B. Headline ── */}
      <div
        css={css`
          padding: 12px 20px 20px;
        `}
      >
        <h1
          css={css`
            margin: 0;
            font-size: 28px;
            font-weight: 800;
            color: #191f28;
            line-height: 1.3;
          `}
        >
          세트로 주문하시겠습니까?
        </h1>
      </div>

      {/* ── C. Main 2-card area ── */}
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          padding: 0 20px;
        `}
      >
        {/* Card 1: 세트 선택 (CORRECT) */}
        <button
          css={[
            css`
              background: #ffffff;
              border: 1.5px solid #d1d6db;
              border-radius: 14px;
              padding: 16px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 14px;
              cursor: pointer;
              min-height: 280px;

              &:active {
                background: #f9f9f9;
              }
            `,
            shakeWhen(rejectedChoiceId, "set"),
          ]}
          onClick={() => onChoice("set")}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 4px;
              font-size: 56px;
              line-height: 1;
            `}
          >
            <span>🍔</span>
            <span>🥤</span>
            <span>🍟</span>
          </div>
          <span
            css={css`
              font-size: 18px;
              font-weight: 700;
              color: #191f28;
              text-align: center;
            `}
          >
            세트 선택
          </span>
        </button>

        {/* Card 2: 단품 선택 */}
        <button
          css={[
            css`
              background: #ffffff;
              border: 1.5px solid #d1d6db;
              border-radius: 14px;
              padding: 16px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 14px;
              cursor: pointer;
              min-height: 280px;

              &:active {
                background: #f9f9f9;
              }
            `,
            shakeWhen(rejectedChoiceId, "single"),
          ]}
          onClick={() => onChoice("single")}
        >
          <span
            css={css`
              font-size: 96px;
              line-height: 1;
            `}
          >
            🍔
          </span>
          <span
            css={css`
              font-size: 18px;
              font-weight: 700;
              color: #191f28;
              text-align: center;
            `}
          >
            단품 선택
          </span>
          <span
            css={css`
              font-size: 13px;
              color: #8b95a1;
              text-align: center;
            `}
          >
            ₩5,500 &nbsp;525 Kcal
          </span>
        </button>
      </div>

      {/* ── D. 취소 button ── */}
      <div
        css={css`
          padding: 16px 20px 0;
        `}
      >
        <button
          css={[
            css`
              width: 100%;
              height: 48px;
              background: #ffffff;
              border: 1.5px solid #d1d6db;
              border-radius: 10px;
              font-size: 16px;
              font-weight: 500;
              color: #191f28;
              cursor: pointer;

              &:active {
                background: #f5f5f5;
              }
            `,
            shakeWhen(rejectedChoiceId, "cancel"),
          ]}
          onClick={() => onChoice("cancel")}
        >
          취소
        </button>
      </div>

      {/* ── E. Bottom spacing ── */}
      <div
        css={css`
          flex: 1;
          min-height: 60px;
        `}
      />
    </div>
  );
}
