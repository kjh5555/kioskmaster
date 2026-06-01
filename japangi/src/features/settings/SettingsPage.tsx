import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Top } from "@toss/tds-mobile";

import { useNavigate } from "react-router-dom";

import { BackButton } from "../../components/BackButton";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useFontSize } from "../../hooks/useFontSize";
import { useUserStats } from "../../hooks/useKioskQueries";
import { useHighContrast } from "../../hooks/useHighContrast";
import { useTts } from "../../hooks/useTts";
import {
  FONT_SIZE_LABELS,
  FONT_SIZE_TOKENS,
  type FontSizeLevel,
} from "../../styles/tokens";

const LEVELS: FontSizeLevel[] = ["normal", "large", "xlarge"];

// PRD N9: 보호자 모드 토글 스타일. 토글이 v2까지 가려져 있어 함수도 함께 보류.
// 토글 복원 시 같이 복원.
// function roleBtn(active: boolean) {
//   return css`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     gap: 6px;
//     padding: 16px 10px;
//     background: ${active ? adaptive.blue50 : adaptive.greyBackground};
//     border: 2px solid ${active ? adaptive.blue500 : "transparent"};
//     border-radius: 16px;
//     font-size: var(--font-body);
//     font-weight: 800;
//     color: ${active ? adaptive.blue700 : adaptive.grey900};
//     cursor: pointer;
//     font-family: inherit;
//     -webkit-tap-highlight-color: transparent;
//     :active {
//       transform: scale(0.98);
//     }
//   `;
// }

