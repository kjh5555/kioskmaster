import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Paragraph, Top } from "@toss/tds-mobile";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BackButton } from "../../components/BackButton";
import { BigButton } from "../../components/BigButton";
import { HelpOverlay } from "../../components/HelpOverlay";
import { PracticeBadge } from "../../components/PracticeBadge";
import { getFastfoodScenario } from "../../data/fastfood";
import { getBrand } from "../../data/scenarios";
import { OnboardingTour } from "./_engine/OnboardingTour";
import {
  wasOnboardingSeen,
  markOnboardingSeen,
} from "./_engine/onboardingStorage";
import { StepEngine } from "./_engine/StepEngine";
import type { ScenarioScript } from "./_engine/types";

function FastfoodStepPage({
  categoryId,
  brandId,
  scenario,
}: {
  categoryId: string;
  brandId: string;
  scenario: ScenarioScript;
}): React.ReactElement {
  const navigate = useNavigate();
  const scenarioKey = `fastfood:${brandId}`;
  const [onboardingDone, setOnboardingDone] = useState(() =>
    wasOnboardingSeen(scenarioKey),
  );

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
          justify-content: flex-end;
        `}
      >
        <PracticeBadge position="static" />
      </div>

      <StepEngine
        scenario={scenario}
        onScenarioComplete={() =>
          navigate(`/scenario/${categoryId}/${brandId}/complete`)
        }
        onExit={() => navigate(`/scenario/${categoryId}/${brandId}/intro`)}
      />

      {!onboardingDone && (
        <OnboardingTour
          scenarioId={scenarioKey}
          steps={scenario.onboarding}
          theme={scenario.theme}
          onComplete={() => {
            markOnboardingSeen(scenarioKey);
            setOnboardingDone(true);
          }}
        />
      )}
    </div>
  );
}

export function ScenarioStepPage(): React.ReactElement {
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

  // ── fastfood: full StepEngine (per brand) ────────────────────────────────
  if (categoryId === "fastfood") {
    const scenario = getFastfoodScenario(brandId);
    if (scenario === undefined) {
      navigate("/");
      return <></>;
    }
    return (
      <FastfoodStepPage
        categoryId={categoryId}
        brandId={brandId}
        scenario={scenario}
      />
    );
  }

  // ── other categories: M2 placeholder (cafe / hospital / train) ────────────
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
        `}
      >
        <BackButton />
        <PracticeBadge position="static" />
      </div>

      <Top
        upperGap={0}
        title={<Top.TitleParagraph>M3에서 구현 예정</Top.TitleParagraph>}
        subtitleBottom={
          <Top.SubtitleParagraph
            css={css`
              color: ${adaptive.grey700};
            `}
          >
            {brand.name} {category.title} 연습 단계예요.
          </Top.SubtitleParagraph>
        }
      />

      <div
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
          text-align: center;
          padding: 32px 0;
        `}
      >
        <span style={{ fontSize: 64, lineHeight: 1 }}>{brand.emoji}</span>

        <Paragraph.Text
          css={css`
            font-size: var(--font-body);
            color: ${adaptive.grey500};
          `}
        >
          1 / ? 단계
        </Paragraph.Text>
      </div>

      <BigButton
        onClick={() =>
          navigate(`/scenario/${category.id}/${brand.id}/complete`)
        }
      >
        주문 완료
      </BigButton>

      {/* HelpOverlay is fixed-position, rendered last */}
      <HelpOverlay helpText="여기서는 실제 키오스크 단계를 따라 해볼 수 있어요. (지금은 준비 중이에요.)" />
    </div>
  );
}
