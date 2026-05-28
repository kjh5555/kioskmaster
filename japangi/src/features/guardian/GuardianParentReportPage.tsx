import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Top } from "@toss/tds-mobile";
import { useNavigate, useParams } from "react-router-dom";

import { BackButton } from "../../components/BackButton";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useParentReport } from "../../hooks/useKioskQueries";

export function GuardianParentReportPage(): React.ReactElement {
  const { parentExternalId = "" } = useParams<{ parentExternalId: string }>();
  const navigate = useNavigate();
  const { externalId } = useCurrentUser();
  const { data, isLoading, error } = useParentReport(externalId, parentExternalId);

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
        title={
          <Top.TitleParagraph>
            {data?.nickname ?? data?.parent_display_name ?? "부모님"}의 연습 기록
          </Top.TitleParagraph>
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
        {isLoading && (
          <div css={loadingStyle}>불러오는 중...</div>
        )}
        {error && (
          <div css={loadingStyle}>
            {error instanceof Error ? error.message : "오류가 발생했어요."}
          </div>
        )}
        {data && (
          <>
            {/* Summary cards */}
            <div
              css={css`
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
              `}
            >
              <StatCard
                label="이번 주"
                value={`${data.this_week_count}번`}
                accent={adaptive.blue500}
              />
              <StatCard
                label="누적 성공"
                value={`${data.total_success}/${data.total_attempts}`}
                accent="#1f9d3e"
              />
            </div>

            {/* Curate button */}
            <button
              type="button"
              onClick={() =>
                navigate(`/guardian/parent/${parentExternalId}/curate`)
              }
              css={css`
                margin-top: 8px;
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
              `}
            >
              ⭐ 부모님 화면 즐겨찾기 설정
            </button>

            {/* By brand */}
            <SectionHeader>브랜드별 기록</SectionHeader>
            {Object.keys(data.by_brand).length === 0 ? (
              <div css={loadingStyle}>아직 연습 기록이 없어요.</div>
            ) : (
              Object.entries(data.by_brand).map(([brand, b]) => (
                <div key={brand} css={brandRow}>
                  <span css={brandName}>{brand}</span>
                  <span css={brandStats}>
                    {b.success}/{b.attempts}번 성공
                  </span>
                </div>
              ))
            )}

            {/* Recent attempts */}
            <SectionHeader>최근 연습</SectionHeader>
            {data.recent.length === 0 ? (
              <div css={loadingStyle}>아직 연습 기록이 없어요.</div>
            ) : (
              data.recent.map((r, i) => (
                <div key={i} css={brandRow}>
                  <span css={brandName}>
                    {r.success ? "✅" : "❌"} {r.brand_slug}
                  </span>
                  <span css={brandStats}>
                    {new Date(r.started_at).toLocaleString("ko-KR", {
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div
      css={css`
        padding: 16px;
        background: #ffffff;
        border: 1.5px solid ${adaptive.grey200};
        border-radius: 14px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      `}
    >
      <span
        css={css`
          font-size: 12px;
          color: ${adaptive.grey600};
          font-weight: 700;
        `}
      >
        {label}
      </span>
      <span
        css={css`
          font-size: clamp(22px, 6vw, 28px);
          font-weight: 900;
          color: ${accent};
        `}
      >
        {value}
      </span>
    </div>
  );
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div
      css={css`
        padding: 8px 4px 4px;
        font-size: 13px;
        font-weight: 900;
        color: ${adaptive.grey700};
      `}
    >
      {children}
    </div>
  );
}

const loadingStyle = css`
  text-align: center;
  padding: 24px;
  color: ${adaptive.grey500};
`;

const brandRow = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background: #ffffff;
  border: 1px solid ${adaptive.grey200};
  border-radius: 12px;
`;

const brandName = css`
  font-size: var(--font-body);
  font-weight: 700;
  color: ${adaptive.grey900};
`;

const brandStats = css`
  font-size: 12px;
  color: ${adaptive.grey600};
  font-weight: 700;
`;
