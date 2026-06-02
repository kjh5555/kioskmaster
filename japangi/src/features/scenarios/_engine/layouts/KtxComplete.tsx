import { css, keyframes } from "@emotion/react";
import { useEffect, useState } from "react";

import { type CustomLayoutProps } from "./types";

const dotPulse = keyframes`
  0%, 60%, 100% { opacity: 0.3; transform: scale(0.85); }
  30%           { opacity: 1;   transform: scale(1.1); }
`;
const barFill = keyframes`
  0%   { width: 8%; }
  100% { width: 70%; }
`;

// 티켓 출력 + 결제 영수증 화면. mount 후 4초 자동 종료.
export function KtxComplete({
  step,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const done = step.choices.find((c) => c.id === "done") ?? step.choices[0]!;
  const [printed, setPrinted] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPrinted(true), 2400);
    const t2 = setTimeout(() => onChoice(done.id), 4500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [done.id, onChoice]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background: #f4f6f9;
        font-family: system-ui, -apple-system, sans-serif;
        overflow: hidden;
      `}
    >
      <div
        css={css`
          background: #4a3d8c;
          color: #ffffff;
          padding: 12px 14px;
          text-align: center;
          font-size: 17px;
          font-weight: 900;
          letter-spacing: 0.04em;
        `}
      >
        결제
      </div>

      {/* 상단 — 로딩 또는 완료 */}
      <div
        css={css`
          background: #ffffff;
          padding: 22px 16px 18px;
          text-align: center;
          border-bottom: 1px solid #e4e4e4;
        `}
      >
        {!printed ? (
          <>
            <div
              css={css`
                display: inline-flex;
                gap: 4px;
                margin-bottom: 12px;
              `}
            >
              <Dot delay={0} />
              <Dot delay={120} />
              <Dot delay={240} />
              <Dot delay={360} />
              <Dot delay={480} />
            </div>
            <div
              css={css`
                width: 60%;
                margin: 0 auto;
                height: 10px;
                background: #e4e4e4;
                border-radius: 5px;
                overflow: hidden;
              `}
            >
              <div
                css={css`
                  height: 100%;
                  background: linear-gradient(90deg, #4a8dd8, #2c6fc8);
                  border-radius: 5px;
                  width: 8%;
                  animation: ${barFill} 2400ms ease-out forwards;
                `}
              />
            </div>
            <div
              css={css`
                font-size: 14px;
                color: #1a1a1a;
                margin-top: 12px;
              `}
            >
              티켓을 <span style={{ color: "#2c6fc8", fontWeight: 800 }}>출력중</span>입니다.
            </div>
          </>
        ) : (
          <>
            <div
              css={css`
                font-size: 36px;
                line-height: 1;
                margin-bottom: 8px;
              `}
            >
              🎫
            </div>
            <div
              css={css`
                font-size: 16px;
                font-weight: 800;
                color: #1a1a1a;
              `}
            >
              티켓 출력 완료
            </div>
            <div
              css={css`
                font-size: 12px;
                color: #5a7a92;
                margin-top: 4px;
              `}
            >
              출구에서 티켓을 챙겨주세요
            </div>
          </>
        )}
      </div>

      {/* 결제 정보 */}
      <div
        css={css`
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          background: #ffffff;
          padding: 18px 18px 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        `}
      >
        <div
          css={css`
            font-size: 16px;
            font-weight: 800;
            color: #1a1a1a;
            padding-bottom: 6px;
          `}
        >
          결제정보
        </div>

        <ReceiptRow label="카드번호" value="123456******7890(일시불)" />
        <ReceiptRow label="승인일자" value="2026.06.03" />
        <ReceiptRow label="승인번호" value="09876543" />

        <div
          css={css`
            margin-top: 12px;
            padding: 14px 0;
            border-top: 1px solid #1a1a1a;
            border-bottom: 1px solid #e4e4e4;
            display: flex;
            justify-content: space-between;
            align-items: baseline;
          `}
        >
          <span css={css`font-size: 15px; font-weight: 800; color: #1a1a1a;`}>
            총 영수 금액
          </span>
          <span
            css={css`
              font-size: 26px;
              font-weight: 900;
              color: #1a1a1a;
              font-variant-numeric: tabular-nums;
            `}
          >
            59800
          </span>
        </div>

        <div
          css={css`
            font-size: 10px;
            color: #5a7a92;
            line-height: 1.5;
            padding: 10px 0 18px;
          `}
        >
          본 영수증은 세금계산서로 사용하실 수 없습니다.
          <br />
          고속철도를 이용하신 구간에는 부가가치세가 포함되어 있습니다.
        </div>
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }): React.ReactElement {
  return (
    <span
      css={css`
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #4a8dd8;
        border-radius: 50%;
        animation: ${dotPulse} 1200ms ease-in-out infinite;
        animation-delay: ${delay}ms;
      `}
    />
  );
}

function ReceiptRow({
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
        justify-content: space-between;
        align-items: baseline;
        font-size: 13px;
        color: #1a1a1a;
        padding: 2px 0;
      `}
    >
      <span>{label}</span>
      <span
        css={css`
          font-variant-numeric: tabular-nums;
          font-weight: 700;
        `}
      >
        {value}
      </span>
    </div>
  );
}
