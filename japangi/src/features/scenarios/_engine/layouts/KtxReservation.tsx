import { css, keyframes } from "@emotion/react";
import { useEffect, useState } from "react";

import { trainBrand } from "./_trainBrand";
import { type CustomLayoutProps } from "./types";

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50%     { transform: scale(1.08); }
`;
const popIn = keyframes`
  0%   { transform: scale(0.6); opacity: 0; }
  60%  { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1);   opacity: 1; }
`;

type Phase = "lookup" | "found" | "done";
type Mode = "refund" | "find" | "cancel";

function modeOf(stepId: string): Mode {
  if (stepId.includes("refund")) return "refund";
  if (stepId.includes("cancel")) return "cancel";
  return "find";
}

const TITLES: Record<Mode, string> = {
  refund: "승차권 환불",
  find: "예약표 찾기",
  cancel: "예약 취소",
};
const ACTION_LABELS: Record<Mode, string> = {
  refund: "환불하기",
  find: "발권하기",
  cancel: "예약 취소하기",
};
const DONE_TITLES: Record<Mode, string> = {
  refund: "환불 완료",
  find: "발권 완료",
  cancel: "예약 취소 완료",
};
const DONE_BODIES: Record<Mode, string> = {
  refund: "결제하신 카드로 59,800원이 환불됩니다.\n영업일 기준 3~5일 소요돼요.",
  find: "티켓이 출력되었어요.\n출구에서 챙겨주세요.",
  cancel: "예약이 취소되었습니다.\n새로 예매하시려면 처음 화면으로 돌아가세요.",
};

// 환불 / 예약확인(찾기) / 예약취소 공용 화면. step.id 로 mode 분기.
// 키오스크 일반 패턴: 예약번호 + 비밀번호 조회 → 예약 카드 → 액션 → 완료.
export function KtxReservation({
  step,
  scenario,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const brand = trainBrand(scenario.id);
  const home = step.choices.find((c) => c.id === "home");
  const done = step.choices.find((c) => c.id === "done") ?? step.choices[0]!;
  const mode = modeOf(step.id);
  const [phase, setPhase] = useState<Phase>("lookup");

  useEffect(() => {
    if (phase !== "done") return;
    const t = setTimeout(() => onChoice(done.id), 3500);
    return () => clearTimeout(t);
  }, [phase, done.id, onChoice]);

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
        title={TITLES[mode]}
        onHome={home ? () => onChoice(home.id) : undefined}
      />

      {phase === "lookup" && (
        <LookupForm mode={mode} onSearch={() => setPhase("found")} />
      )}
      {phase === "found" && (
        <ReservationCard
          mode={mode}
          trainNum={brand.trainNum2}
          origin={brand.originStation}
          dest={brand.destStation}
          onAction={() => setPhase("done")}
        />
      )}
      {phase === "done" && <DoneScreen mode={mode} />}
    </div>
  );
}

function LookupForm({
  mode,
  onSearch,
}: {
  mode: Mode;
  onSearch: () => void;
}): React.ReactElement {
  const hint =
    mode === "refund"
      ? "환불할 표의 예약번호와 비밀번호를 입력해주세요."
      : mode === "cancel"
        ? "취소할 예약의 예약번호와 비밀번호를 입력해주세요."
        : "예약하신 표의 예약번호와 비밀번호를 입력해주세요.";

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
      <div
        css={css`
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        `}
      >
        <div
          css={css`
            text-align: center;
            font-size: 14px;
            color: #1a3d5c;
            line-height: 1.5;
            padding: 6px 8px 4px;
          `}
        >
          {hint}
        </div>

        {/* 예약번호 */}
        <div
          css={css`
            background: #ffffff;
            border-radius: 12px;
            padding: 14px 16px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
          `}
        >
          <span
            css={css`
              font-size: 12px;
              color: #5a7a92;
              font-weight: 700;
            `}
          >
            예약번호 (10자리)
          </span>
          <div
            css={css`
              padding: 12px 14px;
              background: #f4f6f9;
              border: 1.5px solid #c4cfdb;
              border-radius: 8px;
              font-size: 22px;
              font-weight: 900;
              color: #1a3d5c;
              text-align: center;
              letter-spacing: 0.08em;
              font-variant-numeric: tabular-nums;
            `}
          >
            1234-5678-90
          </div>
        </div>

        {/* 비밀번호 */}
        <div
          css={css`
            background: #ffffff;
            border-radius: 12px;
            padding: 14px 16px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
          `}
        >
          <span
            css={css`
              font-size: 12px;
              color: #5a7a92;
              font-weight: 700;
            `}
          >
            비밀번호 (4자리)
          </span>
          <div
            css={css`
              padding: 12px 14px;
              background: #f4f6f9;
              border: 1.5px solid #c4cfdb;
              border-radius: 8px;
              font-size: 22px;
              font-weight: 900;
              color: #1a3d5c;
              text-align: center;
              letter-spacing: 0.4em;
              font-variant-numeric: tabular-nums;
            `}
          >
            ●●●●
          </div>
        </div>

        <div
          css={css`
            padding: 10px 12px;
            background: #fff8e6;
            border: 1px solid #f5d97a;
            border-radius: 10px;
            font-size: 11px;
            color: #5a4400;
            text-align: center;
            line-height: 1.5;
          `}
        >
          💡 연습이라 예약번호·비밀번호가 미리 채워져 있어요. 그대로 조회해보세요.
        </div>
      </div>

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
          position: relative;
          :active {
            background: #14304a;
          }
        `}
      >
        조회하기
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
  );
}

