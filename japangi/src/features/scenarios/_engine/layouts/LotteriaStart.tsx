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
          min-height: 100%;
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
      {/* ── White "여기에서 주문하세요!" CTA top ── */}
      <div
        css={css`
          flex: 5;
          background: #ffffff;
          padding: 28px 22px 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        `}
      >
        <div
          css={css`
            font-size: 17px;
            font-weight: 800;
            color: #2a1408;
            line-height: 1.2;
          `}
        >
          기다리지 않고 간편하게
        </div>
        <div
          css={css`
            font-size: 60px;
            font-weight: 900;
            color: #2a1408;
            line-height: 0.98;
            font-style: italic;
            letter-spacing: -0.03em;
          `}
        >
          여기에서
          <br />
          주문하세요!
        </div>
        <div
          css={css`
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #ffd400;
            color: #2a1408;
            font-weight: 800;
            font-size: 16px;
            padding: 10px 18px;
            border-radius: 999px;
            align-self: flex-start;
            margin-top: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
          `}
        >
          <span style={{ fontSize: 22, lineHeight: 1 }}>👆</span>
          화면을 터치해 주세요
        </div>
      </div>

      {/* ── Red bottom promo with burger ── */}
      <div
        css={css`
          flex: 5;
          background: linear-gradient(180deg, #d62300 0%, #b81f00 100%);
          position: relative;
          padding: 14px 18px 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          overflow: hidden;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: flex-end;
            justify-content: center;
            position: relative;
            height: 180px;
          `}
        >
          <img
            src={RICE_BURGER_IMG}
            alt="전주비빔라이스버거"
            style={{
              height: "100%",
              objectFit: "contain",
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
            }}
          />
          {/* 재출시! badge */}
          <div
            css={css`
              position: absolute;
              right: 12px;
              top: 32px;
              width: 58px;
              height: 58px;
              border-radius: 50%;
              background: #ffd400;
              color: #d62300;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              font-weight: 900;
              transform: rotate(-12deg);
              box-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
              border: 2px dashed #d62300;
              text-shadow: 0 1px 0 rgba(255, 255, 255, 0.4);
            `}
          >
            재출시!
          </div>
        </div>

        <div
          css={css`
            font-size: 44px;
            font-weight: 900;
            color: #ffffff;
            line-height: 0.95;
            letter-spacing: -0.02em;
            text-shadow: 2px 2px 0 #6a1100;
            padding: 4px 0;
          `}
        >
          전주비빔
          <br />
          라이스버거
        </div>

        <div
          css={css`
            font-size: 13px;
            font-weight: 800;
            color: #ffe9b0;
            text-shadow: 1px 1px 0 #6a1100;
            padding-top: 4px;
          `}
        >
          2023년 가장 사랑 받은 버거 재출시!
        </div>
      </div>

      {/* ── White footer with audio + utility ── */}
      <div
        css={css`
          flex: 0 0 auto;
          background: #ffffff;
          padding: 8px 18px 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px 0;
          `}
        >
          <span css={ctrlBtn}>⏮</span>
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding-top: 6px;
            border-top: 1px solid #e5e8eb;
          `}
        >
          <div
            css={css`
              display: grid;
              grid-template-columns: repeat(4, auto);
              gap: 4px 16px;
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f3f4f5;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
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
