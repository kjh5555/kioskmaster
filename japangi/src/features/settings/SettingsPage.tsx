import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Top } from "@toss/tds-mobile";

import { BackButton } from "../../components/BackButton";
import { useFontSize } from "../../hooks/useFontSize";
import { useHighContrast } from "../../hooks/useHighContrast";
import { useTts } from "../../hooks/useTts";
import {
  FONT_SIZE_LABELS,
  FONT_SIZE_TOKENS,
  type FontSizeLevel,
} from "../../styles/tokens";

const LEVELS: FontSizeLevel[] = ["normal", "large", "xlarge"];

export function SettingsPage(): React.ReactElement {
  const { level, setLevel } = useFontSize();
  const { enabled: ttsEnabled, setEnabled: setTtsEnabled, available: ttsAvailable, speak } = useTts();
  const { enabled: hcEnabled, setEnabled: setHcEnabled } = useHighContrast();

  return (
    <div
      css={css`
        height: 100dvh;
        max-height: 100dvh;
        padding-top: env(safe-area-inset-top, 0px);
        padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 16px);
        display: flex;
        flex-direction: column;
        background: ${adaptive.background};
        overflow-y: auto;
        overflow-x: hidden;
        width: 100%;
        max-width: 100%;
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

      {/* ── 음성 안내 (TTS) ─────────────────────────────────────── */}
      <Top
        upperGap={32}
        title={<Top.TitleParagraph>음성 안내</Top.TitleParagraph>}
      />

      <div
        css={css`
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        `}
      >
        <button
          type="button"
          onClick={() => setTtsEnabled(!ttsEnabled)}
          disabled={!ttsAvailable}
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 20px;
            background-color: ${ttsEnabled
              ? adaptive.blue50
              : adaptive.greyBackground};
            border: 2px solid
              ${ttsEnabled ? adaptive.blue500 : "transparent"};
            border-radius: 20px;
            cursor: pointer;
            text-align: left;
            -webkit-tap-highlight-color: transparent;
            opacity: ${ttsAvailable ? 1 : 0.4};
            transition: all 0.12s ease;
            &:active {
              transform: scale(0.98);
            }
          `}
        >
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
                font-size: var(--font-button);
                font-weight: 700;
                color: ${ttsEnabled ? adaptive.blue700 : adaptive.grey900};
                line-height: 1.3;
              `}
            >
              🔊 안내 음성 자동 재생
            </span>
            <span
              css={css`
                font-size: var(--font-body);
                color: ${adaptive.grey600};
                line-height: 1.4;
              `}
            >
              {ttsAvailable
                ? "단계가 바뀔 때마다 안내를 읽어줘요."
                : "이 기기에서는 사용할 수 없어요."}
            </span>
          </div>
          <span
            css={css`
              flex-shrink: 0;
              width: 56px;
              height: 32px;
              border-radius: 999px;
              background-color: ${ttsEnabled
                ? adaptive.blue500
                : adaptive.grey300};
              position: relative;
              transition: background-color 0.18s ease;
            `}
          >
            <span
              css={css`
                position: absolute;
                top: 3px;
                left: ${ttsEnabled ? 26 : 3}px;
                width: 26px;
                height: 26px;
                border-radius: 50%;
                background: #ffffff;
                transition: left 0.18s ease;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
              `}
            />
          </span>
        </button>

        <button
          type="button"
          onClick={() => speak("안녕하세요. 자판기 어렵지않아요 음성 안내 예시입니다.")}
          disabled={!ttsAvailable}
          css={css`
            padding: 14px 16px;
            background-color: ${adaptive.greyBackground};
            border: 1px solid ${adaptive.grey300};
            border-radius: 14px;
            font-size: var(--font-body);
            font-weight: 700;
            color: ${adaptive.grey900};
            cursor: pointer;
            opacity: ${ttsAvailable ? 1 : 0.4};
            -webkit-tap-highlight-color: transparent;
            &:active {
              transform: scale(0.98);
            }
          `}
        >
          🔊 음성 들어보기
        </button>
      </div>

      {/* ── 고대비 모드 ─────────────────────────────────────────── */}
      <Top
        upperGap={32}
        title={<Top.TitleParagraph>고대비 모드</Top.TitleParagraph>}
      />

      <div
        css={css`
          padding: 0 20px;
        `}
      >
        <button
          type="button"
          onClick={() => setHcEnabled(!hcEnabled)}
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 20px;
            background-color: ${hcEnabled
              ? adaptive.blue50
              : adaptive.greyBackground};
            border: 2px solid
              ${hcEnabled ? adaptive.blue500 : "transparent"};
            border-radius: 20px;
            cursor: pointer;
            width: 100%;
            text-align: left;
            -webkit-tap-highlight-color: transparent;
            transition: all 0.12s ease;
            &:active {
              transform: scale(0.98);
            }
          `}
        >
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
                font-size: var(--font-button);
                font-weight: 700;
                color: ${hcEnabled ? adaptive.blue700 : adaptive.grey900};
                line-height: 1.3;
              `}
            >
              👀 글자 진하게 보기
            </span>
            <span
              css={css`
                font-size: var(--font-body);
                color: ${adaptive.grey600};
                line-height: 1.4;
              `}
            >
              눈이 잘 안 보이실 때 켜주세요. 글씨가 더 굵고 진해져요.
            </span>
          </div>
          <span
            css={css`
              flex-shrink: 0;
              width: 56px;
              height: 32px;
              border-radius: 999px;
              background-color: ${hcEnabled
                ? adaptive.blue500
                : adaptive.grey300};
              position: relative;
              transition: background-color 0.18s ease;
            `}
          >
            <span
              css={css`
                position: absolute;
                top: 3px;
                left: ${hcEnabled ? 26 : 3}px;
                width: 26px;
                height: 26px;
                border-radius: 50%;
                background: #ffffff;
                transition: left 0.18s ease;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
              `}
            />
          </span>
        </button>
      </div>
    </div>
  );
}
