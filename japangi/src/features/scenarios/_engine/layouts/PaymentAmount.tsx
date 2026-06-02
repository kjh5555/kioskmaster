import { css } from "@emotion/react";

import { type CustomLayoutProps } from "./types";

type LineItem = { label: string; amount: number };
type DeptBlock = { dept: string; emoji: string; items: LineItem[] };

// 연습용 데모 진료내역. 본인부담금 기준 (실제 키오스크 표시와 동일).
const VISITS: DeptBlock[] = [
  {
    dept: "내과",
    emoji: "🩺",
    items: [
      { label: "진찰료 (재진)", amount: 7500 },
      { label: "혈액검사 (기본)", amount: 12000 },
      { label: "처방료", amount: 2300 },
    ],
  },
  {
    dept: "정형외과",
    emoji: "🦴",
    items: [
      { label: "진찰료", amount: 8500 },
      { label: "X-ray (어깨)", amount: 18000 },
    ],
  },
];

function won(n: number): string {
  return n.toLocaleString("ko-KR") + "원";
}

// 수납 금액 확인 — 진료받은 과별 명세 리스트 + 하단 고정 총액·결제 버튼.
export function PaymentAmount({
  step,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const pay = step.choices.find((c) => c.id === "pay") ?? step.choices[0]!;
  const total = VISITS.flatMap((v) => v.items).reduce(
    (s, it) => s + it.amount,
    0,
  );

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
          수납 금액 확인
        </div>
        <div
          css={css`
            font-size: 11px;
            opacity: 0.92;
            margin-top: 2px;
          `}
        >
          홍길동 님 · 2026-06-02 오늘 진료
        </div>
      </div>

      {/* 진료내역 — 스크롤 영역 */}
      <div
        css={css`
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        `}
      >
        {VISITS.map((v) => {
          const subtotal = v.items.reduce((s, it) => s + it.amount, 0);
          return (
            <div
              key={v.dept}
              css={css`
                background: #ffffff;
                border: 2px solid #d1e0ec;
                border-radius: 14px;
                padding: 10px 12px 12px;
                box-shadow: 0 2px 6px rgba(0, 103, 166, 0.06);
              `}
            >
              {/* 진료과 헤더 */}
              <div
                css={css`
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  padding-bottom: 8px;
                  border-bottom: 1px dashed #d1e0ec;
                  margin-bottom: 8px;
                `}
              >
                <span style={{ fontSize: 22 }}>{v.emoji}</span>
                <span
                  css={css`
                    font-size: 16px;
                    font-weight: 900;
                    color: #0067a6;
                  `}
                >
                  {v.dept}
                </span>
              </div>

              {/* 항목 리스트 */}
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  gap: 6px;
                `}
              >
                {v.items.map((it) => (
                  <div
                    key={it.label}
                    css={css`
                      display: flex;
                      align-items: baseline;
                      justify-content: space-between;
                      gap: 8px;
                    `}
                  >
                    <span
                      css={css`
                        font-size: 14px;
                        color: #3a4a5a;
                      `}
                    >
                      {it.label}
                    </span>
                    <span
                      css={css`
                        font-size: 14px;
                        font-weight: 800;
                        color: #0d3b5a;
                        font-variant-numeric: tabular-nums;
                      `}
                    >
                      {won(it.amount)}
                    </span>
                  </div>
                ))}
              </div>

              {/* 진료과 소계 */}
              <div
                css={css`
                  margin-top: 8px;
                  padding-top: 8px;
                  border-top: 1px solid #e4ecf3;
                  display: flex;
                  justify-content: space-between;
                  align-items: baseline;
                  font-size: 13px;
                  color: #5a7a92;
                `}
              >
                <span>소계</span>
                <span
                  css={css`
                    font-weight: 800;
                    color: #0d3b5a;
                    font-variant-numeric: tabular-nums;
                  `}
                >
                  {won(subtotal)}
                </span>
              </div>
            </div>
          );
        })}

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
          💊 결제 후 처방전·영수증이 함께 출력돼요. 약국 가실 때 처방전 꼭 챙기세요.
        </div>
      </div>

      {/* 하단 고정 — 총액 + 결제 버튼 */}
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
            총 결제 금액
          </span>
          <span
            css={css`
              font-size: 26px;
              font-weight: 900;
              color: #c0392b;
              font-variant-numeric: tabular-nums;
            `}
          >
            {won(total)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onChoice(pay.id)}
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
          💳 결제하기
        </button>
      </div>
    </div>
  );
}
