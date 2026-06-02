import { css, keyframes } from "@emotion/react";
import { useEffect, useState } from "react";

import { type CustomLayoutProps } from "./types";

const slideUp = keyframes`
  0% { transform: translateY(8px); opacity: 0.7; }
  100% { transform: translateY(0); opacity: 1; }
`;

type Mode = "ssn" | "phone";
type Phase = "input" | "carrier" | "otp";
type Carrier = { id: string; name: string; color: string; sub: string };

const CARRIERS: Carrier[] = [
  { id: "skt", name: "SKT", color: "#ea002c", sub: "SK텔레콤" },
  { id: "kt", name: "KT", color: "#1a1a1a", sub: "올레 KT" },
  { id: "lgu", name: "LG U+", color: "#a50034", sub: "LG유플러스" },
  { id: "mvno", name: "알뜰폰", color: "#0f7b3a", sub: "MVNO / 헬로·SK7·KT M 등" },
];

// 본인 확인 키패드 — 실제 병원 무인 접수기처럼 [주민등록번호 / 핸드폰번호] 탭.
// 핸드폰 경로: 11자리 → 통신사 선택 → 인증번호 6자리 → 자동 다음 단계.
export function GeneralSsn({
  step,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const next = step.choices.find((c) => c.id === "next")!;
  const [mode, setMode] = useState<Mode>("ssn");
  const [phase, setPhase] = useState<Phase>("input");
  const [digits, setDigits] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [carrier, setCarrier] = useState<Carrier | null>(null);

  // 키패드 활성 여부 + 현재 목표 길이
  const targetLen =
    mode === "ssn" ? 13 : phase === "input" ? 11 : phase === "otp" ? 6 : 0;
  const keypadActive = targetLen > 0;

  // 자동 진행: 길이 충족 시 다음 phase 또는 step
  useEffect(() => {
    if (!keypadActive || digits.length !== targetLen) return;
    const t = setTimeout(() => {
      if (mode === "ssn") {
        onChoice(next.id);
      } else if (phase === "input") {
        setPhoneNumber(digits);
        setDigits("");
        setPhase("carrier");
      } else if (phase === "otp") {
        onChoice(next.id);
      }
    }, 600);
    return () => clearTimeout(t);
  }, [digits, targetLen, keypadActive, mode, phase, next.id, onChoice]);

  function switchMode(m: Mode) {
    if (m === mode) return;
    setMode(m);
    setPhase("input");
    setDigits("");
    setPhoneNumber("");
    setCarrier(null);
  }
  function selectCarrier(c: Carrier) {
    setCarrier(c);
    setDigits("");
    setPhase("otp");
  }
  function backToPhoneInput() {
    setPhase("input");
    setDigits(phoneNumber); // 다시 수정할 수 있게 복원
  }
  function backToCarrier() {
    setPhase("carrier");
    setDigits("");
  }
  function press(n: string) {
    if (!keypadActive) return;
    if (digits.length < targetLen) setDigits(digits + n);
  }
  function backspace() {
    setDigits(digits.slice(0, -1));
  }
  function reset() {
    setDigits("");
  }

  // 핸드폰 번호 마스킹: 010-1234-**56 형식
  const maskedPhone = (() => {
    if (phoneNumber.length !== 11) return phoneNumber;
    const p1 = phoneNumber.slice(0, 3);
    const p2 = phoneNumber.slice(3, 7);
    const p3 = phoneNumber.slice(7, 9) + "**";
    return `${p1}-${p2}-${p3}`;
  })();

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
      {/* Header — 컴팩트 (안전 안내는 작게 인라인) */}
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
          본인 확인
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

      {/* 서브탭 */}
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 6px 12px 2px;
          gap: 6px;
        `}
      >
        <TabButton active={mode === "ssn"} onClick={() => switchMode("ssn")}>
          주민등록번호
        </TabButton>
        <TabButton active={mode === "phone"} onClick={() => switchMode("phone")}>
          핸드폰번호
        </TabButton>
      </div>

      {/* Phase별 화면 */}
      {mode === "ssn" && (
        <>
          <SsnDisplay digits={digits} />
          <Keypad
            onPress={press}
            onBackspace={backspace}
            onReset={reset}
          />
        </>
      )}

      {mode === "phone" && phase === "input" && (
        <>
          <PhoneDisplay digits={digits} />
          <Keypad
            onPress={press}
            onBackspace={backspace}
            onReset={reset}
          />
        </>
      )}

      {mode === "phone" && phase === "carrier" && (
        <CarrierSelect
          phoneText={(() => {
            const p1 = phoneNumber.slice(0, 3);
            const p2 = phoneNumber.slice(3, 7);
            const p3 = phoneNumber.slice(7, 11);
            return `${p1}-${p2}-${p3}`;
          })()}
          onSelect={selectCarrier}
          onBack={backToPhoneInput}
        />
      )}

      {mode === "phone" && phase === "otp" && carrier && (
        <>
          <OtpHeader
            carrierName={carrier.name}
            carrierColor={carrier.color}
            phoneMasked={maskedPhone}
            digits={digits}
            onBack={backToCarrier}
          />
          <Keypad
            onPress={press}
            onBackspace={backspace}
            onReset={reset}
          />
        </>
      )}
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

function SsnDisplay({ digits }: { digits: string }): React.ReactElement {
  const slots = Array.from({ length: 13 }, (_, i) => {
    const d = digits[i];
    if (i < 6) return d ?? "";
    return d ? "●" : "";
  });
  return (
    <div
      css={css`
        padding: 8px 12px 6px;
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
  const part1 = Array.from({ length: 3 }, (_, i) => digits[i] ?? "");
  const part2 = Array.from({ length: 4 }, (_, i) => digits[3 + i] ?? "");
  const part3 = Array.from({ length: 4 }, (_, i) => digits[7 + i] ?? "");
  return (
    <div
      css={css`
        padding: 8px 12px 6px;
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

function CarrierSelect({
  phoneText,
  onSelect,
  onBack,
}: {
  phoneText: string;
  onSelect: (c: Carrier) => void;
  onBack: () => void;
}): React.ReactElement {
  return (
    <div
      css={css`
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 10px 14px 14px;
        gap: 12px;
        overflow-y: auto;
      `}
    >
      <div
        css={css`
          padding: 12px 14px;
          background: #ffffff;
          border: 2px solid #0067a6;
          border-radius: 12px;
          text-align: center;
        `}
      >
        <div
          css={css`
            font-size: 12px;
            color: #5a7a92;
            margin-bottom: 4px;
          `}
        >
          입력한 핸드폰 번호
        </div>
        <div
          css={css`
            font-size: 22px;
            font-weight: 900;
            color: #0067a6;
            letter-spacing: 0.04em;
          `}
        >
          {phoneText}
        </div>
        <button
          type="button"
          onClick={onBack}
          css={css`
            margin-top: 6px;
            padding: 6px 12px;
            background: transparent;
            border: 1px solid #aab8c2;
            border-radius: 999px;
            color: #5a7a92;
            font-family: inherit;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
          `}
        >
          ↺ 번호 다시 입력
        </button>
      </div>

      <div
        css={css`
          font-size: 15px;
          font-weight: 900;
          color: #0d3b5a;
          text-align: center;
          padding: 2px 0;
        `}
      >
        통신사를 골라주세요
      </div>

      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        `}
      >
        {CARRIERS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect(c)}
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 6px;
              padding: 22px 10px;
              background: #ffffff;
              border: 3px solid ${c.color};
              border-radius: 16px;
              color: ${c.color};
              font-family: inherit;
              cursor: pointer;
              min-height: 110px;
              box-shadow: 0 3px 8px rgba(0, 0, 0, 0.06);
              -webkit-tap-highlight-color: transparent;
              :active {
                background: ${c.color};
                color: #ffffff;
                transform: scale(0.98);
              }
            `}
          >
            <span
              css={css`
                font-size: 24px;
                font-weight: 900;
                letter-spacing: -0.02em;
              `}
            >
              {c.name}
            </span>
            <span
              css={css`
                font-size: 11px;
                color: #5a7a92;
                text-align: center;
                line-height: 1.3;
              `}
            >
              {c.sub}
            </span>
          </button>
        ))}
      </div>

      <div
        css={css`
          padding: 10px 12px;
          background: #fff8e6;
          border: 1px solid #f5d97a;
          border-radius: 10px;
          font-size: 12px;
          color: #5a4400;
          line-height: 1.5;
          text-align: center;
        `}
      >
        💡 통신사를 모르시면 핸드폰 뒷면 스티커나 청구서를 확인해보세요.
      </div>
    </div>
  );
}

function OtpHeader({
  carrierName,
  carrierColor,
  phoneMasked,
  digits,
  onBack,
}: {
  carrierName: string;
  carrierColor: string;
  phoneMasked: string;
  digits: string;
  onBack: () => void;
}): React.ReactElement {
  const slots = Array.from({ length: 6 }, (_, i) => digits[i] ?? "");
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        padding: 6px 12px 4px;
        gap: 6px;
      `}
    >
      {/* 통신사 칩 + 번호 + 변경 — 한 줄 */}
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 10px;
          background: #ffffff;
          border: 1px solid #d1dee9;
          border-radius: 10px;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 8px;
            min-width: 0;
          `}
        >
          <span
            css={css`
              padding: 2px 8px;
              background: ${carrierColor};
              color: #ffffff;
              border-radius: 999px;
              font-size: 10px;
              font-weight: 900;
              letter-spacing: -0.02em;
              flex-shrink: 0;
            `}
          >
            {carrierName}
          </span>
          <span
            css={css`
              font-size: 14px;
              font-weight: 900;
              color: #0d3b5a;
              letter-spacing: 0.02em;
              white-space: nowrap;
            `}
          >
            {phoneMasked}
          </span>
        </div>
        <button
          type="button"
          onClick={onBack}
          css={css`
            padding: 3px 8px;
            background: transparent;
            border: 1px solid #aab8c2;
            border-radius: 999px;
            color: #5a7a92;
            font-family: inherit;
            font-size: 10px;
            font-weight: 700;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            flex-shrink: 0;
          `}
        >
          ↺ 변경
        </button>
      </div>

      {/* 안내 + 슬롯 — 한 컨테이너에 합침 */}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: center;
        `}
      >
        <div
          css={css`
            font-size: 12px;
            color: #0d3b5a;
            font-weight: 800;
          `}
        >
          📩 인증번호 6자리 — 연습은 아무 숫자나 OK
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
          `}
        >
          {slots.map((d, i) => (
            <Slot key={`otp${i}`} value={d} width={34} />
          ))}
        </div>
      </div>
    </div>
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
