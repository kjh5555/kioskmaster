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

// 종합병원 로비 — 4종 키오스크 중 진료 접수기 고르기.
// 실제 병원에서 노인 사용자가 처음 마주치는 혼란점.
export function GeneralKioskSelect({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const correctId = step.correctChoiceId;
  // 비정답 클릭 시 거부하지 않고 그 키오스크 용도 안내. 정답만 진행.
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
      {/* Header — 병원 로비 안내 */}
      <div
        css={css`
          background: #0067a6;
          color: #ffffff;
          padding: 18px 16px;
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
          종합병원 로비
        </div>
        <div
          css={css`
            font-size: 20px;
            font-weight: 900;
            padding-top: 4px;
          `}
        >
          어떤 키오스크 앞으로 가실까요?
        </div>
      </div>

      {/* 4 키오스크 카드 그리드 */}
      <div
        css={css`
          flex: 1;
          padding: 16px 14px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          align-content: start;
          overflow-y: auto;
        `}
      >
        {step.choices.map((c) => {
          const isCorrect = c.id === correctId;
          const isPreviewed = c.id === previewId;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => handleClick(c.id)}
              css={[
                css`
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  gap: 10px;
                  padding: 22px 12px;
                  background: #ffffff;
                  border: 3px solid ${isPreviewed ? "#f59e0b" : isCorrect ? "#0067a6" : "#aab8c2"};
                  border-radius: 18px;
                  color: ${isCorrect ? "#0067a6" : "#5a7a92"};
                  font-family: inherit;
                  cursor: pointer;
                  min-height: 170px;
                  box-shadow: 0 4px 10px rgba(0, 103, 166, 0.08);
                  -webkit-tap-highlight-color: transparent;
                  :active {
                    transform: scale(0.98);
                  }
                `,
                shakeWhen(rejectedChoiceId, c.id),
                idlePulse(idleHintActive, isCorrect),
              ]}
            >
              <span style={{ fontSize: 52 }}>{c.emoji}</span>
              <span
                css={css`
                  font-size: 18px;
                  font-weight: 900;
                  text-align: center;
                `}
              >
                {c.label}
              </span>
              {c.sublabel && (
                <span
                  css={css`
                    font-size: 11px;
                    color: #5a7a92;
                    text-align: center;
                    line-height: 1.3;
                  `}
                >
                  {c.sublabel}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 비정답 미리보기 안내 (하단 고정) */}
      {previewChoice && (
        <div
          css={css`
            margin: 0 14px calc(env(safe-area-inset-bottom, 0px) + 14px);
            padding: 14px 16px;
            background: #fff8e6;
            border: 2px solid #f59e0b;
            border-radius: 14px;
            font-size: 14px;
            color: #5a4400;
            line-height: 1.5;
          `}
        >
          <strong>{previewChoice.label}</strong>는 {previewChoice.sublabel} 거예요.<br />
          오늘 연습은 <strong>{correctChoice?.label}</strong> 이에요 — 위 카드를 눌러주세요.
        </div>
      )}
    </div>
  );
}
