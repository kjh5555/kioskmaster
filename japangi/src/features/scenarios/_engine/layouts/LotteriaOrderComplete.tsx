import { css, keyframes } from "@emotion/react";
import { useEffect, useState } from "react";

import { type CustomLayoutProps } from "./types";

const fadeIn = keyframes`
  0%   { opacity: 0; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const FINAL_AUTO_ADVANCE_MS = 5000;

export function LotteriaOrderComplete({
  step,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  // Random 3-digit order number, fixed for the lifetime of this mount so it
  // doesn't reshuffle on every re-render.
  const [orderNumber] = useState(() =>
    Math.floor(100 + Math.random() * 900).toString(),
  );
  const [remaining, setRemaining] = useState(
    Math.ceil(FINAL_AUTO_ADVANCE_MS / 1000),
  );

  useEffect(() => {
    const tick = setInterval(() => {
      setRemaining((r) => (r > 0 ? r - 1 : 0));
    }, 1000);
    const finish = setTimeout(() => {
      onChoice(step.correctChoiceId);
    }, FINAL_AUTO_ADVANCE_MS);
    return () => {
      clearInterval(tick);
      clearTimeout(finish);
    };
  }, [onChoice, step.correctChoiceId]);

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
        align-items: center;
        padding: 24px 18px 28px;
        animation: ${fadeIn} 320ms ease-out;
      `}
    >
      {/* LOTTERIA logo */}
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 6px;
          padding-top: 12px;
        `}
      >
        <span
          css={css`
            font-size: 28px;
            font-weight: 900;
            color: #d62300;
            letter-spacing: -0.04em;
          `}
        >
          LOTTERIA
        </span>
        <span
          css={css`
            background: #ffd400;
            color: #d62300;
            width: 26px;
            height: 26px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-weight: 900;
            border: 2px solid #d62300;
          `}
        >
          L
        </span>
      </div>

      <div
        css={css`
          font-size: 22px;
          font-weight: 800;
          color: #2a1408;
          padding-top: 30px;
        `}
      >
        결제가 되었습니다
      </div>

      <div
        css={css`
          font-size: 14px;
          font-weight: 700;
          color: #4e5968;
          padding-top: 24px;
        `}
      >
        주문번호
      </div>

      <div
        css={css`
          font-size: 96px;
          font-weight: 900;
          color: #2a1408;
          letter-spacing: -0.04em;
          line-height: 1;
          padding: 8px 0 24px;
        `}
      >
        {orderNumber}
      </div>

      <div
        css={css`
          font-size: 13px;
          font-weight: 700;
          color: #2a1408;
          text-align: center;
          padding: 0 20px;
        `}
      >
        메뉴가 준비 되면 주문번호 호출 모니터로 안내해 드립니다.
      </div>

      {/* Receipt icon */}
      <div
        css={css`
          padding-top: 36px;
        `}
      >
        <svg width="120" height="130" viewBox="0 0 120 130" fill="none">
          <rect x="32" y="6" width="56" height="8" rx="2" fill="#2a1408" />
          <path
            d="M22 14 L98 14 L98 110 L88 102 L78 110 L68 102 L58 110 L48 102 L38 110 L28 102 L22 110 Z"
            fill="#2a1408"
          />
          <rect x="34" y="32" width="52" height="5" fill="#ffffff" />
          <rect x="34" y="44" width="42" height="5" fill="#ffffff" />
          <rect x="34" y="56" width="48" height="5" fill="#ffffff" />
          <rect x="34" y="68" width="32" height="5" fill="#ffffff" />
        </svg>
      </div>

      <div
        css={css`
          flex: 1;
        `}
      />

      <div
        css={css`
          font-size: 11px;
          font-weight: 700;
          color: #8b95a1;
          padding-bottom: 12px;
        `}
      >
        {remaining}초 후 처음 화면으로 돌아갑니다.
      </div>
    </div>
  );
}
