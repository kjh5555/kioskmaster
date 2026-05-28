import { css } from "@emotion/react";

import { KFC_IMAGE_BY_SLUG } from "./kfcMenuData";
import { idlePulse, type CustomLayoutProps } from "./types";
import { useDecoShake } from "./useDecoShake";

export function KfcSetCustomize({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const correctId = step.correctChoiceId;
  const noAdd = step.choices.find((c) => c.id === "no-add");
  const sideChange = step.choices.find((c) => c.id === "side-change");
  const drinkChange = step.choices.find((c) => c.id === "drink-change");
  const nextChoice = step.choices.find((c) => c.id === "next");
  const prevChoice = step.choices.find((c) => c.id === "prev");
  const { shakeNow, shakeStyle } = useDecoShake();

  const setImg = KFC_IMAGE_BY_SLUG["jinger-set"];
  const friesImg = KFC_IMAGE_BY_SLUG["french-fries-m"];
  const cokeImg = KFC_IMAGE_BY_SLUG["coke-m"];

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        min-height: 100%;
        background: #ffffff;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
        display: flex;
        flex-direction: column;
      `}
    >
      {/* Top: set photo + title + price */}
      <div
        css={css`
          display: grid;
          grid-template-columns: 130px 1fr;
          align-items: center;
          padding: 12px 14px;
          gap: 8px;
        `}
      >
        {setImg ? (
          <img
            src={setImg}
            alt="징거세트"
            style={{ width: "100%", aspectRatio: "1/1", objectFit: "contain" }}
          />
        ) : (
          <span style={{ fontSize: 60, textAlign: "center" }}>🍔</span>
        )}
        <div css={css`display:flex; flex-direction: column; align-items: flex-end; gap: 4px;`}>
          <div
            css={css`
              font-size: 14px;
              font-weight: 900;
              color: #2a1408;
              text-align: right;
              line-height: 1.2;
            `}
          >
            징거세트
            <div css={css`font-size: 11px; color: #8b95a1; font-weight: 700; padding-top: 2px;`}>
              (구:스쿨처플러스버거)
            </div>
          </div>
          <div
            css={css`
              font-size: 28px;
              font-weight: 900;
              color: #2a1408;
              letter-spacing: -0.02em;
              padding-top: 2px;
            `}
          >
            9,300
          </div>
        </div>
      </div>

      {/* Headline */}
      <div
        css={css`
          padding: 30px 18px 16px;
          font-size: 17px;
          font-weight: 900;
          color: #2a1408;
          letter-spacing: -0.02em;
          line-height: 1.35;
          position: relative;
          z-index: 2;
        `}
      >
        더욱 풍성하게 즐기세요!
        <br />
        원하시는 구성을 선택해주세요.
      </div>

      {/* 3 option cards */}
      <div
        css={css`
          padding: 0 14px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 8px;
          position: relative;
          z-index: 2;
        `}
      >
        {/* 추가 없음 */}
        {noAdd && (
          <OptionCard
            label="추가 없음"
            actionLabel="추가"
            imgEl={
              <div
                css={css`
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 4px;
                  font-size: 32px;
                `}
              >
                🧀🥓
              </div>
            }
            onClick={() => onChoice(noAdd.id)}
            highlight={idleHintActive && noAdd.id === correctId}
            rejected={rejectedChoiceId === noAdd.id}
          />
        )}
        {/* 사이드 변경 */}
        {sideChange && (
          <OptionCard
            label="프렌치프라이(M)"
            actionLabel="사이드 변경"
            imgEl={
              friesImg ? (
                <img src={friesImg} alt="프렌치프라이" style={imgFit} />
              ) : (
                <span style={{ fontSize: 32 }}>🍟</span>
              )
            }
            onClick={() => onChoice(sideChange.id)}
            highlight={idleHintActive && sideChange.id === correctId}
            rejected={rejectedChoiceId === sideChange.id}
          />
        )}
        {/* 음료 변경 */}
        {drinkChange && (
          <OptionCard
            label="콜라M"
            actionLabel="음료 변경"
            imgEl={
              cokeImg ? (
                <img src={cokeImg} alt="콜라M" style={imgFit} />
              ) : (
                <span style={{ fontSize: 32 }}>🥤</span>
              )
            }
            onClick={() => onChoice(drinkChange.id)}
            highlight={idleHintActive && drinkChange.id === correctId}
            rejected={rejectedChoiceId === drinkChange.id}
          />
        )}
      </div>

      {/* Bottom: 이전 / 다음 */}
      <div
        css={css`
          margin-top: auto;
          padding: 22px 14px 12px;
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 10px;
          position: relative;
          z-index: 2;
        `}
      >
        <button
          type="button"
          onClick={() => prevChoice && onChoice(prevChoice.id)}
          css={prevPill}
        >
          이전
        </button>
        <button
          type="button"
          onClick={() => nextChoice && onChoice(nextChoice.id)}
          css={[
            nextPill,
            idlePulse(idleHintActive, nextChoice?.id === correctId),
          ]}
        >
          다음
        </button>
      </div>

      {/* Footer ribbon */}
      <div
        css={css`
          background: #ededed;
          padding: 8px 14px 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12px;
          font-weight: 800;
          color: #2a1408;
        `}
      >
        <button type="button" onClick={() => shakeNow("order-doc")} css={[footerLink, shakeStyle("order-doc")]}>
          📋 주문서
        </button>
        <span css={css`flex: 1;`} />
        <button type="button" onClick={() => shakeNow("cancel-all")} css={[footerLink, css`color: #8b95a1;`, shakeStyle("cancel-all")]}>
          전체취소
        </button>
      </div>
    </div>
  );
}

