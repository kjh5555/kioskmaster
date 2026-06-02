import { css } from "@emotion/react";

import { type CustomLayoutProps } from "./types";

// 데모 데이터 — 실제 병원 주차 키오스크 출력값 패턴
const PLATE = "12가 3456";
const ENTRY_TIME = "09:32";
const NOW_TIME = "14:25";
const DURATION = "4시간 53분";
const BASE_FEE = 9800;
const DISCOUNT = 8000;

function won(n: number): string {
  return n.toLocaleString("ko-KR") + "원";
}

// 주차 정보 확인 — 차량 정보 + 입차/주차시간 + 요금 + 병원 할인.
// 하단 fixed: 결제 금액 + [등록하기] 버튼.
export function ParkingInfo({
  step,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const register = step.choices.find((c) => c.id === "register") ??
    step.choices.find((c) => c.id === "yes") ??
    step.choices[0]!;
  const finalFee = Math.max(0, BASE_FEE - DISCOUNT);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background: #e8f2fa;
        font-family: system-ui, -apple-system, sans-serif;
        overflow: hidden;
      `}
    >
      <div
        css={css`
          background: #0067a6;
          color: #ffffff;
          padding: 12px 16px;
          text-align: center;
        `}
      >
        <div
          css={css`
            font-size: 17px;
            font-weight: 900;
          `}
        >
          주차 정보 확인
        </div>
        <div
          css={css`
            font-size: 11px;
            opacity: 0.92;
            margin-top: 2px;
          `}
        >
          진료 환자 할인 자동 적용
        </div>
      </div>

      {/* 본문 — 스크롤 */}
      <div
        css={css`
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        `}
      >
        {/* 차량 번호판 */}
        <div
          css={css`
            background: #ffffff;
            border: 2px solid #d1e0ec;
            border-radius: 14px;
            padding: 14px 12px;
            text-align: center;
            box-shadow: 0 2px 6px rgba(0, 103, 166, 0.06);
          `}
        >
          <div
            css={css`
              font-size: 12px;
              color: #5a7a92;
              margin-bottom: 6px;
            `}
          >
            내 차량
          </div>
          <div
            css={css`
              display: inline-block;
              padding: 8px 18px;
              background: #ffffff;
              border: 3px solid #1a1a1a;
              border-radius: 10px;
              font-size: 26px;
              font-weight: 900;
              color: #1a1a1a;
              letter-spacing: 0.06em;
              font-variant-numeric: tabular-nums;
            `}
          >
            {PLATE}
          </div>
        </div>

        {/* 주차 시간 */}
        <div
          css={css`
            background: #ffffff;
            border: 2px solid #d1e0ec;
            border-radius: 14px;
            padding: 12px 14px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            box-shadow: 0 2px 6px rgba(0, 103, 166, 0.06);
          `}
        >
          <Row label="🅿️ 입차 시간" value={ENTRY_TIME} />
          <Row label="🕐 현재 시간" value={NOW_TIME} />
          <div
            css={css`
              padding-top: 6px;
              border-top: 1px solid #e4ecf3;
              display: flex;
              align-items: baseline;
              justify-content: space-between;
            `}
          >
            <span
              css={css`
                font-size: 14px;
                color: #3a4a5a;
                font-weight: 800;
              `}
            >
              총 주차 시간
            </span>
            <span
              css={css`
                font-size: 16px;
                font-weight: 900;
                color: #0067a6;
              `}
            >
              {DURATION}
            </span>
          </div>
        </div>

        {/* 요금 계산 */}
        <div
          css={css`
            background: #ffffff;
            border: 2px solid #d1e0ec;
            border-radius: 14px;
            padding: 12px 14px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            box-shadow: 0 2px 6px rgba(0, 103, 166, 0.06);
          `}
        >
          <FeeRow label="일반 주차 요금" amount={won(BASE_FEE)} />
          <FeeRow
            label="🩺 진료 환자 할인"
            amount={`-${won(DISCOUNT)}`}
            highlight
          />
        </div>

        <div
          css={css`
            padding: 8px 10px;
            background: #fff8e6;
            border: 1px solid #f5d97a;
            border-radius: 10px;
            font-size: 11px;
            color: #5a4400;
            line-height: 1.5;
            text-align: center;
          `}
        >
          ⏰ 등록 후 30분 이내 출차해주세요. 시간 초과 시 추가 요금이
          부과돼요.
        </div>
      </div>

      {/* 하단 고정 — 결제 금액 + 등록 버튼 */}
      <div
        css={css`
          padding: 10px 14px calc(env(safe-area-inset-bottom, 0px) + 12px);
          background: #ffffff;
          border-top: 2px solid #0067a6;
          box-shadow: 0 -4px 12px rgba(0, 103, 166, 0.08);
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            padding-bottom: 10px;
          `}
        >
          <span
            css={css`
              font-size: 14px;
              font-weight: 800;
              color: #0d3b5a;
            `}
          >
            결제 금액
          </span>
          <span
            css={css`
              font-size: 26px;
              font-weight: 900;
              color: ${finalFee === 0 ? "#0f7b3a" : "#c0392b"};
              font-variant-numeric: tabular-nums;
            `}
          >
            {finalFee === 0 ? "무료" : won(finalFee)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onChoice(register.id)}
          css={css`
            width: 100%;
            padding: 16px 0;
            background: #0067a6;
            border: none;
            border-radius: 14px;
            color: #ffffff;
            font-family: inherit;
            font-size: 20px;
            font-weight: 900;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            box-shadow: 0 4px 10px rgba(0, 103, 166, 0.25);
            :active {
              transform: scale(0.99);
            }
          `}
        >
          ✅ 주차 등록하기
        </button>
      </div>
    </div>
  );
}

function Row({
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
          font-variant-numeric: tabular-nums;
        `}
      >
        {value}
      </span>
    </div>
  );
}

function FeeRow({
  label,
  amount,
  highlight,
}: {
  label: string;
  amount: string;
  highlight?: boolean;
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
          color: ${highlight ? "#0f7b3a" : "#3a4a5a"};
          font-weight: ${highlight ? 800 : 400};
        `}
      >
        {label}
      </span>
      <span
        css={css`
          font-size: 16px;
          font-weight: ${highlight ? 900 : 800};
          color: ${highlight ? "#0f7b3a" : "#1a1a1a"};
          font-variant-numeric: tabular-nums;
        `}
      >
        {amount}
      </span>
    </div>
  );
}
