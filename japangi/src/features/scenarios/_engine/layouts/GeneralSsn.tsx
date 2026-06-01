import { css, keyframes } from "@emotion/react";
import { useEffect, useState } from "react";

import { type CustomLayoutProps } from "./types";

const slideUp = keyframes`
  0% { transform: translateY(8px); opacity: 0.7; }
  100% { transform: translateY(0); opacity: 1; }
`;

// 노인 친화 키패드: 큰 숫자 0-9, 큰 지우기/처음부터 버튼.
export function GeneralSsn({
  step,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const next = step.choices.find((c) => c.id === "next")!;
  const [digits, setDigits] = useState<string>("");
  const front = digits.slice(0, 6); // 생년월일
  const back = digits.slice(6, 13);

  // 13자리 완성 시 자동 다음 단계
  useEffect(() => {
    if (digits.length === 13) {
      const t = setTimeout(() => onChoice(next.id), 600);
      return () => clearTimeout(t);
    }
  }, [digits, next.id, onChoice]);

  function press(n: string) {
    if (digits.length < 13) setDigits(digits + n);
  }
  function backspace() {
    setDigits(digits.slice(0, -1));
  }
  function reset() {
    setDigits("");
  }

  // 13자리 표시 슬롯 (앞 6 + 하이픈 + 뒷 7, 뒷자리 ●로 마스킹)
  const slots = Array.from({ length: 13 }, (_, i) => {
    const d = digits[i];
    if (i < 6) return d ?? "";
    return d ? "●" : "";
  });

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
          주민등록번호
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

      {/* 입력 디스플레이 (앞 6 + 뒷 7) */}
      <div
        css={css`
          padding: 18px 12px 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        `}
      >
        {slots.slice(0, 6).map((d, i) => (
          <div
            key={`f${i}`}
            css={css`
              width: 30px;
              height: 44px;
              background: #ffffff;
              border: 2px solid ${d ? "#0067a6" : "#b8cfe2"};
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 22px;
              font-weight: 900;
              color: #0067a6;
              animation: ${d ? slideUp : "none"} 120ms ease;
            `}
          >
            {d}
          </div>
        ))}
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
        {slots.slice(6).map((d, i) => (
          <div
            key={`b${i}`}
            css={css`
              width: 26px;
              height: 44px;
              background: #ffffff;
              border: 2px solid ${d ? "#0067a6" : "#b8cfe2"};
              border-radius: 8px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 22px;
              font-weight: 900;
              color: #0067a6;
            `}
          >
            {d}
          </div>
        ))}
      </div>

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
          <button
            key={n}
            type="button"
            onClick={() => press(n)}
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
            {n}
          </button>
        ))}
        <button
          type="button"
          onClick={reset}
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
          처음부터
        </button>
        <button
          type="button"
          onClick={() => press("0")}
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
          0
        </button>
        <button
          type="button"
          onClick={backspace}
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
          한 글자
          <br />
          지우기
        </button>
      </div>
    </div>
  );
}
