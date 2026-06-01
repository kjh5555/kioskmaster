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

export function GeneralSummary({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const confirm = step.choices.find((c) => c.id === "confirm")!;
  const back = step.choices.find((c) => c.id === "back")!;
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
        접수 내용 확인
      </div>

      <div
        css={css`
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        `}
      >
        {/* Summary card */}
        <div
          css={css`
            background: #ffffff;
            border: 2px solid #0067a6;
            border-radius: 16px;
            padding: 18px 20px;
            display: flex;
            flex-direction: column;
            gap: 14px;
          `}
        >
          {[
            { label: "이름", value: "홍길동" },
            { label: "진료과", value: "내과" },
            { label: "담당 의사", value: "김민수 선생님" },
          ].map((row) => (
            <div
              key={row.label}
              css={css`
                display: flex;
                justify-content: space-between;
                align-items: center;
              `}
            >
              <span
                css={css`
                  font-size: 15px;
                  color: #5a7a92;
                `}
              >
                {row.label}
              </span>
              <span
                css={css`
                  font-size: 19px;
                  font-weight: 900;
                  color: #0067a6;
                `}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        css={css`
          flex: 1;
        `}
      />

      <div
        css={css`
          padding: 14px 16px calc(env(safe-area-inset-bottom, 0px) + 18px);
          display: flex;
          flex-direction: column;
          gap: 10px;
        `}
      >
        <button
          type="button"
          onClick={() => onChoice(confirm.id)}
          css={[
            css`
              width: 100%;
              padding: 22px 16px;
              background: #0067a6;
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
            shakeWhen(rejectedChoiceId, confirm.id),
            idlePulse(idleHintActive, confirm.id === correctId),
          ]}
        >
          ✅ 접수하기
        </button>
        <button
          type="button"
          onClick={() => onChoice(back.id)}
          css={[
            css`
              width: 100%;
              padding: 16px;
              background: #ffffff;
              color: #5a7a92;
              border: 2px solid #aab8c2;
              border-radius: 14px;
              font-family: inherit;
              font-size: 15px;
              font-weight: 800;
              cursor: pointer;
              -webkit-tap-highlight-color: transparent;
            `,
            shakeWhen(rejectedChoiceId, back.id),
          ]}
        >
          ↺ 다시 고르기
        </button>
      </div>
    </div>
  );
}
