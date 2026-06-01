import { css, keyframes } from "@emotion/react";
import { useEffect } from "react";

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

const slideIn = keyframes`
  0% { transform: translateY(-20px); opacity: 0.7; }
  50% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-2px); opacity: 1; }
`;

export function MegaCardInsert({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const next = step.choices.find((c) => c.id === "next")!;
  const correctId = step.correctChoiceId;

  useEffect(() => {
    const t = setTimeout(() => onChoice(next.id), 3000);
    return () => clearTimeout(t);
  }, [next.id, onChoice]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background: #1c1c1c;
        color: #ffc700;
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
            font-size: 20px;
            font-weight: 900;
          `}
        >
          카드를 끝까지 넣어주세요
        </div>
        <div
          css={css`
            position: relative;
            width: 220px;
            height: 200px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
          `}
        >
          <div
            css={css`
              width: 140px;
              height: 90px;
              background: linear-gradient(135deg, #f5d76e, #c69d2a);
              border-radius: 8px;
              position: absolute;
              top: 0;
              animation: ${slideIn} 1.4s ease-in-out infinite;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 36px;
            `}
          >
            💳
          </div>
          <div
            css={css`
              width: 200px;
              height: 80px;
              background: #2c2c2c;
              border: 3px solid #ffc700;
              border-radius: 14px 14px 6px 6px;
              position: absolute;
              bottom: 0;
              display: flex;
              align-items: flex-start;
              justify-content: center;
              padding-top: 6px;
            `}
          >
            <div
              css={css`
                width: 110px;
                height: 8px;
                background: #000000;
                border-radius: 4px;
              `}
            />
          </div>
        </div>
        <div
          css={css`
            font-size: 14px;
            color: #d8c878;
          `}
        >
          잠시만 기다려주세요…
        </div>
        <div
          css={css`
            padding: 6px 12px;
            background: rgba(255, 199, 0, 0.18);
            border-radius: 999px;
            font-size: 12px;
            font-weight: 700;
          `}
        >
          ⚠️ 연습이에요. 진짜 돈은 안 나가요
        </div>
      </div>
      <div
        css={css`
          padding: 14px 16px calc(env(safe-area-inset-bottom, 0px) + 18px);
        `}
      >
        <button
          type="button"
          onClick={() => onChoice(next.id)}
          css={[
            css`
              width: 100%;
              padding: 18px;
              background: rgba(255, 199, 0, 0.18);
              color: #ffc700;
              border: 1.5px solid rgba(255, 199, 0, 0.45);
              border-radius: 14px;
              font-family: inherit;
              font-size: 16px;
              font-weight: 800;
              cursor: pointer;
              -webkit-tap-highlight-color: transparent;
            `,
            shakeWhen(rejectedChoiceId, next.id),
            idlePulse(idleHintActive, next.id === correctId),
          ]}
        >
          ▶️ 바로 다음으로
        </button>
      </div>
    </div>
  );
}
