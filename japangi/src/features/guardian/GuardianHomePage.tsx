import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Top } from "@toss/tds-mobile";
import { useNavigate } from "react-router-dom";

import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useMyParents } from "../../hooks/useKioskQueries";

function Step({ n, text }: { n: number; text: string }): React.ReactElement {
  return (
    <div
      css={css`
        display: flex;
        align-items: flex-start;
        gap: 10px;
      `}
    >
      <span
        css={css`
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: ${adaptive.blue500};
          color: #ffffff;
          font-size: 12px;
          font-weight: 900;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        `}
      >
        {n}
      </span>
      <span
        css={css`
          font-size: 13px;
          font-weight: 700;
          color: ${adaptive.grey800};
          line-height: 1.4;
          padding-top: 3px;
        `}
      >
        {text}
      </span>
    </div>
  );
}

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
        {/* Welcome / how-it-works (shown when no parent connected yet) */}
        {!isLoading && parents.length === 0 && (
          <div
            css={css`
              background: linear-gradient(135deg, #eaf2ff 0%, #f0e7ff 100%);
              border: 1.5px solid ${adaptive.blue200};
              border-radius: 18px;
              padding: 18px;
              display: flex;
              flex-direction: column;
              gap: 12px;
            `}
          >
            <div
              css={css`
                font-size: var(--font-button);
                font-weight: 900;
                color: ${adaptive.blue700};
                line-height: 1.3;
              `}
            >
              👨‍👩‍👧 부모님 키오스크 연습을 도와주세요
            </div>
            <div
              css={css`
                font-size: 13px;
                color: ${adaptive.grey700};
                line-height: 1.55;
              `}
            >
              부모님이 자주 가시는 가게의 키오스크를 미리 연습할 수 있어요.
              연결하면 부모님 연습 기록을 확인하고, 자주 가는 곳을 우선으로
              보여드릴 수 있어요.
            </div>

            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 8px;
                padding-top: 4px;
              `}
            >
              <Step n={1} text="부모님 폰에 같은 앱을 깔아드리세요" />
              <Step n={2} text="부모님 폰에서 '가족 연결' → 6자리 코드 확인" />
              <Step n={3} text="아래 '부모님 추가하기'에 그 코드를 입력" />
            </div>
          </div>
        )}

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

        {/* Request kiosk addition */}
        <button
          type="button"
          onClick={() => navigate("/requests")}
          css={css`
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 14px 16px;
            border: 1.5px solid ${adaptive.grey200};
            border-radius: 14px;
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
          <span style={{ fontSize: 24 }}>📨</span>
          <span
            css={css`
              flex: 1;
              font-size: var(--font-body);
              font-weight: 800;
              color: ${adaptive.grey900};
            `}
          >
            키오스크 추가 요청하기
          </span>
          <span style={{ fontSize: 20, color: adaptive.grey400 }}>›</span>
        </button>

        {/* Peek at the elderly home — useful for spouses/operators who
            want to see what the parent sees, without flipping their role. */}
        <button
          type="button"
          onClick={() => navigate("/")}
          css={css`
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 14px 16px;
            border: 1.5px solid ${adaptive.grey200};
            border-radius: 14px;
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
          <span style={{ fontSize: 24 }}>👴</span>
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
                font-size: var(--font-body);
                font-weight: 800;
                color: ${adaptive.grey900};
              `}
            >
              부모님 화면 미리보기
            </span>
            <span
              css={css`
                font-size: 11px;
                color: ${adaptive.grey500};
              `}
            >
              어르신 모드로 잠깐 들어가 보기
            </span>
          </div>
          <span style={{ fontSize: 20, color: adaptive.grey400 }}>›</span>
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
