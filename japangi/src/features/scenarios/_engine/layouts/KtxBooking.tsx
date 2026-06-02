import { css, keyframes } from "@emotion/react";
import { useState } from "react";

import { type CustomLayoutProps } from "./types";

const pulse = keyframes`
  0%, 100% { opacity: 0.55; transform: scale(0.95); }
  50%     { opacity: 1;    transform: scale(1.05); }
`;

type Phase = "form" | "pick-origin" | "pick-dest" | "pick-datetime";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
// 기준 날짜: 2026년 06월 02일 (화) = 화요일 (DAYS index 2)
function fmtDate(offset: number): string {
  const day = 2 + offset;
  const dayLabel = DAYS[(2 + offset) % 7];
  return `2026년 06월 ${String(day).padStart(2, "0")}일 (${dayLabel})`;
}

// 코레일 KTX 발매기 — 주요역 (실제 노선 순서)
const STATIONS = [
  "서울", "용산",
  "광명", "영등포",
  "수원", "행신",
  "천안아산", "검안",
  "오송", "인천공항",
  "대전", "신경주",
  "김천구미", "경산",
  "동대구", "밀양",
  "울산(통도사)", "포항",
  "구포", "부산",
];

const HOURS = [
  "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
  "21:00", "22:00",
];

// 승차권 예매 폼 — 출발/도착·날짜시간·인원 선택 후 열차 조회.
// 출발/도착 박스 클릭 시 internal phase 로 역 선택 화면 노출.
export function KtxBooking({
  step,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const search = step.choices.find((c) => c.id === "search") ?? step.choices[0]!;
  const [phase, setPhase] = useState<Phase>("form");
  const [origin, setOrigin] = useState("서울");
  const [dest, setDest] = useState("오송");
  const [hourIdx, setHourIdx] = useState(4); // 09:00
  const [dateOffset, setDateOffset] = useState(0); // 0 = 06-02 (화)
  const [persons, setPersons] = useState(1);

  // station picker 내에서 임시 선택 (확인 누르기 전)
  const [pendingStation, setPendingStation] = useState<string | null>(null);

  function openOriginPicker() {
    setPhase("pick-origin");
    setPendingStation(origin);
  }
  function openDestPicker() {
    setPhase("pick-dest");
    setPendingStation(dest);
  }
  function confirmStation() {
    if (pendingStation === null) return;
    if (phase === "pick-origin") setOrigin(pendingStation);
    if (phase === "pick-dest") setDest(pendingStation);
    setPhase("form");
    setPendingStation(null);
  }
  function incHour() {
    setHourIdx((i) => Math.min(HOURS.length - 1, i + 1));
  }
  function decHour() {
    setHourIdx((i) => Math.max(0, i - 1));
  }
  function incDate() {
    setDateOffset((d) => Math.min(29, d + 1));
  }
  function decDate() {
    setDateOffset((d) => Math.max(0, d - 1));
  }
  function incPersons() {
    setPersons((p) => Math.min(9, p + 1));
  }
  function decPersons() {
    setPersons((p) => Math.max(1, p - 1));
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
      {/* 헤더 */}
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
        <span css={css`width: 50px;`} />
        <span
          css={css`
            font-size: 17px;
            font-weight: 900;
            letter-spacing: 0.04em;
          `}
        >
          승차권 예매
        </span>
        <button
          type="button"
          onClick={() => onChoice(search.id)}
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
      </div>

      {phase === "form" && (
        <BookingForm
          origin={origin}
          dest={dest}
          dateText={fmtDate(dateOffset)}
          hour={HOURS[hourIdx]!}
          persons={persons}
          onPickOrigin={openOriginPicker}
          onPickDest={openDestPicker}
          onPickDatetime={() => setPhase("pick-datetime")}
          onIncPersons={incPersons}
          onDecPersons={decPersons}
          onSearch={() => onChoice(search.id)}
        />
      )}

      {(phase === "pick-origin" || phase === "pick-dest") && (
        <StationPicker
          origin={origin}
          dest={dest}
          mode={phase}
          pendingStation={pendingStation}
          onPick={setPendingStation}
          onConfirm={confirmStation}
          onCancel={() => {
            setPhase("form");
            setPendingStation(null);
          }}
        />
      )}

      {phase === "pick-datetime" && (
        <DateTimePicker
          dateText={fmtDate(dateOffset)}
          hour={HOURS[hourIdx]!}
          canDecDate={dateOffset > 0}
          canIncDate={dateOffset < 29}
          canDecHour={hourIdx > 0}
          canIncHour={hourIdx < HOURS.length - 1}
          onDecDate={decDate}
          onIncDate={incDate}
          onDecHour={decHour}
          onIncHour={incHour}
          onConfirm={() => setPhase("form")}
        />
      )}
    </div>
  );
}

function BookingForm({
  origin,
  dest,
  dateText,
  hour,
  persons,
  onPickOrigin,
  onPickDest,
  onPickDatetime,
  onIncPersons,
  onDecPersons,
  onSearch,
}: {
  origin: string;
  dest: string;
  dateText: string;
  hour: string;
  persons: number;
  onPickOrigin: () => void;
  onPickDest: () => void;
  onPickDatetime: () => void;
  onIncPersons: () => void;
  onDecPersons: () => void;
  onSearch: () => void;
}): React.ReactElement {
  return (
    <div
      css={css`
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      `}
    >
      {/* 본문 — 스크롤 가능 */}
      <div
        css={css`
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding: 14px 14px 8px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        `}
      >
        {/* 출발 / 도착 */}
        <div
          css={css`
            background: #ffffff;
            border-radius: 12px;
            padding: 14px 12px;
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            gap: 8px;
            align-items: center;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
          `}
        >
          <StationCell label="출발" value={origin} active onClick={onPickOrigin} />
          <span
            css={css`
              font-size: 26px;
              color: #2c6fc8;
              font-weight: 700;
              padding: 0 4px;
            `}
          >
            →
          </span>
          <StationCell label="도착" value={dest} onClick={onPickDest} />
        </div>

        {/* KTX역 선택 지도 */}
        <button
          type="button"
          css={css`
            margin: 0 auto;
            padding: 10px 22px;
            background: #ffffff;
            border: 1.5px solid #c4cfdb;
            border-radius: 999px;
            color: #1a3d5c;
            font-family: inherit;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
          `}
        >
          🗺 KTX역 선택 지도
        </button>

        {/* 출발일 + 시간 */}
        <button
          type="button"
          onClick={onPickDatetime}
          css={css`
            background: #ffffff;
            border: none;
            border-bottom: 1px solid #d1d5db;
            padding: 14px 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            cursor: pointer;
            font-family: inherit;
            -webkit-tap-highlight-color: transparent;
            position: relative;
            :active {
              background: #f0f4f8;
            }
          `}
        >
          <span
            css={css`
              font-size: 12px;
              color: #5a7a92;
            `}
          >
            출발일
          </span>
          <span
            css={css`
              font-size: 18px;
              font-weight: 800;
              color: #1a3d5c;
              letter-spacing: 0.02em;
              font-variant-numeric: tabular-nums;
            `}
          >
            2026년 06월 02일 (화) {hour}
          </span>
          <span
            css={css`
              position: absolute;
              right: 14px;
              top: 50%;
              transform: translateY(-50%);
              width: 28px;
              height: 28px;
              border-radius: 50%;
              background: rgba(44, 111, 200, 0.12);
              display: flex;
              align-items: center;
              justify-content: center;
              animation: ${pulse} 1400ms ease-in-out infinite;
            `}
          >
            <span style={{ fontSize: 14 }}>👆</span>
          </span>
        </button>

        {/* 승객 인원 및 좌석수 */}
        <div
          css={css`
            background: #ffffff;
            padding: 14px 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            border-bottom: 1px solid #d1d5db;
          `}
        >
          <span
            css={css`
              font-size: 12px;
              color: #5a7a92;
            `}
          >
            승객 인원 및 좌석수
          </span>
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 16px;
            `}
          >
            <PersonsButton variant="minus" onClick={onDecPersons} />
            <span
              css={css`
                font-size: 20px;
                font-weight: 900;
                color: #1a3d5c;
                min-width: 80px;
                text-align: center;
                font-variant-numeric: tabular-nums;
              `}
            >
              어른 {persons}명
            </span>
            <PersonsButton variant="plus" onClick={onIncPersons} />
          </div>
        </div>

        {/* 펼침 화살표 (확장 옵션 placeholder) */}
        <div
          css={css`
            text-align: center;
            padding: 4px 0 0;
            color: #5a7a92;
            font-size: 18px;
          `}
        >
          ⌄
        </div>
      </div>

      {/* 하단 — 열차 조회하기 (네이비) */}
      <button
        type="button"
        onClick={onSearch}
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
        열차 조회하기
      </button>
    </div>
  );
}

function DateTimePicker({
  dateText,
  hour,
  canDecDate,
  canIncDate,
  canDecHour,
  canIncHour,
  onDecDate,
  onIncDate,
  onDecHour,
  onIncHour,
  onConfirm,
}: {
  dateText: string;
  hour: string;
  canDecDate: boolean;
  canIncDate: boolean;
  canDecHour: boolean;
  canIncHour: boolean;
  onDecDate: () => void;
  onIncDate: () => void;
  onDecHour: () => void;
  onIncHour: () => void;
  onConfirm: () => void;
}): React.ReactElement {
  return (
    <div
      css={css`
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
        background: #ffffff;
      `}
    >
      {/* 안내 바 */}
      <div
        css={css`
          background: #c4d3e2;
          padding: 14px 12px;
          text-align: center;
          font-size: 13px;
          color: #1a3d5c;
          font-weight: 700;
        `}
      >
        출발일과 시간을 골라주세요
      </div>

      <div
        css={css`
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding: 24px 14px;
          display: flex;
          flex-direction: column;
          gap: 22px;
        `}
      >
        {/* 날짜 */}
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
          `}
        >
          <span
            css={css`
              font-size: 12px;
              color: #5a7a92;
              font-weight: 700;
            `}
          >
            출발일
          </span>
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 14px;
            `}
          >
            <StepButton onClick={onDecDate} disabled={!canDecDate}>
              −
            </StepButton>
            <span
              css={css`
                min-width: 220px;
                text-align: center;
                font-size: 19px;
                font-weight: 900;
                color: #1a3d5c;
                font-variant-numeric: tabular-nums;
                letter-spacing: 0.02em;
              `}
            >
              {dateText}
            </span>
            <StepButton onClick={onIncDate} disabled={!canIncDate}>
              +
            </StepButton>
          </div>
        </div>

        {/* 시간 */}
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
          `}
        >
          <span
            css={css`
              font-size: 12px;
              color: #5a7a92;
              font-weight: 700;
            `}
          >
            출발 시간
          </span>
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 14px;
            `}
          >
            <StepButton onClick={onDecHour} disabled={!canDecHour}>
              −
            </StepButton>
            <span
              css={css`
                min-width: 90px;
                text-align: center;
                font-size: 32px;
                font-weight: 900;
                color: #1a3d5c;
                font-variant-numeric: tabular-nums;
                letter-spacing: 0.04em;
              `}
            >
              {hour}
            </span>
            <StepButton onClick={onIncHour} disabled={!canIncHour}>
              +
            </StepButton>
          </div>
        </div>

        <div
          css={css`
            padding: 8px 14px;
            margin: 6px 8px 0;
            background: #fff8e6;
            border: 1px solid #f5d97a;
            border-radius: 10px;
            font-size: 11px;
            color: #5a4400;
            text-align: center;
            line-height: 1.4;
          `}
        >
          💡 ± 버튼으로 날짜는 하루씩, 시간은 한 시간씩 바뀌어요
        </div>
      </div>

      {/* 확인 버튼 */}
      <button
        type="button"
        onClick={onConfirm}
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
        확인
      </button>
    </div>
  );
}

function StepButton({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      css={css`
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background: ${disabled ? "#c4cfdb" : "#2c6fc8"};
        border: none;
        color: #ffffff;
        font-family: inherit;
        font-size: 26px;
        font-weight: 900;
        cursor: ${disabled ? "default" : "pointer"};
        opacity: ${disabled ? 0.5 : 1};
        -webkit-tap-highlight-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        :active {
          transform: ${disabled ? "none" : "scale(0.95)"};
        }
      `}
    >
      {children}
    </button>
  );
}

function StationCell({
  label,
  value,
  active,
  onClick,
}: {
  label: string;
  value: string;
  active?: boolean;
  onClick: () => void;
}): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      css={css`
        background: #ffffff;
        border: 2px solid ${active ? "#2c6fc8" : "transparent"};
        border-radius: 8px;
        padding: 10px 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        cursor: pointer;
        font-family: inherit;
        -webkit-tap-highlight-color: transparent;
        :active {
          background: #f0f4f8;
        }
      `}
    >
      <span
        css={css`
          font-size: 11px;
          color: #5a7a92;
        `}
      >
        {label}
      </span>
      <span
        css={css`
          font-size: 22px;
          font-weight: 900;
          color: #1a3d5c;
          letter-spacing: 0.04em;
        `}
      >
        {value}
      </span>
    </button>
  );
}

function PersonsButton({
  variant,
  onClick,
}: {
  variant: "minus" | "plus";
  onClick: () => void;
}): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      css={css`
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #2c6fc8;
        border: none;
        color: #ffffff;
        font-family: inherit;
        font-size: 22px;
        font-weight: 900;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        :active {
          transform: scale(0.95);
        }
      `}
    >
      {variant === "minus" ? "−" : "+"}
    </button>
  );
}

function StationPicker({
  origin,
  dest,
  mode,
  pendingStation,
  onPick,
  onConfirm,
  onCancel,
}: {
  origin: string;
  dest: string;
  mode: "pick-origin" | "pick-dest";
  pendingStation: string | null;
  onPick: (s: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}): React.ReactElement {
  return (
    <div
      css={css`
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      `}
    >
      {/* 출발/도착 미리보기 + 확인 영역 */}
      <div
        css={css`
          background: #ffffff;
          padding: 12px 12px 0;
        `}
      >
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            gap: 8px;
            align-items: center;
            padding-bottom: 10px;
          `}
        >
          <StationCell
            label="출발"
            value={mode === "pick-origin" && pendingStation ? pendingStation : origin}
            active={mode === "pick-origin"}
            onClick={onCancel}
          />
          <span
            css={css`
              font-size: 22px;
              color: #2c6fc8;
              font-weight: 700;
            `}
          >
            →
          </span>
          <StationCell
            label="도착"
            value={mode === "pick-dest" && pendingStation ? pendingStation : dest}
            active={mode === "pick-dest"}
            onClick={onCancel}
          />
        </div>
      </div>

      {/* 안내 + 확인 버튼 */}
      <div
        css={css`
          background: #c4d3e2;
          padding: 14px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        `}
      >
        <button
          type="button"
          onClick={onConfirm}
          disabled={pendingStation === null}
          css={css`
            padding: 8px 28px;
            background: #ffffff;
            border: 1.5px solid #1a3d5c;
            border-radius: 6px;
            color: #1a3d5c;
            font-family: inherit;
            font-size: 16px;
            font-weight: 800;
            cursor: pointer;
            opacity: ${pendingStation === null ? 0.5 : 1};
            -webkit-tap-highlight-color: transparent;
            :active {
              background: #1a3d5c;
              color: #ffffff;
            }
          `}
        >
          확인
        </button>
        <span
          css={css`
            font-size: 12px;
            color: #1a3d5c;
            font-weight: 700;
          `}
        >
          역을 선택하신 후 확인 버튼을 눌러주세요.
        </span>
      </div>

      {/* 주요역 라벨 */}
      <div
        css={css`
          padding: 12px 14px 6px;
          background: #f4f6f9;
          font-size: 13px;
          font-weight: 800;
          color: #2c6fc8;
        `}
      >
        주요역
      </div>

      {/* 역 리스트 2열 grid — 스크롤 */}
      <div
        css={css`
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          background: #ffffff;
        `}
      >
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr;
          `}
        >
          {STATIONS.map((s) => {
            const selected = pendingStation === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => onPick(s)}
                css={css`
                  padding: 16px 16px;
                  background: ${selected ? "#e6efff" : "#ffffff"};
                  border: none;
                  border-bottom: 1px solid #e4e4e4;
                  border-right: 1px solid #e4e4e4;
                  color: ${selected ? "#1a3d5c" : "#1a1a1a"};
                  font-family: inherit;
                  font-size: 17px;
                  font-weight: ${selected ? 900 : 600};
                  text-align: left;
                  cursor: pointer;
                  -webkit-tap-highlight-color: transparent;
                  :active {
                    background: #f0f4f8;
                  }
                `}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
