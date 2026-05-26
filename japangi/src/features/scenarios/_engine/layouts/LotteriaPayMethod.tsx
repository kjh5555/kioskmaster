import { css, keyframes } from "@emotion/react";
import { useState } from "react";

import { idlePulse, lookupCorrectLabel, type CustomLayoutProps } from "./types";

const shakeKf = keyframes`
  0%   { transform: translateX(0); }
  20%  { transform: translateX(-8px); }
  40%  { transform: translateX(8px); }
  60%  { transform: translateX(-5px); }
  80%  { transform: translateX(5px); }
  100% { transform: translateX(0); }
`;

function shakeWhen(rejected: string | null, id: string) {
  return (
    rejected === id &&
    css`
      animation: ${shakeKf} 350ms ease;
    `
  );
}

// Burger set prices keyed by burger-choice slug. Used to render the order
// summary on the left side.
const BURGER_SET_PRICE: Record<string, number> = {
  "ria-bulgogi": 9800,
  "ria-shrimp": 9800,
  "classic-cheese": 10300,
  "classic-cheese-double": 12000,
  "hot-crispy-chicken": 10700,
  miracle: 10500,
  "miracle-double": 12000,
  "ria-shrimp-square-double": 10500,
};

const DINE_MODES = [
  { id: "takeout", label: "포장", sublabel: "(1회용기 제공)", icon: "🛍️" },
  { id: "dine-in", label: "매장", sublabel: "(포장용기 제공)", icon: "🍽️" },
];

const PROMOS = [
  { id: "app-barcode", label: "롯데잇츠APP\nONE바코드", icon: "🅛" },
  { id: "partner-discount", label: "제휴사\n할인", icon: "🟢" },
  { id: "lpoint", label: "잇츠마일/L.POINT\n적립/사용", icon: "Ⓜ️" },
  { id: "none", label: "선택없음\n/결제하기", icon: "⊘" },
];

const PAY_METHODS = [
  { id: "card", label: "신용/체크카드", icon: "💳" },
  { id: "mobile", label: "모바일\n/바코드\n/페이류(PAY)", icon: "📱" },
  { id: "lpay", label: "L.PAY", icon: "Ⓛ" },
  { id: "cash", label: "현금(후 결제)", icon: "💵" },
];

