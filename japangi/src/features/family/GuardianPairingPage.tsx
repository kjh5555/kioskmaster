import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Top } from "@toss/tds-mobile";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BackButton } from "../../components/BackButton";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { api } from "../../lib/api";
import { queryClient } from "../../lib/queryClient";

export function GuardianPairingPage(): React.ReactElement {
  const navigate = useNavigate();
  const { externalId } = useCurrentUser();
  const [code, setCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function setDigit(index: number, value: string) {
    const v = value.replace(/[^0-9]/g, "").slice(-1);
    const next = (code.padEnd(6, " ").substring(0, index) + v + code.padEnd(6, " ").substring(index + 1))
      .replace(/ /g, "")
      .slice(0, 6);
    setCode(next);
  }

  async function submit() {
    if (code.length !== 6) {
      setError("6자리를 모두 입력해주세요.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const link = await api.claimPairing({
        child_external_id: externalId,
        code,
        nickname: nickname.trim() || null,
      });
      void queryClient.invalidateQueries({
        queryKey: ["my-parents", externalId],
      });
      navigate(`/guardian/parent/${link.parent_external_id}`, {
        replace: true,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      css={css`
        height: 100dvh;
        max-height: 100dvh;
        padding-top: env(safe-area-inset-top, 0px);
        padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 16px);
        display: flex;
        flex-direction: column;
        background: ${adaptive.background};
        overflow: hidden;
      `}
    >
      <div css={css`padding: 0 4px;`}>
        <BackButton to="/guardian" />
      </div>

      <Top
        upperGap={0}
        title={<Top.TitleParagraph>부모님 6자리 코드 입력</Top.TitleParagraph>}
        subtitleBottom={
          <Top.SubtitleParagraph
            css={css`color: ${adaptive.grey700};`}
          >
            부모님 폰에 보이는 숫자를 입력하세요.
          </Top.SubtitleParagraph>
        }
      />

      <div
        css={css`
          flex: 1;
          min-height: 0;
          padding: 0 clamp(16px, 4vw, 20px);
          display: flex;
          flex-direction: column;
          gap: 20px;
          overflow-y: auto;
        `}
      >
        {/* 6 boxes */}
        <div
          css={css`
            display: flex;
            justify-content: center;
            gap: clamp(4px, 1.5vw, 8px);
            padding-top: 12px;
            width: 100%;
          `}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <input
              key={i}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={code[i] ?? ""}
              onChange={(e) => {
                setDigit(i, e.target.value);
                const next = e.target.nextElementSibling as HTMLInputElement | null;
                if (e.target.value && next) next.focus();
              }}
              css={css`
                flex: 1 1 0;
                min-width: 0;
                max-width: 56px;
                width: 100%;
                height: clamp(54px, 14vw, 64px);
                padding: 0;
                font-size: clamp(22px, 6vw, 28px);
                font-weight: 900;
                font-family:
                  "SF Mono",
                  "Menlo",
                  "Consolas",
                  monospace;
                text-align: center;
                border: 2px solid
                  ${code[i] ? adaptive.blue500 : adaptive.grey300};
                border-radius: 10px;
                background: #ffffff;
                color: ${adaptive.grey900};
                outline: none;
                -webkit-appearance: none;
                appearance: none;
                box-sizing: border-box;
                transition: border-color 0.12s ease;
                :focus {
                  border-color: ${adaptive.blue500};
                }
              `}
            />
          ))}
        </div>

        <div>
          <label
            css={css`
              display: block;
              font-size: 13px;
              font-weight: 700;
              color: ${adaptive.grey700};
              margin-bottom: 6px;
            `}
          >
            부모님을 뭐라고 부를까요? (선택)
          </label>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="어머니, 아버지 등"
            css={css`
              width: 100%;
              padding: 12px 14px;
              border: 1.5px solid ${adaptive.grey300};
              border-radius: 12px;
              font-size: var(--font-body);
              font-family: inherit;
              outline: none;
              :focus {
                border-color: ${adaptive.blue500};
              }
            `}
          />
        </div>

        {error && (
          <div
            css={css`
              padding: 12px 14px;
              background: #fff5f5;
              border: 1px solid #ffd6d6;
              border-radius: 10px;
              color: #d62300;
              font-weight: 700;
              font-size: 13px;
            `}
          >
            {error}
          </div>
        )}

        <button
          type="button"
          disabled={loading}
          onClick={submit}
          css={css`
            margin-top: auto;
            padding: 16px;
            border: none;
            border-radius: 14px;
            background: ${adaptive.blue500};
            color: #ffffff;
            font-size: var(--font-button);
            font-weight: 900;
            font-family: inherit;
            cursor: pointer;
            opacity: ${loading ? 0.5 : 1};
            -webkit-tap-highlight-color: transparent;
            :active {
              filter: brightness(0.92);
            }
          `}
        >
          {loading ? "연결 중..." : "부모님과 연결하기"}
        </button>
      </div>
    </div>
  );
}
