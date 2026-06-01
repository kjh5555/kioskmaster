import { css, keyframes } from "@emotion/react";
import { useState } from "react";

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

export function EdiyaMenu({
  step,
  scenario,
  rejectedChoiceId,
  idleHintActive,
  onChoice,
}: CustomLayoutProps): React.ReactElement {
  const correctId = step.correctChoiceId;
  const categoryStep = scenario.steps.find((s) => s.id === "category");
  const categories = categoryStep?.choices ?? [];
  const activeCategoryId = categoryStep?.correctChoiceId;
  const [viewTabId, setViewTabId] = useState<string | null>(null);
  const effectiveTab = viewTabId ?? activeCategoryId;
  const previewCategory = categories.find((c) => c.id === viewTabId);
  const onMenu = effectiveTab === activeCategoryId;
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background: #f5f8fc;
        font-family: system-ui, -apple-system, sans-serif;
        overflow: hidden;
      `}
    >
      <div
        css={css`
          background: #1a3e72;
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
          const active = c.id === effectiveTab;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setViewTabId(c.id === activeCategoryId ? null : c.id)}
              css={css`
                padding: 12px 16px;
                border-radius: 999px;
                background: ${active ? "#ffffff" : "rgba(255, 255, 255, 0.12)"};
                border: 1.5px solid
                  ${active ? "#ffffff" : "rgba(255, 255, 255, 0.35)"};
                color: ${active ? "#1a3e72" : "#ffffff"};
                font-family: inherit;
                font-size: 15px;
                font-weight: 800;
                white-space: nowrap;
                flex-shrink: 0;
                cursor: pointer;
                -webkit-tap-highlight-color: transparent;
                :active {
                  transform: scale(0.97);
                }
              `}
            >
              {c.emoji} {c.label}
            </button>
          );
        })}
      </div>
      {onMenu ? (
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
                border: 2px solid #c8d6e8;
                border-radius: 16px;
                color: #1a3e72;
                font-family: inherit;
                cursor: pointer;
                min-height: 160px;
                box-shadow: 0 3px 8px rgba(26, 62, 114, 0.06);
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
                  color: #e60012;
                `}
              >
                {c.sublabel}
              </span>
            )}
          </button>
        ))}
      </div>
      ) : (
      <div
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
          text-align: center;
          gap: 16px;
        `}
      >
        <div style={{ fontSize: 56 }}>{previewCategory?.emoji}</div>
        <div
          css={css`
            font-size: 18px;
            font-weight: 800;
            color: #1a3e72;
            line-height: 1.4;
          `}
        >
          <strong>{previewCategory?.label}</strong>는 오늘 연습에 없어요.<br />
          위쪽에서 <strong>'음료'</strong>를 눌러주세요.
        </div>
      </div>
      )}
    </div>
  );
}
