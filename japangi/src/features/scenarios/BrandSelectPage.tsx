import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Paragraph, Top } from "@toss/tds-mobile";
import { useNavigate, useParams } from "react-router-dom";

import { BackButton } from "../../components/BackButton";
import { ErrorScreen } from "../../components/ErrorScreen";
import { LoadingScreen } from "../../components/LoadingScreen";
import { useCategory } from "../../hooks/useKioskQueries";
import { queryClient } from "../../lib/queryClient";

export function BrandSelectPage(): React.ReactElement {
  const { categoryId = "" } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { data: category, isLoading, error } = useCategory(categoryId);

  if (isLoading) return <LoadingScreen />;
  if (error !== null)
    return (
      <ErrorScreen
        onRetry={() =>
          void queryClient.invalidateQueries({
            queryKey: ["category", categoryId],
          })
        }
      />
    );

  if (category === undefined) {
    navigate("/");
    return <></>;
  }

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
        title={
          <Top.TitleParagraph>
            어떤 {category.title}에서
            <br />
            연습하시겠어요?
          </Top.TitleParagraph>
        }
      />

      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          flex: 1;
          padding: 0 20px;
        `}
      >
        {category.brands.map((brand) => (
          <button
            key={brand.slug}
            onClick={() =>
              navigate(`/scenario/${category.slug}/${brand.slug}/intro`)
            }
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 12px;
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
            <span
              css={css`
                font-size: 64px;
                line-height: 1;
              `}
            >
              {brand.emoji}
            </span>
            <Paragraph.Text
              css={css`
                font-size: var(--font-button);
                font-weight: 700;
                color: ${adaptive.grey900};
              `}
            >
              {brand.name}
            </Paragraph.Text>
          </button>
        ))}
      </div>
    </div>
  );
}
