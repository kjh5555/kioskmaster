# M1 — 셋업 & 뼈대 (자판기 어렵지않아요)

> 마일스톤 ID: **M1**
> 코드네임: `japangi-skeleton`
> 작성일: 2026-05-21
> 출처 PRD: `docs/PRD.md` (§12 마일스톤, §8 기술 스택, §7 접근성)
> 원칙: Karpathy 4원칙 — ① Think Before Coding ② Simplicity First ③ Surgical Changes ④ Goal-Driven Execution

---

## 1. 목표 (M1이 끝났을 때의 상태)

M1은 **빌드되고 실행되는 빈 골격**을 만드는 마일스톤이다. 시나리오 본체(주문 단계 11개 등)는 아직 없지만, **앱 셸이 토스 인앱 WebView에서 켜지고**, **4개 시나리오 라우트가 인트로/완료까지 모두 닫혀 있고**, **글씨 크기 토글이 실제로 동작**하는 상태가 되어야 한다. M2 이후의 모든 작업은 이 골격 위에서 "한 시나리오를 본체만 채워 넣으면 끝나는" 형태로 이어지도록 설계한다.

### 1.1 완료 체크리스트 (한눈 보기)

- [ ] `create-ait-app`으로 프로젝트 스캐폴딩 완료, 로컬 dev 서버가 켜진다
- [ ] `granite.config.ts`에 `appName: "japangi"`, `displayName: "자판기 어렵지않아요"` 설정
- [ ] TypeScript **strict** 모드 통과, ESLint 경고 0
- [ ] `TDSMobileAITProvider`로 앱이 감싸져 있고 TDS 컴포넌트가 정상 렌더링
- [ ] `react-router-dom`으로 다음 라우트가 동작: `/` (홈), `/settings`, `/scenario/:id/intro`, `/scenario/:id/step` (placeholder), `/scenario/:id/complete`
- [ ] 4개 공통 컴포넌트 구현: `PracticeBadge`, `BackButton`, `HelpOverlay`, `BigButton`
- [ ] 글씨 크기 3단계 토글이 동작하고 localStorage에 영속
- [ ] 홈 화면에 4개 시나리오 카드가 보이고, 각 카드 → 인트로 → placeholder 본체 → 완료 → 홈으로 순환
- [ ] Apps in Toss WebView 기본 처리(safe-area, 상태바, 하드웨어 뒤로가기)가 어색하지 않게 동작
- [ ] `npm run build` 무에러, `npm run lint` 무경고, `tsc --noEmit` 통과

---

## 2. 선행 조건

| 항목 | 권장값 / 비고 |
|---|---|
| Node.js | **v20 LTS 이상** *[확인 필요 — Apps in Toss 공식 가이드의 최소 Node 버전]* |
| 패키지 매니저 | `npm` (Apps in Toss 기본). yarn/pnpm 사용 시 `create-ait-app` 호환성 별도 확인 |
| OS | macOS 또는 Linux 권장 (현재 환경: macOS Darwin 25.1.0) |
| 토스 개발자 계정 | `create-ait-app` 실행 시 토스 개발자 로그인 또는 토큰 필요 가능성 *[확인 필요]* |
| 토스 인앱 가이드 | Apps in Toss 공식 문서 (`@apps-in-toss/web-framework`, `granite.config.ts` 스키마) *[확인 필요 — 공식 문서 링크 사용자 측 확보]* |
| 디자인 시스템 | `@toss/tds-mobile`, `@toss/tds-mobile-ait` (필수). 버전은 `create-ait-app` 기본값 유지 |
| Git | 작업 시작 전 `git init` 권장 (현재는 git repo 아님) |

> **불확실 항목 노출**: `create-ait-app`의 정확한 실행 명령과 옵션, 그리고 `granite.config.ts`가 지원하는 정확한 키 목록은 공식 문서를 확인하지 않은 상태다. Step 1·2에서 **공식 가이드 확인 → 그 결과로 본 문서를 즉시 갱신**하는 절차를 포함시킨다.

---

## 3. 작업 단계 (Step-by-step)

