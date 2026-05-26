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

const RICE_BURGER_IMG =
  "https://img.lotteeatz.com/upload/product/2023/02/03/20230203180810686_7.png/dims/resize/x420/optimize";

export function LotteriaStart({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const choice = step.choices[0];

  return (
    <button
      onClick={() => onChoice(choice.id)}
      css={[
        css`
          display: flex;
          flex-direction: column;
          width: 100%;
          min-height: 100dvh;
          border: none;
          padding: 0;
          cursor: pointer;
          background: #ffffff;
          font-family:
            system-ui,
            -apple-system,
            sans-serif;
          text-align: left;
          overflow: hidden;
        `,
        rejectedChoiceId === choice.id &&
          css`
            animation: ${shakeKf} 350ms ease;
          `,
        idlePulse(idleHintActive, true),
      ]}
    >
      {/* ── Top red promo area ── */}
      <div
        css={css`
          flex: 6;
          background: linear-gradient(180deg, #d62300 0%, #b81f00 100%);
          padding: 18px 18px 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          position: relative;
        `}
      >
        {/* LOTTERIA logo wordmark */}
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 6px;
          `}
        >
          <span
            css={css`
              font-size: 16px;
              font-weight: 900;
              color: #ffffff;
              letter-spacing: 0.04em;
              font-style: italic;
              font-family: "Trebuchet MS", system-ui, sans-serif;
            `}
          >
            LOTTERIA
          </span>
          <span
            css={css`
              background: #ffffff;
              color: #d62300;
              border-radius: 4px;
              padding: 1px 5px;
              font-size: 10px;
              font-weight: 900;
              font-style: italic;
              font-family: "Trebuchet MS", system-ui, sans-serif;
            `}
          >
            AB
          </span>
        </div>

        {/* Promo copy */}
        <div
          css={css`
            font-size: 14px;
            font-weight: 900;
            line-height: 1.5;
            color: #ffe9b0;
            text-shadow: 1px 1px 0 #6a1100;
          `}
        >
          롯데리아가 2023년 한 해동안 땡스~한
          <br />
          마음을 전하기 위해 가장 사랑 받은
          <br />
          버거로 선정된 전주비빔라이스버거로
          <br />
          올해의 땡스버거로{" "}
          <span
            css={css`
              background: #ffffff;
              color: #d62300;
              padding: 0 6px;
              border-radius: 4px;
              font-size: 12px;
            `}
          >
            재출시
          </span>{" "}
          합니다
        </div>

        {/* Burger image */}
        <div
          css={css`
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            padding: 8px 0;
          `}
        >
          <img
            src={RICE_BURGER_IMG}
            alt="전주비빔라이스버거"
            style={{
              maxWidth: "90%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
          {/* 재출시! badge */}
          <div
            css={css`
              position: absolute;
              right: 14px;
              bottom: 24px;
              width: 64px;
              height: 64px;
              border-radius: 50%;
              background: #ffd400;
              color: #d62300;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 16px;
              font-weight: 900;
              transform: rotate(-12deg);
              box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
              border: 2px dashed #d62300;
            `}
          >
            재출시!
          </div>
        </div>

        {/* Big title overlay at bottom of red area */}
        <div
          css={css`
            font-size: 48px;
            font-weight: 900;
            color: #ffffff;
            line-height: 0.95;
            letter-spacing: -0.01em;
            text-shadow: 2px 2px 0 #6a1100;
            padding-bottom: 4px;
          `}
        >
          전주비빔
          <br />
          라이스버거
        </div>
      </div>

      {/* ── Bottom white control area ── */}
      <div
        css={css`
          flex: 0 0 auto;
          background: #ffffff;
          padding: 12px 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        `}
      >
        {/* Audio player controls (decorative) */}
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 18px;
            padding: 4px 0;
          `}
        >
          <span css={ctrlBtn}>⏮</span>
          <span css={ctrlBtn}>⏸</span>
          <span css={ctrlBtn}>⏭</span>
        </div>

        {/* Utility row + languages */}
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding-top: 8px;
            border-top: 1px solid #e5e8eb;
          `}
        >
          <div
            css={css`
              display: grid;
              grid-template-columns: repeat(4, auto);
              gap: 8px 16px;
              align-items: center;
            `}
          >
            <span css={utilIconWrap}>
              <span css={utilIcon}>🌓</span>
              <span css={utilLabel}>고대비</span>
            </span>
            <span css={utilIconWrap}>
              <span css={utilIcon}>🔊</span>
              <span css={utilLabel}>음성안내</span>
            </span>
            <span css={utilIconWrap}>
              <span css={utilIcon}>🔍</span>
              <span css={utilLabel}>돋보기</span>
            </span>
            <span css={utilIconWrap}>
              <span css={utilIcon}>🔔</span>
              <span css={utilLabel}>직원호출</span>
            </span>
          </div>

          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 4px;
              align-items: flex-end;
              font-size: 11px;
              font-weight: 700;
              color: #2a1408;
            `}
          >
            <span>한국어</span>
            <div
              css={css`
                display: flex;
                gap: 6px;
                color: #8b95a1;
                font-size: 10px;
              `}
            >
              <span>English</span>
              <span>中国語</span>
              <span>日本語</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

const ctrlBtn = css`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f3f4f5;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #2a1408;
`;

const utilIconWrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const utilIcon = css`
  font-size: 16px;
`;

const utilLabel = css`
  font-size: 9px;
  color: #4e5968;
  font-weight: 600;
`;
