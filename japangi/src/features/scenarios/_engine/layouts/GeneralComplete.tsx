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

const pulseKf = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); }
`;

export function GeneralComplete({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const done = step.choices.find((c) => c.id === "done")!;
  const correctId = step.correctChoiceId;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background: #0067a6;
        color: #ffffff;
        font-family: system-ui, -apple-system, sans-serif;
        overflow: hidden;
      `}
    >
      <div
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 22px;
          padding: 24px;
          text-align: center;
        `}
      >
        <div
          css={css`
            font-size: 18px;
            font-weight: 800;
            opacity: 0.9;
          `}
        >
          접수가 완료되었어요
        </div>

        {/* 대기번호 카드 */}
        <div
          css={css`
            background: #ffffff;
            color: #0067a6;
            padding: 28px 44px;
            border-radius: 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25);
            animation: ${pulseKf} 2s ease-in-out infinite;
          `}
        >
          <span
            css={css`
              font-size: 14px;
              font-weight: 800;
              letter-spacing: 0.06em;
            `}
          >
            대기번호
          </span>
          <span
            css={css`
              font-size: 80px;
              font-weight: 900;
              line-height: 1;
            `}
          >
            12
          </span>
        </div>

        <div
          css={css`
            font-size: 16px;
            line-height: 1.6;
            max-width: 320px;
          `}
        >
          <strong>내과 진료실</strong> 앞 모니터에<br />
          <strong>12번</strong>이 뜨면 들어가시면 돼요
        </div>

        <div
          css={css`
            background: rgba(255, 255, 255, 0.18);
            padding: 8px 16px;
            border-radius: 999px;
            font-size: 13px;
          `}
        >
          잘하셨어요! 🎉
        </div>
      </div>

      <div
        css={css`
          padding: 14px 16px calc(env(safe-area-inset-bottom, 0px) + 18px);
        `}
      >
        <button
          type="button"
          onClick={() => onChoice(done.id)}
          css={[
            css`
              width: 100%;
              padding: 22px;
              background: #ffffff;
              color: #0067a6;
              border: none;
              border-radius: 16px;
              font-family: inherit;
              font-size: 22px;
              font-weight: 900;
              cursor: pointer;
              box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
              -webkit-tap-highlight-color: transparent;
              :active {
                transform: scale(0.98);
              }
            `,
            shakeWhen(rejectedChoiceId, done.id),
            idlePulse(idleHintActive, done.id === correctId),
          ]}
        >
          ✅ 완료
        </button>
      </div>
    </div>
  );
}
