import { css, keyframes } from "@emotion/react";

import { lookupMcdImage } from "./mcdonaldsImages";
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

export function McdonaldsUpsell({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        min-height: 100%;
        width: 100%;
        background: #ffffff;
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
      `}
    >
      {/* A. Top spacing */}
      <div
        css={css`
          height: 12vh;
          flex-shrink: 0;
        `}
      />

      {/* B. Headline */}
      <div
        css={css`
          text-align: center;
          padding: 0 20px;
          flex-shrink: 0;
        `}
      >
        <span
          css={css`
            font-size: 22px;
            font-weight: 700;
            color: #191f28;
          `}
        >
          함께 즐기면 더욱 좋습니다
        </span>
      </div>

      {/* C. 3 add-on cards */}
      <div
        css={css`
          display: flex;
          flex-direction: row;
          gap: 10px;
          padding: 16px 20px 0;
          flex-shrink: 0;
        `}
      >
        {/* Card 1: 스낵랩 */}
        <button
          css={[
            css`
              flex: 1;
              background: #ffffff;
              border: 1px solid #e5e8eb;
              border-radius: 12px;
              padding: 10px;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 6px;
              cursor: pointer;
              min-height: 140px;
              text-align: center;
              position: relative;

              &:active {
                background: #f9f9f9;
              }
            `,
            shakeWhen(rejectedChoiceId, "snack-wrap"),
            idlePulse(idleHintActive, step.correctChoiceId === "snack-wrap"),
          ]}
          onClick={() => onChoice("snack-wrap")}
        >
          <span
            css={css`
              position: absolute;
              top: 8px;
              left: 8px;
              background: #da291c;
              color: #ffffff;
              font-size: 10px;
              font-weight: 700;
              padding: 2px 8px;
              border-radius: 999px;
              line-height: 1.4;
            `}
          >
            해피스낵
          </span>
          {lookupMcdImage("snack-wrap") !== null ? (
            <img
              src={lookupMcdImage("snack-wrap") as string}
              alt="스낵랩"
              style={{
                width: 56,
                height: 56,
                objectFit: "contain",
                marginTop: 18,
              }}
            />
          ) : (
            <div
              css={css`
                font-size: 44px;
                line-height: 1;
                margin-top: 18px;
              `}
            >
              🌯
            </div>
          )}
          <span
            css={css`
              font-size: 12px;
              font-weight: 700;
              color: #191f28;
              line-height: 1.3;
            `}
          >
            스낵랩
          </span>
          <span
            css={css`
              font-size: 10px;
              color: #8b95a1;
            `}
          >
            ₩3,000&nbsp;&nbsp;370 Kcal
          </span>
        </button>

        {/* Card 2: 맥너겟 4조각 (no badge) */}
        <button
          css={[
            css`
              flex: 1;
              background: #ffffff;
              border: 1px solid #e5e8eb;
              border-radius: 12px;
              padding: 10px;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 6px;
              cursor: pointer;
              min-height: 140px;
              text-align: center;

              &:active {
                background: #f9f9f9;
              }
            `,
            shakeWhen(rejectedChoiceId, "mcnuggets"),
            idlePulse(idleHintActive, step.correctChoiceId === "mcnuggets"),
          ]}
          onClick={() => onChoice("mcnuggets")}
        >
          {lookupMcdImage("mcnuggets") !== null ? (
            <img
              src={lookupMcdImage("mcnuggets") as string}
              alt="맥너겟"
              style={{ width: 56, height: 56, objectFit: "contain" }}
            />
          ) : (
            <div
              css={css`
                font-size: 44px;
                line-height: 1;
              `}
            >
              🍗
            </div>
          )}
          <span
            css={css`
              font-size: 12px;
              font-weight: 700;
              color: #191f28;
              line-height: 1.3;
            `}
          >
            맥너겟 4조각
          </span>
          <span
            css={css`
              font-size: 10px;
              color: #8b95a1;
            `}
          >
            ₩3,000&nbsp;&nbsp;244 Kcal
          </span>
        </button>

        {/* Card 3: 아이스 드립 커피 (with badge + discount price) */}
        <button
          css={[
            css`
              flex: 1;
              background: #ffffff;
              border: 1px solid #e5e8eb;
              border-radius: 12px;
              padding: 10px;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 6px;
              cursor: pointer;
              min-height: 140px;
              text-align: center;
              position: relative;

              &:active {
                background: #f9f9f9;
              }
            `,
            shakeWhen(rejectedChoiceId, "ice-drip-discount"),
            idlePulse(idleHintActive, step.correctChoiceId === "ice-drip-discount"),
          ]}
          onClick={() => onChoice("ice-drip-discount")}
        >
          <span
            css={css`
              position: absolute;
              top: 8px;
              left: 8px;
              background: #da291c;
              color: #ffffff;
              font-size: 10px;
              font-weight: 700;
              padding: 2px 8px;
              border-radius: 999px;
              line-height: 1.4;
            `}
          >
            해피스낵
          </span>
          {lookupMcdImage("ice-drip-discount") !== null ? (
            <img
              src={lookupMcdImage("ice-drip-discount") as string}
              alt="아이스 드립 커피"
              style={{
                width: 56,
                height: 56,
                objectFit: "contain",
                marginTop: 18,
              }}
            />
          ) : (
            <div
              css={css`
                font-size: 44px;
                line-height: 1;
                margin-top: 18px;
              `}
            >
              ☕
            </div>
          )}
          <span
            css={css`
              font-size: 12px;
              font-weight: 700;
              color: #191f28;
              line-height: 1.3;
            `}
          >
            아이스 드립 커피
          </span>
          <span
            css={css`
              font-size: 10px;
              color: #8b95a1;
            `}
          >
            <span
              css={css`
                text-decoration: line-through;
              `}
            >
              ₩2,000
            </span>
            {" → "}
            <span
              css={css`
                color: #191f28;
                font-weight: 700;
              `}
            >
              ₩1,000
            </span>
            &nbsp;&nbsp;10 Kcal
          </span>
        </button>
      </div>

      {/* D. Spacer — flex grow to push CTA toward bottom */}
      <div
        css={css`
          flex: 1;
          min-height: 24px;
        `}
      />

      {/* E. 선택안함 CTA button */}
      <div
        css={css`
          padding: 0 20px 24px;
          flex-shrink: 0;
        `}
      >
        <button
          css={[
            css`
              width: 100%;
              height: 52px;
              background: #ffffff;
              border: 1.5px solid #d1d6db;
              border-radius: 10px;
              font-size: 16px;
              color: #191f28;
              cursor: pointer;

              &:active {
                background: #f5f5f5;
              }
            `,
            shakeWhen(rejectedChoiceId, "skip"),
            idlePulse(idleHintActive, step.correctChoiceId === "skip"),
          ]}
          onClick={() => onChoice("skip")}
        >
          선택안함
        </button>
      </div>
    </div>
  );
}
