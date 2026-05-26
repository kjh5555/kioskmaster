import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Top } from "@toss/tds-mobile";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { BackButton } from "../../components/BackButton";
import { BigButton } from "../../components/BigButton";
import { ErrorScreen } from "../../components/ErrorScreen";
import { LoadingScreen } from "../../components/LoadingScreen";
import { PracticeBadge } from "../../components/PracticeBadge";
import { useBrand } from "../../hooks/useKioskQueries";
import { queryClient } from "../../lib/queryClient";

// What the user is actually practicing for each category — surfaces in the
// intro headline ("이번에는 맥도날드 햄버거 주문 키오스크를 연습해볼게요").
const CATEGORY_ACTION_LABEL: Record<string, string> = {
  fastfood: "햄버거 주문",
  cafe: "커피 주문",
  hospital: "진료 접수",
  subway: "지하철 표 발매",
};

export function ScenarioIntroPage(): React.ReactElement {
  const { categoryId = "", brandId = "" } = useParams<{
    categoryId: string;
    brandId: string;
  }>();
  const navigate = useNavigate();
  const { data: brand, isLoading, error } = useBrand(brandId);

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
    return <Navigate to="/" replace />;
  }

  return (
    <div
      css={css`
        min-height: 100dvh;
        padding-top: calc(env(safe-area-inset-top, 0px) + 0px);
        padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 32px);
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
        flex-direction: column;
        background: ${adaptive.background};
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0;
        `}
      >
        <BackButton to="/" />
        <PracticeBadge position="static" />
      </div>

      <Top
        upperGap={0}
        title={
          <Top.TitleParagraph>
            이번에는 {brand.name} {CATEGORY_ACTION_LABEL[categoryId] ?? "키오스크"}{" "}
            키오스크를 연습해볼게요
          </Top.TitleParagraph>
        }
        subtitleBottom={
          <Top.SubtitleParagraph
            css={css`
              color: ${adaptive.grey700};
            `}
          >
            실수해도 괜찮아요. 처음부터 다시 할 수 있어요.
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
        {brand.image_url != null && brand.image_url !== "" ? (
          <img
            src={brand.image_url}
            alt={brand.name}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
              const sib = e.currentTarget
                .nextElementSibling as HTMLElement | null;
              if (sib !== null) sib.style.display = "inline-block";
            }}
            css={css`
              width: 200px;
              height: 200px;
              object-fit: contain;
            `}
          />
        ) : null}
        <span
          style={{
            fontSize: 96,
            lineHeight: 1,
            display:
              brand.image_url != null && brand.image_url !== "" ? "none" : "inline-block",
          }}
        >
          {brand.emoji}
        </span>
      </div>

      <BigButton
        onClick={() => navigate(`/scenario/${categoryId}/${brandId}/step`)}
      >
        시작하기
      </BigButton>
    </div>
  );
}