> 각 Step의 검증 기준은 "**5분 안에 명령 한두 개로 객관적으로 확인 가능**"하도록 설계되어 있다 (Karpathy #4).

---

### Step 1. `create-ait-app` 스캐폴딩

**목적**: Apps in Toss 공식 템플릿으로 프로젝트 셸을 생성하고 기본 dev 서버가 켜지는 상태 확보.

**입력**: 없음 (빈 프로젝트 루트)

**할 일**:
- 공식 가이드 확인 후 다음 형태의 명령 실행 *[정확한 형태 확인 필요]*:
  ```bash
  npx create-ait-app@latest japangi
  # 또는 npm create ait-app japangi
  ```
- 템플릿 선택지(React + TypeScript)가 나오면 React + TypeScript 선택
- 생성된 `japangi/` 디렉터리를 현재 프로젝트 루트(`/Users/jaehyeonkim/Desktop/code/Production/kiosk/`)에 **평탄화**해 옮긴다. (이미 `docs/`, `.omc/`, `CLAUDE.md`가 있으므로, 생성된 파일들을 루트로 머지)
- `npm install`
- `npm run dev` 실행해 dev 서버 기동 확인

**신규/수정 파일** (대표적인 것만, 실제 목록은 템플릿이 결정):
- `package.json` (신규)
- `vite.config.ts` (신규)
- `tsconfig.json` (신규)
- `index.html` (신규)
- `src/main.tsx` (신규)
- `src/App.tsx` (신규, 이후 Step에서 교체)
- `granite.config.ts` (신규, Step 2에서 내용 작성)

**검증 기준 (Karpathy #4)**:
- ✅ `npm run dev` 실행 후 로컬 호스트에서 기본 화면이 뜬다 (브라우저 또는 토스 시뮬레이터)
- ✅ `package.json`에 `@apps-in-toss/web-framework`, `@toss/tds-mobile`, `@toss/tds-mobile-ait`, `@emotion/react` 가 의존성으로 들어가 있다 (없으면 Step 4에서 추가하는 것이 아니라 템플릿 문제이므로 여기서 보강)
- ✅ `granite.config.ts` 파일이 존재한다

**예상 소요**: ~30~60분 (스캐폴딩 자체는 5분, 토스 로그인/토큰·환경 문제 디버깅 여유 포함)

**위임 권장 에이전트**: **자체 진행 (사용자 또는 메인 컨덕터)** — 외부 인증·CLI 상호작용이 있을 수 있어 에이전트보다 사람이 직접 수행 권장. 결과(생성된 파일 목록)만 다음 Step에 전달.

---

### Step 2. `granite.config.ts` 작성

**목적**: Apps in Toss가 미니앱을 인식·등록하는 메타 설정을 확정.

**입력**: Step 1의 빈 `granite.config.ts`

**할 일**:
- 공식 스키마 *[확인 필요]* 에 맞춰 최소 항목 작성:
  ```ts
  // granite.config.ts
  import { defineConfig } from '@apps-in-toss/web-framework/config';

  export default defineConfig({
    appName: 'japangi',                       // 내부 식별자
    displayName: '자판기 어렵지않아요',         // 사용자 노출명
    // icon: 'public/icons/app-icon.png',     // M1 후반 또는 M4 폴리싱
    // primaryColor: '#...',                  // M4에서 결정
    // orientation: 'portrait',               // 가로 미지원 (PRD §11.3)
    // minOsVersion: { ios: '?', android: '?' }, // [확인 필요]
  });
  ```
- 임시 아이콘은 64x64 단색 PNG로 `public/icons/app-icon.png`에 둠 (M4에서 정식 교체)

**신규/수정 파일**:
- `granite.config.ts` (수정)
- `public/icons/app-icon.png` (신규, placeholder)

**검증 기준 (Karpathy #4)**:
- ✅ `npm run dev` 재기동 시 콘솔에 config 관련 에러 없음
- ✅ 토스 시뮬레이터(또는 dev 환경)에서 `displayName`이 "자판기 어렵지않아요"로 표시
- ✅ `tsc --noEmit` 통과 (config 파일 타입 정합성)

**예상 소요**: ~20~40분 (공식 스키마 확인 시간 포함)

**위임 권장 에이전트**: **executor-low (haiku)** — 단순 설정 파일 한 개 수정. 다만 공식 스키마 확인은 본 컨덕터가 미리 해두고 그 결과를 프롬프트로 넘긴다.

---

### Step 3. TypeScript strict + ESLint/Prettier 설정 점검

**목적**: 골격 단계에서부터 strict 모드를 켜두면, 이후 마일스톤에서 타입 사고를 사전에 막을 수 있다 (Karpathy #1).

**입력**: Step 1이 만든 기본 tsconfig/eslintrc

**할 일**:
- `tsconfig.json`에서 다음 옵션 확인 및 활성화:
  - `"strict": true`
  - `"noUncheckedIndexedAccess": true`
  - `"exactOptionalPropertyTypes": true`
  - `"noFallthroughCasesInSwitch": true`
- ESLint 설정에서 다음 룰 확인:
  - `@typescript-eslint/no-explicit-any`: warn
  - `@typescript-eslint/consistent-type-imports`: warn
  - `react-hooks/exhaustive-deps`: warn
- Prettier는 토스 기본값 그대로 (Surgical Changes — 추가 커스터마이즈 금지)
- `package.json`에 스크립트 정리:
  ```json
  {
    "scripts": {
      "dev": "...",
      "build": "...",
      "lint": "eslint .",
      "typecheck": "tsc --noEmit",
      "preview": "..."
    }
  }
  ```

**신규/수정 파일**:
- `tsconfig.json` (수정)
- `.eslintrc.*` (수정)
- `package.json` (수정 — scripts만)

**검증 기준 (Karpathy #4)**:
- ✅ `npm run typecheck` 무에러
- ✅ `npm run lint` 무경고 (있다면 의도된 것만 명시 주석)
- ✅ `npm run build` 무에러

**예상 소요**: ~20분

**위임 권장 에이전트**: **executor-low (haiku)** — 설정 토글 위주, 위험도 낮음.

---

### Step 4. TDS Mobile 설치 및 `TDSMobileAITProvider` Wiring

**목적**: 디자인 시스템을 앱 루트에서 활성화. 이후 모든 화면이 TDS 컴포넌트를 그대로 사용 가능한 상태로 만든다.

**입력**: Step 1로 일부 의존성이 들어가 있을 수 있음. 누락 시 보강.

**할 일**:
- 의존성 확인 및 추가:
  ```bash
  npm install @toss/tds-mobile @toss/tds-mobile-ait @emotion/react
  ```
  *[확인 필요 — 정확한 패키지명·필요 의존성. `create-ait-app` 템플릿에 이미 포함되어 있을 가능성 높음]*
- `src/main.tsx`에서 앱을 `TDSMobileAITProvider`로 감싼다:
  ```tsx
  import { TDSMobileAITProvider } from '@toss/tds-mobile-ait';

  createRoot(document.getElementById('root')!).render(
    <TDSMobileAITProvider>
      <App />
    </TDSMobileAITProvider>
  );
  ```
- `src/App.tsx`에서 TDS의 `Button` 한 개를 임시로 띄워 정상 렌더 확인 (이후 Step 5에서 라우터로 교체)

**신규/수정 파일**:
- `src/main.tsx` (수정)
- `src/App.tsx` (수정 — 임시 TDS 버튼)
- `package.json` / `package-lock.json` (수정)

**검증 기준 (Karpathy #4)**:
- ✅ dev 서버에서 TDS `Button`이 토스 디자인 그대로 렌더됨 (텍스트, 라운드, 그림자 확인)
- ✅ 콘솔에 Emotion/Provider 관련 경고 없음
- ✅ `npm run build` 무에러

**예상 소요**: ~30분

**위임 권장 에이전트**: **executor (sonnet)** — provider 구조 + 임시 화면 검증이 함께 필요. haiku로는 컨텍스트 부족 가능.

---

### Step 5. `react-router-dom` 라우팅 골격

**목적**: 홈/설정/시나리오 4종의 인트로·본체·완료 라우트를 모두 정의해, 이후 M2가 본체만 채우면 되도록.

**입력**: Step 4 완료된 `App.tsx`

**할 일**:
- 의존성 추가:
  ```bash
  npm install react-router-dom
  ```
- `src/app/routes.tsx` 생성, 라우트 정의:
  | 경로 | 화면 | 컴포넌트 (placeholder) |
  |---|---|---|
  | `/` | 홈 | `HomePage` |
  | `/settings` | 설정 | `SettingsPage` |
  | `/scenario/:id/intro` | 시나리오 인트로 | `ScenarioIntroPage` |
  | `/scenario/:id/step` | 시나리오 본체 (placeholder) | `ScenarioStepPlaceholderPage` |
  | `/scenario/:id/complete` | 시나리오 완료 | `ScenarioCompletePage` |
- `:id`는 `fastfood | cafe | hospital | train` 4종만 허용. 알 수 없는 id는 홈으로 리다이렉트.
- `src/app/App.tsx`를 `BrowserRouter` 대신 토스 환경에 맞는 라우터(`BrowserRouter` 또는 `MemoryRouter`) 사용 *[확인 필요 — Apps in Toss 권장 라우터 종류]*

**신규/수정 파일**:
- `src/app/App.tsx` (수정)
- `src/app/routes.tsx` (신규)
- `src/features/home/HomePage.tsx` (신규, 빈 placeholder)
- `src/features/settings/SettingsPage.tsx` (신규, 빈 placeholder)
- `src/features/scenarios/_shared/ScenarioIntroPage.tsx` (신규, 빈 placeholder)
- `src/features/scenarios/_shared/ScenarioCompletePage.tsx` (신규, 빈 placeholder)
- `src/features/scenarios/_shared/ScenarioStepPlaceholderPage.tsx` (신규, "M2에서 구현 예정" 텍스트만)

**검증 기준 (Karpathy #4)**:
- ✅ 브라우저 주소창에 `/scenario/fastfood/intro` 직접 입력 시 인트로 placeholder 화면이 뜬다 (4개 시나리오 id 모두 확인)
- ✅ 알 수 없는 id (`/scenario/movie/intro`) 입력 시 홈으로 이동
- ✅ `npm run typecheck` 통과
- ✅ `npm run build` 무에러

**예상 소요**: ~45분

**위임 권장 에이전트**: **executor (sonnet)** — 파일 수가 많고 라우팅 패턴 결정이 필요.

---

### Step 6. 공통 컴포넌트 4종 구현

**목적**: 모든 시나리오·화면에서 재사용될 4개 컴포넌트를 한 번에 구현해, 이후 화면 작업 시 즉시 import해 쓰도록.

**입력**: Step 4의 TDS Provider, Step 5의 라우팅

**할 일**:

#### 6-A. `PracticeBadge`
- 우상단 고정용 배지. 텍스트 "**연습 중**" 고정.
- TDS `Tag` 또는 `Badge`가 있으면 래핑, 없으면 자체 Emotion 스타일 *[확인 필요 — TDS Mobile에 Badge 컴포넌트 존재 여부]*
- props: `position?: 'top-right' | 'top-center'` (기본 top-right)

#### 6-B. `BackButton`
- 좌상단 고정용. 큰 화살표 + "이전" 라벨 (PRD §7.4).
- 최소 터치 영역 56x56 보장 (PRD §7.2).
- 동작: `navigate(-1)`. 단, intro·home에서는 안 보이게 (props로 제어).
- 옵션: `onConfirm?: () => boolean` — 본체 단계에서 확인 다이얼로그를 끼울 수 있게 (M2 대비, 단 M1에서는 단순 navigate만 동작).

#### 6-C. `HelpOverlay`
- 우상단 "?" 버튼 + `BottomSheet`로 도움말 표시.
- props: `title: string`, `body: ReactNode`.
- TDS `BottomSheet` 사용 *[확인 필요 — 정확한 컴포넌트명]*
- M1에서는 placeholder 본체 화면에 임시 도움말 1개를 연결해 동작만 확인.

#### 6-D. `BigButton`
- TDS `Button`을 래핑해 노인용 크기·간격 보강.
- 최소 높이 64dp, 패딩 좌우 24, 폰트 22sp 이상 (PRD §7.1, §7.2).
- 사이즈 토큰(`useFontSize`)을 구독해 글씨 크기 변화에 반응.
- props: `tone?: 'primary' | 'secondary' | 'danger'`, `fullWidth?: boolean`.

**신규/수정 파일**:
- `src/components/PracticeBadge.tsx` (신규)
- `src/components/BackButton.tsx` (신규)
- `src/components/HelpOverlay.tsx` (신규)
- `src/components/BigButton.tsx` (신규)
- `src/components/index.ts` (신규, barrel export)

**검증 기준 (Karpathy #4)**:
- ✅ Step 9·10 화면에서 4개 컴포넌트가 모두 1회 이상 실제 import·렌더된다
- ✅ `BigButton`이 글씨 크기 토글에 따라 시각적으로 커진다 (Step 7과 같이 검증)
- ✅ `HelpOverlay`의 "?" 버튼을 누르면 BottomSheet가 열리고 닫힘
- ✅ `BackButton`이 placeholder 본체 화면에서 navigate(-1)을 수행

**예상 소요**: ~1.5~2시간

**위임 권장 에이전트**: **executor (sonnet)** — UI 컴포넌트 4개 동시 구현. designer 위임도 가능하나 M1은 시각 다듬기가 목표가 아니므로 executor면 충분.

---

### Step 7. 글씨 크기 토큰 + `useFontSize` 훅 + localStorage 영속화

**목적**: 노인 접근성의 핵심인 "글씨 더 크게" 기능을 골격 단계에서 만들어두고, 이후 모든 컴포넌트가 이 훅을 통해 글씨 크기를 결정하도록.

**입력**: Step 6의 `BigButton` (구독자 1호)

**할 일**:
- `src/styles/tokens.ts` 생성:
  ```ts
  export type FontSizeLevel = 'normal' | 'large' | 'x-large';

  export const fontSizeScale: Record<FontSizeLevel, number> = {
    normal: 1.0,   // 본문 18sp, 버튼 22sp 기준
    large: 1.15,
    'x-large': 1.3,
  };
  ```
- `src/hooks/useFontSize.ts` 생성:
  - localStorage 키: `japangi:fontSize`
  - 기본값: `normal`
  - API: `{ level: FontSizeLevel, setLevel: (l: FontSizeLevel) => void, scale: number }`
  - SSR/타입 안전성 (`typeof window` 가드)
- `Context` 또는 단순 훅 — **단순 훅 + localStorage 직접 읽기/쓰기로 시작 (Karpathy #2)**. 여러 컴포넌트가 동시에 구독해 동기화가 필요하면 그때 Context 도입.
- 동기화는 `storage` 이벤트 + 같은 탭 내 변경은 `dispatchEvent` 로 처리 *[단순화 선택지: 설정 화면이 닫힐 때 `window.location.reload()` — 단, 사용자 경험 저하 가능. 우선 정통 이벤트 방식 시도]*

**신규/수정 파일**:
- `src/styles/tokens.ts` (신규)
- `src/hooks/useFontSize.ts` (신규)

**검증 기준 (Karpathy #4)**:
- ✅ 단위 테스트(`vitest`) 또는 수동: `setLevel('large')` 후 localStorage에 값이 저장됨
- ✅ 페이지 새로고침 후에도 마지막 선택이 유지됨
- ✅ `BigButton`이 level 변화 시 즉시 크기 반응 (수동 확인)

**예상 소요**: ~45분

**위임 권장 에이전트**: **executor-low (haiku)** — 작은 훅 한 개, 명확한 입출력.

---

### Step 8. 설정 화면 (글씨 크기 3단계 토글만)

**목적**: `useFontSize`를 사용자가 실제로 조작할 수 있는 UI 화면을 만든다. **TTS 토글은 PRD에서 MVP 제외(§7.3) — 절대 추가 금지** (Karpathy #2).

**입력**: Step 5의 `SettingsPage` placeholder, Step 7의 훅

**할 일**:
- `SettingsPage.tsx` 완성:
  - 헤더: "글씨 크기"
  - TDS `SegmentedControl` 또는 `BigButton` 3개 (보통 / 큼 / 매우 큼)
  - 미리보기 영역: "이 크기로 보여요" (현재 scale로 렌더링되는 샘플 텍스트 + 샘플 BigButton 1개)
  - 좌상단: `BackButton`으로 홈 복귀
- 글씨 크기 외 옵션 **추가 금지** (TTS, 테마, 진동 등 모두 MVP 제외).

**신규/수정 파일**:
- `src/features/settings/SettingsPage.tsx` (수정)

**검증 기준 (Karpathy #4)**:
- ✅ 홈 우상단 "설정"에서 진입 → 3단계 토글 → 미리보기가 즉시 반응
- ✅ 뒤로 가서 홈으로 돌아온 뒤 다시 들어와도 마지막 선택이 유지됨
- ✅ TTS·테마 등 다른 옵션이 화면에 없다 (Surgical Changes 검증)

**예상 소요**: ~45분

**위임 권장 에이전트**: **executor (sonnet)** — UI + 상태 연결.

---

### Step 9. 홈 화면 (인사말 + 4 시나리오 카드 + 설정 진입)

**목적**: PRD §6 정보구조의 홈 화면을 구현. 사진은 placeholder OK.

**입력**: Step 5의 라우팅, Step 6의 공통 컴포넌트, Step 7의 글씨 크기 훅

**할 일**:
- `HomePage.tsx` 완성:
  - 헤더: "**오늘은 어떤 키오스크 연습해볼까요?**" (큰 글씨)
  - 우상단: "설정" 진입 (TDS `TextButton` 또는 아이콘)
  - 본문: 4개 시나리오 카드 (세로 2x2 또는 1열 4개)
    | id | 라벨 | 보조 설명 |
    |---|---|---|
    | `fastfood` | 햄버거 가게 | 맥도널드 같은 곳 |
    | `cafe` | 카페 | 스타벅스 같은 곳 |
    | `hospital` | 병원 | 무인 접수 |
    | `train` | 기차표 | KTX 예매 |
  - 각 카드 클릭 시 `/scenario/:id/intro`로 이동
  - 카드 사진은 단색 placeholder (M4에서 일러스트 교체)
  - 하단: "처음 오셨나요? 사용법 보기" *(M1에서는 비활성 또는 추후 구현 — 단순 toast로 "준비 중"만)*

**신규/수정 파일**:
- `src/features/home/HomePage.tsx` (수정)
- `src/data/scenarios.ts` (신규 — 4개 시나리오 메타데이터 한 곳)

**검증 기준 (Karpathy #4)**:
- ✅ 홈에서 4개 카드 클릭 → 각각 인트로 placeholder로 이동
- ✅ "설정" → `SettingsPage` 진입
- ✅ 글씨 크기 매우 큼으로 변경 시 카드 라벨이 시각적으로 커짐

**예상 소요**: ~1시간

**위임 권장 에이전트**: **executor (sonnet)**.

---

### Step 10. 시나리오 공통 화면 (인트로 + 완료) + 본체 placeholder

**목적**: 시나리오 진입과 완료 경험을 골격 단계에서 닫아 둔다. 본체(주문 단계들)는 M2~M3에서 채운다.

**입력**: Step 5 라우팅, Step 9 시나리오 메타데이터(`src/data/scenarios.ts`)

**할 일**:

#### 10-A. `ScenarioIntroPage`
- 헤더: "**이번에는 {시나리오명}을(를) 연습해볼게요**" (id별 분기)
- 본문: "**실수해도 괜찮아요. 처음부터 다시 할 수 있어요.**"
- 우상단: `PracticeBadge` (이후 본체에도 동일하게 등장)
- 큰 `BigButton` "시작하기" → `/scenario/:id/step` 으로 이동
- 좌상단: `BackButton` (→ 홈)

#### 10-B. `ScenarioStepPlaceholderPage`
- 본문: "**여기는 M2에서 구현 예정입니다.**"
- 좌상단: `BackButton`
- 우상단: `PracticeBadge` + `HelpOverlay`(샘플 도움말 1개: "여기는 연습이라 실제 돈이 나가지 않아요")
- 하단: 큰 `BigButton` "완료 화면으로" → `/scenario/:id/complete` (M1 검증용 단축 통로, M2에서 본체로 교체)

#### 10-C. `ScenarioCompletePage`
- "**잘하셨어요! 끝까지 다 하셨어요.**" (큰 글씨)
- 큰 체크마크 (이모지 또는 단순 SVG placeholder)
- `BigButton` 2개: "다시 한 번 해볼래요" (→ 같은 시나리오 intro) / "다른 키오스크 연습할래요" (→ 홈)

**신규/수정 파일**:
- `src/features/scenarios/_shared/ScenarioIntroPage.tsx` (수정)
- `src/features/scenarios/_shared/ScenarioStepPlaceholderPage.tsx` (수정)
- `src/features/scenarios/_shared/ScenarioCompletePage.tsx` (수정)

**검증 기준 (Karpathy #4)**:
- ✅ 4개 시나리오 각각: 홈 → 인트로 → 본체 placeholder → 완료 → 홈 으로 순환 가능
- ✅ 본체·완료 화면 모두 `PracticeBadge`가 우상단에 보임
- ✅ `HelpOverlay`의 "?" → BottomSheet 도움말 1회 열림/닫힘
- ✅ 완료 화면의 "다시 한 번" → 같은 시나리오 인트로로 복귀

**예상 소요**: ~1시간

**위임 권장 에이전트**: **executor (sonnet)**.

---

### Step 11. Apps in Toss WebView 통합 점검

**목적**: WebView 환경 고유의 항목(안전영역, 상태바, 하드웨어 뒤로가기)이 어색하지 않게 동작하도록 1차 통합.

**입력**: Step 1~10이 완료된 앱

**할 일**:
- **Safe-area**:
  - `index.html`의 `<meta name="viewport">`에 `viewport-fit=cover` 포함
  - 글로벌 CSS에서 `padding-top: env(safe-area-inset-top)`, `padding-bottom: env(safe-area-inset-bottom)` 적용 (앱 루트 컨테이너 기준)
- **상태바**:
  - `granite.config.ts` 또는 `@apps-in-toss/web-framework` API로 상태바 색상/스타일 지정 *[확인 필요 — 정확한 API명]*
  - M1에서는 기본값으로 두되, 화면 상단이 흰색 배경에 가려지지 않음만 확인
- **하드웨어 뒤로가기**:
  - Apps in Toss SDK가 제공하는 뒤로가기 이벤트 API를 `App.tsx` 루트에서 구독 *[확인 필요 — `useBackPress` 또는 유사 API]*
  - 핸들러: 현재 라우트가 `/`이면 토스로 종료(또는 기본 동작), 그 외엔 `navigate(-1)`
  - 본체 단계에서는 M2에서 "정말 나가시겠어요?" 다이얼로그를 끼울 자리만 마련 (M1은 단순 navigate)

**신규/수정 파일**:
- `index.html` (수정)
- `src/styles/globals.ts` 또는 글로벌 CSS (신규/수정)
- `src/app/App.tsx` (수정 — 뒤로가기 핸들러 attach)
- `src/lib/toss.ts` (신규 — SDK 래퍼)

**검증 기준 (Karpathy #4)**:
- ✅ 토스 인앱(또는 시뮬레이터)에서 화면 상단·하단이 노치/홈바에 가려지지 않음
- ✅ 홈에서 하드웨어 뒤로가기 → 토스 정상 동작 (또는 의도된 종료)
- ✅ 본체 placeholder에서 하드웨어 뒤로가기 → 인트로로 복귀
- ✅ iOS·Android 시뮬레이터 양쪽에서 동일 동작 (가능 범위 내)

**예상 소요**: ~1~1.5시간 (SDK 문서 확인 시간 가변)

**위임 권장 에이전트**: **executor (sonnet)** + SDK 문서 확인은 `researcher` 사전 위임 권장 — "Apps in Toss WebView 뒤로가기 API와 safe-area 가이드를 공식 문서에서 찾아 인용 포함 요약" 한 줄 사용.

---

### Step 12. 자체 사용성 점검 + 빌드/린트/타입 통과 + 데모용 스크린샷

**목적**: M1 완료 선언 전 마지막 게이트. **빌드만 되는 게 아니라, 실제 흐름이 어색하지 않게 동작하는지** 본인이 직접 확인 (Karpathy #4).

**입력**: Step 1~11 완료

**할 일**:
- 최종 수동 회귀:
  1. 홈 진입 → 글씨 크기 매우 큼으로 변경 → 홈 카드 라벨이 커지는지
  2. 4개 시나리오 각각 인트로 → 본체 placeholder → 완료 → 홈으로 순환
  3. 완료에서 "다시 한 번" → 같은 시나리오 인트로 복귀
  4. 본체에서 "?" 도움말 열고 닫기
  5. 하드웨어 뒤로가기로 시나리오 도중 탈출
  6. 새로고침 시 글씨 크기 유지
- 검사 스크립트 일괄 실행:
  ```bash
  npm run typecheck && npm run lint && npm run build
  ```
- 시뮬레이터/실기기에서 데모 화면 캡쳐 6장 (홈, 설정, 인트로, 본체 placeholder, 완료, 큰 글씨 모드)
- `.omc/state/m1-done.md`에 완료 증거 (스크립트 출력 요약 + 스크린샷 경로) 기록

**신규/수정 파일**:
- `.omc/state/m1-done.md` (신규 — 완료 증거)
- `docs/screenshots/m1/*.png` (신규 — 6장)

**검증 기준 (Karpathy #4)**:
- ✅ `npm run typecheck` 0 에러
- ✅ `npm run lint` 0 경고 (의도된 것 제외)
- ✅ `npm run build` 0 에러
- ✅ 6장 스크린샷 모두 확보
- ✅ 위 수동 회귀 6단계 모두 통과

**예상 소요**: ~1시간

**위임 권장 에이전트**: **자체 진행 + architect-low 검증** — 마지막 게이트는 본인 눈으로 보고, 변경 사항 종합 검증은 architect-low(또는 vision 에이전트로 스크린샷 확인) 위임.

---

## 4. 폴더 구조 최종본 (M1 종료 시점)

```
kiosk/
├── docs/
│   ├── PRD.md
│   └── screenshots/m1/                 # Step 12 산출
├── public/
│   └── icons/
│       └── app-icon.png                # placeholder
├── src/
│   ├── app/
│   │   ├── App.tsx                     # 라우터 + 뒤로가기 핸들러
│   │   └── routes.tsx                  # 라우트 정의
│   ├── components/
│   │   ├── PracticeBadge.tsx
│   │   ├── BackButton.tsx
│   │   ├── HelpOverlay.tsx
│   │   ├── BigButton.tsx
│   │   └── index.ts
│   ├── features/
│   │   ├── home/
│   │   │   └── HomePage.tsx
│   │   ├── settings/
│   │   │   └── SettingsPage.tsx
│   │   └── scenarios/
│   │       └── _shared/
│   │           ├── ScenarioIntroPage.tsx
│   │           ├── ScenarioStepPlaceholderPage.tsx
│   │           └── ScenarioCompletePage.tsx
│   │       # ── M2 이후 생성 (M1에는 없음) ──
│   │       # ├── fastfood/
│   │       # ├── cafe/
│   │       # ├── hospital/
│   │       # └── train/
│   ├── hooks/
│   │   └── useFontSize.ts
│   │   # ── M2 이후 ──
│   │   # └── useScenarioStep.ts
│   ├── data/
│   │   └── scenarios.ts                # 4개 시나리오 메타데이터
│   │   # ── M2~M3 이후 ──
│   │   # ├── fastfoodMenu.ts
│   │   # ├── cafeMenu.ts
│   │   # ├── hospitalDept.ts
│   │   # └── trainStations.ts
│   ├── lib/
│   │   └── toss.ts                     # SDK 래퍼 (뒤로가기·safe-area)
│   ├── styles/
│   │   ├── globals.ts
│   │   └── tokens.ts                   # 글씨 크기 토큰
│   └── main.tsx                        # TDSMobileAITProvider wiring
├── .omc/
│   ├── plans/
│   │   └── M1-setup.md                 # 본 문서
│   └── state/
│       └── m1-done.md                  # Step 12 완료 증거
├── granite.config.ts
├── vite.config.ts
├── tsconfig.json
├── package.json
├── package-lock.json
├── CLAUDE.md
└── (README.md — Step 1 템플릿이 생성 시 유지, 본 문서는 PRD를 가리키도록만)
```

---

## 5. 위임 전략 요약

| Step | 추천 에이전트 | 모델 | 사유 |
|---|---|---|---|
| 1. 스캐폴딩 | 자체 진행 | — | CLI 외부 인증 가능성, 사람 손이 필요 |
| 2. granite.config | executor-low | haiku | 설정 한 파일 |
| 3. strict/lint | executor-low | haiku | 토글 위주 |
| 4. TDS Provider | executor | sonnet | provider + 검증 화면 |
| 5. 라우팅 골격 | executor | sonnet | 다중 파일 |
| 6. 공통 컴포넌트 4종 | executor | sonnet | UI 4개 동시 구현 |
| 7. useFontSize | executor-low | haiku | 작은 훅 |
| 8. 설정 화면 | executor | sonnet | UI + 상태 연결 |
| 9. 홈 화면 | executor | sonnet | UI + 데이터 |
| 10. 시나리오 공통 화면 | executor | sonnet | 3 화면 동시 |
| 11. WebView 통합 | researcher(사전) + executor | haiku→sonnet | SDK 문서 확인 후 적용 |
| 12. 자체 점검 | 자체 + architect-low | haiku | 마지막 검증 게이트 |

> **공통 원칙**: 모든 위임 프롬프트에 "**PRD 경로**와 **본 M1 계획서 경로**를 함께 제공"해 컨텍스트 부족으로 인한 추측 코딩을 방지 (Karpathy #1).

---

## 6. M1에서 도입하는 패키지 (Simplicity First)

| 패키지 | 이유 |
|---|---|
| `@apps-in-toss/web-framework` | Apps in Toss 필수 |
| `@toss/tds-mobile`, `@toss/tds-mobile-ait` | 디자인 시스템 (PRD §8.1) |
| `@emotion/react` | TDS 스타일링 의존 (PRD §8.1) |
| `react`, `react-dom` | 런타임 |
| `react-router-dom` | 5개 라우트 네비게이션 (PRD §8.2) |
| `typescript`, `vite`, `@vitejs/plugin-react` | 빌드/타입 |
| `eslint`, `prettier`, 토스 기본 플러그인 | 품질 |
| `vitest`, `@testing-library/react` | 단위 테스트 (M1에서는 `useFontSize` 1개만 작성 — 나머지 M2~) |

> **명시적 제외**: Redux/Zustand/Jotai, React Query, axios, dayjs/date-fns, framer-motion, lottie-react, i18next, lodash. **하나도 도입 안 함**. 필요해지면 그때 PR로 별도 검토 (PRD §8.4, Karpathy #2).

---

## 7. 위험·완화

| # | 위험 | 영향 | 완화 |
|---|---|---|---|
| W1 | `create-ait-app`이 비공개 토큰/사내 레지스트리를 요구할 수 있음 | Step 1 즉시 막힘 | 막히면 즉시 사용자에게 신호. 공식 가이드 링크/토큰 확보 후 재개. 우회 스캐폴딩(직접 Vite 템플릿)으로의 폴백은 **하지 않음** — TDS 셋업이 더 복잡해짐 |
| W2 | `granite.config.ts` 스키마가 본 문서와 다름 | 빌드 실패 | Step 2에서 공식 가이드 확인 후 본 문서 즉시 수정. 추측 값 사용 금지 (Karpathy #1) |
| W3 | TDS에 `Badge`/`BottomSheet` 등 정확한 컴포넌트가 없거나 이름 다름 | Step 6 일부 재작업 | Step 6 착수 전 `node_modules/@toss/tds-mobile`의 export 목록 확인 → 본 문서 갱신 |
| W4 | WebView 뒤로가기 API가 React 라우터와 충돌 | Step 11 뒤로가기 동작 이상 | SDK 문서 확인 후 `useBackPress` 등을 라우터 location과 단방향 동기. 충돌 시 라우터 형태(`MemoryRouter` 변경)로 우회 |
| W5 | `noUncheckedIndexedAccess` 등 strict 옵션이 TDS 타입과 충돌 | Step 3 후 다수 타입 에러 | 충돌이 광범위하면 해당 옵션만 OFF로 후퇴 (다른 strict 옵션은 유지). 결정 시 본 문서에 사유 명기 |
| W6 | localStorage 변경이 다른 컴포넌트에 즉시 반영 안 됨 | 설정 화면에서 큰 글씨 토글이 홈에 즉시 안 보임 | `useFontSize` 내부에서 `window` 이벤트 emit + 같은 훅 인스턴스 간 구독. 단순화 폴백: 설정 종료 시 라우트 push로 재마운트 |
| W7 | M1에 필요 이상의 기능(시나리오 본체, TTS, 결제 흐름)을 끌어와 일정 초과 | 일정 1주 → 2주+ | Karpathy #2·#3 엄격 적용. PR마다 "M1 범위인가?" 자문. 본체·TTS 코드 발견 시 즉시 별도 PR로 분리 |
| W8 | placeholder 스크린샷·아이콘에 저작권 침해 우려 자료를 무심코 사용 | M4 심사 거절 | M1 placeholder는 단색·도형만. 실제 매장 사진/로고는 절대 포함 안 함 |

---

## 8. 완료 정의 (Definition of Done)

> 이 8가지가 **모두** 객관적으로 통과해야 M1 종료.

1. **빌드**: `npm run build` 종료 코드 0, 번들 산출물 정상 생성
2. **타입**: `npm run typecheck` 0 에러 (strict 모드)
3. **린트**: `npm run lint` 0 경고 (의도된 것은 주석으로 명시)
4. **라우팅 동작**: `/`, `/settings`, `/scenario/{fastfood|cafe|hospital|train}/{intro|step|complete}` 모든 라우트가 적절한 placeholder 화면을 렌더
5. **TDS 가시 확인**: 홈·설정·인트로·완료 화면에서 TDS 컴포넌트(`Button`, `BottomSheet` 등)가 토스 디자인 그대로 렌더
6. **글씨 크기 토글**: 설정에서 3단계 변경 시 홈·인트로·완료 화면의 텍스트/버튼이 시각적으로 반응, 새로고침 후에도 유지
7. **WebView 통합**: 토스 시뮬레이터 또는 실기기에서 safe-area·하드웨어 뒤로가기 정상 동작
8. **증거 보관**: `.omc/state/m1-done.md`에 6장 스크린샷 경로 + 위 명령들의 출력 요약 기록

---

## 9. 다음 마일스톤(M2) 진입 신호

M1이 위 DoD를 통과한 직후, 다음 항목을 확인하고 M2(시나리오 ① 패스트푸드 본체 구현) 착수:

- [ ] PRD §5.1 패스트푸드 11단계의 **데이터 모델 초안**(`src/data/fastfoodMenu.ts`)이 어디까지 정의 가능한지 사용자와 합의
- [ ] PRD 부록 B의 **[확인 필요] C1**(TDS 글씨 토큰 커스터마이즈 범위)이 Step 6·7 진행 중 해소되었는지
- [ ] 베타 테스터 모집 채널(C8) 사전 타진 시작 — M2가 끝날 즈음 베타 1차가 가능해야 함
- [ ] M1 단계에서 발견된 신규 위험을 본 문서 §7에 추가 기록했는지
- [ ] M2 PR 정책: "한 PR = 한 단계" 합의 (Karpathy #3)

> M2 첫 PR은 "**패스트푸드 시나리오 모듈 폴더 골격 + 단계 1(시작 화면) 구현**" 으로 시작 권장.

---

## 부록 A. Karpathy 원칙 적용 체크리스트 (PR 리뷰용)

각 Step의 PR에서 다음 5문항을 통과해야 머지:

- [ ] **#1**: 이 변경이 의존하는 가정을 PR 설명에 명시했는가? 추측한 SDK API가 있다면 공식 문서를 인용했는가?
- [ ] **#2**: 요청 범위를 넘는 추가 기능을 끼워 넣지 않았는가? (특히 TTS·결제 흐름·M2 본체 코드)
- [ ] **#3**: 인접 코드를 임의 리팩토링하지 않았는가?
- [ ] **#4**: PR이 닫는 검증 기준이 본 문서 Step의 검증 항목과 일치하는가?
- [ ] **#4**: 빌드/타입/린트가 통과한 신선한 증거(로그 또는 스크린샷)가 PR에 첨부되었는가?

---

## 부록 B. M1 추정 총 소요

| 구간 | 시간 |
|---|---|
| Step 1~3 (셋업·설정) | ~2시간 |
| Step 4~5 (Provider·라우팅) | ~1.5시간 |
| Step 6~7 (공통 컴포넌트·훅) | ~2.5시간 |
| Step 8~10 (화면 구현) | ~3시간 |
| Step 11 (WebView 통합) | ~1.5시간 |
| Step 12 (검증·증거) | ~1시간 |
| **합계 (집중 작업 기준)** | **~11.5시간** |
| **버퍼 포함 (PRD §12: 1주)** | **5영업일 내 여유 있음** |

