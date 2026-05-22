import { css, keyframes } from "@emotion/react";

import type { CustomLayoutProps } from "./types";

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

export function McdonaldsSetSize({
  rejectedChoiceId,
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
      {/* ── A. Top header ── */}
      <div
        css={css`
          padding: 16px 16px 10px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
        `}
      >
        {/* M logo */}
        <span
          css={css`
            font-size: 28px;
            font-weight: 900;
            color: #ffc72c;
            line-height: 1;
            flex-shrink: 0;
          `}
        >
          M
        </span>

        {/* Center: title + price/kcal */}
        <div
          css={css`
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 6px;
          `}
        >
          <span
            css={css`
              font-size: 18px;
              font-weight: 700;
              color: #191f28;
              line-height: 1.2;
            `}
          >
            빅맥 - 보통 세트
          </span>
          <span
            css={css`
              font-size: 16px;
              font-weight: 700;
              color: #191f28;
            `}
          >
            ₩7,600&nbsp;&nbsp;674 Kcal
          </span>
        </div>

        {/* 영양정보 pill — decorative */}
        <button
          css={css`
            flex-shrink: 0;
            background: #ffffff;
            border: 1px solid #d1d6db;
            border-radius: 999px;
            font-size: 10px;
            color: #4e5968;
            padding: 4px 10px;
            cursor: default;
            white-space: nowrap;
          `}
          tabIndex={-1}
          onClick={(e) => e.preventDefault()}
        >
          영양정보
        </button>
      </div>

      {/* ── B. Main content row ── */}
      <div
        css={css`
          display: flex;
          flex: 1;
          min-height: 0;
        `}
      >
        {/* Left decorative stepper (~28%) */}
        <div
          css={css`
            width: 28%;
            padding: 12px 0 12px 12px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          `}
        >
          {/* Step 1: Active (current — set type selection) */}
          <div
            css={css`
              background: #fff8e1;
              border-radius: 10px;
              border-left: 3px solid #ffc72c;
              padding: 10px 10px;
              display: flex;
              align-items: flex-start;
              gap: 8px;
            `}
          >
            <div
              css={css`
                width: 18px;
                height: 18px;
                border-radius: 50%;
                border: 2px solid #ffc72c;
                background: transparent;
                flex-shrink: 0;
                margin-top: 1px;
              `}
            />
            <span
              css={css`
                font-size: 11px;
                font-weight: 700;
                color: #191f28;
                line-height: 1.4;
              `}
            >
              빅맥
              <br />
              세트 종류
            </span>
          </div>

          {/* Step 2: Future */}
          <div
            css={css`
              background: #f5f5f5;
              border-radius: 10px;
              padding: 10px 10px;
              display: flex;
              align-items: flex-start;
              gap: 8px;
            `}
          >
            <div
              css={css`
                width: 18px;
                height: 18px;
                border-radius: 50%;
                border: 2px solid #d1d6db;
                background: transparent;
                flex-shrink: 0;
                margin-top: 1px;
              `}
            />
            <span
              css={css`
                font-size: 11px;
                color: #8b95a1;
                line-height: 1.4;
              `}
            >
              세트메뉴
              <br />
              사이드를
              <br />
              선택하세요
            </span>
          </div>

          {/* Step 3: Future */}
          <div
            css={css`
              background: #f5f5f5;
              border-radius: 10px;
              padding: 10px 10px;
              display: flex;
              align-items: flex-start;
              gap: 8px;
            `}
          >
            <div
              css={css`
                width: 18px;
                height: 18px;
                border-radius: 50%;
                border: 2px solid #d1d6db;
                background: transparent;
                flex-shrink: 0;
                margin-top: 1px;
              `}
            />
            <span
              css={css`
                font-size: 11px;
                color: #8b95a1;
                line-height: 1.4;
              `}
            >
              세트메뉴
              <br />
              음료를
              <br />
              선택하세요
            </span>
          </div>

          {/* Step 4: Future */}
          <div
            css={css`
              background: #f5f5f5;
              border-radius: 10px;
              padding: 10px 10px;
              display: flex;
              align-items: flex-start;
              gap: 8px;
            `}
          >
            <div
              css={css`
                width: 18px;
                height: 18px;
                border-radius: 50%;
                border: 2px solid #d1d6db;
                background: transparent;
                flex-shrink: 0;
                margin-top: 1px;
              `}
            />
            <span
              css={css`
                font-size: 11px;
                color: #8b95a1;
                line-height: 1.4;
              `}
            >
              주문
              <br />
              확인하기
            </span>
          </div>
        </div>

        {/* Right cards area (~75%) */}
        <div
          css={css`
            flex: 1;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            padding: 12px 16px 12px 8px;
          `}
        >
          {/* Card 1: 보통 세트 (CORRECT) */}
          <button
            css={[
              css`
                background: #ffffff;
                border: 1.5px solid #d1d6db;
                border-radius: 14px;
                padding: 12px;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 8px;
                cursor: pointer;
                min-height: 160px;
                min-width: 0;
                text-align: left;
                overflow: hidden;

                &:active {
                  background: #f9f9f9;
                }
              `,
              shakeWhen(rejectedChoiceId, "regular"),
            ]}
            onClick={() => onChoice("regular")}
          >
            {/* Badge */}
            <span
              css={css`
                background: #ffc72c;
                color: #191f28;
                font-size: 11px;
                font-weight: 700;
                padding: 3px 10px;
                border-radius: 999px;
                line-height: 1.4;
              `}
            >
              맥런치
            </span>

            {/* Emoji illustration */}
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
                font-size: 30px;
                line-height: 1;
                width: 100%;
              `}
            >
              <span>🍔</span>
              <span>🥤</span>
              <span>🍟</span>
            </div>

            {/* Name */}
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 2px;
              `}
            >
              <span
                css={css`
                  font-size: 14px;
                  font-weight: 700;
                  color: #191f28;
                `}
              >
                빅맥
              </span>
              <span
                css={css`
                  font-size: 12px;
                  color: #191f28;
                `}
              >
                - 보통 세트
              </span>
            </div>

            {/* Price + kcal */}
            <span
              css={css`
                font-size: 13px;
                color: #191f28;
                margin-top: auto;
              `}
            >
              ₩7,600&nbsp;&nbsp;674 Kcal
            </span>
          </button>

          {/* Card 2: 라지세트 */}
          <button
            css={[
              css`
                background: #ffffff;
                border: 1.5px solid #d1d6db;
                border-radius: 14px;
                padding: 12px;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 8px;
                cursor: pointer;
                min-height: 160px;
                min-width: 0;
                text-align: left;
                overflow: hidden;

                &:active {
                  background: #f9f9f9;
                }
              `,
              shakeWhen(rejectedChoiceId, "large"),
            ]}
            onClick={() => onChoice("large")}
          >
            {/* Badge */}
            <span
              css={css`
                background: #ffc72c;
                color: #191f28;
                font-size: 11px;
                font-weight: 700;
                padding: 3px 10px;
                border-radius: 999px;
                line-height: 1.4;
              `}
            >
              맥런치
            </span>

            {/* Emoji illustration — slightly larger for "large" */}
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
                font-size: 34px;
                line-height: 1;
                width: 100%;
              `}
            >
              <span>🍔</span>
              <span>🥤</span>
              <span>🍟</span>
            </div>

            {/* Name */}
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 2px;
              `}
            >
              <span
                css={css`
                  font-size: 14px;
                  font-weight: 700;
                  color: #191f28;
                `}
              >
                빅맥
              </span>
              <span
                css={css`
                  font-size: 12px;
                  color: #191f28;
                `}
              >
                - 라지세트
              </span>
            </div>

            {/* Price + kcal */}
            <span
              css={css`
                font-size: 13px;
                color: #191f28;
                margin-top: auto;
              `}
            >
              ₩7,800&nbsp;&nbsp;674 Kcal
            </span>
          </button>
        </div>
      </div>

      {/* ── C. Bottom area ── */}
      <div
        css={css`
          padding: 0 16px 0;
          margin-top: auto;
        `}
      >
        {/* 취소 button */}
        <button
          css={[
            css`
              width: 100%;
              height: 46px;
              background: #ffffff;
              border: 1px solid #d1d6db;
              border-radius: 10px;
              font-size: 16px;
              font-weight: 500;
              color: #191f28;
              cursor: pointer;

              &:active {
                background: #f5f5f5;
              }
            `,
            shakeWhen(rejectedChoiceId, "cancel"),
          ]}
          onClick={() => onChoice("cancel")}
        >
          취소
        </button>

        {/* 처음으로 + 도움 기능 row */}
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-top: 10px;
          `}
        >
          <button
            css={[
              css`
                height: 40px;
                background: #ffffff;
                border: 1px solid #d1d6db;
                border-radius: 10px;
                font-size: 13px;
                color: #4e5968;
                cursor: pointer;

                &:active {
                  background: #f5f5f5;
                }
              `,
              shakeWhen(rejectedChoiceId, "home"),
            ]}
            onClick={() => onChoice("home")}
          >
            ↺ 처음으로
          </button>
          <button
            css={[
              css`
                height: 40px;
                background: #ffffff;
                border: 1px solid #d1d6db;
                border-radius: 10px;
                font-size: 13px;
                color: #4e5968;
                cursor: pointer;

                &:active {
                  background: #f5f5f5;
                }
              `,
              shakeWhen(rejectedChoiceId, "help"),
            ]}
            onClick={() => onChoice("help")}
          >
            ♿ 도움 기능
          </button>
        </div>

        {/* Caloric note */}
        <p
          css={css`
            margin: 8px 0 12px;
            font-size: 9px;
            color: #b0b8c1;
            text-align: center;
            line-height: 1.4;
          `}
        >
          1일 영양성분 기준치에 대한 비율(%)은 2,000 kcal 기준이므로 개인의 필요
          열량에 따라 다를 수 있습니다.
        </p>
      </div>
    </div>
  );
}
