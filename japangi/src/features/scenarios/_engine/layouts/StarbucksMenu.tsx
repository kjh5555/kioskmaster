import { css, keyframes } from "@emotion/react";

import { idlePulse, type CustomLayoutProps } from "./types";

const shakeKf = keyframes`
  0%   { transform: translateX(0); }
  20%  { transform: translateX(-8px); }
  40%  { transform: translateX(8px); }
  60%  { transform: translateX(-5px); }
  80%  { transform: translateX(5px); }
  100% { transform: translateX(0); }
`;

function shakeWhen(rejected: string | null, id: string) {
  return (
    rejected === id &&
    css`
      animation: ${shakeKf} 350ms ease;
    `
  );
}

export function StarbucksMenu({
  step,
  scenario,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const correctId = step.correctChoiceId;

  // 실제 스타벅스 키오스크는 음료 그리드 위에 카테고리 탭이 그대로 유지된다.
  // 이전 category step 의 choices 를 재참조해 동일한 탭을 띄우고, category 의
  // correctChoiceId 를 active 로 표시한다. 다른 탭은 div 로 가려 시나리오 흐름은
  // 그대로 유지 (탭 자체는 시각 모사만).
  const categoryStep = scenario.steps.find((s) => s.id === "category");
  const categories = categoryStep?.choices ?? [];
  const activeCategoryId = categoryStep?.correctChoiceId;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background: #f5f0e8;
        font-family: system-ui, -apple-system, sans-serif;
        overflow: hidden;
      `}
    >
      {/* Sticky category tab strip — 실제 키오스크와 동일 */}
      <div
        css={css`
          background: #006241;
          color: #ffffff;
          padding: 14px 12px 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
        `}
      >
        <div
          css={css`
            font-size: 14px;
            font-weight: 800;
            opacity: 0.85;
            white-space: nowrap;
            padding-right: 6px;
          `}
        >
          MENU
        </div>
        {categories.map((c) => {
          const active = c.id === activeCategoryId;
          return (
            <div
              key={c.id}
              css={css`
                padding: 12px 16px;
                border-radius: 999px;
                background: ${active ? "#ffffff" : "rgba(255, 255, 255, 0.12)"};
                border: 1.5px solid
                  ${active ? "#ffffff" : "rgba(255, 255, 255, 0.35)"};
                color: ${active ? "#006241" : "#ffffff"};
                font-size: 15px;
                font-weight: 800;
                white-space: nowrap;
                flex-shrink: 0;
                opacity: ${active ? 1 : 0.65};
              `}
            >
              {c.emoji} {c.label}
            </div>
          );
        })}
      </div>

      {/* Menu grid — 2 columns, scrollable */}
      <div
        css={css`
          flex: 1;
          overflow-y: auto;
          padding: 14px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          align-content: start;
        `}
      >
        {step.choices.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onChoice(c.id)}
            css={[
              css`
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                gap: 8px;
                padding: 14px 10px;
                background: #ffffff;
                border: 2px solid #d9cdb8;
                border-radius: 16px;
                color: #1e3932;
                font-family: inherit;
                cursor: pointer;
                min-height: 160px;
                box-shadow: 0 3px 8px rgba(0, 0, 0, 0.06);
                -webkit-tap-highlight-color: transparent;
                :active {
                  transform: scale(0.98);
                }
              `,
              shakeWhen(rejectedChoiceId, c.id),
              idlePulse(idleHintActive, c.id === correctId),
            ]}
          >
            {c.imageUrl ? (
              <img
                src={c.imageUrl}
                alt={c.label}
                css={css`
                  width: 72px;
                  height: 72px;
                  object-fit: cover;
                  border-radius: 50%;
                  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
                `}
              />
            ) : (
              <span style={{ fontSize: 44 }}>{c.emoji}</span>
            )}
            <span
              css={css`
                font-size: 14px;
                font-weight: 800;
                text-align: center;
                line-height: 1.3;
              `}
            >
              {c.label}
            </span>
            {c.sublabel && (
              <span
                css={css`
                  font-size: 14px;
                  font-weight: 900;
                  color: #006241;
                `}
              >
                {c.sublabel}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
