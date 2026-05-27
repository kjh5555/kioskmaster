import { css, keyframes } from "@emotion/react";

import { idlePulse, type CustomLayoutProps } from "./types";

const popIn = keyframes`
  0%   { transform: scale(0.94); opacity: 0; }
  100% { transform: scale(1);    opacity: 1; }
`;

type OrderRow = {
  name: string;
  qty: number;
  price: string;
  children?: { name: string; qty: number }[];
};

const ROWS: OrderRow[] = [
  {
    name: "징거세트 (구:스쿨처플러스버거)",
    qty: 1,
    price: "9,300",
    children: [
      { name: "징거버거 (구:스쿨처플러스버거)", qty: 1 },
      { name: "프렌치프라이(M)", qty: 1 },
      { name: "콜라M", qty: 1 },
    ],
  },
  { name: "프렌치프라이(M)", qty: 2, price: "4,600" },
  {
    name: "콜치즈스틱(1개)",
    qty: 1,
    price: "2,000",
    children: [{ name: "콜치즈스틱(1개)", qty: 1 }],
  },
  {
    name: "오리지널치킨 5조각",
    qty: 1,
    price: "14,200",
    children: [{ name: "오리지널치킨(1조각)", qty: 5 }],
  },
];

export function KfcOrderReview({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const correctId = step.correctChoiceId;
  const payChoice = step.choices.find((c) => c.id === "pay");
  const closeChoice = step.choices.find((c) => c.id === "close");

  return (
    <div
      css={css`
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.35);
        z-index: 9000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
      `}
    >
      <div
        css={css`
          width: 100%;
          max-width: 440px;
          max-height: 92vh;
          background: #ffffff;
          border-radius: 14px;
          padding: 16px 16px 12px;
          animation: ${popIn} 220ms ease-out;
          display: flex;
          flex-direction: column;
          gap: 10px;
          overflow-y: auto;
        `}
      >
        {/* KFC red stripe */}
        <div css={css`display: flex; gap: 4px;`}>
          <span css={stripe} />
          <span css={stripe} />
          <span css={stripe} />
        </div>

        {/* Table header */}
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 56px 80px;
            background: #2a1408;
            color: #ffffff;
            padding: 8px 10px;
            font-size: 12px;
            font-weight: 900;
          `}
        >
          <span>메뉴</span>
          <span css={css`text-align: center;`}>수량</span>
          <span css={css`text-align: right;`}>가격</span>
        </div>

        {/* Order rows */}
        <div css={css`display: flex; flex-direction: column; gap: 6px;`}>
          {ROWS.map((r, idx) => (
            <div
              key={idx}
              css={css`
                display: flex;
                flex-direction: column;
                gap: 2px;
                padding: 4px 6px;
                border-bottom: 1px dashed #e5e8eb;
              `}
            >
              <div
                css={css`
                  display: grid;
                  grid-template-columns: 1fr 56px 80px;
                  align-items: center;
                  font-size: 13px;
                  font-weight: 900;
                  color: #2a1408;
                `}
              >
                <span
                  css={css`
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  `}
                >
                  {r.name}
                </span>
                <span css={css`text-align: center;`}>{r.qty}</span>
                <span css={css`text-align: right;`}>{r.price}</span>
              </div>
              {r.children?.map((c, ci) => (
                <div
                  key={ci}
                  css={css`
                    display: grid;
                    grid-template-columns: 1fr 56px 80px;
                    font-size: 10px;
                    color: #8b95a1;
                    font-weight: 700;
                  `}
                >
                  <span
                    css={css`
                      padding-left: 4px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    `}
                  >
                    {c.name}
                  </span>
                  <span css={css`text-align: center;`}>{c.qty}</span>
                  <span />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 4px 0;
          `}
        >
          <span css={pagDot}>▲</span>
          <span css={[pagDot, pagDotMuted]}>▼</span>
        </div>

        {/* Totals */}
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 4px 4px 6px;
            font-size: 12px;
            color: #2a1408;
          `}
        >
          <Row label="합계" qty={5} value="30,100" />
          <Row label="할인" value="0" />
          <div
            css={css`
              display: grid;
              grid-template-columns: 1fr auto;
              align-items: center;
              padding-top: 6px;
              border-top: 1px solid #e5e8eb;
              font-size: 14px;
              font-weight: 900;
            `}
          >
            <span>총 결제 금액</span>
            <span css={css`color: #e4002b; font-size: 18px;`}>30,100</span>
          </div>
        </div>

        {/* Bottom buttons */}
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1.6fr;
            gap: 10px;
            padding-top: 4px;
          `}
        >
          <button
            type="button"
            onClick={() => closeChoice && onChoice(closeChoice.id)}
            css={[
              closePill,
              rejectedChoiceId === closeChoice?.id &&
                css`
                  border-color: #e4002b;
                `,
            ]}
          >
            닫기
          </button>
          <button
            type="button"
            onClick={() => payChoice && onChoice(payChoice.id)}
            css={[
              payPill,
              idlePulse(idleHintActive, payChoice?.id === correctId),
            ]}
          >
            결제
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  qty,
  value,
}: {
  label: string;
  qty?: number;
  value: string;
}) {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 1fr 56px 80px;
        font-weight: 800;
      `}
    >
      <span css={css`color: #2a1408;`}>{label}</span>
      <span css={css`text-align: center; color: #4e5968;`}>
        {qty ?? ""}
      </span>
      <span css={css`text-align: right; color: #2a1408;`}>{value}</span>
    </div>
  );
}

const stripe = css`
  width: 12px;
  height: 22px;
  background: #e4002b;
  border-radius: 2px;
`;

const pagDot = css`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #e5e8eb;
  color: #2a1408;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 800;
`;

const pagDotMuted = css`
  background: #f2f3f4;
  color: #c9cdd2;
`;

const closePill = css`
  background: #ffffff;
  border: 1.5px solid #d1d5da;
  border-radius: 999px;
  padding: 12px;
  font-size: 13px;
  font-weight: 800;
  color: #2a1408;
  font-family: inherit;
  cursor: pointer;
  :active {
    background: #f6f7f9;
  }
`;

const payPill = css`
  background: #e4002b;
  color: #ffffff;
  border: none;
  border-radius: 999px;
  padding: 12px;
  font-size: 14px;
  font-weight: 900;
  font-family: inherit;
  cursor: pointer;
  :active {
    filter: brightness(0.92);
  }
`;
