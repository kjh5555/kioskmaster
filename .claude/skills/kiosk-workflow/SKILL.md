---
name: kiosk-workflow
description: 「자판기 어렵지않아요」(노인용 키오스크 연습 미니앱) 프로젝트의 메인 오케스트레이터. 새 키오스크 시나리오/단계 추가, 백엔드 API/모델 추가, TDS 스타일링, 풀스택 기능, 노인 접근성 리팩토링 등 모든 코드 변경 요청에 대해 작업 유형을 감지하고 5명 전문 에이전트 팀(scenario-author/tds-stylist/fastapi-builder/karpathy-reviewer/integration-qa)을 조율한다. 후속 작업(다시, 재실행, 업데이트, 수정, 보완, 이전 결과 개선)도 지원. 단순 질문이 아닌 "코드를 바꿔야 하는 모든 요청"에 적극적으로 트리거할 것.
---

# kiosk-workflow — 키오스크 프로젝트 메인 오케스트레이터

## 0. 사용 시점

다음 요청들에 자동 트리거:
- "새 시나리오/단계 추가", "{브랜드} 카페/병원/기차 키오스크 만들어줘"
- "백엔드에 X 모델 추가", "API endpoint 추가"
- "이 화면 글씨 크게", "노인 접근성 검수", "이 단계 다시", "결제 화면 안내 보강"
- "feedback 기능 풀스택으로", "FE/BE 같이 추가"
- "이전 결과 수정", "다시 실행", "재실행", "업데이트"

단순 질문("이게 뭐 하는 코드야?", "어떻게 동작해?")은 본 워크플로우 트리거하지 말 것.

---

## Phase 0: 컨텍스트 확인 (의무 첫 단계)

워크플로우 시작 시 항상 다음을 확인:

1. **현재 git 상태** — `git status`, `git diff HEAD --stat`로 진행 중인 변경 파악
2. **이전 산출물 존재 여부** — `.omc/scenarios/_workspace/`, `.omc/qa/`, `.omc/reviews/` 디렉토리 확인
3. **실행 모드 결정**:
   - 이전 산출물 + 사용자가 부분 수정 요청 → **부분 재실행** (해당 에이전트만 호출)
   - 이전 산출물 + 사용자가 새 입력 → **새 실행** (이전을 `_workspace_prev/`로 이동)
   - 이전 산출물 없음 → **초기 실행**

---

## Phase 1: 작업 유형 감지

사용자 요청을 다음 5가지 중 하나로 분류:

| 작업 유형 | 트리거 키워드 | 실행 모드 | 호출 에이전트 |
|----------|------------|---------|------------|
| **A. 시나리오 추가/수정** | "단계 추가", "{브랜드} 키오스크", "메뉴 추가", "분기 변경" | 서브 시퀀스 | scenario-author → (tds-stylist?) → karpathy-reviewer → integration-qa |
| **B. 백엔드 API 추가/수정** | "API 추가", "모델 추가", "endpoint", "라우터", "스키마" | 서브 시퀀스 | fastapi-builder → karpathy-reviewer → integration-qa |
| **C. 풀스택 기능 추가** | "feedback 풀스택", "FE/BE 같이", "프론트백엔드 동시" | **에이전트 팀** | scenario-author + fastapi-builder + integration-qa (팀) → karpathy-reviewer |
| **D. 스타일링/접근성** | "글씨 크게", "노인 접근성", "TDS로 리팩토링", "버튼 크게" | 서브 시퀀스 | tds-stylist → karpathy-reviewer |
| **E. 노인 사용성 리뷰** | "이 화면 노인 사용성 검수", "접근성 감사" | 단일 서브 | integration-qa (접근성 회귀 체크리스트 실행) |

**분류 모호 시** → 사용자에게 AskUserQuestion으로 확인.

---

## Phase 2: 팀 구성 / 서브 에이전트 호출

### 2-A. 시나리오 추가/수정 (서브 시퀀스)

