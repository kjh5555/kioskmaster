import { css, keyframes } from "@emotion/react";
import { useMemo } from "react";

import { type CustomLayoutProps } from "./types";

const popIn = keyframes`
  0%   { transform: scale(0.94); opacity: 0; }
  100% { transform: scale(1);    opacity: 1; }
`;

export function KfcOrderComplete(_: CustomLayoutProps): React.ReactElement {
  const orderNumber = useMemo(() => Math.floor(100 + Math.random() * 900), []);

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
        padding: 14px;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
      `}
    >
      <div
        css={css`
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          border-radius: 14px;
          padding: 32px 22px 28px;
          animation: ${popIn} 220ms ease-out;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        `}
      >
        {/* Order number */}
        <div css={css`text-align: center; line-height: 1;`}>
          <div
            css={css`
              font-size: 22px;
              font-weight: 900;
              color: #e4002b;
              letter-spacing: -0.02em;
            `}
          >
            주문 번호
          </div>
          <div
            css={css`
              font-size: 92px;
              font-weight: 900;
              color: #e4002b;
              letter-spacing: -0.04em;
              padding-top: 4px;
            `}
          >
            {orderNumber}
          </div>
        </div>

        {/* Receipt mockup */}
        <div
          css={css`
            width: 80%;
            background: #f4f5f6;
            border: 1px solid #e5e8eb;
            border-radius: 8px;
            padding: 14px 16px;
            transform: rotate(180deg);
            display: flex;
            flex-direction: column;
            gap: 4px;
          `}
        >
          <div css={receiptLine}>[매장명] 케이에프씨</div>
          <div css={receiptLine}>[대표자] 케이에프씨</div>
          <div css={receiptLine}>[전화] 555-55-55555</div>
          <div css={receiptLine}>[주소] 서울특별시 종로구 55길 55</div>
          <div css={receiptLine}>[등록일] 2017-05-01</div>
          <div
            css={css`
              border-top: 1px dashed #b0b8c1;
              border-bottom: 1px dashed #b0b8c1;
              padding: 4px 0;
              margin: 4px 0;
              display: grid;
              grid-template-columns: 1fr 30px 60px;
              font-size: 9px;
              font-weight: 800;
              color: #2a1408;
            `}
          >
            <span>상품명</span>
            <span css={css`text-align: center;`}>수량</span>
            <span css={css`text-align: right;`}>금액</span>
          </div>
          <div css={receiptRow}>
            <span>징거세트</span>
            <span css={css`text-align: center;`}>1</span>
            <span css={css`text-align: right;`}>9,300</span>
          </div>
          <div css={receiptRow}>
            <span>프렌치프라이(M)</span>
            <span css={css`text-align: center;`}>2</span>
            <span css={css`text-align: right;`}>4,600</span>
          </div>
          <div css={receiptRow}>
            <span>오리지널치킨 5조각</span>
            <span css={css`text-align: center;`}>1</span>
            <span css={css`text-align: right;`}>14,200</span>
          </div>
          <div
            css={css`
              border-top: 1px solid #b0b8c1;
              padding-top: 4px;
              display: grid;
              grid-template-columns: 1fr auto;
              font-size: 10px;
              font-weight: 900;
              color: #2a1408;
            `}
          >
            <span>합계</span>
            <span>30,100</span>
          </div>
        </div>

        {/* Printing text */}
        <div
          css={css`
            text-align: center;
            font-size: 20px;
            font-weight: 900;
            color: #e4002b;
            letter-spacing: -0.02em;
            line-height: 1.4;
          `}
        >
          영수증 출력 중입니다.
          <br />
          잠시만 기다려 주세요.
        </div>
      </div>
    </div>
  );
}

const receiptLine = css`
  font-size: 9px;
  font-weight: 700;
  color: #4e5968;
`;

const receiptRow = css`
  display: grid;
  grid-template-columns: 1fr 30px 60px;
  font-size: 9px;
  font-weight: 700;
  color: #2a1408;
`;
