import { css, keyframes } from "@emotion/react";

import { idlePulse, type CustomLayoutProps } from "./types";

const popIn = keyframes`
  0%   { transform: scale(0.94); opacity: 0; }
  100% { transform: scale(1);    opacity: 1; }
`;

export function KfcReceiptPrompt({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const correctId = step.correctChoiceId;
  const skip = step.choices.find((c) => c.id === "skip");
  const earn = step.choices.find((c) => c.id === "earn");

  return (
    <div
      css={css`
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        z-index: 9000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 14px;
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
          padding: 38px 22px 22px;
          animation: ${popIn} 220ms ease-out;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 22px;
        `}
      >
        <div
          css={css`
            font-size: 30px;
            font-weight: 900;
            color: #e4002b;
            letter-spacing: -0.02em;
          `}
        >
          알림
        </div>
        <div
          css={css`
            text-align: center;
            font-size: 17px;
            font-weight: 800;
            color: #2a1408;
            line-height: 1.45;
            padding: 4px 8px 8px;
          `}
        >
          적립 및 현금 영수증을 원하시면
          <br />
          ‘적립’ 버튼을 눌러주세요.
        </div>

        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1.4fr;
            gap: 12px;
            width: 100%;
            padding-top: 12px;
          `}
        >
          {skip && (
            <button
              type="button"
              onClick={() => onChoice(skip.id)}
              css={[
                skipPill,
                rejectedChoiceId === skip.id &&
                  css`
                    border-color: #e4002b;
                  `,
                idlePulse(idleHintActive, skip.id === correctId),
              ]}
            >
              미적립
            </button>
          )}
          {earn && (
            <button
              type="button"
              onClick={() => onChoice(earn.id)}
              css={[
                earnPill,
                idlePulse(idleHintActive, earn.id === correctId),
              ]}
            >
              적립
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const skipPill = css`
  background: #ffffff;
  border: 1.5px solid #d1d5da;
  border-radius: 999px;
  padding: 14px;
  font-size: 14px;
  font-weight: 900;
  color: #2a1408;
  font-family: inherit;
  cursor: pointer;
  :active {
    background: #f6f7f9;
  }
`;

const earnPill = css`
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
