import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Top } from "@toss/tds-mobile";
import { useEffect, useState } from "react";

import { BackButton } from "../../components/BackButton";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { api, type ApiFeedback } from "../../lib/api";

type Category = "bug" | "feature" | "other";

const CATEGORY_LABEL: Record<Category, { emoji: string; label: string }> = {
  bug: { emoji: "🐞", label: "오류 / 버그" },
  feature: { emoji: "✨", label: "이런 기능이 있으면 좋겠어요" },
  other: { emoji: "💬", label: "그 외 의견" },
};

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  new: { label: "접수", color: "#6b7684" },
  read: { label: "확인 완료", color: "#3182f6" },
  resolved: { label: "반영", color: "#1f9d3e" },
};

export function FeedbackPage(): React.ReactElement {
  const { externalId } = useCurrentUser();
  const [category, setCategory] = useState<Category>("other");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [mine, setMine] = useState<ApiFeedback[]>([]);

  async function loadMine() {
    try {
      const list = await api.listMyFeedback(externalId);
      setMine(list);
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    void loadMine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalId]);

  async function submit() {
    if (!message.trim()) {
      setError("내용을 적어주세요.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await api.submitFeedback({
        external_id: externalId,
        category,
        message: message.trim(),
        contact: contact.trim() || null,
      });
      setSuccess(true);
      setMessage("");
      setContact("");
      await loadMine();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
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
        <BackButton to="/settings" />
      </div>

      <Top
        upperGap={0}
        title={<Top.TitleParagraph>의견 보내기</Top.TitleParagraph>}
        subtitleBottom={
          <Top.SubtitleParagraph
            css={css`color: ${adaptive.grey700};`}
          >
            불편한 점, 바라는 기능, 칭찬 모두 환영해요.
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
          gap: 12px;
          overflow-y: auto;
        `}
      >
        {success && (
          <div
            css={css`
              padding: 12px 14px;
              background: #e9f7ec;
              border: 1px solid #b3e0bd;
              border-radius: 12px;
              color: #1f7a3a;
              font-size: 13px;
              font-weight: 700;
              line-height: 1.4;
            `}
          >
            ✅ 보내주신 의견 잘 받았어요! 빠르게 확인하고 반영할게요.
          </div>
        )}

        {/* Category selector */}
        <div>
          <label css={labelCss}>어떤 의견인가요?</label>
          <div
            css={css`
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 8px;
              padding-top: 6px;
            `}
          >
            {(Object.keys(CATEGORY_LABEL) as Category[]).map((c) => {
              const active = c === category;
              const def = CATEGORY_LABEL[c];
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  css={css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 6px;
                    padding: 12px 6px;
                    border-radius: 12px;
                    background: ${active
                      ? adaptive.blue50
                      : adaptive.greyBackground};
                    border: 2px solid
                      ${active ? adaptive.blue500 : "transparent"};
                    cursor: pointer;
                    font-family: inherit;
                    -webkit-tap-highlight-color: transparent;
                    :active {
                      transform: scale(0.97);
                    }
                  `}
                >
                  <span style={{ fontSize: 22 }}>{def.emoji}</span>
                  <span
                    css={css`
                      font-size: 11px;
                      font-weight: 800;
                      color: ${active ? adaptive.blue700 : adaptive.grey900};
                      line-height: 1.2;
                      text-align: center;
                      word-break: keep-all;
                    `}
                  >
                    {def.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label css={labelCss}>내용 *</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="어떤 부분이 어려우셨나요? 어떤 기능이 있으면 좋을까요?"
            rows={5}
            css={[
              inputCss,
              css`
                resize: vertical;
                line-height: 1.5;
                min-height: 100px;
              `,
            ]}
          />
        </div>

        <div>
          <label css={labelCss}>연락처 (선택)</label>
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="답변 받을 이메일/전화번호 (없어도 돼요)"
            css={inputCss}
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
          onClick={submit}
          disabled={busy}
          css={css`
            padding: 14px 16px;
            border: none;
            border-radius: 14px;
            background: ${adaptive.blue500};
            color: #ffffff;
            font-size: var(--font-button);
            font-weight: 900;
            font-family: inherit;
            cursor: pointer;
            opacity: ${busy ? 0.5 : 1};
            -webkit-tap-highlight-color: transparent;
            :active {
              filter: brightness(0.92);
            }
          `}
        >
          {busy ? "보내는 중..." : "보내기"}
        </button>

        {/* My feedback history */}
        {mine.length > 0 && (
          <>
            <div
              css={css`
                padding: 12px 4px 4px;
                font-size: 13px;
                font-weight: 900;
                color: ${adaptive.grey700};
              `}
            >
              내가 보낸 의견
            </div>
            {mine.map((f) => {
              const def = (CATEGORY_LABEL as Record<string, { emoji: string; label: string }>)[f.category] ?? CATEGORY_LABEL.other;
              const s = STATUS_LABEL[f.status] ?? STATUS_LABEL.new;
              return (
                <div
                  key={f.id}
                  css={css`
                    padding: 12px 14px;
                    background: #ffffff;
                    border: 1px solid ${adaptive.grey200};
                    border-radius: 12px;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                  `}
                >
                  <div
                    css={css`
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                    `}
                  >
                    <span
                      css={css`
                        font-size: 12px;
                        font-weight: 800;
                        color: ${adaptive.grey700};
                      `}
                    >
                      {def.emoji} {def.label}
                    </span>
                    <span
                      css={css`
                        font-size: 11px;
                        font-weight: 900;
                        color: ${s.color};
                      `}
                    >
                      {s.label}
                    </span>
                  </div>
                  <div
                    css={css`
                      font-size: 13px;
                      color: ${adaptive.grey900};
                      line-height: 1.5;
                      white-space: pre-wrap;
                    `}
                  >
                    {f.message}
                  </div>
                  {f.operator_note && (
                    <div
                      css={css`
                        font-size: 12px;
                        color: ${adaptive.blue700};
                        line-height: 1.4;
                        padding-top: 4px;
                      `}
                    >
                      💬 {f.operator_note}
                    </div>
                  )}
                  <span
                    css={css`
                      font-size: 10px;
                      color: ${adaptive.grey400};
                    `}
                  >
                    {new Date(f.created_at).toLocaleString("ko-KR")}
                  </span>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

const labelCss = css`
  display: block;
  font-size: 12px;
  font-weight: 800;
  color: ${adaptive.grey700};
  margin-bottom: 6px;
`;

const inputCss = css`
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid ${adaptive.grey300};
  border-radius: 12px;
  font-size: var(--font-body);
  font-family: inherit;
  outline: none;
  background: #ffffff;
  :focus {
    border-color: ${adaptive.blue500};
  }
`;
