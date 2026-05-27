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

function shakeWhen(rejected: string | null, id: string) {
  return (
    rejected === id &&
    css`
      animation: ${shakeKf} 350ms ease;
    `
  );
}

// Stranger Things-style red glow on the promo title.
const flicker = keyframes`
  0%, 18%, 22%, 25%, 53%, 57%, 100% {
    text-shadow:
      0 0 4px rgba(255, 50, 30, 0.95),
      0 0 11px rgba(255, 50, 30, 0.8),
      0 0 19px rgba(255, 50, 30, 0.7),
      0 0 40px rgba(255, 0, 0, 0.6);
  }
  20%, 24%, 55% { text-shadow: none; }
`;

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
        min-height: 100dvh;
        background: #0a0a0a;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
        overflow: hidden;
      `}
    >
      {/* Top mini chrome (decorative) ---------------------------------- */}
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 18px 8px;
          color: rgba(255, 255, 255, 0.9);
        `}
      >
        <span
          css={css`
            font-size: 14px;
            font-weight: 900;
            letter-spacing: -0.02em;
            color: #ffffff;
          `}
        >
          KFC
        </span>
        <div
          css={css`
            display: flex;
            gap: 8px;
          `}
        >
          <span css={chromeBtn}>▶</span>
          <span css={chromeBtn}>🔊</span>
          <span css={chromeBtn}>⋮</span>
          <span css={chromeBtn}>⤢</span>
        </div>
      </div>

      {/* Center promo (dark moody scene with bucket + burger) ----------- */}
      <div
        css={css`
          flex: 1;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 18px 16px 32px;
          background:
            radial-gradient(
              ellipse at center,
              rgba(60, 0, 0, 0.6) 0%,
              rgba(0, 0, 0, 0.95) 70%
            ),
            #0a0a0a;
          overflow: hidden;
        `}
      >
        {/* Floating bucket at top */}
        <div
          css={css`
            position: absolute;
            top: 6px;
            left: 50%;
            transform: translateX(-50%) rotate(-8deg);
            opacity: 0.9;
          `}
        >
          <KfcBucket />
        </div>

        {/* Centered burger */}
        <div
          css={css`
            margin-top: 90px;
            margin-bottom: 12px;
            filter: drop-shadow(0 8px 28px rgba(255, 30, 0, 0.25));
          `}
        >
          <UpsideDownZingerBurger />
        </div>

        {/* Stranger Things-style title */}
        <div
          css={css`
            font-family: "Georgia", "Times New Roman", serif;
            font-weight: 900;
            font-style: italic;
            font-size: 38px;
            color: #ff1f1f;
            letter-spacing: 0.04em;
            text-align: center;
            line-height: 0.95;
            animation: ${flicker} 6s infinite;
            text-shadow:
              0 0 6px rgba(255, 50, 30, 0.9),
              0 0 14px rgba(255, 30, 0, 0.7);
            -webkit-text-stroke: 1px #8a0000;
            padding-top: 10px;
          `}
        >
          UPSIDEDOWN
          <div style={{ fontSize: 22, marginTop: 2 }}>ZINGER</div>
        </div>

        {/* KFC × Stranger Things badge */}
        <div
          css={css`
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-top: 14px;
            padding: 6px 12px;
            background: rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(255, 50, 30, 0.4);
            border-radius: 4px;
            color: #ffffff;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 0.1em;
          `}
        >
          <span style={{ color: "#E4002B", fontWeight: 900, fontSize: 14 }}>
            KFC
          </span>
          <span style={{ opacity: 0.4 }}>×</span>
          <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            STRANGER THINGS 5
          </span>
        </div>

        <div
          css={css`
            position: absolute;
            right: 14px;
            bottom: 10px;
            font-size: 9px;
            color: rgba(255, 255, 255, 0.45);
            letter-spacing: 0.02em;
          `}
        >
          STRANGER THINGS ™/© Netflix. Used with permission.
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

