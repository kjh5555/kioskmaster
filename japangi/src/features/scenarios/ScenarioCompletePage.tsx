import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Top } from "@toss/tds-mobile";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BigButton } from "../../components/BigButton";
import { ErrorScreen } from "../../components/ErrorScreen";
import { LoadingScreen } from "../../components/LoadingScreen";
import { PracticeBadge } from "../../components/PracticeBadge";
import { useBrand } from "../../hooks/useKioskQueries";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { api } from "../../lib/api";
import { queryClient } from "../../lib/queryClient";

export function ScenarioCompletePage(): React.ReactElement {
  const { categoryId = "", brandId = "" } = useParams<{
    categoryId: string;
    brandId: string;
  }>();
  const navigate = useNavigate();
  const { data: brand, isLoading, error } = useBrand(brandId);
  const { externalId } = useCurrentUser();
  const recorded = useRef(false);

  // Persist the successful attempt exactly once when this page mounts.
  // Failures are swallowed — completion screen should never block on the
  // analytics write.
  useEffect(() => {
    if (recorded.current) return;
    if (!externalId || !brandId || !categoryId) return;
    recorded.current = true;
    void api
      .submitAttempt({
        external_id: externalId,
        brand_slug: brandId,
        category_slug: categoryId,
        success: true,
        mistakes: 0,
        duration_seconds: 0,
      })
      .then(() => {
        void queryClient.invalidateQueries({
          queryKey: ["user-stats", externalId],
        });
      })
      .catch(() => {
        // ignore network errors
      });
  }, [externalId, brandId, categoryId]);

  if (isLoading) return <LoadingScreen />;
  if (error !== null)
    return (
      <ErrorScreen
        onRetry={() =>
          void queryClient.invalidateQueries({ queryKey: ["brand", brandId] })
        }
      />
    );

  if (brand === undefined) {
    navigate("/");
    return <></>;
  }

  return (
    <div
      css={css`
        height: 100dvh;
        max-height: 100dvh;
        padding-top: env(safe-area-inset-top, 0px);
        padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 16px);
        padding-left: clamp(12px, 4vw, 20px);
        padding-right: clamp(12px, 4vw, 20px);
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
          display: flex;
          justify-content: flex-end;
        `}
        style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 16px)" }}
      >
        <PracticeBadge position="static" />
      </div>

      <Top
        upperGap={0}
        title={<Top.TitleParagraph>잘하셨어요!</Top.TitleParagraph>}
        subtitleBottom={
          <Top.SubtitleParagraph
            css={css`
              color: ${adaptive.grey700};
            `}
          >
            {brand.name} {brand.category_slug} 끝까지 다 하셨어요.
          </Top.SubtitleParagraph>
        }
      />

      <div
        css={css`
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <span style={{ fontSize: "clamp(72px, 22vw, 96px)", lineHeight: 1 }}>✅</span>
      </div>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 12px;
        `}
      >
        <BigButton
          onClick={() => navigate(`/scenario/${categoryId}/${brandId}/intro`)}
        >
          다시 한 번 해볼래요
        </BigButton>
        <BigButton variant="weak" onClick={() => navigate("/")}>
          다른 키오스크 연습할래요
        </BigButton>
      </div>
    </div>
  );
}
