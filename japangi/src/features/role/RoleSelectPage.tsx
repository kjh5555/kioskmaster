import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Top } from "@toss/tds-mobile";
import { useNavigate } from "react-router-dom";

import { useCurrentUser } from "../../hooks/useCurrentUser";

export function RoleSelectPage(): React.ReactElement {
  const navigate = useNavigate();
  const { setRole } = useCurrentUser();

  async function choose(role: "elderly" | "guardian") {
    await setRole(role);
    navigate(role === "elderly" ? "/" : "/guardian", { replace: true });
  }

  return (
    <div
      css={css`
        height: 100dvh;
        max-height: 100dvh;
        padding: env(safe-area-inset-top, 0px) clamp(16px, 5vw, 24px)
          calc(env(safe-area-inset-bottom, 0px) + 20px);
        display: flex;
        flex-direction: column;
        background: ${adaptive.background};
        overflow: hidden;
      `}
    >
      <Top
        upperGap={32}
        title={
          <Top.TitleParagraph>
            오늘은 누가 사용하시나요?
          </Top.TitleParagraph>
        }
        subtitleBottom={
          <Top.SubtitleParagraph
            css={css`
              color: ${adaptive.grey700};
            `}
          >
            한 번만 골라주세요. 나중에 설정에서 바꿀 수 있어요.
          </Top.SubtitleParagraph>
        }
      />

      <div
        css={css`
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 3vw, 18px);
          padding-top: 12px;
          overflow-y: auto;
        `}
      >
        <RoleCard
          emoji="👴"
          title="내가 연습할게요"
          subtitle="키오스크 사용을 직접 연습해요."
          accent={adaptive.blue500}
          onClick={() => choose("elderly")}
        />
        <RoleCard
          emoji="👨‍👩‍👧"
          title="부모님께 알려드릴게요"
          subtitle="부모님의 연습을 도와주고 기록을 봐요."
          accent="#e4002b"
          onClick={() => choose("guardian")}
        />
      </div>
    </div>
  );
}

function RoleCard({
  emoji,
  title,
  subtitle,
  accent,
  onClick,
}: {
  emoji: string;
  title: string;
  subtitle: string;
  accent: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      css={css`
        flex: 1;
        display: flex;
        align-items: center;
        gap: clamp(14px, 4vw, 22px);
        padding: clamp(18px, 4vw, 28px);
        background: #ffffff;
        border: 2px solid ${adaptive.grey200};
        border-radius: 20px;
        cursor: pointer;
        font-family: inherit;
        text-align: left;
        transition:
          transform 0.12s ease,
          border-color 0.12s ease,
          background 0.12s ease;
        -webkit-tap-highlight-color: transparent;
        :active {
          transform: scale(0.98);
          border-color: ${accent};
          background: #fafbfc;
        }
      `}
    >
      <span
        style={{
          fontSize: "clamp(56px, 16vw, 80px)",
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        {emoji}
      </span>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        `}
      >
        <span
          css={css`
            font-size: var(--font-button);
            font-weight: 900;
            color: ${adaptive.grey900};
            line-height: 1.25;
          `}
        >
          {title}
        </span>
        <span
          css={css`
            font-size: var(--font-body);
            color: ${adaptive.grey600};
            line-height: 1.4;
          `}
        >
          {subtitle}
        </span>
      </div>
    </button>
  );
}
