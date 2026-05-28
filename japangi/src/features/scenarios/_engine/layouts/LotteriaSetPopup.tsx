import { css, keyframes } from "@emotion/react";

import { idlePulse, lookupCorrectLabel, type CustomLayoutProps } from "./types";
import { useDecoShake } from "./useDecoShake";

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

export function LotteriaSetPopup({
  step,
  scenario,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const burgerName =
    lookupCorrectLabel(scenario, "burger-choice") ?? "불고기버거";

  const setChoice = step.choices.find((c) => c.id === "set");
  const singleChoice = step.choices.find((c) => c.id === "single");
  const { shakeNow, shakeStyle } = useDecoShake();

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        min-height: 100%;
        background: #f3e9e1;
        background-image: repeating-linear-gradient(
            45deg,
            rgba(214, 35, 0, 0.04) 0px,
            rgba(214, 35, 0, 0.04) 2px,
            transparent 2px,
            transparent 24px
          ),
          repeating-linear-gradient(
            -45deg,
            rgba(0, 0, 0, 0.03) 0px,
            rgba(0, 0, 0, 0.03) 2px,
            transparent 2px,
            transparent 24px
          );
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
        display: flex;
        flex-direction: column;
      `}
    >
      {/* Dimmed menu silhouette (decorative — no functional menu rendered) */}
      <div
        css={css`
          flex: 1;
          opacity: 0.55;
          display: flex;
          flex-direction: column;
        `}
      >
        {/* Faux header with burger name + 영양성분 + lang */}
        <div
          css={css`
            background: linear-gradient(180deg, #d62300 0%, #b81f00 100%);
            color: #ffffff;
            padding: 14px 14px 18px;
          `}
        >
          <div
            css={css`
              display: flex;
              justify-content: flex-end;
              gap: 14px;
              font-size: 11px;
              font-weight: 700;
              padding-bottom: 8px;
            `}
          >
            <span>한국어</span>
            <span style={{ opacity: 0.7 }}>English</span>
            <span style={{ opacity: 0.7 }}>中国语</span>
            <span style={{ opacity: 0.7 }}>日本语</span>
          </div>
          <div
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              font-size: 22px;
              font-weight: 900;
              letter-spacing: -0.02em;
            `}
          >
            <span>{burgerName.replace(/\n/g, " ")}</span>
            <span
              css={css`
                background: rgba(0, 0, 0, 0.35);
                color: #ffd400;
                font-size: 11px;
                font-weight: 800;
                padding: 4px 8px;
                border-radius: 4px;
              `}
            >
              영양성분
            </span>
          </div>
        </div>

        {/* Faux tabs */}
        <div
          css={css`
            display: flex;
            justify-content: space-around;
            padding: 8px 4px;
            background: #ffffff;
            border-bottom: 2px solid #e5e8eb;
          `}
        >
          {["추천메뉴", "햄버거", "디저트/치킨", "음료/커피"].map((t) => (
            <span
              key={t}
              css={css`
                font-size: 13px;
                font-weight: ${t === "햄버거" ? 900 : 600};
                color: ${t === "햄버거" ? "#d62300" : "#4e5968"};
                padding: 4px 0;
              `}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Faux grid placeholder bars */}
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px;
            padding: 12px;
          `}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              css={css`
                height: 56px;
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.7);
                border: 1px solid #e5e8eb;
              `}
            />
          ))}
        </div>
      </div>

      {/* Modal overlay -------------------------------------------- */}
      <div
        css={css`
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.32);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        `}
      >
        <div
          css={css`
            position: relative;
            width: 100%;
            max-width: 380px;
            background: #ffffff;
            border-radius: 18px;
            padding: 22px 22px 26px;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
            animation: ${popIn} 220ms ease-out;
          `}
        >
          {/* Close X */}
          <button
            type="button"
            aria-label="닫기"
            onClick={() => shakeNow("close")}
            css={[css`
              position: absolute;
              top: 14px;
              right: 14px;
              width: 28px;
              height: 28px;
              border-radius: 50%;
              border: 1.5px solid #b0b8c1;
              background: #ffffff;
              color: #4e5968;
              font-size: 14px;
              font-weight: 900;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: inherit;
              :active {
                background: #f6f7f9;
              }
            `, shakeStyle("close")]}
          >
            ×
          </button>

          {/* Title */}
          <div
            css={css`
              text-align: center;
              font-size: 20px;
              font-weight: 900;
              color: #2a1408;
              letter-spacing: -0.02em;
              padding: 4px 32px 18px;
            `}
          >
            세트로 드시겠어요?
          </div>

          {/* Two options */}
          <div
            css={css`
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
            `}
          >
            {singleChoice && (
              <button
                key={singleChoice.id}
                type="button"
                onClick={() => onChoice(singleChoice.id)}
                css={[
                  optionBtn,
                  shakeWhen(rejectedChoiceId, singleChoice.id),
                  idlePulse(
                    idleHintActive,
                    singleChoice.id === step.correctChoiceId,
                  ),
                ]}
              >
                <SingleIcon />
                <span css={optionLabel}>버거만</span>
                <span css={optionPrice}>{singleChoice.sublabel ?? ""}</span>
              </button>
            )}
            {setChoice && (
              <button
                key={setChoice.id}
                type="button"
                onClick={() => onChoice(setChoice.id)}
                css={[
                  optionBtn,
                  shakeWhen(rejectedChoiceId, setChoice.id),
                  idlePulse(
                    idleHintActive,
                    setChoice.id === step.correctChoiceId,
                  ),
                ]}
              >
                <SetIcon />
                <span css={optionLabel}>세트</span>
                <span css={optionPrice}>{setChoice.sublabel ?? ""}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SingleIcon(): React.ReactElement {
  return (
    <svg width="56" height="46" viewBox="0 0 56 46" fill="none">
      {/* top bun */}
      <path
        d="M8 18 C8 8 48 8 48 18 L48 22 L8 22 Z"
        fill="#e9a96b"
        stroke="#7a4a1d"
        strokeWidth="1.5"
      />
      <circle cx="18" cy="14" r="1.6" fill="#fff8e1" />
      <circle cx="28" cy="12" r="1.6" fill="#fff8e1" />
      <circle cx="38" cy="14" r="1.6" fill="#fff8e1" />
      {/* lettuce */}
      <path
        d="M6 24 Q14 21 22 24 T38 24 T50 24 L50 28 L6 28 Z"
        fill="#7bc26b"
        stroke="#3f7a32"
        strokeWidth="1.2"
      />
      {/* patty */}
      <rect x="7" y="28" width="42" height="6" fill="#7c3a1b" stroke="#3d1a08" strokeWidth="1.2" />
      {/* bottom bun */}
      <path
        d="M8 34 L48 34 Q48 42 28 42 Q8 42 8 34 Z"
        fill="#e9a96b"
        stroke="#7a4a1d"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function SetIcon(): React.ReactElement {
  return (
    <svg width="64" height="46" viewBox="0 0 64 46" fill="none">
      {/* Burger (smaller) */}
      <g transform="translate(0,4)">
        <path
          d="M4 14 C4 6 28 6 28 14 L28 17 L4 17 Z"
          fill="#e9a96b"
          stroke="#7a4a1d"
          strokeWidth="1.2"
        />
        <circle cx="10" cy="11" r="1.2" fill="#fff8e1" />
        <circle cx="16" cy="9" r="1.2" fill="#fff8e1" />
        <circle cx="22" cy="11" r="1.2" fill="#fff8e1" />
        <path
          d="M3 18 Q9 16 14 18 T22 18 T30 18 L30 21 L3 21 Z"
          fill="#7bc26b"
        />
        <rect x="3" y="21" width="26" height="4" fill="#7c3a1b" />
        <path
          d="M4 25 L28 25 Q28 32 16 32 Q4 32 4 25 Z"
          fill="#e9a96b"
          stroke="#7a4a1d"
          strokeWidth="1.2"
        />
      </g>
      {/* Fries */}
      <g transform="translate(28,12)">
        <path d="M2 6 L18 6 L16 26 L4 26 Z" fill="#d62300" stroke="#7a1300" strokeWidth="1.2" />
        <rect x="4" y="0" width="2.4" height="10" fill="#ffd400" />
        <rect x="7" y="-2" width="2.4" height="12" fill="#ffd400" />
        <rect x="10" y="-1" width="2.4" height="11" fill="#ffd400" />
        <rect x="13" y="1" width="2.4" height="9" fill="#ffd400" />
      </g>
      {/* Drink cup */}
      <g transform="translate(46,8)">
        <path d="M2 4 L14 4 L13 28 L3 28 Z" fill="#4e5968" stroke="#1a1f25" strokeWidth="1.2" />
        <rect x="2" y="2" width="12" height="3" fill="#cad0d8" stroke="#1a1f25" strokeWidth="1" />
        <rect x="7" y="-3" width="1.5" height="8" fill="#ffffff" stroke="#1a1f25" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

const optionBtn = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 18px 8px 16px;
  background: #ffffff;
  border: 1.5px solid #e5e8eb;
  border-radius: 14px;
  cursor: pointer;
  font-family: inherit;
  :active {
    background: #f6f7f9;
  }
`;

const optionLabel = css`
  font-size: 16px;
  font-weight: 800;
  color: #2a1408;
  letter-spacing: -0.01em;
`;

const optionPrice = css`
  font-size: 18px;
  font-weight: 900;
  color: #d62300;
`;
