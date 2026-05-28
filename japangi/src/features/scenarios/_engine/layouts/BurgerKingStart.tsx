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

const BK_LOGO =
  "https://upload.wikimedia.org/wikipedia/commons/c/cc/Burger_King_2020.svg";

export function BurgerKingStart({
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
          height: 100%;
          border: none;
          padding: 0;
          cursor: pointer;
          background: #ffffff;
          font-family:
            system-ui,
            -apple-system,
            sans-serif;
          overflow: hidden;
          text-align: left;
        `,
        rejectedChoiceId === choice.id &&
          css`
            animation: ${shakeKf} 350ms ease;
          `,
        idlePulse(idleHintActive, true),
      ]}
    >
      {/* ── Top promo (chicken king) ── */}
      <div
        css={css`
          flex: 2.4;
          background: linear-gradient(180deg, #6db8c0 0%, #80c4cc 60%, #ffd180 100%);
          position: relative;
          padding: 24px 20px 12px;
          display: flex;
          flex-direction: column;
        `}
      >
        {/* "Chicken King" headline */}
        <div
          css={css`
            font-size: 44px;
            font-weight: 900;
            color: #e07a1a;
            line-height: 0.95;
            letter-spacing: -0.01em;
            text-shadow: 2px 2px 0 #6a2b00;
            font-family: "Trebuchet MS", system-ui, sans-serif;
            font-style: italic;
          `}
        >
          Chicken
          <br />
          King
        </div>

        {/* 100% badge */}
        <div
          css={css`
            position: absolute;
            top: 28px;
            right: 24px;
            background: #ffffff;
            color: #e07a1a;
            font-weight: 800;
            font-size: 14px;
            border-radius: 999px;
            padding: 18px 14px;
            text-align: center;
            border: 2px dashed #e07a1a;
            line-height: 1;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          `}
        >
          100%
          <div
            css={css`
              font-size: 9px;
              font-weight: 700;
              color: #6a2b00;
              margin-top: 2px;
              letter-spacing: 0.04em;
            `}
          >
            JUICY
            <br />
            CRISPY
          </div>
        </div>

        {/* Big BK logo where burgers would be */}
        <div
          css={css`
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            margin-top: 8px;
          `}
        >
          <div
            css={css`
              width: 180px;
              height: 180px;
              background: #ffffff;
              border-radius: 50%;
              box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            <img
              src={BK_LOGO}
              alt="버거킹"
              style={{ width: 130, height: 130, objectFit: "contain" }}
            />
          </div>
          <span
            css={css`
              position: absolute;
              right: 38px;
              bottom: 8px;
              background: #ffffff;
              color: #6a2b00;
              font-size: 11px;
              font-weight: 800;
              border-radius: 4px;
              padding: 2px 8px;
              box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
            `}
          >
            치킨킹
          </span>
          <span
            css={css`
              position: absolute;
              left: 30px;
              bottom: 26px;
              background: #ffffff;
              color: #6a2b00;
              font-size: 11px;
              font-weight: 800;
              border-radius: 4px;
              padding: 2px 8px;
              box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
            `}
          >
            치킨킹 BLT
          </span>
        </div>
      </div>

      {/* ── Middle "Juicy & Crispy" band ── */}
      <div
        css={css`
          background: #e07a1a;
          color: #ffffff;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-style: italic;
          font-weight: 900;
          font-size: 22px;
          letter-spacing: 0.01em;
          font-family: "Trebuchet MS", system-ui, sans-serif;
        `}
      >
        <span>Juicy &amp; Crispy</span>
        <div
          css={css`
            background: #ffffff;
            border-radius: 6px;
            padding: 4px 8px;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <img
            src={BK_LOGO}
            alt="버거킹"
            style={{ height: 22, width: "auto", objectFit: "contain" }}
          />
        </div>
      </div>

      {/* ── Bottom touch panel ── */}
      <div
        css={css`
          flex: 1;
          background: linear-gradient(180deg, #4a2412 0%, #2a1408 100%);
          color: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 18px 20px 28px;
        `}
      >
        <span
          css={css`
            font-size: 22px;
            font-weight: 800;
            letter-spacing: 0.02em;
          `}
        >
          화면을 터치하세요
        </span>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
          `}
        >
          <span
            css={css`
              font-size: 11px;
              font-weight: 700;
              color: #d4a87a;
              letter-spacing: 0.08em;
            `}
          >
            LANGUAGE SELECTION
          </span>
          <div
            css={css`
              display: flex;
              gap: 12px;
            `}
          >
            <span css={flagDot}>🇰🇷</span>
            <span css={flagDot}>🇺🇸</span>
            <span css={flagDot}>🇨🇳</span>
            <span css={flagDot}>🇯🇵</span>
          </div>
        </div>
      </div>
    </button>
  );
}

const flagDot = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #ffffff;
  font-size: 16px;
  line-height: 1;
`;
