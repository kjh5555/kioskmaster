import { css, keyframes } from "@emotion/react";
import { useEffect, useState } from "react";

import { type CustomLayoutProps } from "./types";
import { useDecoShake } from "./useDecoShake";

const popIn = keyframes`
  0%   { transform: scale(0.92); opacity: 0; }
  100% { transform: scale(1);    opacity: 1; }
`;

const blink = keyframes`
  0%   { opacity: 1; }
  50%  { opacity: 0.4; }
  100% { opacity: 1; }
`;

const AUTO_ADVANCE_MS = 3000;

export function LotteriaCardInsert({
  step,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const [remaining, setRemaining] = useState(Math.ceil(AUTO_ADVANCE_MS / 1000));
  const { shakeNow, shakeStyle } = useDecoShake();

  useEffect(() => {
    const tick = setInterval(() => {
      setRemaining((r) => (r > 0 ? r - 1 : 0));
    }, 1000);
    const done = setTimeout(() => {
      onChoice(step.correctChoiceId);
    }, AUTO_ADVANCE_MS);
    return () => {
      clearInterval(tick);
      clearTimeout(done);
    };
  }, [onChoice, step.correctChoiceId]);

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        min-height: 100%;
        background: #f3e9e1;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
        display: flex;
        flex-direction: column;
      `}
    >
      {/* Dim background — faded pay-method screen */}
      <div
        css={css`
          background: linear-gradient(180deg, #d62300 0%, #b81f00 100%);
          color: #ffffff;
          padding: 12px 14px;
          opacity: 0.45;
        `}
      >
        <div
          css={css`
            font-size: 16px;
            font-weight: 900;
            text-align: center;
          `}
        >
          수제스타일 버터번
        </div>
      </div>

      {/* Card insert modal */}
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
            max-width: 420px;
            background: #ffffff;
            border-radius: 18px;
            padding: 18px 16px 16px;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
            animation: ${popIn} 220ms ease-out;
          `}
        >
          <div
            css={css`
              font-size: 18px;
              font-weight: 900;
              color: #2a1408;
              text-align: center;
              padding-bottom: 8px;
            `}
          >
            신용/체크카드
          </div>
          <div
            css={css`
              text-align: center;
              font-size: 12px;
              font-weight: 700;
              color: #2a1408;
              padding-bottom: 4px;
            `}
          >
            · 그림과 같이 카드를 넣어주세요
          </div>
          <div
            css={css`
              text-align: center;
              font-size: 12px;
              font-weight: 800;
              color: #2a1408;
              padding-bottom: 12px;
            `}
          >
            (IC칩이 단말기에 투입되도록 넣어주세요)
          </div>

          {/* Illustrations row */}
          <div
            css={css`
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
              padding: 8px 0 16px;
            `}
          >
            {/* Card stack */}
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: center;
                height: 110px;
                position: relative;
              `}
            >
              <CardStack />
            </div>
            {/* Reader + barcode + phone */}
            <div
              css={css`
                display: flex;
                align-items: flex-end;
                justify-content: center;
                gap: 4px;
                height: 110px;
              `}
            >
              <Barcode />
              <CardReader />
              <Phone />
            </div>
          </div>

          {/* Status row */}
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding-top: 10px;
              border-top: 1px solid #e5e8eb;
            `}
          >
            <span
              css={css`
                font-size: 11px;
                font-weight: 800;
                color: #4e5968;
                animation: ${blink} 1.2s ease-in-out infinite;
              `}
            >
              [KICC 리더기] 카드 삽입 대기... ({remaining}s)
            </span>
            <button
              type="button"
              onClick={() => shakeNow("cancel")}
              css={[css`
                padding: 6px 22px;
                border-radius: 8px;
                border: 1.5px solid #2a1408;
                background: #ffffff;
                color: #2a1408;
                font-size: 13px;
                font-weight: 900;
                font-family: inherit;
                cursor: pointer;
                :active {
                  background: #f6f7f9;
                }
              `, shakeStyle("cancel")]}
            >
              취소
            </button>
          </div>
        </div>
      </div>

      {/* Bottom inert buttons */}
      <div
        css={css`
          background: #ffffff;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          padding: 12px 14px 16px;
          margin-top: auto;
        `}
      >
        <button
          type="button"
          onClick={() => shakeNow("pay-cancel")}
          css={[css`
            height: 44px;
            border-radius: 8px;
            font-weight: 900;
            font-size: 14px;
            font-family: inherit;
            cursor: pointer;
            background: #ffffff;
            color: #2a1408;
            border: 1.5px solid #2a1408;
            :active {
              filter: brightness(0.92);
            }
          `, shakeStyle("pay-cancel")]}
        >
          결제취소
        </button>
        <button
          type="button"
          onClick={() => shakeNow("add-order")}
          css={[css`
            height: 44px;
            border-radius: 8px;
            font-weight: 900;
            font-size: 14px;
            font-family: inherit;
            cursor: pointer;
            background: #ffd400;
            color: #2a1408;
            border: none;
            :active {
              filter: brightness(0.92);
            }
          `, shakeStyle("add-order")]}
        >
          추가주문
        </button>
      </div>
    </div>
  );
}

