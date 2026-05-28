import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Paragraph, Top } from "@toss/tds-mobile";
import { useNavigate } from "react-router-dom";

import { ErrorScreen } from "../../components/ErrorScreen";
import { LoadingScreen } from "../../components/LoadingScreen";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import {
  useCategories,
  useParentFavorites,
  useUserStats,
} from "../../hooks/useKioskQueries";
import { queryClient } from "../../lib/queryClient";

export function HomePage(): React.ReactElement {
  const navigate = useNavigate();
  const { data: categories, isLoading, error } = useCategories();
  const { externalId } = useCurrentUser();
  const { data: stats } = useUserStats(externalId);
  const { data: favorites = [] } = useParentFavorites(externalId);
  const primaryFav = favorites.find((f) => f.priority === 0) ?? favorites[0];

  if (isLoading) return <LoadingScreen />;
  if (error !== null)
    return (
      <ErrorScreen
        onRetry={() =>
          void queryClient.invalidateQueries({ queryKey: ["categories"] })
        }
      />
    );

  return (
    <div
      css={css`
        height: 100dvh;
        max-height: 100dvh;
        padding-top: env(safe-area-inset-top, 0px);
        padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 12px);
        display: flex;
        flex-direction: column;
        background: ${adaptive.background};
        overflow: hidden;
        max-width: 100%;
        width: 100%;
      `}
    >
      <Top
        title={
          <Top.TitleParagraph>
            오늘은 어떤 키오스크를 연습해볼까요?
          </Top.TitleParagraph>
        }
        right={
          <Top.RightButton onClick={() => navigate("/pair")}>
            가족 연결
          </Top.RightButton>
        }
      />

      {!primaryFav && (!stats || stats.total_attempts === 0) && (
        <div
          css={css`
            margin: 0 clamp(12px, 4vw, 20px) 8px;
            padding: 14px 16px;
            background: ${adaptive.blue50};
            border: 1.5px solid ${adaptive.blue200};
            border-radius: 14px;
            display: flex;
            align-items: center;
            gap: 12px;
          `}
        >
          <span style={{ fontSize: 28 }}>👋</span>
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
                color: ${adaptive.blue700};
              `}
            >
              처음 오셨네요!
            </span>
            <span
              css={css`
                font-size: 12px;
                color: ${adaptive.grey600};
                line-height: 1.4;
              `}
            >
              아래에서 가게를 하나 골라 천천히 따라해보세요. 실수해도 괜찮아요.
            </span>
          </div>
        </div>
      )}

      {primaryFav && (
        <button
          type="button"
          onClick={() =>
            navigate(
              `/scenario/${primaryFav.category_slug}/${primaryFav.brand_slug}/intro`,
            )
          }
          css={css`
            margin: 0 clamp(12px, 4vw, 20px) 8px;
            padding: 16px 18px;
            background: #fff9db;
            border: 2px solid #ffd43b;
            border-radius: 16px;
            display: flex;
            align-items: center;
            gap: 14px;
            cursor: pointer;
            font-family: inherit;
            text-align: left;
            -webkit-tap-highlight-color: transparent;
            :active {
              transform: scale(0.99);
            }
          `}
        >
          <span style={{ fontSize: 36 }}>⭐</span>
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
                font-size: 11px;
                font-weight: 800;
                color: #c1840d;
              `}
            >
              가족이 골라준 1순위
            </span>
            <span
              css={css`
                font-size: var(--font-button);
                font-weight: 900;
                color: #2a1408;
              `}
            >
              {primaryFav.brand_slug}
            </span>
            {primaryFav.note && (
              <span
                css={css`
                  font-size: 12px;
                  color: #5e4500;
                  padding-top: 2px;
                `}
              >
                {primaryFav.note}
              </span>
            )}
          </div>
          <span style={{ fontSize: 22, color: "#c1840d" }}>›</span>
        </button>
      )}

      {stats && stats.total_attempts > 0 && (
        <div
          css={css`
            margin: 0 clamp(12px, 4vw, 20px) clamp(8px, 2vw, 14px);
            padding: 14px 16px;
            background: ${adaptive.blue50};
            border: 1.5px solid ${adaptive.blue200};
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 2px;
              min-width: 0;
            `}
          >
            <span
              css={css`
                font-size: var(--font-body);
                font-weight: 800;
                color: ${adaptive.blue700};
              `}
            >
              이번 주 연습 {stats.this_week_count}번
            </span>
            <span
              css={css`
                font-size: 12px;
                color: ${adaptive.grey600};
                line-height: 1.3;
              `}
            >
              지금까지 총 {stats.total_attempts}번 연습 · {stats.total_success}번 성공
            </span>
          </div>
          <span style={{ fontSize: 32 }}>👍</span>
        </div>
      )}

      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-auto-rows: clamp(120px, 20dvh, 180px);
          gap: clamp(8px, 3vw, 16px);
          flex: 1;
          min-height: 0;
          padding: 0 clamp(12px, 4vw, 20px);
          overflow-y: auto;
          align-content: start;
        `}
      >
        {(categories ?? []).map((category) => (
          <button
            key={category.slug}
            onClick={() => navigate(`/scenario/${category.slug}/brand`)}
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: clamp(4px, 1.5vw, 8px);
              padding: clamp(10px, 3vw, 20px);
              background-color: ${adaptive.greyBackground};
              border: none;
              border-radius: clamp(14px, 4vw, 20px);
              cursor: pointer;
              min-height: clamp(110px, 18dvh, 160px);
              text-align: center;
              -webkit-tap-highlight-color: transparent;
              transition:
                transform 0.12s ease,
                background-color 0.12s ease;
              &:active {
                transform: scale(0.97);
                background-color: ${adaptive.grey100};
              }
            `}
          >
            <span style={{ fontSize: "clamp(40px, 9vw, 64px)", lineHeight: 1 }}>
              {category.emoji}
            </span>
            <Paragraph.Text
              css={css`
                font-size: var(--font-button);
                font-weight: 700;
                color: ${adaptive.grey900};
              `}
            >
              {category.title}
            </Paragraph.Text>
            <Paragraph.Text
              css={css`
                font-size: clamp(11px, 3vw, 14px);
                color: ${adaptive.grey500};
                line-height: 1.4;
              `}
            >
              {category.description}
            </Paragraph.Text>
          </button>
        ))}
      </div>
    </div>
  );
}
