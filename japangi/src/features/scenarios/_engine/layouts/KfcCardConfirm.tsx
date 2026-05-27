import { css, keyframes } from "@emotion/react";

import { idlePulse, type CustomLayoutProps } from "./types";

const popIn = keyframes`
  0%   { transform: scale(0.94); opacity: 0; }
  100% { transform: scale(1);    opacity: 1; }
`;

export function KfcCardConfirm({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const correctId = step.correctChoiceId;
  const pay = step.choices.find((c) => c.id === "pay");
  const prev = step.choices.find((c) => c.id === "prev");

  return (
    <div
      css={css`
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.35);
        z-index: 9000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
      `}
    >
      <div
        css={css`
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          border-radius: 14px;
          padding: 28px 22px 20px;
          animation: ${popIn} 220ms ease-out;
          display: flex;
          flex-direction: column;
          gap: 22px;
          min-height: 60vh;
        `}
      >
        {/* Title row: icon + 신용카드 */}
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 18px;
            padding: 6px 0 8px;
          `}
        >
          <CreditCardIcon />
          <span
            css={css`
              font-size: 32px;
              font-weight: 900;
              color: #2a1408;
              letter-spacing: -0.03em;
            `}
          >
            신용카드
          </span>
        </div>

        {/* Payment amount card */}
        <div
          css={css`
            background: #f4f5f6;
            border-radius: 10px;
            padding: 22px 22px;
            display: grid;
            grid-template-columns: 1fr auto;
            align-items: center;
          `}
        >
          <span
            css={css`
              font-size: 22px;
              font-weight: 900;
              color: #2a1408;
              letter-spacing: -0.02em;
            `}
          >
            결제 금액
          </span>
          <span
            css={css`
              font-size: 32px;
              font-weight: 900;
              color: #e4002b;
              letter-spacing: -0.03em;
            `}
          >
            30,100
          </span>
        </div>

        <div css={css`flex: 1;`} />

        {/* Bottom buttons */}
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1.6fr;
            gap: 12px;
          `}
        >
          <button
            type="button"
            onClick={() => prev && onChoice(prev.id)}
            css={[
              prevPill,
              rejectedChoiceId === prev?.id &&
                css`
                  border-color: #e4002b;
                `,
            ]}
          >
            이전
          </button>
          <button
            type="button"
            onClick={() => pay && onChoice(pay.id)}
            css={[
              payPill,
              idlePulse(idleHintActive, pay?.id === correctId),
            ]}
          >
            결제
          </button>
        </div>
      </div>
    </div>
  );
}

function CreditCardIcon(): React.ReactElement {
  return (
    <svg width="80" height="64" viewBox="0 0 80 64" fill="none">
      <rect
        x="4"
        y="6"
        width="72"
        height="52"
        rx="8"
        stroke="#e4002b"
        strokeWidth="3"
        fill="#ffffff"
      />
      <rect x="14" y="22" width="22" height="3" fill="#e4002b" />
      <rect x="14" y="30" width="36" height="3" fill="#e4002b" />
    </svg>
  );
}

const prevPill = css`
  background: #ffffff;
  border: 1.5px solid #d1d5da;
  border-radius: 999px;
  padding: 14px;
  font-size: 14px;
  font-weight: 800;
  color: #2a1408;
  font-family: inherit;
  cursor: pointer;
  :active {
    background: #f6f7f9;
  }
`;

const payPill = css`
  background: #e4002b;
  color: #ffffff;
  border: none;
  border-radius: 999px;
  padding: 14px;
  font-size: 14px;
  font-weight: 900;
  font-family: inherit;
  cursor: pointer;
  :active {
    filter: brightness(0.92);
  }
`;
