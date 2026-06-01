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

export function GeneralStart({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const register = step.choices.find((c) => c.id === "register")!;
  const correctId = step.correctChoiceId;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background: #e8f2fa;
        font-family: system-ui, -apple-system, sans-serif;
        overflow: hidden;
      `}
    >
      {/* Top — 종합병원 헤더 */}
      <div
        css={css`
          background: #0067a6;
          color: #ffffff;
          padding: 22px 16px;
          text-align: center;
        `}
      >
        <div
          css={css`
            font-size: 13px;
            opacity: 0.9;
            letter-spacing: 0.05em;
          `}
        >
          GENERAL HOSPITAL
        </div>
        <div
          css={css`
            font-size: 26px;
            font-weight: 900;
            padding-top: 4px;
          `}
        >
          무인 접수기
        </div>
      </div>

      {/* Center — 일러스트 + 안내문 */}
      <div
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 18px;
          padding: 24px 16px;
        `}
      >
        <div style={{ fontSize: 96 }}>🏥</div>
        <div
          css={css`
            font-size: 20px;
            font-weight: 900;
            color: #0067a6;
            text-align: center;
            line-height: 1.4;
          `}
        >
          접수하시려면<br />
          아래 버튼을 눌러주세요
        </div>
      </div>

      {/* Big CTA */}
      <div
        css={css`
          padding: 14px 16px calc(env(safe-area-inset-bottom, 0px) + 18px);
        `}
      >
        <button
          type="button"
          onClick={() => onChoice(register.id)}
          css={[
            css`
              width: 100%;
              padding: 28px 16px;
              background: #0067a6;
              color: #ffffff;
              border: none;
              border-radius: 18px;
              font-family: inherit;
              font-size: 26px;
              font-weight: 900;
              cursor: pointer;
              box-shadow: 0 8px 18px rgba(0, 103, 166, 0.3);
              -webkit-tap-highlight-color: transparent;
              :active {
                transform: scale(0.98);
              }
            `,
            shakeWhen(rejectedChoiceId, register.id),
            idlePulse(idleHintActive, register.id === correctId),
          ]}
        >
          📋 접수하기
        </button>
      </div>
    </div>
  );
}
