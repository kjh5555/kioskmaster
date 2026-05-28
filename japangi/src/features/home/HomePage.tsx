import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Paragraph, Top } from "@toss/tds-mobile";
import { useNavigate } from "react-router-dom";

import { ErrorScreen } from "../../components/ErrorScreen";
import { LoadingScreen } from "../../components/LoadingScreen";
import { useCategories } from "../../hooks/useKioskQueries";
import { queryClient } from "../../lib/queryClient";

export function HomePage(): React.ReactElement {
  const navigate = useNavigate();
  const { data: categories, isLoading, error } = useCategories();

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
        min-height: 100dvh;
        padding-top: calc(env(safe-area-inset-top, 0px) + 0px);
        padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 24px);
        display: flex;
        flex-direction: column;
        background: ${adaptive.background};
        overflow-x: hidden;
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
          <Top.RightButton onClick={() => navigate("/settings")}>
            글씨 크기
          </Top.RightButton>
        }
      />

      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          flex: 1;
          padding: 0 20px 0 20px;
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
              gap: 8px;
              padding: 20px;
              background-color: ${adaptive.greyBackground};
              border: none;
              border-radius: 20px;
              cursor: pointer;
              min-height: 140px;
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
            <span style={{ fontSize: 64, lineHeight: 1 }}>
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
                font-size: 14px;
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
