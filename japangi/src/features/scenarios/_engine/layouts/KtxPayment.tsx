import { css } from "@emotion/react";
import { useEffect, useState } from "react";

import { type CustomLayoutProps } from "./types";

type Phase = "summary" | "card-type-modal" | "card-insert-modal";

// 결제 확인 화면 — KTX 예약 요약 + 결제하기. internal modal phase 로
// 카드 종류 선택 → 카드 삽입 안내 → 자동 다음 단계.
export function KtxPayment({
  step,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const home = step.choices.find((c) => c.id === "home");
  const pay = step.choices.find((c) => c.id === "pay") ?? step.choices[0]!;
  const [phase, setPhase] = useState<Phase>("summary");

  // card-insert-modal 진입 후 2.2초 뒤 자동 onChoice
  useEffect(() => {
    if (phase !== "card-insert-modal") return;
    const t = setTimeout(() => onChoice(pay.id), 2200);
    return () => clearTimeout(t);
  }, [phase, pay.id, onChoice]);

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
        position: relative;
      `}
    >
      <PurpleHeader
        title="결제"
        onHome={home ? () => onChoice(home.id) : undefined}
      />

      <div
        css={css`
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          background: #ffffff;
          padding: 18px 18px 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        `}
      >
        {/* 날짜 + 열차 */}
        <div
          css={css`
            text-align: center;
            padding-bottom: 10px;
            border-bottom: 1px solid #e4e4e4;
          `}
        >
          <div
            css={css`
              font-size: 13px;
              color: #5a7a92;
            `}
          >
            2026년 06월 03일 (수)
          </div>
          <div
            css={css`
              font-size: 26px;
              font-weight: 900;
              color: #4a3d8c;
              padding-top: 4px;
              letter-spacing: 0.02em;
            `}
          >
            KTX 802
          </div>
        </div>

        {/* 출발지 / 도착지 */}
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            gap: 10px;
            align-items: center;
            padding-bottom: 10px;
            border-bottom: 1px solid #e4e4e4;
          `}
        >
          <div css={css`text-align: center;`}>
            <div css={css`font-size: 14px; color: #1a1a1a; font-weight: 700;`}>출발지</div>
            <div css={css`font-size: 24px; font-weight: 900; color: #1a1a1a; font-variant-numeric: tabular-nums;`}>10:20</div>
          </div>
          <div css={css`font-size: 24px; color: #4a3d8c; font-weight: 700;`}>→</div>
          <div css={css`text-align: center;`}>
            <div css={css`font-size: 14px; color: #1a1a1a; font-weight: 700;`}>도착지</div>
            <div css={css`font-size: 24px; font-weight: 900; color: #1a1a1a; font-variant-numeric: tabular-nums;`}>10:45</div>
          </div>
        </div>

        {/* 1호차 좌석 정보 */}
        <div
          css={css`
            background: #e4e4e4;
            padding: 10px 12px;
            display: flex;
            align-items: baseline;
            gap: 8px;
            border-radius: 4px;
          `}
        >
          <span css={css`font-size: 13px; color: #1a1a1a; font-weight: 800;`}>1호차</span>
          <span css={css`font-size: 13px; color: #5a5a5a; font-weight: 700; letter-spacing: 0.04em;`}>
            14C 14D 13C 13D 12C 12D
          </span>
          <span css={css`font-size: 11px; color: #1a1a1a; font-weight: 700; margin-left: auto;`}>역방향</span>
        </div>

        {/* 합계 + 할부 */}
        <div
          css={css`
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            gap: 14px;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: baseline;
              gap: 14px;
            `}
          >
            <span css={css`font-size: 14px; color: #1a1a1a; min-width: 70px;`}>합계금액</span>
            <span css={css`font-size: 22px; font-weight: 900; color: #1a1a1a; font-variant-numeric: tabular-nums;`}>59800</span>
          </div>
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 14px;
            `}
          >
            <span css={css`font-size: 14px; color: #1a1a1a; min-width: 70px;`}>할부기간</span>
            <span
              css={css`
                padding: 6px 18px;
                background: #ffffff;
                border: 1.5px solid #c4cfdb;
                border-radius: 4px;
                font-size: 14px;
                color: #1a1a1a;
                font-weight: 700;
              `}
            >
              일시불
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setPhase("card-type-modal")}
        css={css`
          width: 100%;
          padding: 16px 0 calc(env(safe-area-inset-bottom, 0px) + 16px);
          background: #1a3d5c;
          border: none;
          color: #ffffff;
          font-family: inherit;
          font-size: 18px;
          font-weight: 900;
          letter-spacing: 0.04em;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          :active {
            background: #14304a;
          }
        `}
      >
        결제하기
      </button>

      {/* 카드 종류 모달 */}
      {phase === "card-type-modal" && (
        <Overlay>
          <div
            css={css`
              background: #ffffff;
              border-radius: 4px;
              overflow: hidden;
              width: min(320px, 86%);
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            `}
          >
            <div
              css={css`
                padding: 14px 16px;
                background: #ffffff;
                border-bottom: 1px solid #e4e4e4;
                font-size: 15px;
                font-weight: 800;
                color: #1a1a1a;
              `}
            >
              결제하기
            </div>
            <button
              type="button"
              onClick={() => setPhase("card-insert-modal")}
              css={css`
                width: 100%;
                padding: 28px 16px;
                background: #d6868a;
                border: 1px solid #b73a3a;
                color: #b73a3a;
                font-family: inherit;
                font-size: 16px;
                font-weight: 900;
                line-height: 1.5;
                cursor: pointer;
                text-align: center;
                -webkit-tap-highlight-color: transparent;
                :active {
                  background: #c47075;
                }
              `}
            >
              신용카드
              <br />
              <span css={css`font-size: 13px; font-weight: 700;`}>(국내발급 신용카드)</span>
            </button>
            <button
              type="button"
              onClick={() => setPhase("card-insert-modal")}
              css={css`
                width: 100%;
                padding: 28px 16px;
                background: #c4bce0;
                border: none;
                color: #1a1a1a;
                font-family: inherit;
                font-size: 16px;
                font-weight: 800;
                line-height: 1.5;
                cursor: pointer;
                text-align: center;
                -webkit-tap-highlight-color: transparent;
                :active {
                  background: #aea4d0;
                }
              `}
            >
              해외 신용카드
              <br />
              <span css={css`font-size: 13px; font-weight: 600;`}>(해외발급 신용카드)</span>
            </button>
          </div>
        </Overlay>
      )}

      {/* 카드 삽입 모달 */}
      {phase === "card-insert-modal" && (
        <Overlay>
          <div
            css={css`
              background: #ffffff;
              border-radius: 6px;
              padding: 18px 14px;
              width: min(320px, 88%);
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
              text-align: center;
            `}
          >
            <CardTerminalArt />
            <div
              css={css`
                margin-top: 10px;
                font-size: 14px;
                font-weight: 800;
                color: #1a1a1a;
                line-height: 1.5;
              `}
            >
              그림과 같이 <span style={{ color: "#c0392b" }}>카드</span>를
              넣어주세요.
            </div>
            <div
              css={css`
                font-size: 12px;
                color: #5a7a92;
                margin-top: 4px;
                line-height: 1.4;
              `}
            >
              (IC칩이 단말기에 투입되도록 넣어주세요.)
            </div>
          </div>
        </Overlay>
      )}
    </div>
  );
}

