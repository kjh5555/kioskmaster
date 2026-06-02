import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Paragraph, Top } from "@toss/tds-mobile";
import { Navigate, useNavigate, useParams } from "react-router-dom";

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
    return <Navigate to="/" replace />;
  }

  // brand 개수에 따라 행 정책 분기.
  // - 1~2개 (train: KTX/SRT): max 180px 상한 — 한 행이 viewport 차지하지 않게
  // - 3개 이상 (fastfood·cafe 4개, hospital 3개): 1fr — 2행이 viewport 적당히 채움
  const brandCount = category.brands.length;
  const rowSize = brandCount <= 2 ? "minmax(110px, 180px)" : "minmax(110px, 1fr)";

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
        width: 100%;
        max-width: 100%;
      `}
    >
      <div
        css={css`
          padding: 0 4px;
        `}
      >
        <BackButton to="/" />
      </div>

      <Top
        upperGap={0}
        title={
          <Top.TitleParagraph>
            {categoryId === "hospital" ? (
              <>
                병원에서 어떤 접수를
                <br />
                연습해볼까요?
              </>
            ) : (
              <>
                어떤 {category.title}에서
                <br />
                연습하시겠어요?
              </>
            )}
          </Top.TitleParagraph>
        }
      />

      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-auto-rows: ${rowSize};
          gap: clamp(8px, 3vw, 16px);
          flex: 1;
          min-height: 0;
          padding: clamp(8px, 2vw, 14px) clamp(12px, 4vw, 20px);
          align-content: ${brandCount <= 2 ? "start" : "stretch"};
          overflow: hidden;
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
              gap: clamp(4px, 1.5vw, 8px);
              padding: clamp(10px, 3vw, 20px);
              background-color: ${adaptive.greyBackground};
              border: none;
              border-radius: clamp(14px, 4vw, 20px);
              cursor: pointer;
              /* min-height 제거 — 부모 grid cell(minmax 100px,1fr)이 크기 책임. */
              min-height: 0;
              overflow: hidden;
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
            {brand.image_url != null && brand.image_url !== "" ? (
              <img
                src={brand.image_url}
                alt={brand.name}
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  const sib = e.currentTarget
                    .nextElementSibling as HTMLElement | null;
                  if (sib !== null) sib.style.display = "inline-block";
                }}
                css={css`
                  width: clamp(44px, 11vw, 72px);
                  height: clamp(44px, 11vw, 72px);
                  object-fit: contain;
                `}
              />
            ) : null}
            <span
              css={css`
                font-size: clamp(40px, 9vw, 64px);
                line-height: 1;
                display: ${brand.image_url != null && brand.image_url !== ""
                  ? "none"
                  : "inline-block"};
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
