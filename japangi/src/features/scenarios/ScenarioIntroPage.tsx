import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Top } from "@toss/tds-mobile";
import { useNavigate, useParams } from "react-router-dom";

import { BackButton } from "../../components/BackButton";
import { BigButton } from "../../components/BigButton";
import { PracticeBadge } from "../../components/PracticeBadge";
import { getBrand } from "../../data/scenarios";

export function ScenarioIntroPage(): React.ReactElement {
  const { categoryId = "", brandId = "" } = useParams<{
    categoryId: string;
    brandId: string;
  }>();
  const navigate = useNavigate();
  const result = getBrand(categoryId, brandId);

  if (result === undefined) {
    navigate("/");
    return <></>;
  }

  const { category, brand } = result;

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
        <BackButton />
        <PracticeBadge position="static" />
      </div>

      <Top
        upperGap={0}
        title={
          <Top.TitleParagraph>
            이번에는 {brand.name} {category.title} 키오스크를 연습해볼게요
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
        <span style={{ fontSize: 96, lineHeight: 1 }}>{brand.emoji}</span>
      </div>

      <BigButton
        onClick={() => navigate(`/scenario/${category.id}/${brand.id}/step`)}
      >
        시작하기
      </BigButton>
    </div>
  );
}
