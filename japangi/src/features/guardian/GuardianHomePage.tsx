import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Top } from "@toss/tds-mobile";
import { useNavigate } from "react-router-dom";

import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useMyParents } from "../../hooks/useKioskQueries";

export function GuardianHomePage(): React.ReactElement {
  const navigate = useNavigate();
  const { externalId } = useCurrentUser();
  const { data: parents = [], isLoading } = useMyParents(externalId);

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
      `}
    >
      <Top
        title={<Top.TitleParagraph>가족 보호자 모드</Top.TitleParagraph>}
        subtitleBottom={
          <Top.SubtitleParagraph
            css={css`
              color: ${adaptive.grey700};
            `}
          >
            부모님의 키오스크 연습을 도와주세요.
          </Top.SubtitleParagraph>
        }
        right={
          <Top.RightButton onClick={() => navigate("/settings")}>
            설정
          </Top.RightButton>
        }
      />

      <div
        css={css`
          flex: 1;
          min-height: 0;
          padding: 0 clamp(16px, 4vw, 20px);
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow-y: auto;
        `}
      >
        {/* Add parent CTA */}
        <button
          type="button"
          onClick={() => navigate("/guardian/pair")}
          css={css`
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 18px;
            border: 2px dashed ${adaptive.blue500};
            border-radius: 16px;
            background: ${adaptive.blue50};
            cursor: pointer;
            font-family: inherit;
            text-align: left;
            -webkit-tap-highlight-color: transparent;
            :active {
              transform: scale(0.99);
            }
          `}
        >
          <span style={{ fontSize: 32 }}>➕</span>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 2px;
            `}
          >
            <span
              css={css`
                font-size: var(--font-button);
                font-weight: 900;
                color: ${adaptive.blue700};
              `}
            >
              부모님 추가하기
            </span>
            <span
              css={css`
                font-size: 12px;
                color: ${adaptive.grey600};
              `}
            >
              부모님 폰의 6자리 코드를 입력하세요.
            </span>
          </div>
        </button>

        {/* Parent list */}
        {isLoading ? (
          <div
            css={css`
              text-align: center;
              padding: 32px 0;
              color: ${adaptive.grey500};
            `}
          >
            불러오는 중...
          </div>
        ) : parents.length === 0 ? (
          <div
            css={css`
              text-align: center;
              padding: 48px 24px;
              color: ${adaptive.grey500};
              font-size: var(--font-body);
              line-height: 1.5;
            `}
          >
            아직 연결된 부모님이 없어요.
            <br />
            위의 버튼을 눌러 추가해보세요.
          </div>
        ) : (
          parents.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() =>
                navigate(`/guardian/parent/${p.parent_external_id}`)
              }
              css={css`
                display: flex;
                align-items: center;
                gap: 14px;
                padding: 18px;
                border: 1.5px solid ${adaptive.grey200};
                border-radius: 16px;
                background: #ffffff;
                cursor: pointer;
                font-family: inherit;
                text-align: left;
                -webkit-tap-highlight-color: transparent;
                :active {
                  transform: scale(0.99);
                  background: ${adaptive.grey100};
                }
              `}
            >
              <span style={{ fontSize: 40 }}>👴</span>
              <div
                css={css`
                  flex: 1;
                  display: flex;
                  flex-direction: column;
                  gap: 4px;
                  min-width: 0;
                `}
              >
                <span
                  css={css`
                    font-size: var(--font-button);
                    font-weight: 900;
                    color: ${adaptive.grey900};
                  `}
                >
                  {p.nickname ?? p.parent_display_name ?? "부모님"}
                </span>
                <span
                  css={css`
                    font-size: 11px;
                    color: ${adaptive.grey500};
                  `}
                >
                  연결됨 · {new Date(p.created_at).toLocaleDateString("ko-KR")}
                </span>
              </div>
              <span
                css={css`
                  font-size: 22px;
                  color: ${adaptive.grey400};
                `}
              >
                ›
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
