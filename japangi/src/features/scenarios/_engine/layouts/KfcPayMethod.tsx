import { css, keyframes } from "@emotion/react";

import { idlePulse, type CustomLayoutProps } from "./types";

const popIn = keyframes`
  0%   { transform: scale(0.94); opacity: 0; }
  100% { transform: scale(1);    opacity: 1; }
`;

type EasyPay = { id: string; label: string; logo: React.ReactNode };

export function KfcPayMethod({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const correctId = step.correctChoiceId;
  const card = step.choices.find((c) => c.id === "card");
  const giftCard = step.choices.find((c) => c.id === "gift-card");
  const cancel = step.choices.find((c) => c.id === "cancel");

  const easyPays: EasyPay[] = [
    {
      id: "apple-pay",
      label: "Apple Pay",
      logo: (
        <div css={easyTile}>
           Pay
        </div>
      ),
    },
    {
      id: "kakao-pay",
      label: "카카오페이",
      logo: (
        <div css={[easyTile, css`background: #ffeb00; color: #2a1408;`]}>
          pay
        </div>
      ),
    },
    {
      id: "payco",
      label: "페이코",
      logo: (
        <div css={[easyTile, css`background: #ff2d2d; color: #ffffff;`]}>
          PAYCO
        </div>
      ),
    },
    {
      id: "ok-cashbag",
      label: "OK 캐쉬백",
      logo: (
        <div css={[easyTile, css`background: #ffd47e; color: #b34a00;`]}>
          OK
        </div>
      ),
    },
    {
      id: "bc-paybook",
      label: "BC 페이북 QR",
      logo: (
        <div css={[easyTile, css`background: #f2c0d2; color: #c1121f;`]}>
          페이북
        </div>
      ),
    },
    {
      id: "lpay",
      label: "엘페이",
      logo: (
        <div css={[easyTile, css`background: #4a3aff; color: #ffffff;`]}>
          L.pay
        </div>
      ),
    },
  ];

  return (
    <div
      css={css`
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.35);
        z-index: 9000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
      `}
    >
      <div
        css={css`
          width: 100%;
          max-width: 440px;
          max-height: 94vh;
          overflow-y: auto;
          background: #ffffff;
          border-radius: 14px;
          padding: 22px 18px 18px;
          animation: ${popIn} 220ms ease-out;
          display: flex;
          flex-direction: column;
          gap: 14px;
        `}
      >
        {/* Headline */}
        <div css={css`text-align: center;`}>
          <div
            css={css`
              font-size: 24px;
              font-weight: 900;
              color: #2a1408;
              letter-spacing: -0.03em;
              line-height: 1.2;
            `}
          >
            결제 수단을
            <br />
            선택해 주세요
          </div>
          <div
            css={css`
              font-size: 12px;
              font-weight: 700;
              color: #4e5968;
              padding-top: 6px;
            `}
          >
            현금 결제는 카운터에서 가능합니다.
          </div>
        </div>

        {/* Primary card buttons */}
        <div css={css`display: flex; flex-direction: column; gap: 10px;`}>
          {card && (
            <button
              type="button"
              onClick={() => onChoice(card.id)}
              css={[
                primaryBar,
                rejectedChoiceId === card.id &&
                  css`
                    filter: brightness(0.9);
                  `,
                idlePulse(idleHintActive, card.id === correctId),
              ]}
            >
              <span css={css`display: inline-flex; align-items: center; gap: 6px;`}>
                <span css={cardIcon}>💳</span>
                신용/체크카드
              </span>
              <span css={css`opacity: 0.7;`}>|</span>
              <span css={css`display: inline-flex; align-items: center; gap: 4px; font-style: italic;`}>
                <strong>SAMSUNG</strong> pay 삼성페이
              </span>
            </button>
          )}
          {giftCard && (
            <button
              type="button"
              onClick={() => onChoice(giftCard.id)}
              css={[primaryBar]}
            >
              <span css={cardIcon}>🎁</span>
              <span
                css={css`
                  font-family: "Georgia", serif;
                  font-style: italic;
                  letter-spacing: 0.02em;
                `}
              >
                <strong style={{ color: "#fff" }}>KFC</strong> 선불카드
              </span>
            </button>
          )}
        </div>

        {/* Easy pay grid */}
        <div>
          <div
            css={css`
              font-size: 13px;
              font-weight: 900;
              color: #2a1408;
              padding: 4px 2px 8px;
            `}
          >
            간편결제
          </div>
          <div
            css={css`
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 8px;
            `}
          >
            {easyPays.map((ep) => {
              const choice = step.choices.find((c) => c.id === ep.id);
              return (
                <button
                  key={ep.id}
                  type="button"
                  onClick={() => choice && onChoice(choice.id)}
                  css={easyCard}
                >
                  {ep.logo}
                  <span css={easyLabel}>{ep.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cancel */}
        {cancel && (
          <button
            type="button"
            onClick={() => onChoice(cancel.id)}
            css={cancelPill}
          >
            취소
          </button>
        )}
      </div>
    </div>
  );
}

const primaryBar = css`
  background: linear-gradient(90deg, #ff5a3c 0%, #ff2d2d 100%);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 14px 16px;
  font-size: 15px;
  font-weight: 900;
  font-family: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  :active {
    filter: brightness(0.92);
  }
`;

const cardIcon = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.18);
  padding: 4px 6px;
  border-radius: 4px;
`;

const easyCard = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px 6px;
  background: #ffffff;
  border: 1.5px solid #e5e8eb;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  :active {
    background: #f6f7f9;
  }
`;

const easyTile = css`
  width: 60px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1f25;
  color: #ffffff;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 900;
  font-family: "Helvetica", sans-serif;
`;

const easyLabel = css`
  font-size: 11px;
  font-weight: 800;
  color: #2a1408;
  text-align: center;
  word-break: keep-all;
`;

const cancelPill = css`
  background: #ffffff;
  border: 1.5px solid #d1d5da;
  border-radius: 999px;
  padding: 12px;
  font-size: 13px;
  font-weight: 800;
  color: #2a1408;
  font-family: inherit;
  cursor: pointer;
  :active {
    background: #f6f7f9;
  }
`;