function KfcBucket(): React.ReactElement {
  return (
    <svg width="180" height="150" viewBox="0 0 180 150" fill="none">
      {/* Bucket body */}
      <path
        d="M40 50 L140 50 L130 130 L50 130 Z"
        fill="#ffffff"
        stroke="#1a1a1a"
        strokeWidth="2"
      />
      {/* Red stripes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <rect
          key={i}
          x={45 + i * 16}
          y="52"
          width="8"
          height="76"
          fill="#E4002B"
          transform={`skewX(${1 + i * 0.4}) translate(${-i * 1.5} 0)`}
        />
      ))}
      {/* Bucket rim */}
      <ellipse
        cx="90"
        cy="50"
        rx="50"
        ry="8"
        fill="#ffffff"
        stroke="#1a1a1a"
        strokeWidth="2"
      />
      {/* Colonel face circle */}
      <circle cx="90" cy="85" r="18" fill="#ffffff" stroke="#1a1a1a" strokeWidth="1.5" />
      <text
        x="90"
        y="80"
        fontSize="7"
        fontWeight="900"
        textAnchor="middle"
        fill="#E4002B"
        fontFamily="Georgia, serif"
      >
        Kentucky
      </text>
      <text
        x="90"
        y="89"
        fontSize="7"
        fontWeight="900"
        textAnchor="middle"
        fill="#E4002B"
        fontFamily="Georgia, serif"
      >
        Fried
      </text>
      <text
        x="90"
        y="98"
        fontSize="7"
        fontWeight="900"
        textAnchor="middle"
        fill="#E4002B"
        fontFamily="Georgia, serif"
      >
        Chicken
      </text>
      {/* Falling vines / strings */}
      <path
        d="M50 50 Q40 30 30 10"
        stroke="#1a1a1a"
        strokeWidth="2"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M130 50 Q140 25 150 8"
        stroke="#1a1a1a"
        strokeWidth="2"
        fill="none"
        opacity="0.7"
      />
    </svg>
  );
}

function UpsideDownZingerBurger(): React.ReactElement {
  return (
    <svg width="220" height="160" viewBox="0 0 220 160" fill="none">
      {/* Bottom chicken patty (crispy) */}
      <ellipse
        cx="110"
        cy="125"
        rx="92"
        ry="22"
        fill="#c97a32"
        stroke="#5a2e0a"
        strokeWidth="1.5"
      />
      {/* Crispy bumps */}
      {Array.from({ length: 16 }).map((_, i) => (
        <circle
          key={i}
          cx={28 + i * 11}
          cy={110 + (i % 3) * 4}
          r={3 + (i % 3)}
          fill="#a8651f"
          stroke="#5a2e0a"
          strokeWidth="0.8"
        />
      ))}
      {/* Cheese slice (yellow) */}
      <path
        d="M30 105 L188 105 L182 95 L36 95 Z"
        fill="#ffc941"
        stroke="#a37000"
        strokeWidth="1"
      />
      {/* Lettuce edge */}
      <path
        d="M28 100 Q40 96 50 100 T70 100 T90 100 T110 100 T130 100 T150 100 T170 100 T192 100 L192 105 L28 105 Z"
        fill="#85a85b"
        stroke="#4a6630"
        strokeWidth="1"
      />
      {/* Ketchup drip (Stranger Things blood vibe) */}
      <path
        d="M60 90 L70 100 L65 110 L62 102 L58 108 L60 90 Z"
        fill="#c1121f"
      />
      <path
        d="M150 88 L162 102 L156 115 L150 100 Z"
        fill="#c1121f"
      />
      {/* Egg sunny side */}
      <ellipse cx="115" cy="85" rx="36" ry="20" fill="#fffdf2" stroke="#d4b878" strokeWidth="1" />
      <circle cx="118" cy="80" r="14" fill="#ffd23f" stroke="#c98a00" strokeWidth="1" />
      {/* Sesame seeds */}
      {[[80, 85], [95, 78], [125, 80], [145, 90]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="3" ry="1.8" fill="#f5e9c4" stroke="#8a6a20" strokeWidth="0.5" />
      ))}
      {/* Top chicken patty (crispy upside-down) */}
      <ellipse
        cx="110"
        cy="55"
        rx="92"
        ry="22"
        fill="#c97a32"
        stroke="#5a2e0a"
        strokeWidth="1.5"
      />
      {Array.from({ length: 16 }).map((_, i) => (
        <circle
          key={i}
          cx={28 + i * 11}
          cy={50 + (i % 3) * 4}
          r={3 + (i % 3)}
          fill="#a8651f"
          stroke="#5a2e0a"
          strokeWidth="0.8"
        />
      ))}
    </svg>
  );
}

function DineInIcon(): React.ReactElement {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M14 8 L14 24 M10 8 L10 18 Q10 22 14 22 L14 24 M18 8 L18 18 Q18 22 14 22"
        stroke="#E4002B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M30 8 L30 28 M32 8 Q36 8 36 16 Q36 22 32 22 L30 22"
        stroke="#E4002B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <line x1="14" y1="24" x2="14" y2="40" stroke="#E4002B" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="28" x2="30" y2="40" stroke="#E4002B" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function TakeoutIcon(): React.ReactElement {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {/* Handles */}
      <path d="M18 14 Q18 8 24 8 Q30 8 30 14"
        stroke="#E4002B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Bag body */}
      <path d="M12 14 L36 14 L34 40 L14 40 Z"
        stroke="#E4002B" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
    </svg>
  );
}

const chromeBtn = css`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(40, 40, 40, 0.85);
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
`;

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
