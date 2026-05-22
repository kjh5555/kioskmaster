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

export function McdonaldsPayMethod({
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
          결제 방법을 선택해 주세요
        </p>
        <p
          css={css`
            margin: 4px 0 0;
            font-size: 14px;
            font-weight: 400;
            color: #8b95a1;
            line-height: 1.4;
          `}
        >
          포인트 적립은 &apos;이전단계&apos; 선택
        </p>
      </div>

      {/* ── C. 3 payment method cards ── */}
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
          padding: 0 16px;
        `}
      >
        {/* Card 1: 간편결제 (wrong-hint) */}
        <button
          css={[
            css`
              background: #ffffff;
              border: 1.5px solid #d1d6db;
              border-radius: 14px;
              padding: 14px;
              min-height: 120px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 8px;
              cursor: pointer;
              text-align: center;

              &:active {
                background: #f5f5f5;
              }
            `,
            shakeWhen(rejectedChoiceId, "smart-pay"),
          ]}
          onClick={() => onChoice("smart-pay")}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 2px;
            `}
          >
            <div
              css={css`
                background: #da291c;
                color: #ffffff;
                font-size: 9px;
                font-weight: 700;
                padding: 2px 5px;
                border-radius: 4px;
                line-height: 1.4;
              `}
            >
              SMART
            </div>
            <span
              css={css`
                font-size: 20px;
                line-height: 1;
              `}
            >
              💳
            </span>
          </div>
          <div>
            <p
              css={css`
                margin: 0;
                font-size: 13px;
                font-weight: 600;
                color: #191f28;
                line-height: 1.3;
              `}
            >
              간편결제
            </p>
            <p
              css={css`
                margin: 2px 0 0;
                font-size: 10px;
                color: #8b95a1;
                line-height: 1.3;
              `}
            >
              Smart Pay
            </p>
          </div>
        </button>

        {/* Card 2: 모바일 상품권 (wrong-hint) */}
        <button
          css={[
            css`
              background: #ffffff;
              border: 1.5px solid #d1d6db;
              border-radius: 14px;
              padding: 14px;
              min-height: 120px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 8px;
              cursor: pointer;
              text-align: center;

              &:active {
                background: #f5f5f5;
              }
            `,
            shakeWhen(rejectedChoiceId, "mobile-voucher"),
          ]}
          onClick={() => onChoice("mobile-voucher")}
        >
          <div
            css={css`
              border: 1.5px dashed #d1d6db;
              border-radius: 6px;
              padding: 4px 6px;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            <span
              css={css`
                font-size: 20px;
                line-height: 1;
              `}
            >
              📱
            </span>
          </div>
          <div>
            <p
              css={css`
                margin: 0;
                font-size: 13px;
                font-weight: 600;
                color: #191f28;
                line-height: 1.3;
              `}
            >
              모바일 상품권
            </p>
            <p
              css={css`
                margin: 2px 0 0;
                font-size: 10px;
                color: #8b95a1;
                line-height: 1.3;
              `}
            >
              Mobile Voucher
            </p>
          </div>
        </button>

        {/* Card 3: 카드 결제 (CORRECT) — yellow highlight */}
        <button
          css={[
            css`
              background: #fffdf0;
              border: 2.5px solid #ffc72c;
              border-radius: 14px;
              padding: 14px;
              min-height: 120px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 8px;
              cursor: pointer;
              text-align: center;

              &:active {
                background: #fff8cc;
              }
            `,
            shakeWhen(rejectedChoiceId, "credit-card"),
          ]}
          onClick={() => onChoice("credit-card")}
        >
          <span
            css={css`
              font-size: 26px;
              line-height: 1;
            `}
          >
            💳
          </span>
          <div>
            <p
              css={css`
                margin: 0;
                font-size: 13px;
                font-weight: 600;
                color: #191f28;
                line-height: 1.3;
              `}
            >
              카드 결제
            </p>
            <p
              css={css`
                margin: 2px 0 0;
                font-size: 10px;
                color: #8b95a1;
                line-height: 1.3;
              `}
            >
              Credit Card
            </p>
          </div>
        </button>
      </div>

      {/* ── D. Spacer ── */}
      <div
        css={css`
          flex: 1;
        `}
      />

      {/* ── E. 이전단계 button ── */}
      <div
        css={css`
          padding: 28px 24px 12px;
        `}
      >
        <button
          css={[
            css`
              width: 100%;
              height: 44px;
              background: #ffffff;
              border: 1.5px solid #d1d6db;
              border-radius: 10px;
              font-size: 14px;
              font-weight: 500;
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
          이전단계
        </button>
      </div>

      {/* ── F. Bottom strip ── */}
      <div
        css={css`
          padding: 0 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        `}
      >
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          `}
        >
          <button
            css={[
              css`
                height: 40px;
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
          <button
            css={[
              css`
                height: 40px;
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
              shakeWhen(rejectedChoiceId, "help"),
            ]}
            onClick={() => onChoice("help")}
          >
            ♿ 도움 기능
          </button>
        </div>
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
