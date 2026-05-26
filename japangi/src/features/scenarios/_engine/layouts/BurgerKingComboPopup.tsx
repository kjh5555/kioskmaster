import { css, keyframes } from "@emotion/react";
import { useState } from "react";

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

const CDN = "https://mob-prd.burgerking.co.kr/images/menu/web/main";

interface ComboOption {
  id: string;
  name: string;
  components: string;
  price: string;
  imageUrl: string;
}

const COMBO_OPTIONS: ReadonlyArray<ComboOption> = [
  {
    id: "7111691",
    name: "와퍼 라지세트",
    components: "와퍼 + 프렌치프라이(L) + 콜라(L)",
    price: "9,800원",
    imageUrl: `${CDN}/2025/01/06/c8784db1-69ae-4a4a-b655-aebd88ef98f4.png`,
  },
  {
    id: "7111052",
    name: "와퍼 세트",
    components: "와퍼 + 프렌치프라이(R) + 콜라(R)",
    price: "9,100원",
    imageUrl: `${CDN}/2025/01/06/ff0da2b6-ec36-4f37-ad92-c39eeb0eeec3.png`,
  },
  {
    id: "1080013",
    name: "와퍼",
    components: "단품",
    price: "7,100원",
    imageUrl: `${CDN}/2025/01/06/c9811022-3678-4988-9fa4-1d3fc6a69bf5.png`,
  },
];

export function BurgerKingComboPopup({
  step,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  // Local selection — only the confirm tap commits.
  const [selected, setSelected] = useState<string>(step.correctChoiceId);

  return (
    <div
      css={css`
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.35);
        padding: 16px;
        min-height: calc(100dvh - 80px);
      `}
    >
      <div
        css={css`
          background: #ffffff;
          border-radius: 18px;
          width: 100%;
          max-width: 420px;
          padding: 18px 18px 14px;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 14px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
        `}
      >
        {/* X close button */}
        <button
          aria-label="닫기"
          onClick={() => onChoice("close")}
          css={[
            css`
              position: absolute;
              top: 10px;
              right: 14px;
              width: 32px;
              height: 32px;
              border: none;
              background: transparent;
              font-size: 22px;
              color: #2a1408;
              cursor: pointer;
              border-radius: 50%;
              &:active {
                background: #f0f0f0;
              }
            `,
            shakeWhen(rejectedChoiceId, "close"),
          ]}
        >
          ✕
        </button>

        {/* Title */}
        <div
          css={css`
            text-align: center;
            font-size: 17px;
            font-weight: 800;
            color: #2a1408;
            line-height: 1.35;
            padding: 6px 20px 0;
          `}
        >
          원하시는 구성을 선택해주세요
        </div>

        {/* Options */}
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 6px 4px;
          `}
        >
          {COMBO_OPTIONS.map((opt) => {
            const isSelected = selected === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelected(opt.id)}
                css={css`
                  display: grid;
                  grid-template-columns: 32px 1fr 80px;
                  align-items: center;
                  gap: 12px;
                  padding: 10px 4px;
                  background: ${isSelected ? "#fff5e6" : "#ffffff"};
                  border: 1.5px solid ${isSelected ? "#e07a1a" : "transparent"};
                  border-radius: 12px;
                  cursor: pointer;
                  text-align: left;
                  font-family: inherit;
                  transition: background 100ms ease, border-color 100ms ease;
                  &:active {
                    background: #fff5e6;
                  }
                `}
              >
                {/* Checkbox */}
                <div
                  css={css`
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    border: 2px solid ${isSelected ? "#e07a1a" : "#d1d6db"};
                    background: ${isSelected ? "#e07a1a" : "#ffffff"};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: 4px;
                  `}
                >
                  {isSelected && (
                    <span
                      css={css`
                        color: #ffffff;
                        font-size: 14px;
                        font-weight: 900;
                        line-height: 1;
                      `}
                    >
                      ✓
                    </span>
                  )}
                </div>

                {/* Name + components + price */}
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    min-width: 0;
                  `}
                >
                  <span
                    css={css`
                      font-size: 16px;
                      font-weight: 800;
                      color: #2a1408;
                    `}
                  >
                    {opt.name}
                  </span>
                  <span
                    css={css`
                      font-size: 11px;
                      color: #8b95a1;
                      line-height: 1.3;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    `}
                  >
                    {opt.components}
                  </span>
                  <span
                    css={css`
                      font-size: 18px;
                      font-weight: 900;
                      color: #d62300;
                      line-height: 1;
                    `}
                  >
                    {opt.price}
                  </span>
                </div>

                {/* Image */}
                <img
                  src={opt.imageUrl}
                  alt={opt.name}
                  style={{
                    width: 72,
                    height: 64,
                    objectFit: "contain",
                    justifySelf: "end",
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Confirm button */}
        <button
          type="button"
          onClick={() => onChoice(selected)}
          css={[
            css`
              width: 100%;
              height: 52px;
              background: #d62300;
              color: #ffffff;
              border: none;
              border-radius: 999px;
              font-size: 16px;
              font-weight: 800;
              cursor: pointer;
              margin-top: 4px;
              &:active {
                background: #a91a00;
              }
            `,
            shakeWhen(rejectedChoiceId, selected),
            idlePulse(idleHintActive, selected === step.correctChoiceId),
          ]}
        >
          확인
        </button>
      </div>
    </div>
  );
}