function OptionCard({
  label,
  actionLabel,
  imgEl,
  onClick,
  highlight,
  rejected,
}: {
  label: string;
  actionLabel: string;
  imgEl: React.ReactNode;
  onClick: () => void;
  highlight: boolean;
  rejected: boolean;
}) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
      `}
    >
      <div
        css={css`
          width: 100%;
          aspect-ratio: 1 / 0.75;
          background: #f2f3f4;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
        `}
      >
        {imgEl}
      </div>
      <div
        css={css`
          font-size: 11px;
          font-weight: 800;
          color: #2a1408;
          text-align: center;
          line-height: 1.2;
        `}
      >
        {label}
      </div>
      <button
        type="button"
        onClick={onClick}
        css={[
          actionPill,
          highlight && actionPillHighlight,
          rejected &&
            css`
              filter: brightness(0.85);
            `,
        ]}
      >
        {actionLabel}
      </button>
    </div>
  );
}

const imgFit: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
};

const actionPill = css`
  background: #e4002b;
  color: #ffffff;
  border: none;
  border-radius: 999px;
  font-family: inherit;
  font-size: 11px;
  font-weight: 900;
  padding: 6px 12px;
  cursor: pointer;
  min-width: 88px;
  :active {
    filter: brightness(0.92);
  }
`;

const actionPillHighlight = css`
  box-shadow: 0 0 0 4px rgba(228, 0, 43, 0.35);
  animation: kfcPulseRed 1.2s ease-in-out infinite;
  @keyframes kfcPulseRed {
    0%, 100% { box-shadow: 0 0 0 4px rgba(228, 0, 43, 0.35); }
    50%      { box-shadow: 0 0 0 8px rgba(228, 0, 43, 0.15); }
  }
`;

const footerLink = css`
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: 12px;
  font-weight: 800;
  color: #2a1408;
  cursor: pointer;
  padding: 2px 4px;
  :active {
    filter: brightness(0.85);
  }
`;

const prevPill = css`
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

const nextPill = css`
  background: #e4002b;
  color: #ffffff;
  border: none;
  border-radius: 999px;
  padding: 12px;
  font-size: 13px;
  font-weight: 900;
  font-family: inherit;
  cursor: pointer;
  :active {
    filter: brightness(0.92);
  }
`;
