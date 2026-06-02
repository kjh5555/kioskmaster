import { css, keyframes } from "@emotion/react";
import { useEffect, useState } from "react";

import { type CustomLayoutProps } from "./types";

const slideUp = keyframes`
  0% { transform: translateY(8px); opacity: 0.7; }
  100% { transform: translateY(0); opacity: 1; }
`;

type Mode = "patient" | "ssn";

// 수납·처방전 본인 확인. 시작하자마자 키패드가 뜸 (start step 없음).
// [환자번호 / 주민번호] 탭. 환자번호 8자리 / 주민번호 13자리.
export function PaymentAuth({
  step,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const next = step.choices.find((c) => c.id === "next")!;
  const [mode, setMode] = useState<Mode>("patient");
  const [digits, setDigits] = useState<string>("");

  const targetLen = mode === "patient" ? 8 : 13;

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
      <div
        css={css`
          background: #0067a6;
          color: #ffffff;
          padding: 9px 16px;
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
          수납·처방전 — 본인 확인
        </span>
        <span
          css={css`
            font-size: 10px;
            padding: 2px 8px;
            background: rgba(255, 255, 255, 0.18);
            border-radius: 999px;
          `}
        >
          ⚠️ 저장 안 함
        </span>
      </div>

      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 6px 12px 2px;
          gap: 6px;
        `}
      >
        <TabButton
          active={mode === "patient"}
          onClick={() => switchMode("patient")}
        >
          환자번호
        </TabButton>
        <TabButton active={mode === "ssn"} onClick={() => switchMode("ssn")}>
          주민등록번호
        </TabButton>
      </div>

      {mode === "patient" ? (
        <PatientDisplay digits={digits} />
      ) : (
        <SsnDisplay digits={digits} />
      )}

      <div
        css={css`
          padding: 0 12px 4px;
          text-align: center;
          font-size: 11px;
          color: #5a7a92;
        `}
      >
        {mode === "patient"
          ? "💡 환자번호 8자리 — 진료카드·접수증에 적혀있어요"
          : "💡 주민등록번호 13자리 — 뒷자리는 ●로 가려져요"}
      </div>

      <Keypad onPress={press} onBackspace={backspace} onReset={reset} />
    </div>
  );
}

function PatientDisplay({ digits }: { digits: string }): React.ReactElement {
  const slots = Array.from({ length: 8 }, (_, i) => digits[i] ?? "");
  return (
    <div
      css={css`
        padding: 8px 12px 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
      `}
    >
      {slots.map((d, i) => (
        <Slot key={`p${i}`} value={d} width={32} />
      ))}
    </div>
  );
}

function SsnDisplay({ digits }: { digits: string }): React.ReactElement {
  const slots = Array.from({ length: 13 }, (_, i) => {
    const d = digits[i];
    if (i < 6) return d ?? "";
    return d ? "●" : "";
  });
  return (
    <div
      css={css`
        padding: 8px 12px 4px;
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
        padding: 9px 0;
        background: ${active ? "#0067a6" : "#ffffff"};
        border: 2px solid #0067a6;
        border-radius: 10px;
        color: ${active ? "#ffffff" : "#0067a6"};
        font-family: inherit;
        font-size: 15px;
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

function Slot({
  value,
  width,
}: {
  value: string;
  width: number;
}): React.ReactElement {
  return (
    <div
      css={css`
        width: ${width}px;
        height: 38px;
        background: #ffffff;
        border: 2px solid ${value ? "#0067a6" : "#b8cfe2"};
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
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

function Keypad({
  onPress,
  onBackspace,
  onReset,
}: {
  onPress: (n: string) => void;
  onBackspace: () => void;
  onReset: () => void;
}): React.ReactElement {
  return (
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
        <Key key={n} onClick={() => onPress(n)}>
          {n}
        </Key>
      ))}
      <SecondaryKey onClick={onReset}>처음부터</SecondaryKey>
      <Key onClick={() => onPress("0")}>0</Key>
      <DangerKey onClick={onBackspace}>
        한 글자
        <br />
        지우기
      </DangerKey>
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