```
[오케스트레이터]
  ├── Agent(scenario-author, model="opus")
  │     - 새 단계 컴포넌트 작성 + CUSTOM_LAYOUTS 등록
  │     - 필요 시 시드 데이터 변경 요청을 fastapi-builder에 위임 결정
  ├── (선택) Agent(tds-stylist, model="opus")
  │     - 복잡한 TDS 매핑/스타일링 필요 시
  ├── Agent(karpathy-reviewer, model="opus")
  │     - git diff 기준 4원칙 강제
  │     - BLOCK 시 scenario-author 재호출
  └── Agent(integration-qa, model="opus")
        - CUSTOM_LAYOUTS ↔ Step.customLayoutId 매칭
        - 노인 접근성 회귀 (폰트/터치/대비)
        - typecheck + lint 실행
```

### 2-B. 백엔드 API 추가/수정 (서브 시퀀스)

```
[오케스트레이터]
  ├── Agent(fastapi-builder, model="opus")
  │     - 모델/라우터/시드 추가, main.py 등록
  ├── Agent(karpathy-reviewer, model="opus")
  └── Agent(integration-qa, model="opus")
        - models/__init__.py export, main.py 라우터 등록
        - python import test
        - 시드 idempotency 확인
```

### 2-C. 풀스택 기능 추가 (**에이전트 팀**)

가장 큰 가치를 만드는 모드. FE/BE를 동시에 진행하면서 shape을 토론·합의해야 함.

```
[오케스트레이터/리더]
  ├── TeamCreate(name="kiosk-fullstack", members=[scenario-author, fastapi-builder, integration-qa])
  ├── TaskCreate:
  │     - T1: fastapi-builder가 모델/엔드포인트 추가
  │     - T2 (T1 blocked): scenario-author가 FE 호출 코드/UI 추가
  │     - T3 (T2 blocked): integration-qa가 shape 교차 비교
  ├── 팀원들이 SendMessage로 shape 합의 (예: fastapi-builder가 FeedbackOut shape을 메시지로 공유)
  ├── 모든 태스크 완료 후 TeamDelete
  └── Agent(karpathy-reviewer, model="opus")
        - 전체 diff 4원칙 리뷰
```

### 2-D. 스타일링/접근성 (서브 시퀀스)

```
[오케스트레이터]
  ├── Agent(tds-stylist, model="opus")
  │     - 폰트/터치/대비 규정 적용
  └── Agent(karpathy-reviewer, model="opus")
        - Surgical Changes 위주 (인접 스타일 임의 수정 차단)
```

### 2-E. 노인 사용성 리뷰 (단일)

```
[오케스트레이터]
  └── Agent(integration-qa, model="opus")
        - PRD 7장 기준 회귀 체크
        - 위반 발견 시 tds-stylist 호출 권고 (수정은 본 워크플로우 재진입)
```

---

## Phase 3: 검증 강도 (사용자 설정: 중간)

작업 유형별 자동 적용:

| 작업 유형 | Karpathy 리뷰 | Integration QA |
|----------|------------|---------------|
| A. 시나리오 | 필수 | 필수 (CUSTOM_LAYOUTS + 접근성) |
| B. 백엔드 | 필수 | 필수 (import + 시드 idempotency) |
| C. 풀스택 | 필수 | 필수 (shape 교차 비교) |
| D. 스타일링 | 필수 (Surgical Changes 위주) | 생략 가능 |
| E. 접근성 리뷰 | 생략 | 필수 |

**BLOCK/FAIL 시 처리**:
- karpathy-reviewer BLOCK → 원인 작업 에이전트 재호출, 수정 후 재리뷰
- integration-qa FAIL → 원인 에이전트 재호출, 수정 후 재검증
- 3회 재시도 후에도 실패 → 사용자에게 escalate

---

## Phase 4: 데이터 전달 프로토콜

### 4-1. 팀 모드 (풀스택)
- **메시지 기반**: 팀원 간 shape 공유 (`SendMessage`)
- **태스크 기반**: 의존 관계 (T1 blocks T2) — TaskCreate `addBlockedBy`
- **파일 기반**: 코드 변경은 직접 파일 수정. 초안 워크스페이스 없음 (작은 단위)

### 4-2. 서브 모드
- **반환값 기반**: 각 Agent 호출 결과를 오케스트레이터가 수집
- 산출물은 모두 실제 파일 경로로 보고

