import { css, keyframes } from "@emotion/react";

import { type CustomLayoutProps } from "./types";

const trainGlide = keyframes`
  0%   { transform: translateX(-6px); }
  50%  { transform: translateX(6px); }
  100% { transform: translateX(-6px); }
`;

type Btn = {
  id: string;
  label: string;
  icon: string;
  primary: boolean; // 진한 파랑 / 연한 파랑
};

const MAIN_BUTTONS: Btn[] = [
  { id: "buy", label: "승차권 구매", icon: "»", primary: true },
  { id: "refund", label: "승차권 환불", icon: "↑", primary: true },
  { id: "find", label: "예약표 찾기", icon: "🔍", primary: false },
  { id: "cancel", label: "예약 취소", icon: "⊘", primary: false },
];

const QUICK_BUTTONS = [
  { id: "quick-buy", label: "빠른구매", icon: "→" },
  { id: "receipt", label: "영수증 출력", icon: "₩" },
  { id: "platform-ticket", label: "입장권", icon: "→" },
];

// KTX 키오스크 첫 화면 — 코레일 발매기 메인 메뉴. 역 사진 헤더 + 4개 메인
// 메뉴 + 우측 하단 3개 빠른 버튼 + 하단 KTX 열차 일러스트.
export function KtxStart({
  step,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  function pick(id: string) {
    const choice = step.choices.find((c) => c.id === id) ?? step.choices[0];
    if (choice) onChoice(choice.id);
  }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background: linear-gradient(180deg, #b8d4f5 0%, #cee3ee 60%, #e6f0f5 100%);
        font-family: system-ui, -apple-system, sans-serif;
        overflow: hidden;
        position: relative;
      `}
    >
      {/* 상단 역 사진 영역 (사진 placeholder — 빌딩 실루엣 그라데이션) */}
      <StationHeader />

      {/* 본문 — 메인 메뉴(상) + 빠른 버튼(하·우측 정렬) grid 분리.
          이전엔 position: absolute 로 인해 viewport 작을 때 캡슐과 겹침. */}
      <div
        css={css`
          flex: 1;
          min-height: 0;
          display: grid;
          grid-template-rows: 1fr auto;
          padding: 16px 14px 10px;
          z-index: 2;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: center;
            justify-content: center;
          `}
        >
          {MAIN_BUTTONS.map((b) => (
            <MainButton key={b.id} btn={b} onClick={() => pick(b.id)} />
          ))}
        </div>

        <div
          css={css`
            display: flex;
            gap: 10px;
            justify-content: flex-end;
            padding-top: 10px;
          `}
        >
          {QUICK_BUTTONS.map((b) => (
            <QuickCircle
              key={b.id}
              label={b.label}
              icon={b.icon}
              onClick={() => pick(b.id)}
            />
          ))}
        </div>
      </div>

      {/* 하단 일러스트 — 산 / 풀밭 / KTX 열차 / 선로 */}
      <Illustration />
    </div>
  );
}

function StationHeader(): React.ReactElement {
  return (
    <div
      css={css`
        position: relative;
        height: 110px;
        background: linear-gradient(180deg, #b8c5d4 0%, #6b7c93 60%, #4a5564 100%);
        overflow: hidden;
        flex-shrink: 0;
        border-bottom: 2px solid rgba(0, 0, 0, 0.08);
      `}
    >
      {/* 역 건물 실루엣 — 큰 사각 + 유리창 격자 */}
      <div
        css={css`
          position: absolute;
          left: 8%;
          right: 8%;
          bottom: 0;
          height: 75%;
          background: linear-gradient(135deg, #5a6b7e 0%, #3a4a5c 100%);
          clip-path: polygon(0 30%, 25% 10%, 60% 5%, 100% 20%, 100% 100%, 0 100%);
          opacity: 0.85;
        `}
      />
      {/* 유리창 격자 패턴 */}
      <div
        css={css`
          position: absolute;
          left: 14%;
          right: 14%;
          bottom: 4%;
          height: 60%;
          background-image:
            repeating-linear-gradient(
              90deg,
              rgba(180, 210, 240, 0.25) 0,
              rgba(180, 210, 240, 0.25) 8px,
              transparent 8px,
              transparent 12px
            ),
            repeating-linear-gradient(
              0deg,
              rgba(180, 210, 240, 0.2) 0,
              rgba(180, 210, 240, 0.2) 10px,
              transparent 10px,
              transparent 14px
            );
          mix-blend-mode: screen;
        `}
      />
      {/* '서울역' 라벨 */}
      <div
        css={css`
          position: absolute;
          top: 8px;
          left: 0;
          right: 0;
          text-align: center;
          color: #ffffff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
          opacity: 0.85;
        `}
      >
        🏛 서울역
      </div>
    </div>
  );
}

function MainButton({
  btn,
  onClick,
}: {
  btn: Btn;
  onClick: () => void;
}): React.ReactElement {
  const bg = btn.primary
    ? "linear-gradient(180deg, #4a8dd8 0%, #2c6fc8 100%)"
    : "linear-gradient(180deg, #b9ceea 0%, #97b6dd 100%)";
  const color = btn.primary ? "#ffffff" : "#1a3a6a";
  const iconBg = btn.primary
    ? "rgba(255, 255, 255, 0.22)"
    : "rgba(255, 255, 255, 0.55)";

  return (
    <button
      type="button"
      onClick={onClick}
      css={css`
        width: min(280px, 90%);
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 13px 18px 13px 12px;
        background: ${bg};
        border: 1.5px solid rgba(255, 255, 255, 0.4);
        border-radius: 999px;
        color: ${color};
        font-family: inherit;
        font-size: 17px;
        font-weight: 900;
        cursor: pointer;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
        -webkit-tap-highlight-color: transparent;
        :active {
          transform: scale(0.98);
        }
      `}
    >
      <span
        css={css`
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: ${iconBg};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 900;
          flex-shrink: 0;
        `}
      >
        {btn.icon}
      </span>
      <span
        css={css`
          flex: 1;
          text-align: center;
          letter-spacing: 0.04em;
          padding-right: 28px;
        `}
      >
        {btn.label}
      </span>
    </button>
  );
}

function QuickCircle({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: string;
  onClick: () => void;
}): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        padding: 0;
        background: transparent;
        border: none;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        :active {
          transform: scale(0.94);
        }
      `}
    >
      <div
        css={css`
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(180deg, #4a8dd8 0%, #2c6fc8 100%);
          border: 2px solid #ffffff;
          color: #ffffff;
          font-size: 18px;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
        `}
      >
        {icon}
      </div>
      <span
        css={css`
          font-size: 10px;
          color: #1a3a6a;
          font-weight: 800;
          line-height: 1.2;
          text-align: center;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
        `}
      >
        {label}
      </span>
    </button>
  );
}

function Illustration(): React.ReactElement {
  return (
    <div
      css={css`
        position: relative;
        height: 90px;
        flex-shrink: 0;
        overflow: hidden;
      `}
    >
      {/* 산 — 회색/녹색 둥근 봉우리 */}
      <div
        css={css`
          position: absolute;
          left: -8%;
          bottom: 30px;
          width: 50%;
          height: 55px;
          background: #8aa18f;
          border-radius: 50% 50% 0 0 / 100% 100% 0 0;
        `}
      />
      <div
        css={css`
          position: absolute;
          left: 22%;
          bottom: 30px;
          width: 40%;
          height: 70px;
          background: #6fb55a;
          border-radius: 50% 50% 0 0 / 100% 100% 0 0;
        `}
      />
      <div
        css={css`
          position: absolute;
          right: -4%;
          bottom: 30px;
          width: 38%;
          height: 48px;
          background: #aed581;
          border-radius: 50% 50% 0 0 / 100% 100% 0 0;
        `}
      />
      {/* 풀밭 */}
      <div
        css={css`
          position: absolute;
          left: 0;
          right: 0;
          bottom: 12px;
          height: 22px;
          background: linear-gradient(180deg, #94c97a 0%, #6ea957 100%);
        `}
      />
      {/* 선로 */}
      <div
        css={css`
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 12px;
          background: #6b6b6b;
        `}
      />
      <div
        css={css`
          position: absolute;
          left: 0;
          right: 0;
          bottom: 5px;
          height: 2px;
          background: repeating-linear-gradient(
            90deg,
            #3a3a3a 0,
            #3a3a3a 10px,
            transparent 10px,
            transparent 16px
          );
        `}
      />
      {/* KTX 열차 */}
      <div
        css={css`
          position: absolute;
          left: 8%;
          bottom: 12px;
          width: 180px;
          height: 26px;
          animation: ${trainGlide} 3500ms ease-in-out infinite;
        `}
      >
        {/* 차체 */}
        <div
          css={css`
            position: absolute;
            left: 28px;
            bottom: 4px;
            width: 152px;
            height: 18px;
            background: linear-gradient(180deg, #4ea8d9 0%, #2a6fa6 100%);
            border-radius: 4px 4px 4px 4px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
          `}
        />
        {/* 머리부 (사선) */}
        <div
          css={css`
            position: absolute;
            left: 0;
            bottom: 4px;
            width: 36px;
            height: 18px;
            background: linear-gradient(135deg, #2a6fa6 0%, #4ea8d9 100%);
            clip-path: polygon(0 100%, 60% 0, 100% 0, 100% 100%);
            border-radius: 4px 0 0 4px;
          `}
        />
        {/* 창문 띠 */}
        <div
          css={css`
            position: absolute;
            left: 36px;
            bottom: 12px;
            width: 138px;
            height: 5px;
            background: #1a3d5c;
            border-radius: 1px;
            opacity: 0.85;
          `}
        />
        {/* 바퀴 */}
        {[36, 76, 116, 156].map((x) => (
          <div
            key={x}
            css={css`
              position: absolute;
              left: ${x}px;
              bottom: -1px;
              width: 8px;
              height: 8px;
              background: #1a1a1a;
              border-radius: 50%;
            `}
          />
        ))}
      </div>
    </div>
  );
}
