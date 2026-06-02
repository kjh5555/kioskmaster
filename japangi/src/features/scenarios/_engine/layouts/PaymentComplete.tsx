import { css, keyframes } from "@emotion/react";
import { useEffect } from "react";

import { type CustomLayoutProps } from "./types";

const paperSlide = keyframes`
  0%   { transform: translateY(-100%); }
  60%  { transform: translateY(8px); }
  100% { transform: translateY(0); }
`;

// 영수증·처방전 출력 완료 화면 — 실제 병원 수납 키오스크 모사 (첨부 이미지 기준).
// mount 후 3.5초 자동으로 시나리오 종료.
export function PaymentComplete({
  step,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const done = step.choices.find((c) => c.id === "done") ?? step.choices[0]!;

  useEffect(() => {
    const t = setTimeout(() => onChoice(done.id), 3500);
    return () => clearTimeout(t);
  }, [done.id, onChoice]);

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
        padding: 24px 20px;
      `}
    >
      {/* 상단 안내 */}
      <div
        css={css`
          text-align: center;
          padding: 20px 0 24px;
          font-size: 17px;
          font-weight: 800;
          color: #1a1a1a;
          line-height: 1.6;
        `}
      >
        <span style={{ color: "#0067a6" }}>영수증</span>과{" "}
        <span style={{ color: "#0067a6" }}>처방전</span> 출력이 완료 됐습니다.
        <br />
        이용해 주셔서 감사합니다.
      </div>

      {/* 출력물 슬롯 */}
      <div
        css={css`
          margin: 0 auto;
          width: 100%;
          max-width: 320px;
          background: #4a4f56;
          border-radius: 14px;
          padding: 14px 18px 0;
          overflow: hidden;
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
          출력물 나오는 곳
        </div>
        {/* 슬릿 + 영수증 종이 */}
        <div
          css={css`
            position: relative;
            background: #2c3037;
            height: 130px;
            border-radius: 6px 6px 0 0;
            border: 1px solid #1a1d22;
            border-bottom: none;
            overflow: hidden;
            display: flex;
            justify-content: center;
          `}
        >
          {/* 영수증/처방전 종이 — 위에서 슬라이드 다운 */}
          <div
            css={css`
              margin-top: 12px;
              width: 78%;
              background: #ffffff;
              border: 1px solid #d1d5db;
              border-radius: 2px;
              padding: 10px 10px 0;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
              animation: ${paperSlide} 1100ms cubic-bezier(0.16, 0.84, 0.44, 1)
                forwards;
            `}
          >
            {/* 영수증 헤더 */}
            <div
              css={css`
                font-size: 9px;
                font-weight: 900;
                text-align: center;
                color: #1a1a1a;
                border-bottom: 1px solid #d1d5db;
                padding-bottom: 4px;
                margin-bottom: 4px;
                letter-spacing: 0.05em;
              `}
            >
              진료비 영수증 · 처방전
            </div>
            {/* 영수증 행들 */}
            <ReceiptRow label="환자명" value="홍♥동" />
            <ReceiptRow label="진료과" value="내과·정형외과" />
            <ReceiptRow label="총액" value="48,300원" emphasize />
            <ReceiptRow label="결제수단" value="신용카드" />
            {/* 도장 영역 */}
            <div
              css={css`
                margin-top: 4px;
                padding-top: 4px;
                border-top: 1px dashed #d1d5db;
                display: flex;
                justify-content: space-around;
                font-size: 8px;
                color: #5a7a92;
              `}
            >
              <span>처방전</span>
              <span>영수증</span>
              <span>안내문</span>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 안내 */}
      <div
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 18px 8px;
        `}
      >
        <div
          css={css`
            font-size: 14px;
            font-weight: 800;
            color: #1a1a1a;
            text-align: center;
            line-height: 1.5;
          `}
        >
          💊 처방전을 약국에 제출해주세요
        </div>
        <div
          css={css`
            font-size: 11px;
            color: #5a7a92;
            text-align: center;
          `}
        >
          잠시 후 처음 화면으로 돌아갑니다
        </div>
      </div>
    </div>
  );
}

function ReceiptRow({
  label,
  value,
  emphasize,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}): React.ReactElement {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        font-size: 9px;
        line-height: 1.6;
        color: #1a1a1a;
      `}
    >
      <span>{label}</span>
      <span
        css={css`
          font-weight: ${emphasize ? 900 : 700};
          color: ${emphasize ? "#c0392b" : "#1a1a1a"};
          font-variant-numeric: tabular-nums;
        `}
      >
        {value}
      </span>
    </div>
  );
}
