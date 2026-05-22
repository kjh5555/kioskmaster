import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Top } from "@toss/tds-mobile";
import { useNavigate, useParams } from "react-router-dom";

import { BigButton } from "../../components/BigButton";
import { PracticeBadge } from "../../components/PracticeBadge";
import { getBrand } from "../../data/scenarios";

export function ScenarioCompletePage(): React.ReactElement {
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
            {brand.name} {category.title} 끝까지 다 하셨어요.
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
        <span style={{ fontSize: 96, lineHeight: 1 }}>✅</span>
      </div>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 12px;
        `}
      >
        <BigButton
          onClick={() => navigate(`/scenario/${category.id}/${brand.id}/intro`)}
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
