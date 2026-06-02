import { css, keyframes } from "@emotion/react";
import { useEffect } from "react";

import { type CustomLayoutProps } from "./types";

const cardSlide = keyframes`
  0%   { transform: translateY(-40px); opacity: 0; }
  60%  { transform: translateY(4px); opacity: 1; }
  100% { transform: translateY(0); opacity: 1; }
`;
const blinkArrow = keyframes`
  0%, 100% { opacity: 0.35; transform: translateY(0); }
  50%      { opacity: 1; transform: translateY(4px); }
`;
const dotPulse = keyframes`
  0%, 80%, 100% { opacity: 0.25; }
  40%           { opacity: 1; }
`;

// 데모 데이터 — PaymentAmount 의 진료내역 총액과 일치시킴
const PATIENT_NAME = "홍♥동";
const PAY_DATE = "2026년 06월 02일";
const TOTAL = 48300;

function won(n: number): string {
  return n.toLocaleString("ko-KR");
}

// 카드 결제 중 화면 — 실제 병원 수납 키오스크 모사 (사용자 첨부 이미지 기준).
// mount 후 2초 자동으로 다음 단계 (complete) 로 진행.
export function PaymentCardInsert({
  step,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const next = step.choices.find((c) => c.id === "next") ?? step.choices[0]!;

  useEffect(() => {
    const t = setTimeout(() => onChoice(next.id), 2000);
    return () => clearTimeout(t);
  }, [next.id, onChoice]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background: #ffffff;
        font-family: system-ui, -apple-system, sans-serif;
        overflow: hidden;
        padding: 14px 18px;
      `}
    >
      {/* 상단 안내 */}
      <div
        css={css`
          text-align: center;
          padding: 6px 0 12px;
          font-size: 16px;
          font-weight: 800;
          color: #1a1a1a;
          line-height: 1.5;
        `}
      >
        <span style={{ color: "#0067a6" }}>수납정보</span>를 확인 후
        <br />
        그림 방향대로 카드를 끝까지 넣어주세요
      </div>

      {/* 수납정보 카드 */}
      <div
        css={css`
          background: #fafafa;
          border: 1px solid #e4e4e4;
          border-radius: 14px;
          padding: 14px 18px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          gap: 10px;
        `}
      >
        <InfoRow label="환자명" value={PATIENT_NAME} />
        <InfoRow label="수납일자" value={PAY_DATE} />
        <div
          css={css`
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            padding-top: 8px;
            border-top: 1px solid #e4e4e4;
          `}
        >
          <span
            css={css`
              font-size: 14px;
              color: #3a4a5a;
            `}
          >
            총 결제액
          </span>
          <span>
            <span
              css={css`
                font-size: 22px;
                font-weight: 900;
                color: #c0392b;
                font-variant-numeric: tabular-nums;
              `}
            >
              {won(TOTAL)}
            </span>
            <span
              css={css`
                font-size: 13px;
                color: #5a7a92;
                margin-left: 4px;
              `}
            >
              원
            </span>
          </span>
        </div>
      </div>

      {/* 카드 슬롯 모형 */}
      <div
        css={css`
          margin-top: 14px;
          background: #4a4f56;
          border-radius: 14px;
          padding: 14px 18px 22px;
          position: relative;
          flex-shrink: 0;
        `}
      >
        <div
          css={css`
            text-align: center;
            color: #ffffff;
            font-size: 14px;
            font-weight: 800;
            margin-bottom: 12px;
          `}
        >
          카드 넣는 곳
        </div>
        <div
          css={css`
            text-align: center;
            color: #ffffff;
            font-size: 18px;
            line-height: 1;
            margin-bottom: 4px;
            animation: ${blinkArrow} 900ms ease-in-out infinite;
          `}
        >
          ▼
        </div>
        {/* 슬롯 + 카드 */}
        <div
          css={css`
            position: relative;
            background: #2c3037;
            height: 70px;
            border-radius: 8px;
            border: 1px solid #1a1d22;
            overflow: hidden;
            display: flex;
            align-items: flex-start;
            justify-content: center;
          `}
        >
          {/* 슬롯 라인 */}
          <div
            css={css`
              position: absolute;
              top: 4px;
              left: 18%;
              right: 18%;
              height: 3px;
              background: #0a0c0f;
              border-radius: 2px;
            `}
          />
          {/* 카드 (위에서 슬롯으로 들어가는 모양) */}
          <div
            css={css`
              margin-top: 8px;
              width: 60%;
              height: 50px;
              background: linear-gradient(135deg, #4ea8d9 0%, #2a6fa6 100%);
              border-radius: 6px;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
              animation: ${cardSlide} 1100ms cubic-bezier(0.16, 0.84, 0.44, 1)
                infinite;
              position: relative;
            `}
          >
            {/* 카드 칩 */}
            <div
              css={css`
                position: absolute;
                top: 8px;
                left: 10px;
                width: 20px;
                height: 14px;
                background: linear-gradient(135deg, #e8d066 0%, #b08b1a 100%);
                border-radius: 3px;
              `}
            />
            {/* 카드 무늬 */}
            <div
              css={css`
                position: absolute;
                bottom: 8px;
                left: 10px;
                right: 10px;
                height: 6px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 2px;
              `}
            />
          </div>
        </div>
      </div>

      {/* 처리중 안내 */}
      <div
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 14px 0 6px;
        `}
      >
        <div
          css={css`
            font-size: 15px;
            font-weight: 800;
            color: #1a1a1a;
            text-align: center;
          `}
        >
          카드 결제 중 입니다
        </div>
        <div
          css={css`
            font-size: 13px;
            color: #5a7a92;
            text-align: center;
          `}
        >
          잠시만 기다려 주세요
          <span
            css={css`
              display: inline-block;
              margin-left: 4px;
            `}
          >
            <Dot delay={0} />
            <Dot delay={150} />
            <Dot delay={300} />
          </span>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}): React.ReactElement {
  return (
    <div
      css={css`
        display: flex;
        align-items: baseline;
        justify-content: space-between;
      `}
    >
      <span
        css={css`
          font-size: 14px;
          color: #3a4a5a;
        `}
      >
        {label}
      </span>
      <span
        css={css`
          font-size: 15px;
          font-weight: 800;
          color: #1a1a1a;
        `}
      >
        {value}
      </span>
    </div>
  );
}

function Dot({ delay }: { delay: number }): React.ReactElement {
  return (
    <span
      css={css`
        display: inline-block;
        width: 4px;
        height: 4px;
        margin: 0 1px;
        background: #5a7a92;
        border-radius: 50%;
        animation: ${dotPulse} 1100ms ease-in-out infinite;
        animation-delay: ${delay}ms;
      `}
    />
  );
}
