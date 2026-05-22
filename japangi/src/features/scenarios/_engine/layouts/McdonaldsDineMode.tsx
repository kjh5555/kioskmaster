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

export function McdonaldsDineMode({
  rejectedChoiceId,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
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
      {/* ── A. Top brand: M logo ── */}
      <div
        css={css`
          padding: 16px 0 8px;
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

      {/* ── B. Headline ── */}
      <div
        css={css`
          padding: 8px 20px 24px;
          text-align: center;
        `}
      >
        <h1
          css={css`
            margin: 0;
            font-size: 30px;
            font-weight: 800;
            color: #191f28;
            line-height: 1.3;
          `}
        >
          식사 방법을
          <br />
          선택해 주세요
        </h1>
      </div>

      {/* ── C. Main 2-card choice area ── */}
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          padding: 0 20px;
        `}
      >
        {/* Card 1: 매장에서 식사 (CORRECT) */}
        <button
          css={[
            css`
              background: linear-gradient(160deg, #fff8e1 0%, #ffffff 65%);
              border: 1.5px solid #d1d6db;
              border-radius: 16px;
              padding: 16px 14px 14px;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              gap: 12px;
              cursor: pointer;
              text-align: left;
              min-height: 200px;

              &:active {
                background: linear-gradient(160deg, #fff3cd 0%, #fffbea 65%);
              }
            `,
            shakeWhen(rejectedChoiceId, "dine-in"),
          ]}
          onClick={() => onChoice("dine-in")}
        >
          <span
            css={css`
              font-size: 18px;
              font-weight: 700;
              color: #191f28;
              line-height: 1.3;
            `}
          >
            매장에서 식사
          </span>

          <div
            css={css`
              width: 100%;
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 6px;
            `}
          >
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                width: 70%;
                font-size: 24px;
                line-height: 1;
              `}
            >
              <span>🪑</span>
              <span>🪑</span>
            </div>
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
                font-size: 20px;
                line-height: 1;
              `}
            >
              <span>🍔</span>
              <span>🥤</span>
              <span>🍟</span>
            </div>
            <div
              css={css`
                width: 70%;
                height: 3px;
                background: linear-gradient(
                  90deg,
                  transparent,
                  #d4a84b,
                  transparent
                );
                border-radius: 2px;
                margin-top: 2px;
              `}
            />
          </div>
        </button>

        {/* Card 2: 테이크 아웃 */}
        <button
          css={[
            css`
              background: linear-gradient(160deg, #f5ebdc 0%, #ffffff 65%);
              border: 1.5px solid #d1d6db;
              border-radius: 16px;
              padding: 16px 14px 14px;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              gap: 12px;
              cursor: pointer;
              text-align: left;
              min-height: 200px;

              &:active {
                background: linear-gradient(160deg, #ede0cc 0%, #fdf5ec 65%);
              }
            `,
            shakeWhen(rejectedChoiceId, "takeout"),
          ]}
          onClick={() => onChoice("takeout")}
        >
          <span
            css={css`
              font-size: 18px;
              font-weight: 700;
              color: #191f28;
              line-height: 1.3;
            `}
          >
            테이크 아웃
          </span>

          <div
            css={css`
              width: 100%;
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
            `}
          >
            <span
              css={css`
                font-size: 84px;
                line-height: 1;
              `}
            >
              🛍️
            </span>
            <div
              css={css`
                position: absolute;
                bottom: 18%;
                left: 50%;
                transform: translateX(-50%);
                background: #da291c;
                border-radius: 5px;
                width: 26px;
                height: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
              `}
            >
              <span
                css={css`
                  font-size: 13px;
                  font-weight: 900;
                  color: #ffc72c;
                  line-height: 1;
                `}
              >
                M
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* ── D. Language selector ── */}
      <div
        css={css`
          padding: 28px 20px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        `}
      >
        <span
          css={css`
            font-size: 11px;
            color: #8b95a1;
          `}
        >
          🌐 언어
        </span>
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            width: 100%;
            max-width: 320px;
          `}
        >
          <button
            css={[
              css`
                height: 44px;
                background: #ffffff;
                border: 1.5px solid #d1d6db;
                border-radius: 10px;
                font-size: 14px;
                font-weight: 600;
                color: #191f28;
                cursor: pointer;

                &:active {
                  background: #f5f5f5;
                }
              `,
              shakeWhen(rejectedChoiceId, "lang-english"),
            ]}
            onClick={() => onChoice("lang-english")}
          >
            English
          </button>
          <button
            css={[
              css`
                height: 44px;
                background: #ffffff;
                border: 2.5px solid #ffc72c;
                border-radius: 10px;
                font-size: 14px;
                font-weight: 700;
                color: #191f28;
                cursor: pointer;

                &:active {
                  background: #fffbea;
                }
              `,
              shakeWhen(rejectedChoiceId, "lang-korean"),
            ]}
            onClick={() => onChoice("lang-korean")}
          >
            한국어
          </button>
        </div>
      </div>

      {/* ── E. Bottom strip ── */}
      <div
        css={css`
          margin-top: auto;
          padding: 12px 16px;
          display: flex;
          flex-direction: row;
          align-items: stretch;
          gap: 10px;
          border-top: 1px solid #e5e8eb;
        `}
      >
        {/* QR card */}
        <button
          css={[
            css`
              background: #ffe082;
              border: none;
              border-radius: 10px;
              width: 96px;
              flex-shrink: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 2px;
              padding: 8px 6px;
              cursor: pointer;

              &:active {
                background: #ffd740;
              }
            `,
            shakeWhen(rejectedChoiceId, "point-qr"),
          ]}
          onClick={() => onChoice("point-qr")}
        >
          <span
            css={css`
              font-size: 18px;
              font-family: monospace;
              line-height: 1;
              color: #191f28;
              letter-spacing: -2px;
            `}
          >
            ▣▣
            <br />
            ▣▢
          </span>
          <span
            css={css`
              font-size: 10px;
              font-weight: 700;
              color: #191f28;
              text-align: center;
              line-height: 1.3;
              margin-top: 2px;
            `}
          >
            포인트 적립
          </span>
          <span
            css={css`
              font-size: 9px;
              color: #5a4a00;
            `}
          >
            ∨
          </span>
        </button>

        {/* 처음으로 + 도움 기능 */}
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            flex: 1;
          `}
        >
          <button
            css={[
              css`
                background: #ffffff;
                border: 1px solid #d1d6db;
                border-radius: 8px;
                font-size: 12px;
                color: #444;
                cursor: pointer;
                padding: 0 8px;

                &:active {
                  background: #f5f5f5;
                }
              `,
              shakeWhen(rejectedChoiceId, "home"),
            ]}
            onClick={() => onChoice("home")}
          >
            ↺ 처음으로
          </button>
          <button
            css={[
              css`
                background: #ffffff;
                border: 1px solid #d1d6db;
                border-radius: 8px;
                font-size: 12px;
                color: #444;
                cursor: pointer;
                padding: 0 8px;

                &:active {
                  background: #f5f5f5;
                }
              `,
              shakeWhen(rejectedChoiceId, "help"),
            ]}
            onClick={() => onChoice("help")}
          >
            ♿ 도움 기능
          </button>
        </div>
      </div>

      {/* Caloric note */}
      <div
        css={css`
          padding: 6px 16px 12px;
          text-align: center;
        `}
      >
        <span
          css={css`
            font-size: 9px;
            color: #aaa;
            line-height: 1.4;
          `}
        >
          일일 영양 권장량은 보통 2,000 칼로리이지만 필요한 칼로리는 다를 수
          있습니다.
        </span>
      </div>
    </div>
  );
}
