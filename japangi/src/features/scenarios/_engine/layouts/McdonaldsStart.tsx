import { css, keyframes } from "@emotion/react";

import { lookupMcdImage } from "./mcdonaldsImages";
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

export function McdonaldsStart({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        overflow: hidden;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
      `}
    >
      {/* ── Top promotional area ── */}
      <div
        css={css`
          flex: 1.5;
          background: #6b3f1d;
          border: 7px solid #da291c;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 14px 16px 10px;
          overflow: hidden;
        `}
      >
        {/* New badge */}
        <div
          css={css`
            background: #da291c;
            color: #fff;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.08em;
            padding: 3px 12px;
            border-radius: 20px;
            margin-bottom: 8px;
            text-transform: uppercase;
          `}
        >
          🍗 NEW
        </div>

        {/* Main headline */}
        <div
          css={css`
            font-size: 40px;
            font-weight: 900;
            color: #ffffff;
            letter-spacing: -0.02em;
            line-height: 1.1;
            text-align: center;
          `}
        >
          맥크리스피
        </div>

        {/* Sub-headlines */}
        <div
          css={css`
            font-size: 14px;
            font-weight: 700;
            color: #f5c36a;
            margin-top: 4px;
            text-align: center;
            line-height: 1.5;
          `}
        >
          100% 통닭다리살
          <br />
          세상 처음 맛보는 치킨버거
        </div>

        {/* Burger photos + captions */}
        <div
          css={css`
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            justify-content: center;
            gap: 20px;
            margin-top: 12px;
            flex: 1;
          `}
        >
          {/* Burger 1 — Deluxe */}
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 6px;
              max-width: 44%;
            `}
          >
            <img
              src={lookupMcdImage("mccrispy-deluxe")}
              alt="맥크리스피 디럭스"
              style={{
                width: 110,
                height: 110,
                objectFit: "contain",
                filter: "drop-shadow(0 8px 20px rgba(255, 60, 30, 0.45))",
              }}
            />
            <div
              css={css`
                font-size: 10px;
                color: #f5c36a;
                text-align: center;
                font-style: italic;
                line-height: 1.35;
              `}
            >
              100% 케이준 통닭다리살
              <br />
              포테이토 브리오쉬 번
              <br />
              스페셜 스모키 소스
            </div>
            <div
              css={css`
                font-size: 11px;
                font-weight: 700;
                color: #fff8dc;
                text-align: center;
              `}
            >
              맥크리스피™ 디럭스 버거
            </div>
          </div>

          {/* Burger 2 — Classic */}
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 6px;
              max-width: 44%;
            `}
          >
            <img
              src={lookupMcdImage("mccrispy-classic")}
              alt="맥크리스피 클래식"
              style={{
                width: 110,
                height: 110,
                objectFit: "contain",
                filter: "drop-shadow(0 8px 20px rgba(255, 60, 30, 0.45))",
              }}
            />
            <div
              css={css`
                font-size: 10px;
                color: #f5c36a;
                text-align: center;
                font-style: italic;
                line-height: 1.35;
              `}
            >
              100% 케이준 통닭다리살
              <br />
              포테이토 브리오쉬 번
              <br />
              클래식 소스
            </div>
            <div
              css={css`
                font-size: 11px;
                font-weight: 700;
                color: #fff8dc;
                text-align: center;
              `}
            >
              맥크리스피™ 클래식 버거
            </div>
          </div>
        </div>
      </div>

      {/* ── Middle yellow info stripe ── */}
      <div
        css={css`
          background: #f5e6a0;
          padding: 8px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          justify-content: center;
          min-height: 52px;
          box-sizing: border-box;
        `}
      >
        <p
          css={css`
            margin: 0;
            font-size: 11px;
            color: #3a2a00;
            line-height: 1.4;
          `}
        >
          * 카카오 선물하기, 모바일 상품권 사용 가능 (무료 쿠폰 사용은
          카운터에서 문의해주세요)
        </p>
        <p
          css={css`
            margin: 0;
            font-size: 11px;
            color: #3a2a00;
            line-height: 1.4;
          `}
        >
          * 현금결제는 카운터에서만 가능 Please pay at Front Counter for Cash
        </p>
      </div>

      {/* ── Bottom action area ── */}
      <div
        css={css`
          flex: 1;
          background: #ffffff;
          display: flex;
          flex-direction: row;
          gap: 10px;
          padding: 12px;
          box-sizing: border-box;
        `}
      >
        {/* Left: Point accumulate card */}
        <button
          css={[
            css`
              flex: 1;
              background: #fffbea;
              border: 1.5px solid #e0d080;
              border-radius: 12px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-between;
              padding: 12px 10px 8px;
              cursor: pointer;
              box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
              text-align: center;
            `,
            shakeWhen(rejectedChoiceId, "point-accumulate"),
          ]}
          onClick={() => onChoice("point-accumulate")}
        >
          <div
            css={css`
              font-size: 13px;
              font-weight: 800;
              color: #191f28;
              line-height: 1.3;
            `}
          >
            포인트를 적립하세요
          </div>
          <div
            css={css`
              font-size: 11px;
              color: #888;
              margin-top: 2px;
            `}
          >
            결제 전 선택 필수
          </div>
          {/* QR placeholder */}
          <div
            css={css`
              font-size: 28px;
              line-height: 1.1;
              font-family: monospace;
              margin: 8px 0;
              color: #191f28;
              letter-spacing: -2px;
            `}
          >
            ▣▣
            <br />
            ▣▢
          </div>
          <div
            css={css`
              font-size: 11px;
              color: #aaa;
            `}
          >
            ∨
          </div>
        </button>

        {/* Right column */}
        <div
          css={css`
            flex: 1.2;
            display: flex;
            flex-direction: column;
            gap: 8px;
          `}
        >
          {/* 주문하기 — main CTA */}
          <button
            css={[
              css`
                flex: 1;
                background: #ffffff;
                border: 1.5px solid #d0d0d0;
                border-radius: 12px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
                padding: 12px;
              `,
              shakeWhen(rejectedChoiceId, "order"),
              idlePulse(idleHintActive, step.correctChoiceId === "order"),
            ]}
            onClick={() => onChoice(step.correctChoiceId)}
          >
            <span
              css={css`
                font-size: 28px;
                font-weight: 900;
                color: #191f28;
                letter-spacing: -0.01em;
              `}
            >
              주문하기
            </span>
          </button>

          {/* Bottom row: 언어 + 도움 기능 */}
          <div
            css={css`
              display: flex;
              flex-direction: row;
              gap: 8px;
            `}
          >
            <button
              css={[
                css`
                  flex: 1;
                  background: #f8f8f8;
                  border: 1.5px solid #d0d0d0;
                  border-radius: 10px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  padding: 8px 4px;
                  cursor: pointer;
                  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
                  gap: 3px;
                `,
                shakeWhen(rejectedChoiceId, "language"),
              ]}
              onClick={() => onChoice("language")}
            >
              <span style={{ fontSize: 16 }}>🗣</span>
              <span
                css={css`
                  font-size: 12px;
                  color: #444;
                  font-weight: 600;
                `}
              >
                언어
              </span>
            </button>

            <button
              css={[
                css`
                  flex: 1;
                  background: #f8f8f8;
                  border: 1.5px solid #d0d0d0;
                  border-radius: 10px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  padding: 8px 4px;
                  cursor: pointer;
                  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
                  gap: 3px;
                `,
                shakeWhen(rejectedChoiceId, "accessibility"),
              ]}
              onClick={() => onChoice("accessibility")}
            >
              <span style={{ fontSize: 16 }}>♿</span>
              <span
                css={css`
                  font-size: 12px;
                  color: #444;
                  font-weight: 600;
                `}
              >
                도움 기능
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
