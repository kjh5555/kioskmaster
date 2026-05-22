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

export function McdonaldsTableService({
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

      {/* ── B. Headline ── */}
      <div
        css={css`
          padding: 8px 24px 24px;
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
          테이블 서비스를
          <br />
          이용해 보세요
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
        {/* Card 1: 테이블 서비스 (CORRECT) */}
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
              min-height: 220px;

              &:active {
                background: linear-gradient(160deg, #fff3cd 0%, #fffbea 65%);
              }
            `,
            shakeWhen(rejectedChoiceId, "table-service"),
          ]}
          onClick={() => onChoice("table-service")}
        >
          <span
            css={css`
              font-size: 18px;
              font-weight: 700;
              color: #191f28;
              line-height: 1.3;
            `}
          >
            테이블 서비스
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
                font-size: 22px;
                line-height: 1;
              `}
            >
              <span>🍽</span>
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

        {/* Card 2: 카운터에서 픽업 (wrong-hint) */}
        <button
          css={[
            css`
              background: linear-gradient(160deg, #ffe082 0%, #ffffff 65%);
              border: 1.5px solid #d1d6db;
              border-radius: 16px;
              padding: 16px 14px 14px;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              gap: 12px;
              cursor: pointer;
              text-align: left;
              min-height: 220px;

              &:active {
                background: linear-gradient(160deg, #ffd740 0%, #fffbea 65%);
              }
            `,
            shakeWhen(rejectedChoiceId, "counter-pickup"),
          ]}
          onClick={() => onChoice("counter-pickup")}
        >
          <span
            css={css`
              font-size: 18px;
              font-weight: 700;
              color: #191f28;
              line-height: 1.3;
            `}
          >
            카운터에서 픽업
          </span>

          <div
            css={css`
              width: 100%;
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 4px;
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
                font-size: 22px;
                line-height: 1;
              `}
            >
              <span>🥤</span>
              <span>🍔</span>
              <span>🍟</span>
            </div>
            <div
              css={css`
                width: 80%;
                height: 3px;
                background: linear-gradient(
                  90deg,
                  transparent,
                  #c8860a,
                  transparent
                );
                border-radius: 2px;
                margin-top: 4px;
              `}
            />
          </div>
        </button>
      </div>

      {/* ── D. Spacer ── */}
      <div
        css={css`
          flex: 1;
        `}
      />

      {/* ── E. 뒤로 button ── */}
      <div
        css={css`
          padding: 28px 20px 16px;
        `}
      >
        <button
          css={[
            css`
              width: 100%;
              height: 52px;
              background: #ffffff;
              border: 1.5px solid #d1d6db;
              border-radius: 10px;
              font-size: 16px;
              font-weight: 600;
              color: #191f28;
              cursor: pointer;

              &:active {
                background: #f5f5f5;
              }
            `,
            shakeWhen(rejectedChoiceId, "back"),
          ]}
          onClick={() => onChoice("back")}
        >
          뒤로
        </button>
      </div>

      {/* ── F. Bottom strip ── */}
      <div
        css={css`
          padding: 0 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        `}
      >
        <button
          css={[
            css`
              width: 100%;
              height: 44px;
              background: #ffffff;
              border: 1px solid #d1d6db;
              border-radius: 8px;
              font-size: 12px;
              color: #444;
              cursor: pointer;

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
        <span
          css={css`
            font-size: 9px;
            color: #aaa;
            text-align: center;
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
