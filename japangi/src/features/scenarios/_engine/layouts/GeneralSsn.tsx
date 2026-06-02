import { css, keyframes } from "@emotion/react";
import { useEffect, useState } from "react";

import { type CustomLayoutProps } from "./types";

const slideUp = keyframes`
  0% { transform: translateY(8px); opacity: 0.7; }
  100% { transform: translateY(0); opacity: 1; }
`;

type Mode = "ssn" | "phone";

// 본인 확인 키패드 — 실제 병원 무인 접수기처럼 [주민등록번호 / 핸드폰번호]
// 두 가지 입력 방법을 상단 탭으로 전환. 탭 전환 시 입력은 초기화.
export function GeneralSsn({
  step,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const next = step.choices.find((c) => c.id === "next")!;
  const [mode, setMode] = useState<Mode>("ssn");
  const [digits, setDigits] = useState<string>("");

  const targetLen = mode === "ssn" ? 13 : 11;

  // 입력 완료 시 자동 다음 단계
  useEffect(() => {
    if (digits.length === targetLen) {
      const t = setTimeout(() => onChoice(next.id), 600);
      return () => clearTimeout(t);
    }
  }, [digits, targetLen, next.id, onChoice]);

  function switchMode(m: Mode) {
    if (m === mode) return;
    setMode(m);
    setDigits("");
  }
  function press(n: string) {
    if (digits.length < targetLen) setDigits(digits + n);
  }
  function backspace() {
    setDigits(digits.slice(0, -1));
  }
  function reset() {
    setDigits("");
  }

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
      {/* Header + 안전 안내 */}
      <div
        css={css`
          background: #0067a6;
          color: #ffffff;
          padding: 14px 16px;
          text-align: center;
        `}
      >
        <div
          css={css`
            font-size: 17px;
            font-weight: 900;
          `}
        >
          본인 확인
        </div>
        <div
          css={css`
            font-size: 11px;
            opacity: 0.92;
            margin-top: 4px;
            padding: 4px 10px;
            background: rgba(255, 255, 255, 0.18);
            border-radius: 999px;
            display: inline-block;
          `}
        >
          ⚠️ 연습이에요. 저장하지 않아요.
        </div>
      </div>

      {/* 서브탭: 주민등록번호 / 핸드폰번호 */}
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 10px 12px 4px;
          gap: 8px;
        `}
      >
        <TabButton active={mode === "ssn"} onClick={() => switchMode("ssn")}>
          주민등록번호
        </TabButton>
        <TabButton active={mode === "phone"} onClick={() => switchMode("phone")}>
          핸드폰번호
        </TabButton>
      </div>

      {/* 입력 디스플레이 */}
      {mode === "ssn" ? (
        <SsnDisplay digits={digits} />
      ) : (
        <PhoneDisplay digits={digits} />
      )}

      {/* 키패드 */}
      <div
        css={css`
          flex: 1;
          padding: 8px 12px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 8px;
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

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      css={css`
        padding: 12px 0;
        background: ${active ? "#0067a6" : "#ffffff"};
        border: 2px solid #0067a6;
        border-radius: 12px;
        color: ${active ? "#ffffff" : "#0067a6"};
        font-family: inherit;
        font-size: 16px;
        font-weight: 900;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        :active {
          transform: scale(0.98);
        }
      `}
    >
      {children}
    </button>
  );
}

function SsnDisplay({ digits }: { digits: string }): React.ReactElement {
  // 13자리: 앞 6 + 하이픈 + 뒷 7 (뒷자리 마스킹)
  const slots = Array.from({ length: 13 }, (_, i) => {
    const d = digits[i];
    if (i < 6) return d ?? "";
    return d ? "●" : "";
  });
  return (
    <div
      css={css`
        padding: 14px 12px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      `}
    >
      {slots.slice(0, 6).map((d, i) => (
        <Slot key={`f${i}`} value={d} width={30} />
      ))}
      <Dash />
      {slots.slice(6).map((d, i) => (
        <Slot key={`b${i}`} value={d} width={26} />
      ))}
    </div>
  );
}

function PhoneDisplay({ digits }: { digits: string }): React.ReactElement {
  // 11자리: 3 + 4 + 4 (마스킹 없음 — 핸드폰 번호는 본인 확인용 표시)
  const part1 = Array.from({ length: 3 }, (_, i) => digits[i] ?? "");
  const part2 = Array.from({ length: 4 }, (_, i) => digits[3 + i] ?? "");
  const part3 = Array.from({ length: 4 }, (_, i) => digits[7 + i] ?? "");
  return (
    <div
      css={css`
        padding: 14px 12px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      `}
    >
      {part1.map((d, i) => (
        <Slot key={`p1${i}`} value={d} width={34} />
      ))}
      <Dash />
      {part2.map((d, i) => (
        <Slot key={`p2${i}`} value={d} width={32} />
      ))}
      <Dash />
      {part3.map((d, i) => (
        <Slot key={`p3${i}`} value={d} width={32} />
      ))}
    </div>
  );
}

function Slot({ value, width }: { value: string; width: number }): React.ReactElement {
  return (
    <div
      css={css`
        width: ${width}px;
        height: 44px;
        background: #ffffff;
        border: 2px solid ${value ? "#0067a6" : "#b8cfe2"};
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        font-weight: 900;
        color: #0067a6;
        animation: ${value ? slideUp : "none"} 120ms ease;
      `}
    >
      {value}
    </div>
  );
}

function Dash(): React.ReactElement {
  return (
    <div
      css={css`
        font-size: 24px;
        font-weight: 900;
        color: #0067a6;
        padding: 0 4px;
      `}
    >
      -
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
        padding: 16px 0;
        background: #ffffff;
        border: 2px solid #0067a6;
        border-radius: 14px;
        color: #0067a6;
        font-family: inherit;
        font-size: 28px;
        font-weight: 900;
        cursor: pointer;
        min-height: 56px;
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
        padding: 16px 0;
        background: #ffffff;
        border: 2px solid #aab8c2;
        border-radius: 14px;
        color: #5a7a92;
        font-family: inherit;
        font-size: 15px;
        font-weight: 800;
        cursor: pointer;
        min-height: 56px;
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
        padding: 16px 0;
        background: #fff4f4;
        border: 2px solid #d6a8a8;
        border-radius: 14px;
        color: #c0392b;
        font-family: inherit;
        font-size: 15px;
        font-weight: 800;
        cursor: pointer;
        min-height: 56px;
        -webkit-tap-highlight-color: transparent;
      `}
    >
      {children}
    </button>
  );
}