function Overlay({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div
      css={css`
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
      `}
    >
      {children}
    </div>
  );
}

function CardTerminalArt(): React.ReactElement {
  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        height: 130px;
        margin: 0 auto;
      `}
    >
      {/* 카드 단말기 본체 */}
      <div
        css={css`
          position: absolute;
          right: 14%;
          top: 0;
          width: 60%;
          height: 130px;
          background: linear-gradient(180deg, #3a3a3a 0%, #1a1a1a 100%);
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        `}
      >
        {/* 화면 */}
        <div
          css={css`
            position: absolute;
            top: 12px;
            left: 8px;
            right: 8px;
            height: 60px;
            background: linear-gradient(135deg, #2a2a2a 0%, #404040 100%);
            border-radius: 4px;
          `}
        />
        {/* IC 슬롯 */}
        <div
          css={css`
            position: absolute;
            top: 84px;
            left: 50%;
            transform: translateX(-50%);
            width: 56px;
            height: 8px;
            background: #555;
            border-radius: 2px;
            border: 1px solid #0a0a0a;
          `}
        />
        {/* 키패드 그리드 점들 */}
        <div
          css={css`
            position: absolute;
            bottom: 8px;
            left: 50%;
            transform: translateX(-50%);
            width: 70%;
            height: 18px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(2, 1fr);
            gap: 2px;
          `}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              css={css`
                background: #2a2a2a;
                border-radius: 1px;
              `}
            />
          ))}
        </div>
      </div>
      {/* 카드 (좌상단에서 IC슬롯으로 향함) */}
      <div
        css={css`
          position: absolute;
          left: 4%;
          top: 28px;
          width: 90px;
          height: 56px;
          background: linear-gradient(135deg, #6aa9d8 0%, #2c6fc8 100%);
          border-radius: 6px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transform: rotate(-12deg);
        `}
      >
        {/* IC 칩 */}
        <div
          css={css`
            position: absolute;
            top: 12px;
            left: 12px;
            width: 16px;
            height: 12px;
            background: linear-gradient(135deg, #f0c850 0%, #b8932a 100%);
            border-radius: 2px;
            border: 1.5px solid #c0392b;
          `}
        />
        {/* CARD 텍스트 */}
        <div
          css={css`
            position: absolute;
            top: 11px;
            left: 36px;
            color: #ffffff;
            font-size: 13px;
            font-weight: 900;
            letter-spacing: 0.04em;
          `}
        >
          CARD
        </div>
        {/* 카드번호 */}
        <div
          css={css`
            position: absolute;
            bottom: 10px;
            left: 10px;
            color: #ffffff;
            font-size: 8px;
            font-weight: 700;
            letter-spacing: 0.1em;
            opacity: 0.85;
          `}
        >
          1234 5678 9012
        </div>
      </div>
      {/* 화살표 */}
      <div
        css={css`
          position: absolute;
          left: 38%;
          top: 64px;
          font-size: 18px;
          color: #c0392b;
          font-weight: 900;
          transform: rotate(20deg);
        `}
      >
        →
      </div>
    </div>
  );
}

function PurpleHeader({
  title,
  onHome,
}: {
  title: string;
  onHome?: () => void;
}): React.ReactElement {
  return (
    <div
      css={css`
        background: #4a3d8c;
        color: #ffffff;
        padding: 12px 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      `}
    >
      <span css={css`width: 56px;`} />
      <span
        css={css`
          font-size: 17px;
          font-weight: 900;
          letter-spacing: 0.04em;
        `}
      >
        {title}
      </span>
      <span css={css`width: 56px; text-align: right;`}>
        {onHome && (
          <button
            type="button"
            onClick={onHome}
            css={css`
              padding: 4px 10px;
              background: rgba(255, 255, 255, 0.18);
              border: 1px solid rgba(255, 255, 255, 0.4);
              border-radius: 6px;
              color: #ffffff;
              font-family: inherit;
              font-size: 11px;
              font-weight: 700;
              cursor: pointer;
              -webkit-tap-highlight-color: transparent;
            `}
          >
            처음으로
          </button>
        )}
      </span>
    </div>
  );
}
