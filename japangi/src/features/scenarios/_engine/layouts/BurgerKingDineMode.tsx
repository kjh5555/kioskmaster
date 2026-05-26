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

export function BurgerKingDineMode({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const [selected, setSelected] = useState<"dine-in" | "takeout" | null>(null);

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
          padding: 28px 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 22px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
        `}
      >
        <div
          css={css`
            text-align: center;
            font-size: 19px;
            font-weight: 800;
            color: #2a1408;
          `}
        >
          선택해주세요
        </div>

        {/* Two option cards */}
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            padding: 0 6px;
          `}
        >
          <button
            type="button"
            onClick={() => setSelected("dine-in")}
            css={[
              css`
                background: ${selected === "dine-in" ? "#fff5e6" : "#ffffff"};
                border: 2px solid
                  ${selected === "dine-in" ? "#e07a1a" : "#e5e8eb"};
                border-radius: 14px;
                padding: 22px 12px 16px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 14px;
                cursor: pointer;
                font-family: inherit;
                &:active {
                  background: #fff5e6;
                }
              `,
              shakeWhen(rejectedChoiceId, "dine-in"),
            ]}
          >
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
              {/* Knife */}
              <path
                d="M22 8 L30 8 L34 28 L30 32 L26 32 L22 28 Z"
                fill="#4a2412"
              />
              <rect
                x="24"
                y="32"
                width="6"
                height="38"
                rx="2"
                fill="#4a2412"
                transform="rotate(-12 27 51)"
              />
              {/* Fork */}
              <rect x="52" y="6" width="4" height="22" fill="#4a2412" />
              <rect x="58" y="6" width="4" height="22" fill="#4a2412" />
              <rect x="46" y="6" width="4" height="22" fill="#4a2412" />
              <rect
                x="46"
                y="24"
                width="20"
                height="10"
                rx="3"
                fill="#4a2412"
              />
              <rect
                x="52"
                y="32"
                width="6"
                height="38"
                rx="2"
                fill="#4a2412"
                transform="rotate(12 55 51)"
              />
            </svg>
            <span
              css={css`
                font-size: 18px;
                font-weight: 800;
                color: #4a2412;
              `}
            >
              매장식사
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelected("takeout")}
            css={[
              css`
                background: ${selected === "takeout" ? "#fff5e6" : "#ffffff"};
                border: 2px solid
                  ${selected === "takeout" ? "#e07a1a" : "#e5e8eb"};
                border-radius: 14px;
                padding: 22px 12px 16px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 14px;
                cursor: pointer;
                font-family: inherit;
                &:active {
                  background: #fff5e6;
                }
              `,
              shakeWhen(rejectedChoiceId, "takeout"),
            ]}
          >
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
              {/* Bag */}
              <path
                d="M20 22 L60 22 L62 72 L18 72 Z"
                fill="#4a2412"
              />
              {/* Handle */}
              <path
                d="M30 22 Q30 8 40 8 Q50 8 50 22"
                stroke="#4a2412"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            <span
              css={css`
                font-size: 18px;
                font-weight: 800;
                color: #4a2412;
              `}
            >
              포장주문
            </span>
          </button>
        </div>

        {/* Confirm button (disabled until selection) */}
        <button
          type="button"
          disabled={selected === null}
          onClick={() => {
            if (selected !== null) onChoice(selected);
          }}
          css={[
            css`
              width: 100%;
              height: 52px;
              background: ${selected !== null ? "#d62300" : "#d8d8d8"};
              color: ${selected !== null ? "#ffffff" : "#8b95a1"};
              border: none;
              border-radius: 8px;
              font-size: 17px;
              font-weight: 800;
              cursor: ${selected !== null ? "pointer" : "not-allowed"};
              &:active {
                background: ${selected !== null ? "#a91a00" : "#d8d8d8"};
              }
            `,
            idlePulse(
              idleHintActive && selected === step.correctChoiceId,
              true,
            ),
          ]}
        >
          확인
        </button>
      </div>
    </div>
  );
}