function ReservationCard({
  mode,
  trainNum,
  origin,
  dest,
  onAction,
}: {
  mode: Mode;
  trainNum: string;
  origin: string;
  dest: string;
  onAction: () => void;
}): React.ReactElement {
  const actionStyle =
    mode === "refund" || mode === "cancel"
      ? { bg: "#b73a3a", hover: "#9c2c2c" }
      : { bg: "#1a3d5c", hover: "#14304a" };

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
      <div
        css={css`
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        `}
      >
        <div
          css={css`
            text-align: center;
            font-size: 14px;
            color: #1a3d5c;
            font-weight: 800;
            padding-bottom: 4px;
          `}
        >
          ✅ 예약을 찾았어요
        </div>

        {/* 예약 카드 */}
        <div
          css={css`
            background: #ffffff;
            border: 2px solid #c4cfdb;
            border-radius: 14px;
            padding: 18px 18px;
            box-shadow: 0 2px 6px rgba(0, 103, 166, 0.08);
            display: flex;
            flex-direction: column;
            gap: 12px;
          `}
        >
          <div
            css={css`
              text-align: center;
              padding-bottom: 8px;
              border-bottom: 1px dashed #d1d5db;
            `}
          >
            <div
              css={css`
                font-size: 12px;
                color: #5a7a92;
              `}
            >
              2026년 06월 02일 (화)
            </div>
            <div
              css={css`
                font-size: 24px;
                font-weight: 900;
                color: #1a3d5c;
                padding-top: 2px;
                letter-spacing: 0.04em;
              `}
            >
              {trainNum}
            </div>
          </div>

          <div
            css={css`
              display: grid;
              grid-template-columns: 1fr auto 1fr;
              gap: 10px;
              align-items: center;
            `}
          >
            <div css={css`text-align: center;`}>
              <div css={css`font-size: 12px; color: #5a7a92;`}>{origin}</div>
              <div css={css`font-size: 22px; font-weight: 900; color: #1a3d5c; font-variant-numeric: tabular-nums;`}>
                10:20
              </div>
            </div>
            <div css={css`font-size: 22px; color: #2c6fc8;`}>→</div>
            <div css={css`text-align: center;`}>
              <div css={css`font-size: 12px; color: #5a7a92;`}>{dest}</div>
              <div css={css`font-size: 22px; font-weight: 900; color: #1a3d5c; font-variant-numeric: tabular-nums;`}>
                10:45
              </div>
            </div>
          </div>

          <CardRow label="좌석" value="1호차 12D · 역방향" />
          <CardRow label="인원" value="어른 1명" />
          <div
            css={css`
              padding-top: 10px;
              border-top: 1px solid #e4e4e4;
              display: flex;
              justify-content: space-between;
              align-items: baseline;
            `}
          >
            <span css={css`font-size: 14px; color: #1a1a1a; font-weight: 800;`}>
              결제 금액
            </span>
            <span
              css={css`
                font-size: 22px;
                font-weight: 900;
                color: #c0392b;
                font-variant-numeric: tabular-nums;
              `}
            >
              59,800원
            </span>
          </div>
        </div>

        {mode === "refund" && (
          <div
            css={css`
              padding: 10px 12px;
              background: #fff8e6;
              border: 1px solid #f5d97a;
              border-radius: 10px;
              font-size: 11px;
              color: #5a4400;
              line-height: 1.5;
              text-align: center;
            `}
          >
            💰 출발 30분 전 환불 시 수수료 없음. 환불 금액 59,800원
            전액 카드 취소돼요.
          </div>
        )}
        {mode === "cancel" && (
          <div
            css={css`
              padding: 10px 12px;
              background: #fff4f4;
              border: 1px solid #f5b8b8;
              border-radius: 10px;
              font-size: 11px;
              color: #8a1a1a;
              line-height: 1.5;
              text-align: center;
            `}
          >
            ⚠️ 예약을 취소하면 좌석이 다른 사람에게 풀려요. 정말 취소하시려면 아래 빨간 버튼을 눌러주세요.
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onAction}
        css={css`
          width: 100%;
          padding: 16px 0 calc(env(safe-area-inset-bottom, 0px) + 16px);
          background: ${actionStyle.bg};
          border: none;
          color: #ffffff;
          font-family: inherit;
          font-size: 18px;
          font-weight: 900;
          letter-spacing: 0.04em;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          :active {
            background: ${actionStyle.hover};
          }
        `}
      >
        {ACTION_LABELS[mode]}
      </button>
    </div>
  );
}

