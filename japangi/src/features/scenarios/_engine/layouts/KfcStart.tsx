import { css, keyframes } from "@emotion/react";

import { idlePulse, type CustomLayoutProps } from "./types";

const shakeKf = keyframes`
  0%   { transform: translateX(0); }
  20%  { transform: translateX(-8px); }
  40%  { transform: translateX(8px); }
  60%  { transform: translateX(-5px); }
  80%  { transform: translateX(5px); }
  100% { transform: translateX(0); }
`;

// Stranger Things-style red flicker for the UPSIDEDOWN ZINGER title.
const flicker = keyframes`
  0%, 18%, 22%, 25%, 53%, 57%, 100% {
    text-shadow:
      0 0 4px rgba(255, 50, 30, 0.95),
      0 0 11px rgba(255, 50, 30, 0.85),
      0 0 22px rgba(255, 50, 30, 0.7),
      0 0 48px rgba(255, 0, 0, 0.6);
    opacity: 1;
  }
  20%, 24%, 55% {
    text-shadow: none;
    opacity: 0.55;
  }
`;

function shakeWhen(rejected: string | null, id: string) {
  return (
    rejected === id &&
    css`
      animation: ${shakeKf} 350ms ease;
    `
  );
}

const FEATURED_BURGER =
  "https://kfcapi.inicis.com/kfcs_api_img/KFCS/goods/DL_1249126_20230131182918680.png";

export function KfcStart({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const dineIn = step.choices.find((c) => c.id === "dine-in");
  const takeout = step.choices.find((c) => c.id === "takeout");
  const correctId = step.correctChoiceId;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 100%;
        background: #0a0a0a;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
      `}
    >
      {/* Center stage: black background + real burger photo + ST title -- */}
      <div
        css={css`
          flex: 1;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          gap: 18px;
          background:
            radial-gradient(
              ellipse at center,
              rgba(80, 10, 10, 0.5) 0%,
              rgba(0, 0, 0, 1) 75%
            ),
            #0a0a0a;
          overflow: hidden;
        `}
      >
        {/* KFC logo top-left */}
        <div
          css={css`
            position: absolute;
            top: 14px;
            left: 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: "Arial Black", "Helvetica", sans-serif;
            font-weight: 900;
            font-style: italic;
            background: #E4002B;
            color: #ffffff;
            padding: 6px 10px 4px;
            border-radius: 4px;
            line-height: 0.9;
            letter-spacing: -0.04em;
            box-shadow: 0 2px 10px rgba(228, 0, 43, 0.45);
          `}
        >
          <span style={{ fontSize: 22 }}>KFC</span>
          <span style={{ fontSize: 6, fontWeight: 700, fontStyle: "normal", letterSpacing: "0.02em", paddingTop: 2 }}>
            It's finger lickin' good!
          </span>
        </div>
        <img
          src={FEATURED_BURGER}
          alt="징거버거"
          style={{
            maxWidth: "85%",
            maxHeight: "55vh",
            objectFit: "contain",
            filter: "drop-shadow(0 18px 50px rgba(228, 0, 43, 0.35))",
          }}
        />

        <div
          css={css`
            font-family: "Georgia", "Times New Roman", serif;
            font-weight: 900;
            font-style: italic;
            font-size: 44px;
            color: #ff1f1f;
            letter-spacing: 0.04em;
            text-align: center;
            line-height: 0.95;
            -webkit-text-stroke: 1px #8a0000;
            animation: ${flicker} 5.5s infinite;
          `}
        >
          UPSIDEDOWN
          <div style={{ fontSize: 26, marginTop: 2 }}>ZINGER</div>
        </div>
      </div>

      {/* Action bar (white) — dine-in vs takeout ------------------------ */}
      <div
        css={css`
          background: #ffffff;
          padding: 16px 14px 8px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        `}
      >
        {dineIn && (
          <button
            type="button"
            onClick={() => onChoice(dineIn.id)}
            css={[
              optionBtn,
              shakeWhen(rejectedChoiceId, dineIn.id),
              idlePulse(idleHintActive, dineIn.id === correctId),
            ]}
          >
            <DineInIcon />
            <span css={btnLabel}>매장 식사</span>
          </button>
        )}
        {takeout && (
          <button
            type="button"
            onClick={() => onChoice(takeout.id)}
            css={[
              optionBtn,
              shakeWhen(rejectedChoiceId, takeout.id),
              idlePulse(idleHintActive, takeout.id === correctId),
            ]}
          >
            <TakeoutIcon />
            <span css={btnLabel}>포장 주문</span>
          </button>
        )}
      </div>

      {/* Footer: language flags + cash notice --------------------------- */}
      <div
        css={css`
          background: #ffffff;
          padding: 4px 14px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        `}
      >
        <div
          css={css`
            display: flex;
            gap: 2px;
            border: 1px solid #d1d5da;
            border-radius: 4px;
            padding: 3px 6px;
            font-size: 11px;
            font-weight: 700;
            color: #2a1408;
            align-items: center;
          `}
        >
          <span>🇰🇷</span>
          <span style={{ opacity: 0.4 }}>🇯🇵</span>
          <span style={{ opacity: 0.4 }}>🇨🇳</span>
          <span style={{ opacity: 0.4 }}>🇺🇸</span>
          <span style={{ marginLeft: 4 }}>| KO</span>
        </div>
        <span
          css={css`
            font-size: 11px;
            font-weight: 700;
            color: #4e5968;
            flex: 1;
          `}
        >
          현금 결제는 카운터에서 가능합니다.
        </span>
      </div>
    </div>
  );
}

function DineInIcon(): React.ReactElement {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
      <path
        d="M14 8 L14 24 M10 8 L10 18 Q10 22 14 22 L14 24 M18 8 L18 18 Q18 22 14 22"
        stroke="#E4002B"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M30 8 L30 28 M32 8 Q36 8 36 16 Q36 22 32 22 L30 22"
        stroke="#E4002B"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <line x1="14" y1="24" x2="14" y2="40" stroke="#E4002B" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="28" x2="30" y2="40" stroke="#E4002B" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function TakeoutIcon(): React.ReactElement {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
      <path
        d="M18 14 Q18 8 24 8 Q30 8 30 14"
        stroke="#E4002B"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M12 14 L36 14 L34 40 L14 40 Z"
        stroke="#E4002B"
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const optionBtn = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 18px 12px;
  background: #ffffff;
  border: 1.5px solid #d1d5da;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  :active {
    background: #f6f7f9;
  }
`;

const btnLabel = css`
  font-size: 18px;
  font-weight: 900;
  color: #2a1408;
  letter-spacing: -0.02em;
`;
