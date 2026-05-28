import { css, keyframes } from "@emotion/react";

import { idlePulse, type CustomLayoutProps } from "./types";

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

const popIn = keyframes`
  0%   { transform: scale(0.92); opacity: 0; }
  100% { transform: scale(1);    opacity: 1; }
`;

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

export function LotteriaReceiptPrompt({
  step,
  scenario,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const burgerSlug =
    scenario.steps.find((s) => s.id === "burger-choice")?.correctChoiceId ??
    "ria-bulgogi";
  const totalPaid = BURGER_SET_PRICE[burgerSlug] ?? 9800;

  const printChoice = step.choices.find((c) => c.id === "print-receipt");
  const skipChoice = step.choices.find((c) => c.id === "skip-receipt");
  const correctId = step.correctChoiceId;

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        min-height: 100%;
        background: #f3e9e1;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
        display: flex;
        flex-direction: column;
      `}
    >
      {/* Dim background — simplified pay totals strip */}
      <div
        css={css`
          background: #ffffff;
          padding: 12px 16px;
          opacity: 0.55;
          border-bottom: 1px solid #e5e8eb;
        `}
      >
        <div
          css={css`
            font-size: 13px;
            font-weight: 800;
            color: #2a1408;
            text-align: center;
          `}
        >
          결제완료 — 영수증 발행을 골라주세요
        </div>
      </div>

      {/* Modal overlay */}
      <div
        css={css`
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.32);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        `}
      >
        <div
          css={css`
            width: 100%;
            max-width: 420px;
            background: #ffffff;
            border-radius: 18px;
            padding: 22px 22px 18px;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
            animation: ${popIn} 220ms ease-out;
            display: flex;
            flex-direction: column;
            gap: 14px;
          `}
        >
          <div
            css={css`
              text-align: center;
              font-size: 18px;
              font-weight: 900;
              color: #2a1408;
              letter-spacing: -0.02em;
            `}
          >
            영수증을 발행 하시겠습니까?
          </div>

          {/* Illustration row + description */}
          <div
            css={css`
              display: grid;
              grid-template-columns: 70px 1fr;
              gap: 10px;
              align-items: center;
              background: #fafafa;
              border-radius: 10px;
              padding: 10px;
            `}
          >
            <ReceiptIcon />
            <div
              css={css`
                font-size: 13px;
                font-weight: 700;
                color: #2a1408;
                line-height: 1.4;
              `}
            >
              결제 영수증이 필요하신
              <br />
              고객께서는{" "}
              <span style={{ color: "#d62300", fontWeight: 900 }}>발행 버튼</span>
              을
              <br />
              눌러주세요.
              <div
                css={css`
                  display: inline-block;
                  margin-top: 6px;
                  background: #2a1408;
                  color: #ffffff;
                  font-size: 11px;
                  font-weight: 800;
                  padding: 3px 8px;
                  border-radius: 4px;
                `}
              >
                미발행 선택 시 대기번호만 출력
              </div>
            </div>
          </div>

          {/* Two big options */}
          <div
            css={css`
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
            `}
          >
            {printChoice && (
              <button
                key={printChoice.id}
                type="button"
                onClick={() => onChoice(printChoice.id)}
                css={[
                  optionBtn,
                  shakeWhen(rejectedChoiceId, printChoice.id),
                  idlePulse(idleHintActive, printChoice.id === correctId),
                ]}
              >
                영수증 발행
              </button>
            )}
            {skipChoice && (
              <button
                key={skipChoice.id}
                type="button"
                onClick={() => onChoice(skipChoice.id)}
                css={[
                  optionBtn,
                  css`
                    border-color: #d62300;
                  `,
                  shakeWhen(rejectedChoiceId, skipChoice.id),
                  idlePulse(idleHintActive, skipChoice.id === correctId),
                ]}
              >
                대기번호 발행
                <span
                  css={css`
                    font-size: 11px;
                    font-weight: 700;
                    color: #4e5968;
                  `}
                >
                  (영수증 미발행)
                </span>
              </button>
            )}
          </div>

          {/* Totals strip */}
          <div
            css={css`
              border-top: 1px solid #e5e8eb;
              padding-top: 8px;
              display: flex;
              flex-direction: column;
              gap: 4px;
              font-size: 12px;
            `}
          >
            <TotalRow label="결제할금액" value={0} />
            <TotalRow label="결제한금액" value={totalPaid} highlight />
            <div
              css={css`
                display: grid;
                grid-template-columns: 1fr 70px;
                font-size: 11px;
                color: #4e5968;
                font-weight: 700;
                padding-top: 2px;
              `}
            >
              <span>결제종류</span>
              <span style={{ textAlign: "right" }}>금액</span>
            </div>
            <div
              css={css`
                display: grid;
                grid-template-columns: 1fr 70px;
                font-size: 11px;
                color: #2a1408;
                font-weight: 800;
                padding-top: 2px;
                border-top: 1px dashed #d1d5da;
              `}
            >
              <span>신용카드/삼성페이</span>
              <span style={{ textAlign: "right" }}>{totalPaid.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReceiptIcon(): React.ReactElement {
  return (
    <svg width="56" height="60" viewBox="0 0 56 60" fill="none">
      <path
        d="M8 8 L48 8 L48 48 L42 44 L36 48 L30 44 L24 48 L18 44 L12 48 L8 44 Z"
        fill="#2a1408"
      />
      <rect x="14" y="16" width="28" height="3" fill="#ffffff" />
      <rect x="14" y="22" width="22" height="3" fill="#ffffff" />
      <rect x="14" y="28" width="26" height="3" fill="#ffffff" />
      <rect x="14" y="34" width="18" height="3" fill="#ffffff" />
    </svg>
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
          font-size: ${highlight ? 16 : 12}px;
          font-weight: 900;
          color: ${highlight ? "#d62300" : "#2a1408"};
        `}
      >
        {value.toLocaleString()}
      </span>
    </div>
  );
}

const optionBtn = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 22px 8px;
  background: #ffffff;
  border: 2px solid #cad0d8;
  border-radius: 14px;
  cursor: pointer;
  font-family: inherit;
  font-size: 16px;
  font-weight: 900;
  color: #2a1408;
  :active {
    background: #f6f7f9;
  }
`;
