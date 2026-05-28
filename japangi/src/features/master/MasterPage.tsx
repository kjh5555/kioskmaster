import { css } from "@emotion/react";
import { adaptive } from "@toss/tds-colors";
import { Top } from "@toss/tds-mobile";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCurrentUser } from "../../hooks/useCurrentUser";
import { api } from "../../lib/api";
import { queryClient } from "../../lib/queryClient";

export function MasterPage(): React.ReactElement {
  const navigate = useNavigate();
  const { externalId, role, roleConfirmed, setRole } = useCurrentUser();
  const [seedBusy, setSeedBusy] = useState(false);
  const [seedMsg, setSeedMsg] = useState<string | null>(null);

  async function switchRoleAndGo(to: "elderly" | "guardian") {
    await setRole(to);
    navigate(to === "elderly" ? "/" : "/guardian");
  }

  async function seedTestFamily() {
    setSeedBusy(true);
    setSeedMsg(null);
    try {
      // Make sure the current device is registered as a guardian first.
      if (role !== "guardian") {
        await setRole("guardian");
      }
      const res = await api.devSeedFamily({
        child_external_id: externalId,
        parent_display_name: "테스트 부모",
        nickname: "어머니",
      });
      await queryClient.invalidateQueries({
        queryKey: ["my-parents", externalId],
      });
      setSeedMsg(
        `✅ 가짜 부모 '${res.nickname}' 연결 완료. 시도 ${res.attempts_created}개 생성됨.`,
      );
    } catch (e) {
      setSeedMsg(
        `❌ 실패: ${e instanceof Error ? e.message : String(e)}`,
      );
    } finally {
      setSeedBusy(false);
    }
  }

  function resetAll() {
    if (!confirm("정말 모든 로컬 데이터를 지울까요? (역할/디바이스 ID/토큰 등 모두 초기화)")) {
      return;
    }
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
    location.href = "/";
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
        background: #1a1f25;
        color: #ffffff;
        overflow: hidden;
      `}
    >
      <Top
        upperGap={env(0)}
        title={
          <Top.TitleParagraph
            css={css`color: #ffffff;`}
          >
            🛠 테스터 마스터
          </Top.TitleParagraph>
        }
        subtitleBottom={
          <Top.SubtitleParagraph css={css`color: #c9cdd2;`}>
            모든 화면을 빠르게 확인하기 위한 개발용 페이지
          </Top.SubtitleParagraph>
        }
      />

      <div
        css={css`
          flex: 1;
          min-height: 0;
          padding: 0 16px 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        `}
      >
        {/* Current state */}
        <Section title="현재 상태">
          <KV k="externalId (device)" v={externalId} mono />
          <KV
            k="role"
            v={role === "elderly" ? "👴 노인 (내가 연습)" : "👨‍👩‍👧 자식 (보호자)"}
          />
          <KV
            k="roleConfirmed"
            v={roleConfirmed ? "✅ 확정됨" : "❌ 미확정 (첫 진입 화면 표시)"}
          />
        </Section>

        {/* Role switch */}
        <Section title="역할 전환 + 홈 이동">
          <div
            css={css`
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 8px;
            `}
          >
            <ActionBtn
              variant={role === "elderly" ? "primary" : "outline"}
              onClick={() => switchRoleAndGo("elderly")}
            >
              👴 노인 홈으로
            </ActionBtn>
            <ActionBtn
              variant={role === "guardian" ? "primary" : "outline"}
              onClick={() => switchRoleAndGo("guardian")}
            >
              👨‍👩‍👧 자식 홈으로
            </ActionBtn>
          </div>
        </Section>

        {/* Direct navigation */}
        <Section title="모든 화면 바로가기">
          <Grid>
            <NavBtn onClick={() => navigate("/role-select")}>
              역할 선택 화면
            </NavBtn>
            <NavBtn onClick={() => navigate("/")}>노인 홈</NavBtn>
            <NavBtn onClick={() => navigate("/guardian")}>자식 홈</NavBtn>
            <NavBtn onClick={() => navigate("/settings")}>설정</NavBtn>
            <NavBtn onClick={() => navigate("/pair")}>
              가족 연결 (부모용 6자리 코드)
            </NavBtn>
            <NavBtn onClick={() => navigate("/guardian/pair")}>
              가족 연결 (자식용 코드 입력)
            </NavBtn>
            <NavBtn onClick={() => navigate("/requests")}>
              키오스크 요청 제출
            </NavBtn>
            <NavBtn onClick={() => navigate("/admin/brand-requests")}>
              운영자 패널 (요청 관리)
            </NavBtn>
          </Grid>
        </Section>

        {/* Scenarios */}
        <Section title="시나리오 빠른 진입 (햄버거)">
          <Grid>
            {[
              { slug: "mcdonalds", label: "🍔 맥도날드" },
              { slug: "burgerking", label: "👑 버거킹" },
              { slug: "lotteria", label: "🏷️ 롯데리아" },
              { slug: "kfc", label: "🍗 KFC" },
            ].map((b) => (
              <NavBtn
                key={b.slug}
                onClick={() => navigate(`/scenario/fastfood/${b.slug}/intro`)}
              >
                {b.label}
              </NavBtn>
            ))}
          </Grid>
        </Section>

        {/* Seed test family */}
        <Section title="테스트 도구">
          <ActionBtn
            variant="primary"
            onClick={seedTestFamily}
            // @ts-expect-error disabled prop pass-through is fine here
            disabled={seedBusy}
          >
            {seedBusy
              ? "만드는 중..."
              : "🧪 테스트 부모 즉시 연결 (가짜 기록 5개 포함)"}
          </ActionBtn>
          {seedMsg && (
            <div
              css={css`
                font-size: 12px;
                font-weight: 700;
                color: ${seedMsg.startsWith("✅") ? "#4ade80" : "#ff8a80"};
                line-height: 1.4;
              `}
            >
              {seedMsg}
            </div>
          )}
          <div
            css={css`
              font-size: 11px;
              color: #8b95a1;
              line-height: 1.4;
            `}
          >
            현재 device를 자식 모드로 두고, 가짜 부모 user를 만들어 즉시
            연결합니다. 자식 홈에서 부모 카드/보고서/즐겨찾기 화면 모두
            확인 가능.
          </div>
        </Section>

        {/* Reset */}
        <Section title="초기화">
          <ActionBtn variant="danger" onClick={resetAll}>
            🧹 모든 로컬 데이터 초기화 (역할/디바이스ID/토큰)
          </ActionBtn>
        </Section>
      </div>
    </div>
  );
}

