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

export function StarbucksOptions({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const add = step.choices.find((c) => c.id === "add")!;
  const optionalChoices = step.choices.filter((c) => c.id !== "add");
  const correctId = step.correctChoiceId;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background: #f5f0e8;
        font-family: system-ui, -apple-system, sans-serif;
        overflow: hidden;
      `}
    >
      {/* Header */}
      <div
        css={css`
          background: #006241;
          color: #ffffff;
          padding: 16px 16px;
          text-align: center;
          font-size: 17px;
          font-weight: 800;
        `}
      >
        옵션은 기본 그대로도 좋아요
      </div>

      {/* Optional add-ons (informational) */}
      <div
        css={css`
          flex: 1;
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          overflow-y: auto;
        `}
      >
        {optionalChoices.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onChoice(c.id)}
            css={[
              css`
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 16px 18px;
                background: #ffffff;
                border: 1.5px solid #d9cdb8;
                border-radius: 14px;
                color: #1e3932;
                font-family: inherit;
                font-size: 16px;
                font-weight: 700;
                text-align: left;
                cursor: pointer;
                -webkit-tap-highlight-color: transparent;
                :active {
                  transform: scale(0.99);
                }
              `,
              shakeWhen(rejectedChoiceId, c.id),
            ]}
          >
            <span style={{ fontSize: 26 }}>{c.emoji}</span>
            <span style={{ flex: 1 }}>{c.label}</span>
            <span
              css={css`
                font-size: 13px;
                color: #6e6e6e;
              `}
            >
              선택
            </span>
          </button>
        ))}
      </div>

      {/* Big primary CTA — "담기" */}
      <div
        css={css`
          padding: 14px 16px calc(env(safe-area-inset-bottom, 0px) + 18px);
          background: #ffffff;
          border-top: 1px solid #e8e0d0;
        `}
      >
        <button
          type="button"
          onClick={() => onChoice(add.id)}
          css={[
            css`
              width: 100%;
              padding: 22px 16px;
              background: #006241;
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
            shakeWhen(rejectedChoiceId, add.id),
            idlePulse(idleHintActive, add.id === correctId),
          ]}
        >
          🛒 담기
        </button>
      </div>
    </div>
  );
}
