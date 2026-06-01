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

export function GeneralConfirm({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const yes = step.choices.find((c) => c.id === "yes")!;
  const no = step.choices.find((c) => c.id === "no")!;
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
      <div
        css={css`
          background: #0067a6;
          color: #ffffff;
          padding: 18px 16px;
          text-align: center;
          font-size: 18px;
          font-weight: 900;
        `}
      >
        본인 확인
      </div>

      <div
        css={css`
          flex: 1;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          justify-content: center;
        `}
      >
        {/* 가상 본인 정보 카드 */}
        <div
          css={css`
            padding: 22px 20px;
            background: #ffffff;
            border: 3px solid #0067a6;
            border-radius: 18px;
            box-shadow: 0 6px 14px rgba(0, 103, 166, 0.12);
          `}
        >
          <div
            css={css`
              font-size: 13px;
              color: #5a7a92;
              padding-bottom: 6px;
            `}
          >
            이 분이 맞으신가요?
          </div>
          <div
            css={css`
              font-size: 26px;
              font-weight: 900;
              color: #0067a6;
            `}
          >
            홍길동님
          </div>
          <div
            css={css`
              font-size: 15px;
              color: #5a7a92;
              padding-top: 6px;
            `}
          >
            생년월일 · 비공개
          </div>
        </div>

        <button
          type="button"
          onClick={() => onChoice(yes.id)}
          css={[
            css`
              padding: 22px 16px;
              background: #1f9d3e;
              color: #ffffff;
              border: none;
              border-radius: 16px;
              font-family: inherit;
              font-size: 22px;
              font-weight: 900;
              cursor: pointer;
              -webkit-tap-highlight-color: transparent;
              :active {
                transform: scale(0.98);
              }
            `,
            shakeWhen(rejectedChoiceId, yes.id),
            idlePulse(idleHintActive, yes.id === correctId),
          ]}
        >
          ✅ 맞아요
        </button>

        <button
          type="button"
          onClick={() => onChoice(no.id)}
          css={[
            css`
              padding: 18px 16px;
              background: #ffffff;
              color: #5a7a92;
              border: 2px solid #aab8c2;
              border-radius: 16px;
              font-family: inherit;
              font-size: 17px;
              font-weight: 800;
              cursor: pointer;
              -webkit-tap-highlight-color: transparent;
            `,
            shakeWhen(rejectedChoiceId, no.id),
          ]}
        >
          ↺ 다시 입력할게요
        </button>
      </div>
    </div>
  );
}
