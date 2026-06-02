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

export function GeneralDoctor({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const correctId = step.correctChoiceId;
  const [previewId, setPreviewId] = useState<string | null>(null);
  const previewChoice = step.choices.find((c) => c.id === previewId);
  const correctChoice = step.choices.find((c) => c.id === correctId);

  function handleClick(id: string) {
    if (id === correctId) onChoice(id);
    else setPreviewId(id);
  }

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
        내과 — 오늘 진료 가능한 선생님
      </div>

      <div
        css={css`
          flex: 1;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow-y: auto;
        `}
      >
        {step.choices.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => handleClick(c.id)}
            css={[
              css`
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 20px 18px;
                background: #ffffff;
                border: 2px solid ${c.id === previewId ? "#f59e0b" : "#0067a6"};
                border-radius: 16px;
                color: #0067a6;
                font-family: inherit;
                text-align: left;
                cursor: pointer;
                box-shadow: 0 3px 8px rgba(0, 103, 166, 0.08);
                -webkit-tap-highlight-color: transparent;
                :active {
                  transform: scale(0.99);
                }
              `,
              shakeWhen(rejectedChoiceId, c.id),
              idlePulse(idleHintActive, c.id === correctId),
            ]}
          >
            <span style={{ fontSize: 44 }}>{c.emoji}</span>
            <div
              css={css`
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 4px;
              `}
            >
              <span
                css={css`
                  font-size: 20px;
                  font-weight: 900;
                `}
              >
                {c.label}
              </span>
              {c.sublabel && (
                <span
                  css={css`
                    font-size: 14px;
                    color: #5a7a92;
                  `}
                >
                  {c.sublabel}
                </span>
              )}
            </div>
            <span style={{ fontSize: 22, color: "#0067a6" }}>›</span>
          </button>
        ))}
      </div>

      {previewChoice && (
        <div
          css={css`
            margin: 0 16px calc(env(safe-area-inset-bottom, 0px) + 14px);
            padding: 14px 16px;
            background: #fff8e6;
            border: 2px solid #f59e0b;
            border-radius: 14px;
            font-size: 14px;
            color: #5a4400;
            line-height: 1.5;
          `}
        >
          <strong>{previewChoice.label}</strong> — {previewChoice.sublabel}.<br />
          오늘 연습은 <strong>{correctChoice?.label}</strong>로 골라주세요.
        </div>
      )}
    </div>
  );
}