export function LotteriaPayMethod({
  step,
  scenario,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const [dineMode, setDineMode] = useState<string | null>(null);
  const [promo, setPromo] = useState<string | null>(null);
  const [payMethod, setPayMethod] = useState<string | null>(null);

  // Pull order summary from earlier scenario steps so prices/labels stay in
  // sync with whatever the user picked.
  const burgerLabel =
    lookupCorrectLabel(scenario, "burger-choice") ?? "불고기버거";
  const burgerSlug =
    scenario.steps.find((s) => s.id === "burger-choice")?.correctChoiceId ??
    "ria-bulgogi";
  const burgerPrice = BURGER_SET_PRICE[burgerSlug] ?? 9800;

  // 디저트 (sublabel was like "+500원" — strip and parse to integer for display).
  const sideStep = scenario.steps.find((s) => s.id === "side-select");
  const sideChoice = sideStep?.choices.find(
    (c) => c.id === sideStep.correctChoiceId,
  );
  const sideLabel = sideChoice?.label ?? "포테이토";
  const sideExtra = parsePrice(sideChoice?.sublabel ?? "0");

  // 음료는 기본값 코카콜라 0원으로 가정 (드링크는 별도 step.correctChoiceId가 없음)
  const drinkLabel = "코카콜라";
  const drinkExtra = 0;

  const totalDue = burgerPrice + sideExtra + drinkExtra;
  const correctId = step.correctChoiceId;

  // STEP 3 카드 클릭이 최종 advance trigger. STEP 1·2가 다 선택돼야 advance.
  function handlePayPick(id: string) {
    setPayMethod(id);
    if (dineMode != null && promo != null) {
      onChoice(id);
    }
  }

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        min-height: 100dvh;
        background: #f3e9e1;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
        display: flex;
        flex-direction: column;
      `}
    >
      {/* Top promo banner (butter bun upgrade) ---------------------- */}
      <div
        css={css`
          background: #ffffff;
          padding: 8px 14px;
          border-bottom: 1px solid #e5e8eb;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            gap: 12px;
            font-size: 11px;
            font-weight: 700;
            color: #4e5968;
            padding-bottom: 6px;
          `}
        >
          <span style={{ color: "#d62300" }}>한국어</span>
          <span>English</span>
          <span>中国语</span>
          <span>日本语</span>
        </div>
        <div
          css={css`
            border: 1.5px solid #d62300;
            border-radius: 10px;
            padding: 8px 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #fff7ee;
            gap: 8px;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 2px;
              flex: 1;
            `}
          >
            <span
              css={css`
                font-size: 11px;
                font-weight: 700;
                color: #4e5968;
              `}
            >
              은은한 버터 풍미에 부드럽고 촉촉한 식감의
            </span>
            <span
              css={css`
                font-size: 18px;
                font-weight: 900;
                color: #2a1408;
                letter-spacing: -0.02em;
              `}
            >
              수제스타일 버터번
            </span>
            <div
              css={css`
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 11px;
                font-weight: 700;
              `}
            >
              <span style={{ color: "#4e5968" }}>버터번으로 변경 시</span>
              <span
                css={css`
                  background: #d62300;
                  color: #ffffff;
                  padding: 2px 8px;
                  border-radius: 4px;
                  font-weight: 900;
                  font-size: 12px;
                `}
              >
                +500원
              </span>
            </div>
          </div>
          <span style={{ fontSize: 38 }}>🥯</span>
        </div>
      </div>

      {/* Main 2-column body --------------------------------------- */}
      <div
        css={css`
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 0;
          background: #ffffff;
          border-bottom: 1px solid #e5e8eb;
        `}
      >
        {/* Left — order summary */}
        <div
          css={css`
            display: flex;
            flex-direction: column;
            border-right: 1px solid #e5e8eb;
          `}
        >
          <div
            css={css`
              padding: 6px 10px 4px;
              font-size: 11px;
              font-weight: 800;
              color: #4e5968;
              display: grid;
              grid-template-columns: 1fr 28px 60px;
              gap: 4px;
              border-bottom: 1px solid #e5e8eb;
            `}
          >
            <span>메뉴</span>
            <span style={{ textAlign: "right" }}>수량</span>
            <span style={{ textAlign: "right" }}>금액</span>
          </div>
          <div
            css={css`
              flex: 1;
              padding: 4px 0;
              font-size: 11px;
              color: #2a1408;
            `}
          >
            <CartRow label={burgerLabel.replace(/\n/g, " ")} qty={1} price={burgerPrice} />
            <CartRow label={sideLabel} qty={1} price={sideExtra} />
            <CartRow label={drinkLabel} qty={1} price={drinkExtra} />
          </div>
          {/* Page dots */}
          <div
            css={css`
              display: flex;
              justify-content: center;
              gap: 6px;
              padding: 6px 0 8px;
            `}
          >
            <span
              css={css`
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: #d62300;
              `}
            />
            <span
              css={css`
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: #d1d5da;
              `}
            />
          </div>
          {/* Prev/next bar */}
          <div
            css={css`
              display: grid;
              grid-template-columns: 1fr 1fr;
              border-top: 1px solid #e5e8eb;
              font-size: 11px;
              font-weight: 800;
              color: #4e5968;
            `}
          >
            <button type="button" disabled css={navBtn}>
              이전
            </button>
            <button type="button" css={navBtn}>
              다음
            </button>
          </div>
          {/* Totals */}
          <div
            css={css`
              padding: 8px 10px;
              display: flex;
              flex-direction: column;
              gap: 4px;
              font-size: 12px;
              border-top: 1px solid #e5e8eb;
            `}
          >
            <TotalRow label="주문금액" value={totalDue} />
            <TotalRow label="할인금액" value={0} />
            <TotalRow label="결제할금액" value={totalDue} highlight />
            <TotalRow label="결제한금액" value={0} />
            <div
              css={css`
                display: grid;
                grid-template-columns: 1fr 60px;
                padding-top: 4px;
                border-top: 1px dashed #d1d5da;
                font-size: 11px;
                font-weight: 700;
                color: #4e5968;
              `}
            >
              <span>결제종류</span>
              <span style={{ textAlign: "right" }}>금액</span>
            </div>
          </div>
        </div>

        {/* Right — 3 STEPS */}
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding: 6px;
          `}
        >
          {/* STEP 1 */}
          <StepCard label="STEP 1" title="포장유형을 골라주세요">
            <div
              css={css`
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 6px;
              `}
            >
              {DINE_MODES.map((opt) => (
                <OptCell
                  key={opt.id}
                  selected={dineMode === opt.id}
                  shake={shakeWhen(rejectedChoiceId, opt.id)}
                  pulse={idlePulse(idleHintActive, dineMode == null && opt.id === "dine-in")}
                  onClick={() => setDineMode(opt.id)}
                >
                  <span style={{ fontSize: 28 }}>{opt.icon}</span>
                  <span css={cellLabel}>{opt.label}</span>
                  <span css={cellSub}>{opt.sublabel}</span>
                </OptCell>
              ))}
            </div>
          </StepCard>

          {/* STEP 2 */}
          <StepCard label="STEP 2" title="할인/적립을 골라주세요">
            <div
              css={css`
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 6px;
              `}
            >
              {PROMOS.map((opt) => (
                <OptCell
                  key={opt.id}
                  selected={promo === opt.id}
                  shake={shakeWhen(rejectedChoiceId, opt.id)}
                  pulse={idlePulse(
                    idleHintActive,
                    dineMode != null && promo == null && opt.id === "none",
                  )}
                  onClick={() => setPromo(opt.id)}
                  small
                >
                  <span style={{ fontSize: 22 }}>{opt.icon}</span>
                  <span css={[cellLabel, smallCellLabel]}>{opt.label}</span>
                </OptCell>
              ))}
            </div>
          </StepCard>

          {/* STEP 3 */}
          <StepCard label="STEP 3" title="결제를 선택하세요">
            <div
              css={css`
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 6px;
              `}
            >
              {PAY_METHODS.map((opt) => (
                <OptCell
                  key={opt.id}
                  selected={payMethod === opt.id}
                  shake={shakeWhen(rejectedChoiceId, opt.id)}
                  pulse={idlePulse(
                    idleHintActive,
                    promo != null && payMethod == null && opt.id === correctId,
                  )}
                  onClick={() => handlePayPick(opt.id)}
                  small
                >
                  <span style={{ fontSize: 22 }}>{opt.icon}</span>
                  <span css={[cellLabel, smallCellLabel]}>{opt.label}</span>
                </OptCell>
              ))}
            </div>
          </StepCard>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        css={css`
          background: #ffffff;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          padding: 12px 14px 16px;
          border-top: 1px solid #e5e8eb;
        `}
      >
        <button type="button" css={[footerBtn, footerCancel]}>
          결제취소
        </button>
        <button type="button" css={[footerBtn, footerAdd]}>
          추가주문
        </button>
      </div>
    </div>
  );
}

