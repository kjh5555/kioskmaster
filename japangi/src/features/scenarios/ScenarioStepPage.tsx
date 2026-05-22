import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Paragraph, Top } from "@toss/tds-mobile";
import { useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { BackButton } from "../../components/BackButton";
import { BigButton } from "../../components/BigButton";
import { ErrorScreen } from "../../components/ErrorScreen";
import { HelpOverlay } from "../../components/HelpOverlay";
import { LoadingScreen } from "../../components/LoadingScreen";
import { PracticeBadge } from "../../components/PracticeBadge";
import { useBrand, useDynamicGoal } from "../../hooks/useKioskQueries";
import { queryClient } from "../../lib/queryClient";
import { OnboardingTour } from "./_engine/OnboardingTour";
import {
  markOnboardingSeen,
  wasOnboardingSeen,
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

function FastfoodStepPageLoader({
  categoryId,
  brandId,
}: {
  categoryId: string;
  brandId: string;
}): React.ReactElement {
  const {
    data: goal,
    isLoading: goalLoading,
    error: goalError,
  } = useDynamicGoal(brandId);

  const scenario = useMemo(() => {
    if (!goal) return undefined;
    const raw = goal.scenario_json as ScenarioScript | undefined;
    if (raw === undefined || raw === null || !Array.isArray(raw.steps))
      return raw;

    const stepsWithGoal = raw.steps.map((step) => {
      const next =
        goal.selections[step.id] != null
          ? { ...step, correctChoiceId: goal.selections[step.id] }
          : { ...step };
      // Wire branching so 단품 path skips set-size/side/drink and goes straight
      // to the single confirm screen → cart.
      if (next.id === "set-or-single") {
        next.branchTo = { ...next.branchTo, single: "order-confirm-single" };
      }
      return next;
    });

    const hasSingleStep = stepsWithGoal.some(
      (s) => s.id === "order-confirm-single",
    );
    if (!hasSingleStep) {
      stepsWithGoal.push({
        id: "order-confirm-single",
        instruction: "단품 주문을 확인해주세요.",
        helpText: "노란색 '장바구니에 담기' 버튼을 누르면 결제 단계로 넘어가요.",
        layout: "list",
        customLayoutId: "mcdonalds-order-confirm-single",
        choices: [
          { id: "add-to-cart", label: "장바구니에 담기" },
          { id: "cancel", label: "취소" },
          { id: "nutrition", label: "영양정보" },
          { id: "edit-burger", label: "재료추가/변경" },
          { id: "qty-minus", label: "수량 줄이기" },
          { id: "qty-plus", label: "수량 늘리기" },
        ],
        correctChoiceId: "add-to-cart",
        successMessage: "장바구니에 담았어요!",
        hintMessage: "노란색 '장바구니에 담기' 버튼을 눌러주세요.",
        branchTo: { "add-to-cart": "post-cart-category" },
      });
    }

    return {
      ...raw,
      goalSummary: goal.goal_summary,
      onboarding: raw.onboarding.map((o, i, arr) =>
        i === arr.length - 1 ? { ...o, body: goal.goal_summary } : o,
      ),
      steps: stepsWithGoal,
    };
  }, [goal]);

  if (goalLoading) return <LoadingScreen />;
  if (goalError !== null)
    return (
      <ErrorScreen
        onRetry={() =>
          void queryClient.invalidateQueries({
            queryKey: ["dynamic-goal", brandId],
          })
        }
      />
    );

  if (
    scenario === undefined ||
    scenario === null ||
    !Array.isArray(scenario.steps)
  ) {
    return <Navigate to="/" replace />;
  }

  return (
    <FastfoodStepPage
      categoryId={categoryId}
      brandId={brandId}
      scenario={scenario}
    />
  );
}

function PlaceholderStepPage({
  categoryId,
  brandId,
}: {
  categoryId: string;
  brandId: string;
}): React.ReactElement {
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
            {brand.name} {brand.category_slug} 연습 단계예요.
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
        onClick={() => navigate(`/scenario/${categoryId}/${brandId}/complete`)}
      >
        주문 완료
      </BigButton>

      {/* HelpOverlay is fixed-position, rendered last */}
      <HelpOverlay helpText="여기서는 실제 키오스크 단계를 따라 해볼 수 있어요. (지금은 준비 중이에요.)" />
    </div>
  );
}

export function ScenarioStepPage(): React.ReactElement {
  const { categoryId = "", brandId = "" } = useParams<{
    categoryId: string;
    brandId: string;
  }>();

  if (categoryId === "fastfood") {
    return <FastfoodStepPageLoader categoryId={categoryId} brandId={brandId} />;
  }

  return <PlaceholderStepPage categoryId={categoryId} brandId={brandId} />;
}
