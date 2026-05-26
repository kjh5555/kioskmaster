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

interface Tier {
  letter: string;
  color: string;
  amount: string;
}

const TIERS: Tier[] = [
  { letter: "K", color: "#D62300", amount: "5만원\n이상 구매" },
  { letter: "O", color: "#E07A1A", amount: "3만원\n이상 구매" },
  { letter: "N", color: "#3A8E3E", amount: "1만원\n이상 구매" },
  { letter: "W", color: "#B7B7B7", amount: "가입즉시" },
];

export function BurgerKingMembership({
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
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.35);
        padding: 16px;
        min-height: calc(100dvh - 80px);
      `}
    >
      <div
        css={css`
          background: #ffffff;
          border-radius: 18px;
          width: 100%;
          max-width: 420px;
          padding: 18px 18px 14px;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 14px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
        `}
      >
        {/* X close button */}
        <button
          aria-label="닫기"
          onClick={() => onChoice("close")}
          css={[
            css`
              position: absolute;
              top: 10px;
              right: 10px;
              width: 32px;
              height: 32px;
              border: none;
              background: transparent;
              font-size: 20px;
              color: #4a4a4a;
              cursor: pointer;
              border-radius: 50%;
              &:active {
                background: #f0f0f0;
              }
            `,
            shakeWhen(rejectedChoiceId, "close"),
          ]}
        >
          ✕
        </button>

        {/* Title */}
        <div
          css={css`
            text-align: center;
            font-size: 18px;
            font-weight: 800;
            color: #2a1408;
            line-height: 1.35;
            letter-spacing: 0.01em;
            margin-top: 6px;
            padding: 0 16px;
          `}
        >
          멤버십 적립하고 매월 등급별
          <br />
          스페셜 쿠폰을 받으세요!
        </div>

        {/* Tier badges */}
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            padding: 4px 4px 0;
          `}
        >
          {TIERS.map((t) => (
            <div
              key={t.letter}
              css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 6px;
              `}
            >
              <div
                css={css`
                  width: 48px;
                  height: 48px;
                  border-radius: 50%;
                  background: ${t.color};
                  color: #ffffff;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-weight: 900;
                  font-size: 24px;
                  font-style: italic;
                  font-family: "Trebuchet MS", system-ui, sans-serif;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
                `}
              >
                {t.letter}
              </div>
              <span
                css={css`
                  font-size: 10px;
                  font-weight: 700;
                  color: #2a1408;
                  text-align: center;
                  white-space: pre-line;
                  line-height: 1.25;
                `}
              >
                {t.amount}
              </span>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div
          css={css`
            text-align: center;
            font-size: 9px;
            color: #8b95a1;
          `}
        >
          ※ 최근 3개월간 순수 구매금액 기준
        </div>

        {/* Instruction */}
        <div
          css={css`
            text-align: center;
            font-size: 13px;
            color: #2a1408;
            line-height: 1.5;
            font-weight: 600;
            padding: 0 8px;
          `}
        >
          버거킹APP의 멤버십 바코드를
          <br />
          아래의 리더기에 스캔해 로그인 해주세요
        </div>

        {/* Barcode scanner mock illustration */}
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: flex-end;
            gap: 6px;
            padding: 4px 0;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 4px;
            `}
          >
            <span
              css={css`
                font-size: 9px;
                color: #8b95a1;
                letter-spacing: 0.04em;
                font-weight: 600;
              `}
            >
              BARCODE
              <br />
              READER
            </span>
            <div
              css={css`
                width: 48px;
                height: 28px;
                background: #2a1408;
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
              `}
            >
              <span
                css={css`
                  width: 6px;
                  height: 6px;
                  border-radius: 50%;
                  background: #d62300;
                `}
              />
              <span
                css={css`
                  width: 6px;
                  height: 6px;
                  border-radius: 50%;
                  background: #d62300;
                `}
              />
            </div>
          </div>
          <div
            css={css`
              width: 40px;
              height: 56px;
              background: #ffffff;
              border: 2px solid #2a1408;
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 4px;
              gap: 2px;
            `}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                style={{
                  width: i % 2 === 0 ? 2 : 3,
                  height: 30,
                  background: "#2a1408",
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom action buttons */}
        <div
          css={css`
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 10px;
            margin-top: 4px;
          `}
        >
          <button
            onClick={() => onChoice("guest")}
            css={[
              css`
                height: 52px;
                background: #2a1408;
                color: #ffffff;
                border: none;
                border-radius: 999px;
                font-size: 15px;
                font-weight: 800;
                cursor: pointer;
                &:active {
                  background: #1a0c04;
                }
              `,
              shakeWhen(rejectedChoiceId, "guest"),
              idlePulse(idleHintActive, step.correctChoiceId === "guest"),
            ]}
          >
            비회원으로 주문
          </button>
          <button
            onClick={() => onChoice("member")}
            css={[
              css`
                height: 52px;
                background: #e07a1a;
                color: #ffffff;
                border: none;
                border-radius: 999px;
                font-size: 15px;
                font-weight: 800;
                cursor: pointer;
                &:active {
                  background: #c66614;
                }
              `,
              shakeWhen(rejectedChoiceId, "member"),
              idlePulse(idleHintActive, step.correctChoiceId === "member"),
            ]}
          >
            멤버십 번호 입력
          </button>
        </div>
      </div>
    </div>
  );
}
