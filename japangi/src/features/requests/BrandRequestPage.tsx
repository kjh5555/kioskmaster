import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Top } from "@toss/tds-mobile";
import { useEffect, useState } from "react";

import { BackButton } from "../../components/BackButton";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { api, type ApiBrandRequest } from "../../lib/api";

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  received: { label: "접수", color: "#6b7684" },
  in_progress: { label: "제작 중", color: "#3182f6" },
  live: { label: "공개 완료", color: "#1f9d3e" },
  rejected: { label: "거절", color: "#e4002b" },
};

export function BrandRequestPage(): React.ReactElement {
  const { externalId, role } = useCurrentUser();
  const [brandName, setBrandName] = useState("");
  const [branch, setBranch] = useState("");
  const [categoryHint, setCategoryHint] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [mine, setMine] = useState<ApiBrandRequest[]>([]);

  async function loadMine() {
    try {
      const list = await api.listMyBrandRequests(externalId);
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
    if (!brandName.trim()) {
      setError("키오스크 이름을 적어주세요.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await api.submitBrandRequest({
        external_id: externalId,
        brand_name: brandName.trim(),
        branch: branch.trim() || null,
        category_hint: categoryHint.trim() || null,
        description: description.trim() || null,
      });
      setSuccess(true);
      setBrandName("");
      setBranch("");
      setCategoryHint("");
      setDescription("");
      await loadMine();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSubmitting(false);
    }
  }

  const backTo = role === "guardian" ? "/guardian" : "/";

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
        <BackButton to={backTo} />
      </div>

      <Top
        upperGap={0}
        title={<Top.TitleParagraph>키오스크 추가 요청</Top.TitleParagraph>}
        subtitleBottom={
          <Top.SubtitleParagraph
            css={css`color: ${adaptive.grey700};`}
          >
            연습하고 싶은 키오스크를 알려주시면 만들어드릴게요.
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
            `}
          >
            ✅ 요청을 보냈어요! 진행 상황은 아래 목록에서 확인하실 수 있어요.
          </div>
        )}

        <Field label="키오스크 이름 *">
          <input
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="예: 스타벅스, 강남구청, KTX 발매기"
            css={inputCss}
          />
        </Field>

        <Field label="지점 / 위치 (선택)">
          <input
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            placeholder="예: 잠실역점, 강남구청 본관"
            css={inputCss}
          />
        </Field>

        <Field label="종류 (선택)">
          <input
            value={categoryHint}
            onChange={(e) => setCategoryHint(e.target.value)}
            placeholder="예: 카페, 공공기관, 교통, 병원"
            css={inputCss}
          />
        </Field>

        <Field label="설명 (선택)">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="화면이 복잡한 단계, 어려운 부분 등을 자유롭게 적어주세요"
            rows={3}
            css={[
              inputCss,
              css`
                resize: vertical;
                line-height: 1.5;
              `,
            ]}
          />
        </Field>

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
          disabled={submitting}
          onClick={submit}
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
            opacity: ${submitting ? 0.5 : 1};
            -webkit-tap-highlight-color: transparent;
            :active {
              filter: brightness(0.92);
            }
          `}
        >
          {submitting ? "보내는 중..." : "요청 보내기"}
        </button>

        {/* My requests */}
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
              내가 보낸 요청
            </div>
            {mine.map((r) => {
              const s = STATUS_LABEL[r.status] ?? STATUS_LABEL.received;
              return (
                <div
                  key={r.id}
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
                        font-size: var(--font-body);
                        font-weight: 800;
                        color: ${adaptive.grey900};
                      `}
                    >
                      {r.brand_name}
                      {r.branch && ` · ${r.branch}`}
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
                  {r.operator_note && (
                    <div
                      css={css`
                        font-size: 12px;
                        color: ${adaptive.grey600};
                        line-height: 1.4;
                      `}
                    >
                      💬 {r.operator_note}
                    </div>
                  )}
                  <span
                    css={css`
                      font-size: 10px;
                      color: ${adaptive.grey400};
                    `}
                  >
                    {new Date(r.created_at).toLocaleString("ko-KR")}
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

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        css={css`
          display: block;
          font-size: 12px;
          font-weight: 800;
          color: ${adaptive.grey700};
          margin-bottom: 6px;
        `}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

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
