import { css, keyframes } from "@emotion/react";
import { useEffect, useState } from "react";

import { idlePulse, type CustomLayoutProps } from "./types";

const shakeKf = keyframes`
  0%   { transform: translateX(0); }
  20%  { transform: translateX(-8px); }
  40%  { transform: translateX(8px); }
  60%  { transform: translateX(-5px); }
  80%  { transform: translateX(5px); }
  100% { transform: translateX(0); }
`;

// Card sliding into slot animation — repeats forever to nudge the user.
const slideKf = keyframes`
  0%   { transform: translateY(140px); opacity: 0.4; }
  35%  { transform: translateY(40px); opacity: 1; }
  85%  { transform: translateY(40px); opacity: 1; }
  100% { transform: translateY(0); opacity: 0.4; }
`;

function shakeWhen(rejected: string | null, id: string) {
  return (
    rejected === id &&
    css`
      animation: ${shakeKf} 350ms ease;
    `
  );
}

const COMBO_PRICE: Record<string, number> = {
  "7111691": 9800,
  "7111052": 9100,
  "1080013": 7100,
};

const STEPS = ["STEP 1", "STEP 2", "신용카드결제", "STEP 4"];

export function BurgerKingCardInsert({
  step,
  scenario,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const comboStep = scenario.steps.find((s) => s.id === "combo-select");
  const upsellStep = scenario.steps.find((s) => s.id === "upsell-popup");
  let comboId = comboStep?.correctChoiceId ?? "7111691";
  if (upsellStep?.correctChoiceId === "upgrade-to-set") comboId = "7111052";
  else if (upsellStep?.correctChoiceId === "cancel-keep-single")
    comboId = "1080013";
  const orderAmount = COMBO_PRICE[comboId] ?? 9800;

  // Simulate the card being read by the terminal: 3-second countdown then
  // auto-advance as if payment had been approved.
  const [remaining, setRemaining] = useState(3);
  useEffect(() => {
    const tick = window.setInterval(() => {
      setRemaining((r) => (r > 0 ? r - 1 : 0));
    }, 1000);
    const fire = window.setTimeout(() => {
      onChoice("insert-card");
    }, 3000);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(fire);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      css={css`
        flex: 1;
        display: flex;
        flex-direction: column;
        background: #ffffff;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
        min-height: 100%;
      `}
    >
      {/* Step indicator */}
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-bottom: 1px solid #e5e8eb;
        `}
      >
        {STEPS.map((label, idx) => {
          const isActive = idx === 2;
          return (
            <div
              key={label}
              css={css`
                padding: 12px 6px 10px;
                display: flex;
                flex-direction: column;
                gap: 4px;
                align-items: ${isActive ? "flex-start" : "center"};
                border-bottom: 2px solid
                  ${isActive ? "#d62300" : "transparent"};
              `}
            >
              <span
                css={css`
                  font-size: 11px;
                  font-weight: 700;
                  color: ${isActive ? "#2a1408" : "#8b95a1"};
                  letter-spacing: 0.04em;
                `}
              >
                STEP 0{idx + 1}
              </span>
              <span
                css={css`
                  font-size: 14px;
                  font-weight: ${isActive ? 800 : 600};
                  color: ${isActive ? "#2a1408" : "#8b95a1"};
                  visibility: ${isActive ? "visible" : "hidden"};
                `}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Title */}
      <div
        css={css`
          padding: 36px 16px 6px;
          text-align: center;
        `}
      >
        <span
          css={css`
            display: block;
            font-size: 26px;
            font-weight: 900;
            color: #d62300;
            line-height: 1.2;
          `}
        >
          신용카드를
        </span>
        <span
          css={css`
            display: block;
            font-size: 26px;
            font-weight: 900;
            color: #2a1408;
            line-height: 1.2;
          `}
        >
          투입구에 꽂아주세요
        </span>
        <span
          css={css`
            display: block;
            margin-top: 14px;
            font-size: 13px;
            color: #4e5968;
          `}
        >
          결제 오류 시 마그네틱을 아래로 향하게 긁어주세요
        </span>
        <span
          css={css`
            display: inline-block;
            margin-top: 12px;
            padding: 6px 12px;
            background: #fff5e6;
            color: #d62300;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 700;
          `}
        >
          {remaining > 0
            ? `${remaining}초 후 결제 완료된 것으로 가정하고 다음 화면으로 넘어가요`
            : "결제 완료! 다음 화면으로 이동합니다…"}
        </span>
      </div>

      {/* Card insertion graphic — tappable target */}
      <div
        css={css`
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
        `}
      >
        <button
          type="button"
          aria-label="신용카드를 투입구에 꽂기"
          onClick={() => onChoice("insert-card")}
          css={[
            css`
              position: relative;
              width: 220px;
              height: 240px;
              background: transparent;
              border: none;
              cursor: pointer;
              padding: 0;
              &:active {
                transform: scale(0.97);
              }
            `,
            shakeWhen(rejectedChoiceId, "insert-card"),
            idlePulse(idleHintActive, step.correctChoiceId === "insert-card"),
          ]}
        >
          {/* Card reader slot */}
          <div
            css={css`
              position: absolute;
              left: 50%;
              top: 24px;
              transform: translateX(-50%);
              width: 150px;
              height: 12px;
              background: #2a1408;
              border-radius: 3px;
              box-shadow: 0 4px 0 0 #4a2412;
            `}
          />
          {/* Animated card sliding into slot */}
          <div
            css={css`
              position: absolute;
              left: 50%;
              top: 24px;
              transform: translateX(-50%) translateY(40px);
              width: 130px;
              height: 200px;
              background: linear-gradient(180deg, #fafafa 0%, #ececec 100%);
              border-radius: 8px;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.18);
              animation: ${slideKf} 2.4s ease-in-out infinite;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            <span
              css={css`
                writing-mode: vertical-rl;
                font-size: 11px;
                color: #8b95a1;
                font-weight: 600;
                letter-spacing: 0.04em;
              `}
            >
              2367 9999 7933 4023
            </span>
          </div>
        </button>
      </div>

      {/* Total amount */}
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          padding: 18px 20px 22px;
          border-top: 1px solid #e5e8eb;
        `}
      >
        <span
          css={css`
            font-size: 17px;
            font-weight: 800;
            color: #2a1408;
          `}
        >
          총 결제금액
        </span>
        <span
          css={css`
            font-size: 22px;
            font-weight: 900;
            color: #d62300;
          `}
        >
          {orderAmount.toLocaleString("ko-KR")}원
        </span>
      </div>
    </div>
  );
}