function CartRow({
  label,
  qty,
  price,
}: {
  label: string;
  qty: number;
  price: number;
}): React.ReactElement {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 1fr 28px 60px;
        padding: 3px 10px;
        gap: 4px;
        align-items: center;
      `}
    >
      <span
        css={css`
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 11px;
        `}
      >
        {label}
      </span>
      <span style={{ textAlign: "right", fontWeight: 800 }}>{qty}</span>
      <span style={{ textAlign: "right", fontWeight: 800 }}>
        {price.toLocaleString()}
      </span>
    </div>
  );
}

function TotalRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}): React.ReactElement {
  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 700;
        color: #2a1408;
      `}
    >
      <span style={{ fontSize: 11 }}>{label}</span>
      <span
        css={css`
          font-size: ${highlight ? 14 : 12}px;
          font-weight: 900;
          color: ${highlight ? "#d62300" : "#2a1408"};
        `}
      >
        {value.toLocaleString()}
      </span>
    </div>
  );
}

function StepCard({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div
      css={css`
        background: #fafafa;
        border-radius: 8px;
        padding: 6px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 800;
        `}
      >
        <span
          css={css`
            background: #d62300;
            color: #ffffff;
            padding: 2px 6px;
            border-radius: 4px;
            letter-spacing: 0.02em;
          `}
        >
          {label}
        </span>
        <span style={{ color: "#2a1408" }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function OptCell({
  selected,
  shake,
  pulse,
  onClick,
  children,
  small,
}: {
  selected: boolean;
  shake: ReturnType<typeof shakeWhen>;
  pulse: ReturnType<typeof idlePulse>;
  onClick: () => void;
  children: React.ReactNode;
  small?: boolean;
}): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      css={[
        css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          padding: ${small ? "6px 4px" : "8px 4px"};
          border-radius: 8px;
          border: 2px solid ${selected ? "#d62300" : "transparent"};
          background: ${selected ? "#fff3e0" : "#ffffff"};
          cursor: pointer;
          font-family: inherit;
          position: relative;
          :active {
            background: #f6f7f9;
          }
        `,
        shake || false,
        pulse || false,
      ]}
    >
      {selected && (
        <span
          css={css`
            position: absolute;
            top: 4px;
            right: 4px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #d62300;
            color: #ffffff;
            font-size: 11px;
            font-weight: 900;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          ✓
        </span>
      )}
      {children}
    </button>
  );
}

function parsePrice(s: string): number {
  // strips "+", "원", commas — returns numeric value.
  const m = s.replace(/[^0-9-]/g, "");
  return parseInt(m, 10) || 0;
}

const cellLabel = css`
  font-size: 11px;
  font-weight: 800;
  color: #2a1408;
  text-align: center;
  line-height: 1.2;
  white-space: pre-line;
  word-break: keep-all;
`;

const smallCellLabel = css`
  font-size: 10px;
`;

const cellSub = css`
  font-size: 9px;
  font-weight: 600;
  color: #4e5968;
  text-align: center;
`;

const navBtn = css`
  height: 24px;
  border: none;
  background: #ffffff;
  color: #4e5968;
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
  font-family: inherit;
  border-right: 1px solid #e5e8eb;
  :last-child {
    border-right: none;
  }
  :disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;

const footerBtn = css`
  height: 44px;
  border-radius: 8px;
  font-weight: 900;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  border: none;
  :active {
    filter: brightness(0.92);
  }
`;

const footerCancel = css`
  background: #ffffff;
  color: #2a1408;
  border: 1.5px solid #2a1408;
`;

const footerAdd = css`
  background: #ffd400;
  color: #2a1408;
`;
