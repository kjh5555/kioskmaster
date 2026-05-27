import { css } from "@emotion/react";

import { KFC_IMAGE_BY_SLUG } from "./kfcMenuData";
import { idlePulse, type CustomLayoutProps } from "./types";
import { useDecoShake } from "./useDecoShake";

export function KfcSetUpsell({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const correctId = step.correctChoiceId;
  const setChoice = step.choices.find((c) => c.id === "set");
  const boxChoice = step.choices.find((c) => c.id === "box");
  const singleChoice = step.choices.find((c) => c.id === "single");
  const { shakeNow, shakeStyle } = useDecoShake();

  // Assume the scenario picked jinger upstream (default KFC goal).
  // If/when LLM-driven goal varies the burger, we can wire the previous
  // step's answer in. For now we render the canonical 징거 family.
  const burgerImg = KFC_IMAGE_BY_SLUG["jinger"];
  const setImg = KFC_IMAGE_BY_SLUG["jinger-set"];
  const boxImg = KFC_IMAGE_BY_SLUG["jinger-box"];

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        min-height: 100dvh;
        background: #ffffff;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
        display: flex;
        flex-direction: column;
      `}
    >
      {/* Top: burger photo + name + price ----------------------- */}
      <div
        css={css`
          display: grid;
          grid-template-columns: 130px 1fr;
          align-items: center;
          padding: 12px 14px;
          gap: 8px;
        `}
      >
        {burgerImg ? (
          <img
            src={burgerImg}
            alt="징거"
            style={{ width: "100%", aspectRatio: "1/1", objectFit: "contain" }}
          />
        ) : (
          <span style={{ fontSize: 60, textAlign: "center" }}>🍔</span>
        )}
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 4px;
            padding-right: 6px;
          `}
        >
          <div
            css={css`
              font-size: 17px;
              font-weight: 900;
              color: #2a1408;
              text-align: right;
              line-height: 1.2;
            `}
          >
            징거버거
          </div>
          <div
            css={css`
              font-size: 11px;
              font-weight: 700;
              color: #8b95a1;
              text-align: right;
              line-height: 1.3;
            `}
          >
            바삭한 닭다리살에 매콤한{"\n"}양념을 더한 KFC 시그니처 버거
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
            6,200
          </div>
        </div>
      </div>

      {/* Headline ----------------------------------------------- */}
      <div
        css={css`
          padding: 4px 18px 14px;
          font-size: 22px;
          font-weight: 900;
          color: #2a1408;
          letter-spacing: -0.02em;
          line-height: 1.25;
          position: relative;
          z-index: 2;
        `}
      >
        고객님
        <br />
        세트로 주문하시겠습니까?
      </div>

      {/* Set vs Box upgrade cards ------------------------------- */}
      <div
        css={css`
          padding: 0 14px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          position: relative;
          z-index: 2;
        `}
      >
        {setChoice && (
          <button
            type="button"
            onClick={() => onChoice(setChoice.id)}
            css={[
              upgradeCard,
              setChoice.id === rejectedChoiceId &&
                css`
                  border-color: #e4002b;
                `,
              idlePulse(idleHintActive, setChoice.id === correctId),
            ]}
          >
            <div css={upgradeImgBox}>
              {setImg ? (
                <img
                  src={setImg}
                  alt="징거세트"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              ) : (
                <span style={{ fontSize: 56 }}>🍟</span>
              )}
            </div>
            <div css={upgradeLabel}>
              징거세트
              <div css={upgradeSub}>(구:스쿨처플러스버거)</div>
            </div>
            <div css={upgradePrice}>9,300</div>
          </button>
        )}
        {boxChoice && (
          <button
            type="button"
            onClick={() => onChoice(boxChoice.id)}
            css={[
              upgradeCard,
              boxChoice.id === rejectedChoiceId &&
                css`
                  border-color: #e4002b;
                `,
              idlePulse(idleHintActive, boxChoice.id === correctId),
            ]}
          >
            <div css={upgradeImgBox}>
              {boxImg ? (
                <img
                  src={boxImg}
                  alt="징거박스"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              ) : (
                <span style={{ fontSize: 56 }}>📦</span>
              )}
            </div>
            <div css={upgradeLabel}>
              징거박스
              <div css={upgradeSub}>(구:스쿨처플러스버거)</div>
            </div>
            <div css={upgradePrice}>11,300</div>
          </button>
        )}
      </div>

      {/* Bottom pill buttons ------------------------------------ */}
      <div
        css={css`
          padding: 18px 14px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 2;
        `}
      >
        {singleChoice && (
          <button
            type="button"
            onClick={() => onChoice(singleChoice.id)}
            css={[
              singlePill,
              singleChoice.id === rejectedChoiceId &&
                css`
                  background: #e4002b;
                  color: #ffffff;
                `,
              idlePulse(idleHintActive, singleChoice.id === correctId),
            ]}
          >
            버거 단품만 주문하기
          </button>
        )}
        <button
          type="button"
          onClick={() => shakeNow("prev")}
          css={[prevPill, shakeStyle("prev")]}
        >
          이전
        </button>
      </div>

      {/* Footer ribbon: 주문서 / 전체취소 ------------------------ */}
      <div
        css={css`
          margin-top: auto;
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

const upgradeCard = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px 6px 12px;
  background: #ffffff;
  border: 1.5px solid #d1d5da;
  border-radius: 10px;
  cursor: pointer;
  font-family: inherit;
  :active {
    background: #f6f7f9;
  }
`;

const upgradeImgBox = css`
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const upgradeLabel = css`
  font-size: 13px;
  font-weight: 900;
  color: #2a1408;
  text-align: center;
  line-height: 1.2;
  word-break: keep-all;
`;

const upgradeSub = css`
  font-size: 10px;
  font-weight: 700;
  color: #8b95a1;
  padding-top: 2px;
`;

const upgradePrice = css`
  font-size: 20px;
  font-weight: 900;
  color: #2a1408;
`;

const singlePill = css`
  background: #f0a8b1;
  color: #4e5968;
  border: none;
  border-radius: 999px;
  padding: 12px 32px;
  font-size: 13px;
  font-weight: 900;
  font-family: inherit;
  cursor: pointer;
  line-height: 1.2;
  text-align: center;
  min-width: 200px;
  :active {
    filter: brightness(0.94);
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
  padding: 10px 64px;
  font-size: 13px;
  font-weight: 800;
  color: #2a1408;
  font-family: inherit;
  cursor: pointer;
  :active {
    background: #f6f7f9;
  }
`;
