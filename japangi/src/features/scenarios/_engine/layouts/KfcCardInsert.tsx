import { css, keyframes } from "@emotion/react";
import { useEffect } from "react";

import { type CustomLayoutProps } from "./types";
import { useDecoShake } from "./useDecoShake";

const slide = keyframes`
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(300%); }
`;

export function KfcCardInsert({
  step,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const next = step.choices.find((c) => c.id === "next");
  const correctId = step.correctChoiceId;
  const { shakeNow, shakeStyle } = useDecoShake();

  // Auto-advance after 3 seconds.
  useEffect(() => {
    const t = setTimeout(() => {
      if (next && next.id === correctId) {
        onChoice(next.id);
      } else {
        onChoice(correctId);
      }
    }, 3000);
    return () => clearTimeout(t);
  }, [next, correctId, onChoice]);

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
        padding: 20px 24px;
        display: flex;
        flex-direction: column;
      `}
    >
      <button
        type="button"
        onClick={() => shakeNow("close")}
        css={[
          css`
            position: absolute;
            top: 12px;
            right: 14px;
            width: 32px;
            height: 32px;
            background: #b0b8c1;
            color: #ffffff;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
            font-size: 18px;
            border: none;
            cursor: pointer;
            font-family: inherit;
            :active {
              filter: brightness(0.85);
            }
          `,
          shakeStyle("close"),
        ]}
      >
        ✕
      </button>

      {/* Card insertion guide */}
      <div
        css={css`
          display: grid;
          grid-template-columns: 150px 1fr;
          gap: 18px;
          align-items: center;
          padding: 24px 0 18px;
        `}
      >
        <CardSlot />
        <div>
          <div
            css={css`
              font-size: 19px;
              font-weight: 900;
              color: #2a1408;
              letter-spacing: -0.02em;
            `}
          >
            신용카드 결제 시
          </div>
          <div
            css={css`
              font-size: 13px;
              font-weight: 700;
              color: #4e5968;
              padding-top: 2px;
            `}
          >
            Pay by credit card
          </div>
          <div
            css={css`
              padding-top: 12px;
              font-size: 13px;
              font-weight: 700;
              color: #2a1408;
              line-height: 1.4;
            `}
          >
            신용카드를 단말기의 투입구에
            <br />
            끝까지 넣어주세요.
          </div>
          <div
            css={css`
              padding-top: 8px;
              font-size: 11px;
              font-weight: 700;
              color: #8b95a1;
              line-height: 1.4;
            `}
          >
            Please insert your card into
            <br />
            the payment terminal all the way through
          </div>
        </div>
      </div>

      <div
        css={css`
          height: 1px;
          background: #e5e8eb;
          margin: 6px 0;
        `}
      />

      {/* Apple Pay guide */}
      <div
        css={css`
          display: grid;
          grid-template-columns: 150px 1fr;
          gap: 18px;
          align-items: center;
          padding: 18px 0 18px;
        `}
      >
        <NfcReader />
        <div>
          <div
            css={css`
              font-size: 19px;
              font-weight: 900;
              color: #2a1408;
              letter-spacing: -0.02em;
            `}
          >
             Pay 결제 시
          </div>
          <div
            css={css`
              font-size: 13px;
              font-weight: 700;
              color: #4e5968;
              padding-top: 2px;
            `}
          >
            Pay by Apple Pay
          </div>
          <div
            css={css`
              padding-top: 12px;
              font-size: 13px;
              font-weight: 700;
              color: #2a1408;
              line-height: 1.4;
            `}
          >
            결제 완료 시까지 휴대전화의 상단을
            <br />
            NFC 단말기에 접촉시켜 주세요.
          </div>
          <div
            css={css`
              padding-top: 8px;
              font-size: 11px;
              font-weight: 700;
              color: #8b95a1;
              line-height: 1.4;
            `}
          >
            Please tap the top of your mobile phone
            <br />
            to the NFC touch until done
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div
        css={css`
          margin: 22px auto 8px;
          width: 60%;
          height: 6px;
          background: #e5e8eb;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        `}
      >
        <div
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            width: 30%;
            height: 100%;
            background: #1e6dff;
            animation: ${slide} 1.4s ease-in-out infinite;
          `}
        />
      </div>

      {/* Bottom waiting text */}
      <div
        css={css`
          text-align: center;
          padding: 14px 0 0;
          font-size: 16px;
          font-weight: 900;
          color: #2a1408;
          line-height: 1.4;
        `}
      >
        결제가 진행 중입니다.
        <br />
        결제가 완료될 때까지 기다려주세요.
      </div>
      <div
        css={css`
          text-align: center;
          padding: 4px 0;
          font-size: 11px;
          font-weight: 700;
          color: #8b95a1;
        `}
      >
        Your payment is being processed
      </div>
    </div>
  );
}

function CardSlot(): React.ReactElement {
  return (
    <svg width="140" height="80" viewBox="0 0 140 80" fill="none">
      {/* Terminal body */}
      <path
        d="M10 40 L130 40 L120 70 L20 70 Z"
        fill="#3d4750"
        stroke="#2a1408"
        strokeWidth="1.5"
      />
      <rect x="22" y="46" width="96" height="6" rx="2" fill="#1a1f25" />
      {/* Red card being inserted */}
      <rect
        x="40"
        y="14"
        width="64"
        height="40"
        rx="4"
        fill="#e4002b"
      />
      <rect x="46" y="22" width="22" height="3" fill="#ffffff" />
      <rect x="46" y="28" width="36" height="3" fill="#ffffff" opacity="0.85" />
      <circle cx="88" cy="28" r="4" fill="#ffd700" />
    </svg>
  );
}

function NfcReader(): React.ReactElement {
  return (
    <svg width="140" height="80" viewBox="0 0 140 80" fill="none">
      {/* NFC terminal body */}
      <rect x="14" y="20" width="80" height="50" rx="4" fill="#1a1f25" />
      {/* status leds */}
      <circle cx="22" cy="32" r="2" fill="#28c76f" />
      <circle cx="22" cy="40" r="2" fill="#f59f00" />
      <circle cx="22" cy="48" r="2" fill="#e4002b" />
      {/* NFC zone */}
      <rect x="30" y="30" width="58" height="30" rx="3" fill="#3d4750" />
      <text x="38" y="48" fill="#ffffff" fontSize="9" fontWeight="700">
        카드를 대주세요
      </text>
      {/* Floating card */}
      <rect
        x="64"
        y="40"
        width="62"
        height="34"
        rx="4"
        fill="#ffffff"
        stroke="#2a1408"
        strokeWidth="1.5"
      />
      <text x="72" y="58" fill="#2a1408" fontSize="8" fontWeight="800">
        CREDIT CARD
      </text>
    </svg>
  );
}
