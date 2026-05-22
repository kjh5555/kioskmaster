import { useState, useEffect } from "react";
import { css, keyframes } from "@emotion/react";

import type { CustomLayoutProps } from "./types";

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

function ProcessingView({
  rejectedChoiceId,
  onCancel,
}: {
  rejectedChoiceId: string | null;
  onCancel: () => void;
}) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        min-height: 100%;
        width: 100%;
        background: #ffffff;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
      `}
    >
      {/* M logo */}
      <div
        css={css`
          padding: 24px 0 8px;
          display: flex;
          justify-content: center;
        `}
      >
        <span
          css={css`
            font-size: 36px;
            font-weight: 900;
            color: #ffc72c;
            line-height: 1;
          `}
        >
          M
        </span>
      </div>

      {/* Headline */}
      <div
        css={css`
          padding: 8px 24px 20px;
          text-align: center;
        `}
      >
        <p
          css={css`
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            color: #191f28;
            line-height: 1.3;
          `}
        >
          결제를 진행해 주세요
        </p>
      </div>

      {/* Info box + card illustration */}
      <div
        css={css`
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        `}
      >
        {/* Yellow info box */}
        <div
          css={css`
            width: 100%;
            background: #fff8e1;
            border: 1.5px solid #ffc72c;
            border-radius: 12px;
            padding: 12px 16px;
          `}
        >
          <p
            css={css`
              margin: 0 0 6px;
              font-size: 12px;
              font-weight: 700;
              color: #c62828;
              line-height: 1.4;
            `}
          >
            IC신용/체크카드 사용시
          </p>
          <p
            css={css`
              margin: 0;
              font-size: 12px;
              color: #191f28;
              line-height: 1.6;
            `}
          >
            카드를 화살표 방향으로 투입구에 넣어주세요{"\n"}결제 오류 시 카드를
            긁어주세요
          </p>
        </div>

        {/* Card illustration */}
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 8px;
          `}
        >
          {/* Card */}
          <div
            css={css`
              width: 64px;
              height: 44px;
              background: #ffc72c;
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
            `}
          >
            <span
              css={css`
                font-size: 22px;
                font-weight: 900;
                color: #191f28;
                line-height: 1;
              `}
            >
              M
            </span>
          </div>

          {/* Arrows */}
          <span
            css={css`
              font-size: 20px;
              color: #ffc72c;
              line-height: 1;
            `}
          >
            ➡➡
          </span>

          {/* Slot */}
          <div
            css={css`
              width: 12px;
              height: 60px;
              background: #d1d6db;
              border-radius: 3px;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          />
        </div>
      </div>

      <div
        css={css`
          flex: 1;
        `}
      />

      {/* 취소 button */}
      <div
        css={css`
          padding: 32px 24px 32px;
        `}
      >
        <button
          css={[
            css`
              width: 100%;
              height: 48px;
              background: #ffffff;
              border: 1.5px solid #d1d6db;
              border-radius: 10px;
              font-size: 15px;
              font-weight: 500;
              color: #191f28;
              cursor: pointer;

              &:active {
                background: #f5f5f5;
              }
            `,
            shakeWhen(rejectedChoiceId, "cancel"),
          ]}
          onClick={onCancel}
        >
          취소
        </button>
      </div>
    </div>
  );
}

function CompleteView({
  rejectedChoiceId,
  onDone,
}: {
  rejectedChoiceId: string | null;
  onDone: () => void;
}) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        min-height: 100%;
        width: 100%;
        background: #ffffff;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
      `}
    >
      {/* M logo */}
      <div
        css={css`
          padding: 24px 0 8px;
          display: flex;
          justify-content: center;
        `}
      >
        <span
          css={css`
            font-size: 36px;
            font-weight: 900;
            color: #ffc72c;
            line-height: 1;
          `}
        >
          M
        </span>
      </div>

      {/* Center content */}
      <div
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 24px;
          gap: 12px;
          text-align: center;
        `}
      >
        <span
          css={css`
            font-size: 80px;
            line-height: 1;
          `}
        >
          🎉
        </span>

        <p
          css={css`
            margin: 0;
            font-size: 18px;
            font-weight: 400;
            color: #8b95a1;
            line-height: 1.4;
          `}
        >
          주문번호
        </p>

        <p
          css={css`
            margin: 0;
            font-size: 80px;
            font-weight: 700;
            color: #191f28;
            line-height: 1;
            letter-spacing: -2px;
          `}
        >
          A-138
        </p>

        <p
          css={css`
            margin: 0;
            font-size: 14px;
            color: #8b95a1;
            line-height: 1.5;
          `}
        >
          매장에서 번호가 불리면 음식을 받으세요
        </p>
      </div>

      {/* 확인 CTA */}
      <div
        css={css`
          padding: 32px 24px 32px;
        `}
      >
        <button
          css={[
            css`
              width: 100%;
              height: 60px;
              background: #ffc72c;
              border: none;
              border-radius: 10px;
              font-size: 18px;
              font-weight: 700;
              color: #191f28;
              cursor: pointer;

              &:active {
                background: #e6b000;
              }
            `,
            shakeWhen(rejectedChoiceId, "done"),
          ]}
          onClick={onDone}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export function McdonaldsPayProcessing({
  rejectedChoiceId,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const [phase, setPhase] = useState<"processing" | "complete">("processing");

  useEffect(() => {
    if (phase === "processing") {
      const t = setTimeout(() => setPhase("complete"), 3000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (phase === "processing") {
    return (
      <ProcessingView
        onCancel={() => onChoice("cancel")}
        rejectedChoiceId={rejectedChoiceId}
      />
    );
  }
  return (
    <CompleteView
      onDone={() => onChoice("done")}
      rejectedChoiceId={rejectedChoiceId}
    />
  );
}
