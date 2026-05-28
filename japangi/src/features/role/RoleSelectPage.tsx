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
        upperGap={24}
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

      {/* App intro — what this app does */}
      <div
        css={css`
          margin: 0 0 14px;
          padding: 14px 16px;
          background: ${adaptive.blue50};
          border: 1.5px solid ${adaptive.blue200};
          border-radius: 14px;
          font-size: 13px;
          color: ${adaptive.grey800};
          line-height: 1.5;
        `}
      >
        <span
          css={css`
            font-weight: 900;
            color: ${adaptive.blue700};
          `}
        >
          자판기 어렵지않아요
        </span>
        는 어르신이 직접 키오스크를 연습할 수 있는 앱이에요. 자녀분이
        멀리서도 부모님 연습을 돕고 기록을 확인할 수 있어요.
      </div>

      <div
        css={css`
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 3vw, 18px);
          overflow-y: auto;
        `}
      >
        <RoleCard
          emoji="👴"
          title="내가 연습할게요"
          subtitle="제 폰에서 직접 키오스크를 따라해볼게요. (어르신 본인)"
          accent={adaptive.blue500}
          onClick={() => choose("elderly")}
        />
        <RoleCard
          emoji="👨‍👩‍👧"
          title="부모님께 알려드릴게요"
          subtitle="부모님 키오스크 연습을 돕고 기록을 봐요. (자녀)"
          accent="#e4002b"
          onClick={() => choose("guardian")}
        />

        {/* Tester / guest — quick peek without committing to a role */}
        <button
          type="button"
          onClick={() => choose("elderly")}
          css={css`
            background: transparent;
            border: none;
            font-family: inherit;
            font-size: 13px;
            font-weight: 700;
            color: ${adaptive.grey600};
            text-decoration: underline;
            cursor: pointer;
            padding: 12px;
            -webkit-tap-highlight-color: transparent;
          `}
        >
          그냥 둘러볼게요 →
        </button>
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
