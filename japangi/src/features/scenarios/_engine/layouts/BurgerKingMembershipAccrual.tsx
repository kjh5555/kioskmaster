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

function shakeWhen(rejected: string | null, id: string) {
  return (
    rejected === id &&
    css`
      animation: ${shakeKf} 350ms ease;
    `
  );
}

export function BurgerKingMembershipAccrual({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  return (
    <div
      css={css`
        flex: 1;
        display: flex;
        flex-direction: column;
        background: #ffffff;
        padding: 18px 18px 22px;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
        min-height: 100%;
      `}
    >
      {/* Title row */}
      <div
        css={css`
          text-align: center;
          padding: 14px 4px 16px;
        `}
      >
        <div
          css={css`
            font-size: 16px;
            font-weight: 800;
            color: #2a1408;
            line-height: 1.5;
          `}
        >
          버거킹앱 실행 <span css={arrow}>▶</span> 멤버십 바코드 <span css={arrow}>▶</span>
          <br />
          하단 바코드 리더기에 스캔
        </div>
      </div>

      {/* Barcode scanner illustration */}
      <div
        css={css`
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0;
          `}
        >
          {/* BARCODE READER box */}
          <div
            css={css`
              width: 220px;
              height: 130px;
              background: #f3f4f5;
              border-radius: 10px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-start;
              padding-top: 12px;
              gap: 6px;
              position: relative;
            `}
          >
            <span
              css={css`
                font-size: 11px;
                font-weight: 700;
                color: #8b95a1;
                letter-spacing: 0.06em;
              `}
            >
              BARCODE
            </span>
            <span
              css={css`
                font-size: 11px;
                font-weight: 700;
                color: #8b95a1;
                letter-spacing: 0.06em;
                margin-top: -2px;
              `}
            >
              READER
            </span>
            {/* Orange scanner glow */}
            <div
              css={css`
                position: absolute;
                bottom: 14px;
                left: 50%;
                transform: translateX(-50%);
                width: 140px;
                height: 36px;
                background: linear-gradient(180deg, #ffb37a, #e07a1a);
                border-radius: 6px;
                box-shadow: 0 6px 16px rgba(224, 122, 26, 0.4);
              `}
            />
          </div>
          {/* Barcode "rising" out from below */}
          <div
            css={css`
              display: flex;
              gap: 2px;
              align-items: end;
              margin-top: -4px;
              padding: 6px 18px;
            `}
          >
            {Array.from({ length: 26 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: i % 3 === 0 ? 3 : 2,
                  height: 70 - (i % 5) * 4,
                  background: "#2a1408",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Help row */}
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 8px 0 18px;
        `}
      >
        <span
          css={css`
            font-size: 12px;
            color: #8b95a1;
          `}
        >
          *바코드 인식이 잘 안되나요?
        </span>
        <button
          type="button"
          onClick={() => onChoice("manual-code")}
          css={[
            css`
              background: #4a2412;
              color: #ffffff;
              border: none;
              border-radius: 999px;
              padding: 6px 12px;
              font-size: 11px;
              font-weight: 700;
              cursor: pointer;
              &:active {
                background: #2a1408;
              }
            `,
            shakeWhen(rejectedChoiceId, "manual-code"),
          ]}
        >
          멤버십번호 입력
        </button>
      </div>

      {/* Skip / finish button */}
      <button
        type="button"
        onClick={() => onChoice("skip-accrual")}
        css={[
          css`
            width: 100%;
            height: 56px;
            background: #4a2412;
            color: #ffffff;
            border: none;
            border-radius: 999px;
            font-size: 17px;
            font-weight: 800;
            cursor: pointer;
            &:active {
              background: #2a1408;
            }
          `,
          shakeWhen(rejectedChoiceId, "skip-accrual"),
          idlePulse(idleHintActive, step.correctChoiceId === "skip-accrual"),
        ]}
      >
        멤버십 적립 없이 주문 종료
      </button>
    </div>
  );
}

const arrow = css`
  color: #e07a1a;
  font-size: 14px;
  margin: 0 4px;
`;
