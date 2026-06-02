import { css, keyframes } from "@emotion/react";
import { useEffect, useState } from "react";

import { type CustomLayoutProps } from "./types";

const slideUp = keyframes`
  0% { transform: translateY(8px); opacity: 0.7; }
  100% { transform: translateY(0); opacity: 1; }
`;

// 주차 등록기 차량번호 입력 — 뒤 4자리만 받음 (실제 병원 주차 키오스크 패턴).
// 4자리 완성 시 자동 다음 단계.
export function ParkingPlate({
  step,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const next = step.choices.find((c) => c.id === "next") ?? step.choices[0]!;
  const [digits, setDigits] = useState<string>("");

  useEffect(() => {
    if (digits.length === 4) {
      const t = setTimeout(() => onChoice(next.id), 600);
      return () => clearTimeout(t);
    }
  }, [digits, next.id, onChoice]);

  function press(n: string) {
    if (digits.length < 4) setDigits(digits + n);
  }
  function backspace() {
    setDigits(digits.slice(0, -1));
  }
  function reset() {
    setDigits("");
  }

  const slots = Array.from({ length: 4 }, (_, i) => digits[i] ?? "");

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
          padding: 11px 16px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        `}
      >
        <span
          css={css`
            font-size: 16px;
            font-weight: 900;
          `}
        >
          🚗 차량번호 입력
        </span>
      </div>

      {/* 안내 */}
      <div
        css={css`
          text-align: center;
          padding: 10px 12px 6px;
          font-size: 14px;
          font-weight: 800;
          color: #0d3b5a;
          line-height: 1.5;
        `}
      >
        차량번호 <span style={{ color: "#c0392b" }}>뒤 4자리</span>를
        눌러주세요
      </div>

      {/* 번호판 모형 */}
      <div
        css={css`
          margin: 4px auto 6px;
          width: min(280px, 90%);
          background: #ffffff;
          border: 4px solid #1a1a1a;
          border-radius: 12px;
          padding: 12px 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
        `}
      >
        <span
          css={css`
            font-size: 26px;
            font-weight: 900;
            color: #5a7a92;
            letter-spacing: 0.05em;
          `}
        >
          12가
        </span>
        <div
          css={css`
            display: flex;
            gap: 5px;
          `}
        >
          {slots.map((d, i) => (
            <div
              key={`s${i}`}
              css={css`
                width: 30px;
                height: 44px;
                background: #f4f6f9;
                border: 2px solid ${d ? "#0067a6" : "#b8cfe2"};
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 26px;
                font-weight: 900;
                color: #1a1a1a;
                animation: ${d ? slideUp : "none"} 120ms ease;
              `}
            >
              {d}
            </div>
          ))}
        </div>
      </div>

      <div
        css={css`
          text-align: center;
          font-size: 11px;
          color: #5a7a92;
          padding: 0 12px 4px;
        `}
      >
        💡 예: <strong>12가 3456</strong> 이면 <strong>3456</strong>만 누르세요
      </div>

      {/* 키패드 */}
      <div
        css={css`
          flex: 1;
          min-height: 0;
          padding: 6px 10px 10px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-auto-rows: 1fr;
          gap: 6px;
        `}
      >
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((n) => (
          <Key key={n} onClick={() => press(n)}>
            {n}
          </Key>
        ))}
        <SecondaryKey onClick={reset}>처음부터</SecondaryKey>
        <Key onClick={() => press("0")}>0</Key>
        <DangerKey onClick={backspace}>
          한 글자
          <br />
          지우기
        </DangerKey>
      </div>
    </div>
  );
}

function Key({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      css={css`
        padding: 10px 0;
        background: #ffffff;
        border: 2px solid #0067a6;
        border-radius: 12px;
        color: #0067a6;
        font-family: inherit;
        font-size: 24px;
        font-weight: 900;
        cursor: pointer;
        min-height: 44px;
        -webkit-tap-highlight-color: transparent;
        :active {
          background: #0067a6;
          color: #ffffff;
          transform: scale(0.97);
        }
      `}
    >
      {children}
    </button>
  );
}

function SecondaryKey({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      css={css`
        padding: 10px 0;
        background: #ffffff;
        border: 2px solid #aab8c2;
        border-radius: 12px;
        color: #5a7a92;
        font-family: inherit;
        font-size: 13px;
        font-weight: 800;
        cursor: pointer;
        min-height: 44px;
        -webkit-tap-highlight-color: transparent;
      `}
    >
      {children}
    </button>
  );
}

function DangerKey({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      css={css`
        padding: 10px 0;
        background: #fff4f4;
        border: 2px solid #d6a8a8;
        border-radius: 12px;
        color: #c0392b;
        font-family: inherit;
        font-size: 13px;
        font-weight: 800;
        cursor: pointer;
        min-height: 44px;
        -webkit-tap-highlight-color: transparent;
      `}
    >
      {children}
    </button>
  );
}
