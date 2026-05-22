import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Top } from "@toss/tds-mobile";

import { BackButton } from "../../components/BackButton";
import { useFontSize } from "../../hooks/useFontSize";
import {
  FONT_SIZE_LABELS,
  FONT_SIZE_TOKENS,
  type FontSizeLevel,
} from "../../styles/tokens";

const LEVELS: FontSizeLevel[] = ["normal", "large", "xlarge"];

export function SettingsPage(): React.ReactElement {
  const { level, setLevel } = useFontSize();

  return (
    <div
      css={css`
        min-height: 100dvh;
        padding-top: calc(env(safe-area-inset-top, 0px) + 0px);
        padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 24px);
        display: flex;
        flex-direction: column;
        background: ${adaptive.background};
      `}
    >
      <div
        css={css`
          padding: 0 4px;
        `}
      >
        <BackButton />
      </div>

      <Top
        upperGap={0}
        title={<Top.TitleParagraph>글씨 크기</Top.TitleParagraph>}
      />

      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 0 20px;
        `}
      >
        {LEVELS.map((l) => {
          const isSelected = l === level;
          const tokens = FONT_SIZE_TOKENS[l];
          return (
            <button
              key={l}
              onClick={() => setLevel(l)}
              css={css`
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
                padding: 20px 20px;
                background-color: ${isSelected
                  ? adaptive.blue50
                  : adaptive.greyBackground};
                border: 2px solid
                  ${isSelected ? adaptive.blue500 : "transparent"};
                border-radius: 20px;
                cursor: pointer;
                text-align: left;
                -webkit-tap-highlight-color: transparent;
                transition:
                  transform 0.12s ease,
                  background-color 0.12s ease,
                  border-color 0.12s ease;
                &:active {
                  transform: scale(0.98);
                }
              `}
            >
              <span
                css={css`
                  font-size: ${tokens.button}px;
                  font-weight: 700;
                  color: ${isSelected ? adaptive.blue700 : adaptive.grey900};
                  line-height: 1.3;
                `}
              >
                {FONT_SIZE_LABELS[l]}
              </span>
              {isSelected && (
                <span
                  css={css`
                    flex-shrink: 0;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background-color: ${adaptive.blue500};
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    font-weight: 700;
                  `}
                >
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div
        css={css`
          margin: 32px 20px 0;
          padding: 20px;
          background-color: ${adaptive.greyBackground};
          border-radius: 16px;
        `}
      >
        <p
          css={css`
            margin: 0;
            font-size: var(--font-body);
            color: ${adaptive.grey700};
            line-height: 1.6;
          `}
        >
          이렇게 보입니다
        </p>
      </div>
    </div>
  );
}
