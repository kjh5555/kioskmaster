import { css } from "@emotion/react";
import { useState } from "react";

import { trainBrand } from "./_trainBrand";
import { type CustomLayoutProps } from "./types";

type Status = "unavailable" | "available" | "selected";
type Cell = { seat: string; status: Status } | null;

// 좌석 데이터 — 사진 기준 12D 가 선택된 상태, 우측 column 일부만 선택 가능
const SEAT_ROWS: { row: number; left: [Cell, Cell]; right: [Cell, Cell] }[] = [
  {
    row: 14,
    left: [
      { seat: "14A", status: "unavailable" },
      { seat: "14B", status: "unavailable" },
    ],
    right: [
      { seat: "14C", status: "available" },
      { seat: "14D", status: "available" },
    ],
  },
  {
    row: 13,
    left: [
      { seat: "13A", status: "unavailable" },
      { seat: "13B", status: "unavailable" },
    ],
    right: [
      { seat: "13C", status: "available" },
      { seat: "13D", status: "available" },
    ],
  },
  {
    row: 12,
    left: [
      { seat: "12A", status: "unavailable" },
      { seat: "12B", status: "unavailable" },
    ],
    right: [
      { seat: "12C", status: "available" },
      { seat: "12D", status: "selected" },
    ],
  },
  {
    row: 11,
    left: [
      { seat: "11A", status: "unavailable" },
      { seat: "11B", status: "unavailable" },
    ],
    right: [
      { seat: "11C", status: "unavailable" },
      { seat: "11D", status: "unavailable" },
    ],
  },
  {
    row: 10,
    left: [
      { seat: "10A", status: "unavailable" },
      { seat: "10B", status: "unavailable" },
    ],
    right: [
      { seat: "10C", status: "unavailable" },
      { seat: "10D", status: "unavailable" },
    ],
  },
  {
    row: 9,
    left: [null, { seat: "9B", status: "unavailable" }],
    right: [
      { seat: "9C", status: "unavailable" },
      { seat: "9D", status: "unavailable" },
    ],
  },
];

export function KtxSeatSelect({
  step,
  scenario,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const brand = trainBrand(scenario.id);
  const home = step.choices.find((c) => c.id === "home");
  const back = step.choices.find((c) => c.id === "back");
  const next = step.choices.find((c) => c.id === "confirm") ?? step.choices[0]!;

  // 좌석 선택 state — 초기엔 12D 선택
  const [selectedSeat, setSelectedSeat] = useState<string>("12D");

  function pickSeat(cell: Cell) {
    if (cell === null) return;
    if (cell.status === "unavailable") return;
    setSelectedSeat(cell.seat);
  }

  function cellStatus(cell: Cell): Status {
    if (cell === null) return "unavailable";
    if (cell.seat === selectedSeat) return "selected";
    if (cell.status === "selected") return "available"; // initial state collapse
    return cell.status;
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
        onBack={back ? () => onChoice(back.id) : undefined}
        onHome={home ? () => onChoice(home.id) : undefined}
      />

      {/* 열차 정보 */}
      <div
        css={css`
          background: #ffffff;
          padding: 14px 16px 10px;
          text-align: center;
        `}
      >
        <div
          css={css`
            font-size: 22px;
            font-weight: 900;
            color: #1a3d5c;
            letter-spacing: 0.04em;
          `}
        >
          {brand.trainNum2}
        </div>
        <div
          css={css`
            font-size: 14px;
            color: #5a7a92;
            margin-top: 2px;
          `}
        >
          잔여 6석 / 전체 56석
        </div>
      </div>

      {/* 범례 */}
      <div
        css={css`
          background: #ffffff;
          padding: 8px 16px 14px;
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: #5a7a92;
          border-bottom: 1px solid #e4e4e4;
        `}
      >
        <div css={css`display: flex; gap: 12px;`}>
          <span>
            <span css={css`display:inline-block;width:9px;height:9px;background:#c4cfdb;border-radius:50%;margin-right:4px;vertical-align:middle;`} />
            선택 불가
          </span>
          <span>
            <span css={css`display:inline-block;width:9px;height:9px;background:transparent;border:1.5px solid #5a7a92;border-radius:50%;margin-right:4px;vertical-align:middle;`} />
            선택 가능
          </span>
        </div>
        <div css={css`display: flex; gap: 10px;`}>
          <span>
            <span css={css`color:#2c6fc8;font-weight:900;`}>U</span> 순방향
          </span>
          <span>
            <span css={css`color:#2c6fc8;font-weight:900;`}>N</span> 역방향
          </span>
        </div>
      </div>

      {/* 좌석 그리드 — 스크롤 */}
      <div
        css={css`
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          background: #ffffff;
          padding: 12px 14px;
        `}
      >
        {/* 컬럼 라벨 */}
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr 28px 1fr 1fr;
            gap: 6px;
            padding-bottom: 8px;
            text-align: center;
            font-size: 11px;
            color: #5a7a92;
            font-weight: 700;
          `}
        >
          <span>창측</span>
          <span>내측</span>
          <span />
          <span>내측</span>
          <span>창측</span>
        </div>

        {SEAT_ROWS.map((r) => (
          <div
            key={r.row}
            css={css`
              display: grid;
              grid-template-columns: 1fr 1fr 28px 1fr 1fr;
              gap: 6px;
              padding: 4px 0;
              align-items: center;
            `}
          >
            <Seat cell={r.left[0]} status={cellStatus(r.left[0])} onClick={() => pickSeat(r.left[0])} />
            <Seat cell={r.left[1]} status={cellStatus(r.left[1])} onClick={() => pickSeat(r.left[1])} />
            <div
              css={css`
                text-align: center;
                color: #5a7a92;
                font-size: 14px;
              `}
            >
              ▲
            </div>
            <Seat cell={r.right[0]} status={cellStatus(r.right[0])} onClick={() => pickSeat(r.right[0])} />
            <Seat cell={r.right[1]} status={cellStatus(r.right[1])} onClick={() => pickSeat(r.right[1])} />
          </div>
        ))}
      </div>

      {/* 하단 — 선택 완료 */}
      <button
        type="button"
        onClick={() => onChoice(next.id)}
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
        선택 완료
      </button>
    </div>
  );
}

function Seat({
  cell,
  status,
  onClick,
}: {
  cell: Cell;
  status: Status;
  onClick: () => void;
}): React.ReactElement {
  if (cell === null) {
    return <div />;
  }
  const isSelected = status === "selected";
  const isUnavailable = status === "unavailable";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isUnavailable}
      css={css`
        border-radius: 8px 8px 4px 4px;
        padding: 10px 0 8px;
        background: ${isSelected ? "#8fbce0" : "#ffffff"};
        border: 1.5px solid ${isSelected ? "#2c6fc8" : "#c4cfdb"};
        color: ${isSelected
          ? "#1a3d5c"
          : isUnavailable
            ? "#c4cfdb"
            : "#1a3d5c"};
        font-family: inherit;
        font-size: 13px;
        font-weight: 800;
        cursor: ${isUnavailable ? "default" : "pointer"};
        opacity: ${isUnavailable ? 0.5 : 1};
        -webkit-tap-highlight-color: transparent;
        font-variant-numeric: tabular-nums;
        :active {
          transform: scale(0.97);
        }
      `}
    >
      {cell.seat}
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