function DoneScreen({ mode }: { mode: Mode }): React.ReactElement {
  return (
    <div
      css={css`
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 32px 24px;
        gap: 14px;
        background: #ffffff;
      `}
    >
      <div
        css={css`
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: ${mode === "cancel" ? "#fff4f4" : "#e8f5ec"};
          border: 4px solid ${mode === "cancel" ? "#b73a3a" : "#0f7b3a"};
          color: ${mode === "cancel" ? "#b73a3a" : "#0f7b3a"};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          font-weight: 900;
          animation: ${popIn} 500ms ease-out;
        `}
      >
        {mode === "cancel" ? "✕" : "✓"}
      </div>
      <div
        css={css`
          font-size: 22px;
          font-weight: 900;
          color: #1a3d5c;
          text-align: center;
          padding-top: 4px;
        `}
      >
        {DONE_TITLES[mode]}
      </div>
      <div
        css={css`
          font-size: 14px;
          color: #3a4a5a;
          text-align: center;
          line-height: 1.6;
          white-space: pre-line;
          max-width: 280px;
        `}
      >
        {DONE_BODIES[mode]}
      </div>
      <div
        css={css`
          font-size: 11px;
          color: #5a7a92;
          margin-top: 12px;
          text-align: center;
        `}
      >
        잠시 후 처음 화면으로 돌아갑니다
      </div>
    </div>
  );
}

function CardRow({
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
        justify-content: space-between;
        align-items: baseline;
      `}
    >
      <span
        css={css`
          font-size: 14px;
          color: #5a7a92;
        `}
      >
        {label}
      </span>
      <span
        css={css`
          font-size: 15px;
          font-weight: 800;
          color: #1a3d5c;
        `}
      >
        {value}
      </span>
    </div>
  );
}

function Header({
  title,
  onHome,
}: {
  title: string;
  onHome?: () => void;
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