export function SettingsPage(): React.ReactElement {
  const { level, setLevel } = useFontSize();
  const { enabled: ttsEnabled, setEnabled: setTtsEnabled, available: ttsAvailable, speak } = useTts();
  const { enabled: hcEnabled, setEnabled: setHcEnabled } = useHighContrast();
  // PRD N9: 보호자 토글 가림에 따라 role/setRole 은 사용하지 않는다.
  // externalId 만 통계 조회용으로 사용. 토글 복원 시 role/setRole 도 다시 분해.
  const { externalId } = useCurrentUser();
  const { data: stats } = useUserStats(externalId);
  const navigate = useNavigate();

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
        overflow: hidden;
        width: 100%;
        max-width: 100%;
      `}
    >
      <div
        css={css`
          padding: 0 4px;
        `}
      >
        {/* 노인 멘탈모델: "설정을 닫으면 홈". history 누적과 무관하게 항상 / 로. */}
        <BackButton to="/" />
      </div>

      {/*
        Inner scroll wrapper — outer는 viewport 에 고정, 콘텐츠가 길면
        여기서만 스크롤 (HomePage / MasterPage 등 다른 페이지와 동일한
        패턴: outer overflow:hidden + inner overflow-y:auto).
      */}
      <div
        css={css`
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
        `}
      >
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

      {/* 글씨 크기 미리보기 — 실제 시나리오에서 보일 3가지 타이포(헤더/버튼/
          본문)를 함께 보여줘 노인 사용자가 선택의 차이를 즉시 체감하도록.
          --font-* CSS 변수는 useFontSize 가 root 에 주입한다. */}
      <div
        css={css`
          margin: 24px 20px 0;
          padding: 20px;
          background-color: ${adaptive.greyBackground};
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        `}
      >
        <span
          css={css`
            font-size: 12px;
            font-weight: 800;
            color: ${adaptive.grey600};
            letter-spacing: 0.02em;
          `}
        >
          이렇게 보입니다
        </span>

        <span
          css={css`
            font-size: var(--font-header);
            font-weight: 900;
            color: ${adaptive.grey900};
            line-height: 1.25;
          `}
        >
          오늘 무엇을 연습할까요?
        </span>

        <span
          css={css`
            display: inline-block;
            align-self: flex-start;
            padding: 12px 18px;
            border-radius: 14px;
            background: ${adaptive.blue500};
            color: #ffffff;
            font-size: var(--font-button);
            font-weight: 800;
          `}
        >
          주문 시작하기
        </span>

        <span
          css={css`
            font-size: var(--font-body);
            color: ${adaptive.grey700};
            line-height: 1.6;
          `}
        >
          실수해도 괜찮아요. 천천히 따라해보세요.
        </span>
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

      {/* ── 의견 보내기 ─────────────────────────────────────────── */}
      <Top
        upperGap={32}
        title={<Top.TitleParagraph>의견 보내기</Top.TitleParagraph>}
      />

      <div css={css`padding: 0 20px;`}>
        <button
          type="button"
          onClick={() => navigate("/feedback")}
          css={css`
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;
            padding: 18px 18px;
            border: 1.5px solid ${adaptive.grey200};
            border-radius: 16px;
            background: #ffffff;
            cursor: pointer;
            font-family: inherit;
            text-align: left;
            -webkit-tap-highlight-color: transparent;
            :active {
              background: ${adaptive.grey100};
            }
          `}
        >
          <span style={{ fontSize: 28 }}>💬</span>
          <div
            css={css`
              flex: 1;
              display: flex;
              flex-direction: column;
              gap: 2px;
            `}
          >
            <span
              css={css`
                font-size: var(--font-button);
                font-weight: 800;
                color: ${adaptive.grey900};
              `}
            >
              불편한 점·바라는 기능 보내기
            </span>
            <span
              css={css`
                font-size: var(--font-body);
                color: ${adaptive.grey600};
                line-height: 1.4;
              `}
            >
              버그·기능 요청·칭찬 모두 환영해요.
            </span>
          </div>
          <span style={{ fontSize: 22, color: adaptive.grey400 }}>›</span>
        </button>
      </div>

      {/* ── 연습 통계 둘러보기 ─────────────────────────────────────── */}
      <Top
        upperGap={32}
        title={<Top.TitleParagraph>지금까지 연습</Top.TitleParagraph>}
      />

      <div
        css={css`
          padding: 0 20px;
        `}
      >
        {stats && stats.total_attempts > 0 ? (
          <div
            css={css`
              padding: 18px 20px;
              background: ${adaptive.blue50};
              border: 1.5px solid ${adaptive.blue200};
              border-radius: 16px;
              display: flex;
              flex-direction: column;
              gap: 10px;
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
              `}
            >
              <span
                css={css`
                  font-size: var(--font-button);
                  font-weight: 900;
                  color: ${adaptive.blue700};
                  line-height: 1.3;
                `}
              >
                이번 주 {stats.this_week_count}번 연습하셨어요
              </span>
              <span style={{ fontSize: 32 }}>👍</span>
            </div>
            <span
              css={css`
                font-size: var(--font-body);
                color: ${adaptive.grey700};
                line-height: 1.5;
              `}
            >
              지금까지 모두 {stats.total_attempts}번 연습하셨고,
              {" "}{stats.total_success}번 끝까지 잘 마치셨어요.
            </span>
          </div>
        ) : (
          <div
            css={css`
              padding: 18px 20px;
              background: ${adaptive.greyBackground};
              border-radius: 16px;
              display: flex;
              align-items: center;
              gap: 12px;
            `}
          >
            <span style={{ fontSize: 28 }}>🌱</span>
            <span
              css={css`
                font-size: var(--font-body);
                color: ${adaptive.grey700};
                line-height: 1.5;
              `}
            >
              아직 연습 기록이 없어요. 홈에서 키오스크를 하나 골라 천천히
              따라해보세요.
            </span>
          </div>
        )}
      </div>

      {/*
        PRD N9 (2026-06-01): 보호자 모드 토글은 v2까지 가린다.
        노인 본인 단독 사용 흐름에 인지 부담을 주지 않기 위함.
        보호자가 본인 폰에서 진입하려면 deep link /role-select 또는 /guardian 으로 접근.
        코드는 보존 — v2 베타에서 사용자 요청이 확인되면 다시 노출.

      <Top
        upperGap={32}
        title={<Top.TitleParagraph>누가 사용하나요?</Top.TitleParagraph>}
      />

      <div
        css={css`
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        `}
      >
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          `}
        >
          <button
            type="button"
            onClick={async () => {
              await setRole("elderly");
              navigate("/");
            }}
            css={roleBtn(role === "elderly")}
          >
            <span style={{ fontSize: 28 }}>👴</span>
            <span>내가 연습</span>
          </button>
          <button
            type="button"
            onClick={async () => {
              await setRole("guardian");
              navigate("/guardian");
            }}
            css={roleBtn(role === "guardian")}
          >
            <span style={{ fontSize: 28 }}>👨‍👩‍👧</span>
            <span>부모님 도움</span>
          </button>
        </div>
      </div>
      */}

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
    </div>
  );
}
