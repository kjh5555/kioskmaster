---
name: scenario-patterns
description: 「자판기 어렵지않아요」 시나리오 단계 컴포넌트(BurgerKing/KFC/Lotteria/McDonalds 등 브랜드별 키오스크 모사 화면)를 추가하거나 수정할 때 반드시 사용. StepEngine 구조, CUSTOM_LAYOUTS 등록 절차, 노인 접근성 의무 사항, 결제 시뮬레이션 안전 문구 패턴, branchTo/detourTo 분기 규칙을 담는다. scenario-author 에이전트의 작업 가이드.
---

# scenario-patterns — 시나리오 단계 작성 가이드

## 1. 디렉토리 구조

```
japangi/src/features/scenarios/_engine/
├── StepEngine.tsx          # 진행 엔진 (수정 금지)
├── OnboardingTour.tsx
├── onboardingStorage.ts
├── types.ts                # Step, Choice, BrandTheme 등
└── layouts/
    ├── index.ts            # CUSTOM_LAYOUTS 레지스트리 (필수 갱신)
    ├── types.ts            # CustomLayoutProps, useDecoShake
    ├── {Brand}{Step}.tsx   # 각 단계 컴포넌트
    └── {brand}MenuData.ts  # 브랜드별 메뉴 정적 데이터
```

시나리오 스크립트(`Step[]`)는 백엔드 API에서 fetch한다. 데이터 시드는 `backend/app/seed/data/` 참조.

## 2. Step 타입 핵심 필드

`japangi/src/features/scenarios/_engine/types.ts` 참조. 핵심:

- `customLayoutId` — `CUSTOM_LAYOUTS`의 키. 일반 layout이 아닌 자체 화면이 필요할 때
- `choices` + `correctChoiceId` — 사용자가 골라야 하는 정답
- `branchTo` — 정답을 골랐을 때 다른 step으로 분기 (예: 단품 선택 시 세트 옵션 건너뛰기)
- `detourTo` — 오답 포함 모든 선택에서 특정 id 시 분기 (예: BK의 "세트로 업그레이드?" 모달)
- `successMessage` / `hintMessage` — 노인 친화 한국어 평어체

**id 명명 규칙**: 케밥 케이스 + 브랜드 prefix (예: `burgerking-menu`, `mcdonalds-set-size`).

## 3. CUSTOM_LAYOUTS 등록 절차 (의무)

새 단계 `.tsx`를 만들면 반드시 `layouts/index.ts`에 등록:

```ts
import { NewBrandStep } from "./NewBrandStep";

export const CUSTOM_LAYOUTS: Record<string, CustomLayoutComponent> = {
  // 기존...
  "newbrand-step": NewBrandStep,
};
```

등록 빠뜨리면 StepEngine이 해당 단계를 generic layout으로 폴백 → 시나리오가 깨진다. integration-qa가 이걸 잡지만 본인이 먼저 확인.

## 4. CustomLayoutProps

각 단계 컴포넌트는 다음 props를 받는다 (`layouts/types.ts`):

- `step: Step` — 단계 정의
- `rejectedChoiceId: string | null` — 마지막 오답 id (shake 애니메이션용)
- `idleHintActive: boolean` — 일정 시간 미동작 시 힌트 강조
- `onChoice: (choiceId: string) => void` — 사용자 선택 콜백

**의무 동작**:
- 모든 선택 버튼은 `onChoice(id)` 호출
- `rejectedChoiceId === id`이면 shake 애니메이션 (idle 힌트 + `shakeWhen` 패턴 참조)
- `idleHintActive`일 때 정답 버튼을 시각적으로 강조

## 5. 노인 접근성 의무 사항 (PRD 7장)

| 항목 | 기준 |
|------|------|
| 본문 폰트 | ≥ 18sp (px 단위면 ≥ 18px) |
| 버튼 라벨 | ≥ 22sp |
| 화면 헤더 | ≥ 28sp |
| 터치 영역 | ≥ 56dp × 56dp (권장 64dp) |
| 버튼 간 간격 | ≥ 12dp |
| 색 대비 | WCAG AAA 7:1 이상 |
| 애니메이션 | ≤ 200ms, 깜빡임 금지 |
| 드래그/롱프레스 | 사용 금지 |
| 더블탭 | 사용 금지 |

새 단계 컴포넌트는 이 기준을 어기지 말 것. 시각적 매장 모사 vs 접근성 충돌 → **접근성 우선**.

## 6. 연습 모드 안전 문구 (의무)

결제·개인정보 입력 단계에는 "연습이에요" 안내 필수:
- 결제 단계: 큰 Dialog 또는 상단 배너로 "**연습이에요. 진짜 돈이 나가지 않아요**"
- 주민번호 단계: 상단 고정 배지로 "**연습이에요. 저장하지 않아요**"

이 문구가 빠지면 PRD R4/R7 위험(사용자 혼란·신뢰 저하)이므로 integration-qa가 차단한다.

## 7. 시각 모사 우선 (Visual Mimicry First) — 핵심 룰

