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

const popIn = keyframes`
  0%   { transform: scale(0.92); opacity: 0; }
  100% { transform: scale(1);    opacity: 1; }
`;

export function KfcMembership({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const skip = step.choices.find((c) => c.id === "skip-membership");
  const earn = step.choices.find((c) => c.id === "earn-membership");
  const correctId = step.correctChoiceId;

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        min-height: 100%;
        background: #0a0a0a;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
        display: flex;
        flex-direction: column;
      `}
    >
      {/* Dimmed faux start-screen background ------------------------ */}
      <div
        css={css`
          flex: 1;
          opacity: 0.45;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(
              ellipse at center,
              rgba(80, 10, 10, 0.4) 0%,
              rgba(0, 0, 0, 1) 75%
            ),
            #0a0a0a;
        `}
      >
        <span style={{ fontSize: 120, opacity: 0.4 }}>🍗</span>
      </div>

      {/* Faux bottom action bar (decorative, dimmed) */}
      <div
        css={css`
          background: #ffffff;
          padding: 12px 14px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          opacity: 0.55;
        `}
      >
        <div css={[fauxBtn]}>
          <DineInIcon />
          <span css={fauxLabel}>매장 식사</span>
        </div>
        <div css={[fauxBtn]}>
          <TakeoutIcon />
          <span css={fauxLabel}>포장 주문</span>
        </div>
      </div>

      {/* Modal overlay ------------------------------------------------ */}
      <div
        css={css`
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        `}
      >
        <div
          css={css`
            width: 100%;
            max-width: 380px;
            background: #ffffff;
            border-radius: 14px;
            padding: 24px 22px 22px;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
            animation: ${popIn} 220ms ease-out;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
          `}
        >
          {/* Title */}
          <div
            css={css`
              font-size: 20px;
              font-weight: 900;
              color: #2a1408;
              letter-spacing: -0.02em;
              text-align: center;
            `}
          >
            멤버십 로그인/커넬 적립
          </div>

          {/* Subtitle */}
          <div
            css={css`
              font-size: 14px;
              font-weight: 800;
              color: #4e5968;
              text-align: center;
              padding-top: 2px;
            `}
          >
            멤버십 바코드 스캔하기
          </div>

          {/* Breadcrumb */}
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 6px;
              font-size: 10px;
              font-weight: 700;
              color: #8b95a1;
            `}
          >
            <span style={{ color: "#E4002B", fontWeight: 900 }}>KFC APP</span>
            <span>›</span>
            <span>멤버십카드 바코드 스캔</span>
          </div>

          {/* Phone illustration */}
          <div
            css={css`
              padding: 8px 0 4px;
            `}
          >
            <PhoneScan />
          </div>

          {/* Description */}
          <div
            css={css`
              font-size: 13px;
              font-weight: 700;
              color: #2a1408;
              text-align: center;
              padding-bottom: 4px;
            `}
          >
            KFC APP 전용 쿠폰을 확인하세요!
          </div>

          {/* Two action buttons */}
          <div
            css={css`
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
              width: 100%;
              padding-top: 4px;
            `}
          >
            {skip && (
              <button
                type="button"
                onClick={() => onChoice(skip.id)}
                css={[
                  skipBtn,
                  shakeWhen(rejectedChoiceId, skip.id),
                  idlePulse(idleHintActive, skip.id === correctId),
                ]}
              >
                그냥 주문하기
              </button>
            )}
            {earn && (
              <button
                type="button"
                onClick={() => onChoice(earn.id)}
                css={[
                  earnBtn,
                  shakeWhen(rejectedChoiceId, earn.id),
                  idlePulse(idleHintActive, earn.id === correctId),
                ]}
              >
                멤버십 적립하기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneScan(): React.ReactElement {
  return (
    <svg width="86" height="120" viewBox="0 0 86 120" fill="none">
      {/* Phone body */}
      <rect
        x="10"
        y="6"
        width="66"
        height="108"
        rx="9"
        fill="#cfd4d9"
        stroke="#3d4750"
        strokeWidth="1.5"
      />
      {/* Screen */}
      <rect
        x="14"
        y="14"
        width="58"
        height="92"
        rx="4"
        fill="#1a1f25"
      />
      {/* Camera dot */}
      <circle cx="43" cy="10" r="1.4" fill="#3d4750" />
      {/* Red corner barcode highlight */}
      <rect
        x="44"
        y="56"
        width="26"
        height="38"
        rx="2"
        fill="#E4002B"
        opacity="0.92"
      />
      {/* Barcode lines on highlight */}
      {[47, 50, 53, 56, 60, 64, 68].map((x, i) => (
        <rect
          key={i}
          x={x}
          y={62}
          width={i % 2 === 0 ? 1.2 : 0.6}
          height={26}
          fill="#ffffff"
        />
      ))}
    </svg>
  );
}

function DineInIcon(): React.ReactElement {
  return (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
      <path
        d="M14 8 L14 24 M10 8 L10 18 Q10 22 14 22 L14 24 M18 8 L18 18 Q18 22 14 22"
        stroke="#E4002B"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <line x1="14" y1="24" x2="14" y2="40" stroke="#E4002B" strokeWidth="2.5" />
      <path
        d="M30 8 L30 28 M32 8 Q36 8 36 16 Q36 22 32 22 L30 22"
        stroke="#E4002B"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <line x1="30" y1="28" x2="30" y2="40" stroke="#E4002B" strokeWidth="2.5" />
    </svg>
  );
}

function TakeoutIcon(): React.ReactElement {
  return (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
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

const fauxBtn = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 8px;
  background: #ffffff;
  border: 1.5px solid #d1d5da;
  border-radius: 8px;
`;

const fauxLabel = css`
  font-size: 14px;
  font-weight: 900;
  color: #2a1408;
`;

const skipBtn = css`
  height: 42px;
  border-radius: 999px;
  background: #ffffff;
  border: 1.5px solid #2a1408;
  color: #2a1408;
  font-size: 13px;
  font-weight: 900;
  font-family: inherit;
  cursor: pointer;
  :active {
    background: #f6f7f9;
  }
`;

const earnBtn = css`
  height: 42px;
  border-radius: 999px;
  background: #E4002B;
  border: none;
  color: #ffffff;
  font-size: 13px;
  font-weight: 900;
  font-family: inherit;
  cursor: pointer;
  :active {
    filter: brightness(0.92);
  }
`;
