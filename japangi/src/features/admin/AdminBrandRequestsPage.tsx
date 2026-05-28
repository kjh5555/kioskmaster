import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Top } from "@toss/tds-mobile";
import { useEffect, useState } from "react";

import { BackButton } from "../../components/BackButton";
import type { ApiBrandRequest } from "../../lib/api";

const BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";
const TOKEN_KEY = "japangi:adminToken";

const STATUS_OPTIONS = [
  { value: "received", label: "접수", color: "#6b7684" },
  { value: "in_progress", label: "제작 중", color: "#3182f6" },
  { value: "live", label: "공개 완료", color: "#1f9d3e" },
  { value: "rejected", label: "거절", color: "#e4002b" },
];

async function adminFetch<T>(
  path: string,
  token: string,
  init: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Admin-Token": token,
    },
  });
  if (!res.ok) {
    let detail = "";
    try {
      const j = await res.json();
      detail = typeof j?.detail === "string" ? j.detail : "";
    } catch {
      // ignore
    }
    throw new Error(detail || `${path} ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function AdminBrandRequestsPage(): React.ReactElement {
  const [token, setToken] = useState<string>(() => {
    try {
      return localStorage.getItem(TOKEN_KEY) ?? "";
    } catch {
      return "";
    }
  });
  const [tokenInput, setTokenInput] = useState("");
  const [rows, setRows] = useState<ApiBrandRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");

  async function loadAll(t: string, statusFilter: string) {
    setLoading(true);
    setError(null);
    try {
      const path = statusFilter
        ? `/api/brand-requests/admin/all?status=${statusFilter}`
        : "/api/brand-requests/admin/all";
      const list = await adminFetch<ApiBrandRequest[]>(path, t);
      setRows(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      if (e instanceof Error && /401|Unauthorized/i.test(e.message)) {
        // bad token — clear it so we re-prompt
        setToken("");
        try {
          localStorage.removeItem(TOKEN_KEY);
        } catch {
          // ignore
        }
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) void loadAll(token, filter);
  }, [token, filter]);

  async function updateRow(
    id: number,
    patch: { status?: string; operator_note?: string },
  ) {
    try {
      const updated = await adminFetch<ApiBrandRequest>(
        `/api/brand-requests/admin/${id}`,
        token,
        { method: "PATCH", body: JSON.stringify(patch) },
      );
      setRows((prev) =>
        prev.map((r) => (r.id === id ? updated : r)),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }

  // ── Token gate ────────────────────────────────────────────────────────────
  if (!token) {
    return (
      <div css={pageCss}>
        <div css={css`padding: 0 4px;`}>
          <BackButton to="/" />
        </div>
        <Top
          upperGap={0}
          title={<Top.TitleParagraph>운영자 로그인</Top.TitleParagraph>}
        />
        <div
          css={css`
            padding: 16px 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
          `}
        >
          <label css={labelCss}>관리자 토큰</label>
          <input
            type="password"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="X-Admin-Token"
            css={inputCss}
          />
          <button
            type="button"
            onClick={() => {
              if (!tokenInput.trim()) return;
              try {
                localStorage.setItem(TOKEN_KEY, tokenInput.trim());
              } catch {
                // ignore
              }
              setToken(tokenInput.trim());
            }}
            css={primaryBtnCss}
          >
            로그인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div css={pageCss}>
      <div css={css`padding: 0 4px;`}>
        <BackButton to="/" />
      </div>
      <Top
        upperGap={0}
        title={<Top.TitleParagraph>운영자 패널 — 키오스크 요청</Top.TitleParagraph>}
        right={
          <Top.RightButton
            onClick={() => {
              try {
                localStorage.removeItem(TOKEN_KEY);
              } catch {
                // ignore
              }
              setToken("");
            }}
          >
            로그아웃
          </Top.RightButton>
        }
      />

      <div
        css={css`
          padding: 0 16px 12px;
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        `}
      >
        {[
          { value: "", label: "전체" },
          ...STATUS_OPTIONS,
        ].map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setFilter(opt.value)}
            css={[chipCss, filter === opt.value && chipActiveCss]}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div
        css={css`
          flex: 1;
          min-height: 0;
          padding: 0 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        `}
      >
        {loading && (
          <div css={infoCss}>불러오는 중...</div>
        )}
        {error && (
          <div css={errorCss}>{error}</div>
        )}
        {!loading && rows.length === 0 && !error && (
          <div css={infoCss}>요청이 없어요.</div>
        )}
        {rows.map((r) => {
          const s =
            STATUS_OPTIONS.find((o) => o.value === r.status) ??
            STATUS_OPTIONS[0];
          return (
            <div
              key={r.id}
              css={css`
                padding: 14px;
                background: #ffffff;
                border: 1px solid ${adaptive.grey200};
                border-radius: 14px;
                display: flex;
                flex-direction: column;
                gap: 8px;
              `}
            >
              <div
                css={css`
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  gap: 8px;
                `}
              >
                <span
                  css={css`
                    font-size: var(--font-body);
                    font-weight: 900;
                    color: ${adaptive.grey900};
                  `}
                >
                  #{r.id} {r.brand_name}
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
              {r.category_hint && (
                <div
                  css={css`
                    font-size: 11px;
                    color: ${adaptive.grey600};
                    font-weight: 700;
                  `}
                >
                  종류: {r.category_hint}
                </div>
              )}
              {r.description && (
                <div
                  css={css`
                    font-size: 13px;
                    color: ${adaptive.grey700};
                    line-height: 1.4;
                    white-space: pre-wrap;
                  `}
                >
                  {r.description}
                </div>
              )}
              <div
                css={css`
                  display: flex;
                  flex-wrap: wrap;
                  gap: 4px;
                `}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => updateRow(r.id, { status: opt.value })}
                    css={[
                      miniChipCss,
                      r.status === opt.value &&
                        css`
                          background: ${opt.color};
                          color: #ffffff;
                          border-color: ${opt.color};
                        `,
                    ]}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <textarea
                rows={2}
                defaultValue={r.operator_note ?? ""}
                onBlur={(e) => {
                  const v = e.target.value;
                  if (v !== (r.operator_note ?? "")) {
                    void updateRow(r.id, { operator_note: v });
                  }
                }}
                placeholder="운영자 메모 (포커스 떠나면 저장)"
                css={[
                  inputCss,
                  css`
                    resize: vertical;
                    font-size: 12px;
                    line-height: 1.4;
                  `,
                ]}
              />
              <span
                css={css`
                  font-size: 10px;
                  color: ${adaptive.grey400};
                `}
              >
                작성 {new Date(r.created_at).toLocaleString("ko-KR")} · 갱신{" "}
                {new Date(r.updated_at).toLocaleString("ko-KR")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── shared styles ─────────────────────────────────────────────────────────────

const pageCss = css`
  height: 100dvh;
  max-height: 100dvh;
  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 16px);
  display: flex;
  flex-direction: column;
  background: ${adaptive.background};
  overflow: hidden;
`;

const labelCss = css`
  font-size: 12px;
  font-weight: 800;
  color: ${adaptive.grey700};
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

const primaryBtnCss = css`
  padding: 14px 16px;
  border: none;
  border-radius: 14px;
  background: ${adaptive.blue500};
  color: #ffffff;
  font-size: var(--font-button);
  font-weight: 900;
  font-family: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  :active {
    filter: brightness(0.92);
  }
`;

const chipCss = css`
  padding: 6px 14px;
  border-radius: 999px;
  border: 1.5px solid ${adaptive.grey300};
  background: #ffffff;
  color: ${adaptive.grey900};
  font-size: 12px;
  font-weight: 800;
  font-family: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const chipActiveCss = css`
  background: ${adaptive.blue500};
  color: #ffffff;
  border-color: ${adaptive.blue500};
`;

const miniChipCss = css`
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid ${adaptive.grey300};
  background: #ffffff;
  color: ${adaptive.grey700};
  font-size: 11px;
  font-weight: 800;
  font-family: inherit;
  cursor: pointer;
`;

const infoCss = css`
  padding: 24px;
  text-align: center;
  color: ${adaptive.grey500};
  font-size: 13px;
`;

const errorCss = css`
  padding: 12px 14px;
  background: #fff5f5;
  border: 1px solid #ffd6d6;
  border-radius: 10px;
  color: #d62300;
  font-weight: 700;
  font-size: 13px;
`;
