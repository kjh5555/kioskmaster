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

const buzz = keyframes`
  0%, 100% { transform: rotate(0deg); }
  20% { transform: rotate(-6deg); }
  40% { transform: rotate(6deg); }
  60% { transform: rotate(-4deg); }
  80% { transform: rotate(4deg); }
`;

export function MegaOrderComplete({
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
        background: #ffc700;
        color: #000000;
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
          gap: 20px;
          padding: 24px;
          text-align: center;
        `}
      >
        <div
          css={css`
            font-size: 18px;
            font-weight: 800;
          `}
        >
          주문이 완료되었어요
        </div>
        <div
          css={css`
            background: #000000;
            color: #ffc700;
            padding: 24px 36px;
            border-radius: 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
          `}
        >
          <span
            css={css`
              font-size: 13px;
              font-weight: 800;
              letter-spacing: 0.06em;
            `}
          >
            주문번호
          </span>
          <span
            css={css`
              font-size: 64px;
              font-weight: 900;
              line-height: 1;
            `}
          >
            73
          </span>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            padding-top: 8px;
          `}
        >
          <div
            css={css`
              font-size: 64px;
              animation: ${buzz} 0.6s ease-in-out infinite;
            `}
          >
            📳
          </div>
          <div
            css={css`
              font-size: 15px;
              line-height: 1.5;
              max-width: 280px;
            `}
          >
            <strong>진동벨</strong>을 손에 쥐고 계시다가<br />
            울리면 받는 곳으로 가세요
          </div>
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
              background: #000000;
              color: #ffc700;
              border: none;
              border-radius: 16px;
              font-family: inherit;
              font-size: 22px;
              font-weight: 900;
              cursor: pointer;
              box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);
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