function CardStack(): React.ReactElement {
  return (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
      {/* back card */}
      <rect
        x="14"
        y="10"
        width="80"
        height="50"
        rx="4"
        fill="#444b54"
        stroke="#1a1f25"
        strokeWidth="1.2"
        transform="rotate(-12 54 35)"
      />
      {/* middle card */}
      <rect
        x="20"
        y="14"
        width="80"
        height="50"
        rx="4"
        fill="#9ba3ab"
        stroke="#1a1f25"
        strokeWidth="1.2"
        transform="rotate(-4 60 39)"
      />
      {/* front card — yellow */}
      <rect
        x="24"
        y="18"
        width="86"
        height="54"
        rx="5"
        fill="#ffd400"
        stroke="#2a1408"
        strokeWidth="1.5"
      />
      <rect x="36" y="30" width="18" height="14" rx="2" fill="#caa800" />
      <rect x="36" y="50" width="50" height="3" rx="1" fill="#2a1408" opacity="0.4" />
      <rect x="36" y="56" width="34" height="3" rx="1" fill="#2a1408" opacity="0.4" />
    </svg>
  );
}

function Barcode(): React.ReactElement {
  return (
    <svg width="42" height="100" viewBox="0 0 42 100" fill="none">
      <rect
        x="2"
        y="34"
        width="38"
        height="58"
        rx="4"
        fill="#2a2f36"
        stroke="#0c0e12"
        strokeWidth="1.2"
      />
      <text
        x="21"
        y="28"
        fontSize="6"
        fontWeight="800"
        fill="#2a1408"
        textAnchor="middle"
      >
        바코드
      </text>
      {/* barcode lines */}
      {[8, 12, 18, 24, 28, 32].map((x, i) => (
        <rect
          key={i}
          x={x}
          y="46"
          width={x % 8 === 0 ? 1.6 : 0.8}
          height="34"
          fill="#ffffff"
        />
      ))}
    </svg>
  );
}

function CardReader(): React.ReactElement {
  return (
    <svg width="48" height="100" viewBox="0 0 48 100" fill="none">
      <text
        x="24"
        y="14"
        fontSize="6"
        fontWeight="800"
        fill="#2a1408"
        textAnchor="middle"
      >
        IC카드
      </text>
      <rect
        x="6"
        y="18"
        width="36"
        height="74"
        rx="4"
        fill="#3d4750"
        stroke="#0c0e12"
        strokeWidth="1.2"
      />
      {/* slot */}
      <rect x="14" y="36" width="20" height="3" rx="1.5" fill="#0c0e12" />
      {/* card peeking in */}
      <rect x="16" y="20" width="16" height="22" rx="2" fill="#ffd400" stroke="#2a1408" strokeWidth="1" />
      {/* screen */}
      <rect x="10" y="60" width="28" height="20" rx="2" fill="#000000" />
      <rect x="13" y="64" width="8" height="3" fill="#33ff66" opacity="0.7" />
      <rect x="13" y="69" width="14" height="2" fill="#33ff66" opacity="0.5" />
      <rect x="13" y="73" width="10" height="2" fill="#33ff66" opacity="0.5" />
    </svg>
  );
}

function Phone(): React.ReactElement {
  return (
    <svg width="42" height="100" viewBox="0 0 42 100" fill="none">
      <text
        x="21"
        y="14"
        fontSize="6"
        fontWeight="800"
        fill="#2a1408"
        textAnchor="middle"
      >
        모바일
      </text>
      <rect
        x="6"
        y="18"
        width="30"
        height="74"
        rx="6"
        fill="#ffffff"
        stroke="#2a1408"
        strokeWidth="1.5"
      />
      <rect x="10" y="24" width="22" height="38" rx="2" fill="#f3e9e1" />
      {/* Apple Pay-style chip */}
      <rect
        x="12"
        y="30"
        width="10"
        height="14"
        rx="1.5"
        fill="#ffd400"
        stroke="#2a1408"
        strokeWidth="0.8"
      />
      <text
        x="27"
        y="42"
        fontSize="5"
        fontWeight="800"
        fill="#2a1408"
        textAnchor="middle"
      >
        Pay
      </text>
      <circle cx="21" cy="80" r="2.5" fill="#cad0d8" />
    </svg>
  );
}