**노인이 실제 매장 키오스크 앞에 섰을 때 "거리감"이 안 들어야 한다**가 본 앱의 본질적 가치다. 시나리오 단계 컴포넌트는 추상적이거나 디자인 시스템 친화적이기 전에, **실제 매장의 그 키오스크와 시각적으로 닮아야** 한다 (PRD 14.3, R3 위험 완화).

### 의무 사항

새 브랜드 단계 컴포넌트는 다음을 **모두** 충족해야 한다:

| 항목 | 룰 | 위반 시 |
|------|----|--------|
| **색 (Primary/Secondary)** | 실제 매장의 헤더·CTA 색을 #hex 로 정확히 모사 (스타벅스 #006241, 메가커피 #FFC700/#000, 이디야 #1A3E72 등) — TDS 일반 톤 사용 금지 | "비슷한 다른 카페"처럼 보임 |
| **헤더 패턴** | 실제 키오스크가 상단에 두꺼운 색 헤더를 쓰면 그대로 — 흰 배경에 텍스트만 두지 말 것 | 실물과 다른 인상 |
| **버튼 모양** | 실제 매장에서 보이는 모서리 둥글기·테두리·그림자 톤을 따라감. 둥근 카드형 vs 사각형 모두 그 브랜드 관습대로 | 일반적 디자인 패턴으로 흐려짐 |
| **로고/아이콘** | 상표권 침해 없는 선에서 브랜드 인지가 즉시 가능하게: 브랜드명 글자 박스(예: `MEGA COFFEE`/`EDIYA COFFEE`/`STARBUCKS`) + 대표 이모지 활용 | "어느 카페인지 모르겠는" 화면 |
| **결제 단말기/진동벨** | 실제 매장에서 보는 카드 단말기·진동벨·주문번호 표시판을 일러스트로 모사. 추상 아이콘 X | 노인이 실제 매장에서 못 알아봄 |

### 노인 접근성과 시각 모사가 충돌할 때

- **노인 접근성 우선** (폰트·터치·대비). 단, 시각 모사도 가능한 한 살림 — 브랜드 컬러를 유지하되 텍스트 폰트는 18px 이상, 버튼은 56dp 이상.
- 매장이 작은 글씨를 쓴다고 따라가지 말 것 (예: 스타벅스 실제 키오스크는 12px 안내 많지만 우리는 18px+).
- 대비가 부족한 브랜드(예: 노란 배경 + 흰 글씨 같은 부적합 조합)는 검정·진한 톤으로 교체.

### 자기 점검 질문

새 단계 컴포넌트 작성 후 다음에 모두 "예"라고 답할 수 있어야 한다:

- [ ] 화면을 흑백으로 출력해도 "어느 매장인지" 인지 가능한가? (구조 + 로고)
- [ ] 컬러까지 보면 즉시 "그 카페구나"가 떠오르는가?
- [ ] 결제·완료 화면이 실제 매장 단말기·진동벨을 닮았는가?
- [ ] 노인이 실제 매장에 갔을 때 "방금 본 화면과 비슷하네" 라고 느낄 만한가?

하나라도 "아니오"면 시각 모사가 부족한 것 — integration-qa가 차단한다.

## 8. 새 브랜드/단계 추가 워크플로우

1. **실제 매장 시각 자료 확보** — 가능하면 사용자가 제공하는 스크린샷/사진. 없으면 공식 웹/언론 이미지를 머릿속에 두고 진행.
2. **참고 단계 선정** — 가장 유사한 기존 브랜드의 단계 파일을 템플릿으로 (예: 햄버거면 `BurgerKingMenu.tsx`, 카페면 `StarbucksMenu.tsx`)
3. **파일 복사 + 이름 변경** — `{NewBrand}{Step}.tsx`
4. **브랜드 색·로고만 교체** — 구조·동작은 그대로 두는 게 안전. 노인 사용자는 동작 일관성을 학습해야 함. 단 7장 "시각 모사 우선"의 의무사항을 모두 적용.
5. **단계 등록** — `layouts/index.ts`의 `CUSTOM_LAYOUTS`에 추가
6. **백엔드 시드 데이터 갱신 필요 시** — `fastapi-builder` 에이전트에 SendMessage (메뉴 + scenario_json + seed.py import + seed 함수 + run_seed 호출 4곳 모두 갱신)
7. **scenario 스크립트 Step 정의** — 백엔드 시드에 `customLayoutId`, `choices`, `correctChoiceId`, `theme` 포함
8. **integration-qa에게 검증 요청** — 시각 모사 자기 점검 4항목 포함

## 8. 자주 하는 실수

- ❌ `CUSTOM_LAYOUTS` 등록 빠뜨림 → 사일런트 폴백
- ❌ `correctChoiceId`가 `choices`에 없는 id → 영원히 정답 못 맞춤
- ❌ `branchTo`/`detourTo` 타깃이 존재하지 않는 step id → 런타임 에러
- ❌ 결제 단계에 "연습이에요" 누락 → PRD 위반
- ❌ 폰트 16px 사용 → 노인 접근성 위반
- ❌ TDS 컴포넌트가 충분히 가능한데 자체 div로 구현 → tds-stylist에 위임

## 9. 추가 참고

- 단계 컴포넌트 실제 예시 분석: `references/step-component-anatomy.md`
- 브랜드 테마 색 가이드: `references/brand-themes.md`