### 4-3. QA/리뷰 결과
- `.omc/reviews/{timestamp}-review.md` (karpathy-reviewer 결과)
- `.omc/qa/{timestamp}-report.md` (integration-qa 결과)
- 이력 추적을 위해 보존

---

## Phase 5: 에러 핸들링

| 상황 | 처리 |
|------|------|
| 에이전트 1회 실패 | 1회 재호출 (동일 prompt) |
| 에이전트 재실패 | 결과 없이 진행 + 사용자에게 누락 보고 (작업 자체는 계속) |
| 상충 데이터 (FE/BE shape 불일치) | 두 출처 모두 보존, integration-qa가 비교표로 보고, 사용자 결정 요청 |
| 빌드 실패 | karpathy-reviewer가 BLOCK 처리, 작업 에이전트 재호출 |
| 사용자 요청 모호 | AskUserQuestion으로 명확화 (절대 추측 진행 금지) |

---

## Phase 6: 완료 보고

워크플로우 종료 시 사용자에게 다음 보고:

```markdown
## 작업 완료: {작업 유형}

**변경 파일**: {N}개
{파일 경로 목록}

**Karpathy 리뷰**: PASS / PASS with Minor / BLOCK→수정 완료
**Integration QA**: PASS / FAIL→수정 완료

**검증 증거**:
- typecheck: 0 에러
- (해당 시) python import test: OK
- (해당 시) 접근성 체크: 폰트/터치/대비 OK

**후속 액션 권장 (있으면)**:
- ...
```

피드백 요청: "결과에서 개선할 부분이 있나요?"

---

## Phase 7: 피드백 반영 (후속 작업)

사용자 후속 요청 패턴:
- "이 단계 다시" → Phase 0 재실행, 부분 재실행 모드로 scenario-author 재호출
- "이 부분 다시 검토" → integration-qa 또는 karpathy-reviewer 단독 재호출
- "이 톤이 너무 딱딱" → tds-stylist 재호출 + 어떤 단계 톤을 바꿀지 명확히
- "다음에 이런 패턴이면 X로 해줘" → 해당 스킬에 영구 반영 (스킬 파일 수정)

피드백을 스킬·에이전트 정의에 반영했을 경우 `프로젝트/CLAUDE.md`의 **변경 이력** 테이블에 한 줄 추가.

---

## 테스트 시나리오

### 정상 흐름: "BurgerKing에 사이드 사이즈 선택 단계 추가"
1. Phase 1 → 시나리오 추가/수정 (A)
2. Phase 2-A → scenario-author 호출, 신규 `BurgerKingSideSize.tsx` 작성 + CUSTOM_LAYOUTS 등록 + 백엔드 시드 데이터에 Step 추가
3. fastapi-builder 호출 (시드 변경분)
4. karpathy-reviewer PASS
5. integration-qa: `CUSTOM_LAYOUTS["burgerking-side-size"]` 존재 확인, Step.customLayoutId 매칭, 폰트/터치 검증 → PASS
6. Phase 6 완료 보고

### 에러 흐름: "feedback API에 카테고리 필터 추가" (풀스택)
1. Phase 1 → 풀스택 (C)
2. Phase 2-C → TeamCreate, fastapi-builder가 BE 추가
3. scenario-author가 FE 호출 추가
4. integration-qa가 shape 비교 → FE에서 `operatorNote` 받는데 BE는 `operator_note` 응답 → FAIL
5. integration-qa가 scenario-author에 SendMessage → FE 타입 수정
6. integration-qa 재검증 PASS
7. karpathy-reviewer 4원칙 검토 PASS
8. Phase 6 완료 보고

---

## 추가 참고

- 에이전트 정의: `.claude/agents/{name}.md`
- 도메인 스킬: `.claude/skills/{scenario,tds,fastapi,karpathy,integration-qa}-*/SKILL.md`
- PRD: `docs/PRD.md` (시나리오 명세, 접근성 기준, Non-Goals)
- 프로젝트 원칙: `CLAUDE.md` (Karpathy 4원칙)