function env(v: number) {
  return v;
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      css={css`
        background: #232a32;
        border: 1px solid #2f3a45;
        border-radius: 14px;
        padding: 14px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      `}
    >
      <div
        css={css`
          font-size: 12px;
          font-weight: 900;
          color: #8b95a1;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        `}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function KV({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        font-size: 12px;
      `}
    >
      <span css={css`color: #8b95a1;`}>{k}</span>
      <span
        css={css`
          color: #ffffff;
          font-weight: 700;
          ${mono &&
          css`
            font-family: "SF Mono", "Menlo", "Consolas", monospace;
            font-size: 11px;
          `}
          text-align: right;
          word-break: break-all;
        `}
      >
        {v}
      </span>
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6px;
      `}
    >
      {children}
    </div>
  );
}

function NavBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      css={css`
        padding: 12px 10px;
        background: #2f3a45;
        border: 1px solid #3d4a57;
        border-radius: 10px;
        color: #ffffff;
        font-size: 12px;
        font-weight: 700;
        font-family: inherit;
        cursor: pointer;
        text-align: left;
        -webkit-tap-highlight-color: transparent;
        :active {
          background: #3d4a57;
        }
      `}
    >
      {children}
    </button>
  );
}

function ActionBtn({
  children,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "outline" | "danger";
}) {
  const styles = {
    primary: css`
      background: ${adaptive.blue500};
      color: #ffffff;
      border: 1.5px solid ${adaptive.blue500};
    `,
    outline: css`
      background: transparent;
      color: #c9cdd2;
      border: 1.5px solid #3d4a57;
    `,
    danger: css`
      background: #4a1a1a;
      color: #ff8a80;
      border: 1.5px solid #6b2424;
    `,
  } as const;
  return (
    <button
      type="button"
      onClick={onClick}
      css={[
        css`
          padding: 12px 14px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 800;
          font-family: inherit;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          :active {
            filter: brightness(0.92);
          }
        `,
        styles[variant],
      ]}
    >
      {children}
    </button>
  );
}
