import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Top } from "@toss/tds-mobile";
import { useEffect, useState } from "react";

import { BackButton } from "../../components/BackButton";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { api, type ApiPairingCode } from "../../lib/api";

export function ParentPairingPage(): React.ReactElement {
  const { externalId } = useCurrentUser();
  const [data, setData] = useState<ApiPairingCode | null>(null);
  const [remaining, setRemaining] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function issueCode() {
    setLoading(true);
    setError(null);
    try {
      const res = await api.startPairing(externalId);
      setData(res);
      const ms = new Date(res.expires_at).getTime() - Date.now();
      setRemaining(Math.max(0, Math.floor(ms / 1000)));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void issueCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (remaining <= 0) return;
    const t = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(t);
  }, [remaining]);

  const expired = data !== null && remaining <= 0;

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
        <BackButton to="/" />
      </div>

      <Top
        upperGap={0}
        title={<Top.TitleParagraph>가족에게 보여줄 코드</Top.TitleParagraph>}
        subtitleBottom={
          <Top.SubtitleParagraph
            css={css`color: ${adaptive.grey700};`}
          >
            자녀분에게 아래 숫자를 알려주세요.
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
          align-items: center;
          justify-content: center;
          gap: clamp(16px, 4vw, 24px);
          overflow-y: auto;
        `}
      >
        {error && (
          <div css={errorBox}>{error}</div>
        )}

        <div
          css={css`
            background: #ffffff;
            border: 3px solid ${expired ? adaptive.grey300 : adaptive.blue500};
            border-radius: 24px;
            padding: clamp(28px, 8vw, 40px) clamp(20px, 6vw, 32px);
            box-shadow: 0 8px 28px rgba(50, 130, 246, 0.15);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            width: 100%;
            max-width: 360px;
          `}
        >
          <span
            css={css`
              font-size: 14px;
              color: ${adaptive.grey600};
              font-weight: 800;
            `}
          >
            6자리 코드
          </span>
          <span
            css={css`
              font-size: clamp(48px, 14vw, 64px);
              font-weight: 900;
              color: ${expired ? adaptive.grey400 : adaptive.blue700};
              letter-spacing: 0.18em;
              font-family:
                "SF Mono",
                "Menlo",
                "Consolas",
                monospace;
              padding-left: 0.18em;
            `}
          >
            {loading ? "..." : data?.code ?? "------"}
          </span>
          <span
            css={css`
              font-size: 13px;
              font-weight: 700;
              color: ${expired ? "#e4002b" : adaptive.grey500};
            `}
          >
            {expired
              ? "코드가 만료됐어요. 새로 받아주세요."
              : `${Math.floor(remaining / 60)}분 ${remaining % 60}초 남음`}
          </span>
        </div>

        <button
          type="button"
          onClick={issueCode}
          disabled={loading}
          css={css`
            padding: 14px 28px;
            border-radius: 999px;
            border: 1.5px solid ${adaptive.grey300};
            background: #ffffff;
            font-size: var(--font-body);
            font-weight: 800;
            color: ${adaptive.grey900};
            cursor: pointer;
            font-family: inherit;
            opacity: ${loading ? 0.5 : 1};
            -webkit-tap-highlight-color: transparent;
            :active {
              transform: scale(0.98);
            }
          `}
        >
          🔄 새 코드 받기
        </button>

        <div
          css={css`
            text-align: center;
            font-size: 13px;
            color: ${adaptive.grey600};
            line-height: 1.5;
            padding: 0 8px;
          `}
        >
          자녀분이 이 코드를 입력하면 연결돼요.
          <br />
          한 번 연결되면 다시 입력할 필요는 없어요.
        </div>
      </div>
    </div>
  );
}

const errorBox = css`
  padding: 12px 16px;
  background: #fff5f5;
  border: 1px solid #ffd6d6;
  border-radius: 10px;
  color: #d62300;
  font-weight: 700;
  font-size: 13px;
  width: 100%;
  max-width: 360px;
  text-align: center;
`;
