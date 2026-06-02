import { css, keyframes } from "@emotion/react";
import { useState } from "react";

import { type CustomLayoutProps } from "./types";

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50%     { transform: scale(1.08); }
`;

type Train = {
  id: string;
  num: string;
  dep: string;
  arr: string;
  soldOut: boolean;
};

const TRAINS: Train[] = [
  { id: "ktx802-1003", num: "KTX 802", dep: "10:03", arr: "10:23", soldOut: false },
  { id: "ktx802-1020", num: "KTX 802", dep: "10:20", arr: "10:45", soldOut: false },
  { id: "ktx506", num: "KTX 506", dep: "매진", arr: "매진", soldOut: true },
  { id: "ktx707", num: "KTX 707", dep: "매진", arr: "매진", soldOut: true },
];

const GRADES = [
  { id: "general", label: "일반실" },
  { id: "first", label: "특실" },
  { id: "free", label: "자유석" },
];

// 열차 조회 결과 — 좌석 등급 선택 + 좌석 선택 버튼. KTX 802 (10:20) 일반실
// 기본 선택. 매진 행은 흐림 처리.
export function KtxTrainList({
  step,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const home = step.choices.find((c) => c.id === "home");
  const select =
    step.choices.find((c) => c.id === "select-seat") ?? step.choices[0]!;
  const [selectedTrainId, setSelectedTrainId] = useState("ktx802-1020");
  const [selectedGradeId, setSelectedGradeId] = useState("general");

  function pickGrade(trainId: string, gradeId: string) {
    setSelectedTrainId(trainId);
    setSelectedGradeId(gradeId);
  }

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
      <Header
        title="승차권 예매"
        onHome={home ? () => onChoice(home.id) : undefined}
      />

      {/* 테이블 헤더 */}
      <div
        css={css`
          display: grid;
          grid-template-columns: 60px 60px 60px 1fr;
          background: #e4e8ed;
          padding: 8px 10px;
          gap: 4px;
          font-size: 11px;
          font-weight: 800;
          color: #1a3d5c;
        `}
      >
        <span>열차</span>
        <span css={css`text-align: center;`}>출발</span>
        <span css={css`text-align: center;`}>도착</span>
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            text-align: center;
          `}
        >
          <span>일반실</span>
          <span>특실</span>
          <span>자유석/입석</span>
        </div>
      </div>

      {/* 열차 행 — 스크롤 */}
      <div
        css={css`
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          background: #ffffff;
        `}
      >
        {TRAINS.map((t) => (
          <div
            key={t.id}
            css={css`
              display: grid;
              grid-template-columns: 60px 60px 60px 1fr;
              padding: 14px 10px;
              gap: 4px;
              align-items: center;
              border-bottom: 1px solid #e4e4e4;
              opacity: ${t.soldOut ? 0.55 : 1};
            `}
          >
            <span
              css={css`
                font-size: 13px;
                font-weight: 800;
                color: ${t.soldOut ? "#aaaaaa" : "#1a3d5c"};
                line-height: 1.3;
              `}
            >
              {t.num.split(" ")[0]}
              <br />
              {t.num.split(" ")[1]}
            </span>
            <span
              css={css`
                font-size: 14px;
                text-align: center;
                color: ${t.soldOut ? "#d6868a" : "#1a3d5c"};
                font-weight: ${t.soldOut ? 800 : 700};
                font-variant-numeric: tabular-nums;
              `}
            >
              {t.dep}
            </span>
            <span
              css={css`
                font-size: 14px;
                text-align: center;
                color: ${t.soldOut ? "#d6868a" : "#1a3d5c"};
                font-weight: ${t.soldOut ? 800 : 700};
                font-variant-numeric: tabular-nums;
              `}
            >
              {t.arr}
            </span>
            <div
              css={css`
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 4px;
              `}
            >
              {t.soldOut ? (
                <>
                  <GradeCell label="매진" disabled />
                  <GradeCell label="매진" disabled />
                  <GradeCell label="—" disabled />
                </>
              ) : (
                GRADES.map((g) => {
                  const isSelected =
                    t.id === selectedTrainId && g.id === selectedGradeId;
                  return (
                    <GradeCell
                      key={g.id}
                      label={g.label}
                      selected={isSelected}
                      onClick={() => pickGrade(t.id, g.id)}
                    />
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 하단 — 핸들 + 빨간 좌석 선택 버튼 */}
      <div
        css={css`
          background: #5a6470;
          padding: 8px 14px calc(env(safe-area-inset-bottom, 0px) + 14px);
          position: relative;
        `}
      >
        <div
          css={css`
            position: absolute;
            top: -16px;
            left: 50%;
            transform: translateX(-50%);
            background: #5a6470;
            color: #ffffff;
            font-size: 18px;
            padding: 2px 18px;
            border-radius: 8px 8px 0 0;
          `}
        >
          ⌄
        </div>
        <div
          css={css`
            position: relative;
            display: flex;
            justify-content: flex-end;
            color: #ffffff;
            font-size: 16px;
            font-weight: 700;
            padding-right: 4px;
            padding-bottom: 6px;
          `}
        >
          ✕
        </div>
        <button
          type="button"
          onClick={() => onChoice(select.id)}
          css={css`
            width: 100%;
            padding: 14px 0;
            background: linear-gradient(180deg, #d65a5a 0%, #b73a3a 100%);
            border: 2px solid rgba(255, 255, 255, 0.5);
            border-radius: 10px;
            color: #ffffff;
            font-family: inherit;
            font-size: 17px;
            font-weight: 900;
            letter-spacing: 0.06em;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            position: relative;
            :active {
              transform: scale(0.99);
            }
          `}
        >
          좌석 선택
          <span
            css={css`
              position: absolute;
              right: 28px;
              top: 50%;
              transform: translateY(-50%);
              font-size: 22px;
              animation: ${pulse} 1100ms ease-in-out infinite;
            `}
          >
            👆
          </span>
        </button>
      </div>
    </div>
  );
}

function GradeCell({
  label,
  selected,
  disabled,
  onClick,
}: {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      css={css`
        padding: 8px 0;
        background: ${selected ? "#2c6fc8" : "#ffffff"};
        border: 1.5px solid ${selected ? "#2c6fc8" : "#c4cfdb"};
        border-radius: 4px;
        color: ${selected ? "#ffffff" : disabled ? "#c69a9a" : "#1a3d5c"};
        font-family: inherit;
        font-size: 12px;
        font-weight: ${selected ? 900 : 700};
        cursor: ${disabled ? "default" : "pointer"};
        opacity: ${disabled ? 0.85 : 1};
        -webkit-tap-highlight-color: transparent;
        min-height: 30px;
      `}
    >
      {selected ? "✓" : label}
    </button>
  );
}

function Header({
  title,
  onHome,
  onBack,
}: {
  title: string;
  onHome?: () => void;
  onBack?: () => void;
}): React.ReactElement {
  return (
    <div
      css={css`
        background: #1a3d5c;
        color: #ffffff;
        padding: 12px 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      `}
    >
      <span css={css`width: 56px;`}>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            css={css`
              padding: 4px 8px;
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
            ↩ 뒤로
          </button>
        )}
      </span>
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
