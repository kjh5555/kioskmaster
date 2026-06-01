---
name: karpathy-review
description: 프로젝트 CLAUDE.md에 명시된 Karpathy 4원칙(Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven Execution)을 강제하는 코드 리뷰 절차. 시나리오 단계 추가, 백엔드 API 추가, 스타일링 변경 등 모든 코드 변경 후 호출되어야 하며, 추측성 추상화·요청 외 기능·인접 코드 임의 수정·검증 없는 완료 주장을 차단한다. PASS/BLOCK 판정과 함께 수정 지시를 출력한다. karpathy-reviewer 에이전트의 작업 가이드.
---

# karpathy-review — Karpathy 4원칙 코드 리뷰 절차

## 1. 리뷰 절차 (5단계)

### Step 1. 변경 범위 파악
```bash
git diff HEAD --name-only
git diff HEAD --stat
```
변경 파일 수, 추가/삭제 line 수 확인.

### Step 2. 원래 요청 vs 변경 비교
원래 사용자 요청 (오케스트레이터가 전달) ↔ 변경된 파일들의 의도를 1:1 매칭. 매칭 안 되는 변경은 "범위 초과" 의심.

### Step 3. 4원칙 체크리스트 적용 (아래 2~5장 참조)

### Step 4. 검증 증거 확인
- 작업 에이전트가 typecheck/build/test를 실행했는가?
- 출력이 fresh 한가? ("이전에 통과"는 무효)

### Step 5. 판정 및 출력
- `PASS` / `PASS with Minor` / `BLOCK`
- 위반 항목 표
- 후속 액션 (BLOCK 시 누가 무엇을 수정)

---

## 2. 원칙 1 — Think Before Coding

### 체크 항목

- [ ] 모호한 사양에 대해 **추측 대신 명시적 가정**이 있었는가?
  - 좋은 신호: "X라고 가정하고 진행" / "Y는 사용자에게 확인 필요"
  - 나쁜 신호: 의심 가는 디자인 결정에 대한 설명 없음
- [ ] 새 SDK/라이브러리 도입 시 공식 문서 참조 흔적이 있는가?
  - 좋은 신호: import 직전에 주석으로 API 버전 명시
  - 나쁜 신호: 추측 기반 API 호출 (실제 SDK에 없는 메서드)
- [ ] 코드의 "왜"가 PR 메시지/이슈/커밋 메시지 중 하나에 기록되었는가?

### BLOCK 사유 예
- API 호출 코드가 실제 응답 shape과 다름 (문서 안 봄)
- 환경 변수명이 추측됨 (실제 사용 env 안 확인)

---

## 3. 원칙 2 — Simplicity First

### 체크 항목

- [ ] **요청 외 기능이 추가되지 않았는가?**
  - 나쁜 신호: "나중에 쓸 수도 있어서" 옵션·플래그·콜백 추가
  - 나쁜 신호: 명시되지 않은 에러 케이스 처리 (impossible scenarios)
- [ ] **단일 사용 추상화가 도입되지 않았는가?**
  - 나쁜 신호: 한 곳에서만 쓰이는 generic 함수, 인터페이스, 추상 클래스
  - 좋은 신호: 직접 인라인 코드 (필요해지면 그때 추출)
- [ ] **외부 라이브러리 신규 도입이 정당한가?**
  - 의존성 추가가 PRD/사용자 요청에 명시되었거나, 직접 구현이 100줄 이상일 때만 허용
  - styled-components, mantine, axios 등은 기존 스택과 중복이므로 거절
- [ ] **200줄 → 50줄로 줄일 여지가 있는가?**
  - 반복되는 분기, 과도한 변수 추출, 의미 없는 wrapper

### BLOCK 사유 예
- 단계 컴포넌트에 `theme` 옵션 prop 추가 (요청 없음)
- 라우터에 `service` 레이어 추가 (CRUD 한 줄 위해서)
- React Query 외에 SWR 추가

---

## 4. 원칙 3 — Surgical Changes

### 체크 항목

- [ ] **변경된 line이 모두 사용자 요청에 직접 추적 가능한가?**
  - 모든 line에 대해 "이 변경이 왜 이 요청에 필요한가?" 답할 수 있어야 함
- [ ] **인접 코드의 임의 수정이 없는가?**
  - 나쁜 신호: 작업 중인 함수 옆 함수의 import 순서 변경, formatting 변경
  - 나쁜 신호: 주석 추가/삭제가 작업 범위와 무관
- [ ] **기존 코딩 스타일·네이밍·들여쓰기를 유지했는가?**
  - 기존 파일이 `function foo()` 패턴이면 `const foo = () =>` 도입 금지
  - 기존 파일이 한국어 주석이면 영어 주석 도입 금지 (혼합 금지)
- [ ] **한 PR/작업이 단일 의도만 담는가?**
  - 시나리오 추가하면서 백엔드 모델도 같이 변경 → integration-qa 작업, 둘 다 같은 사용자 요청에서 나왔는지 확인

### BLOCK 사유 예
- 단계 추가 PR에서 인접한 다른 단계 컴포넌트의 styling 수정
- 백엔드 라우터 추가하면서 무관한 라우터의 import 정렬 변경
- 사용자가 요청하지 않은 typo 수정 (해도 좋은 일이지만 별도 작업)

---

## 5. 원칙 4 — Goal-Driven Execution

### 체크 항목

- [ ] **성공 기준이 검증 가능한 형태로 정의되었는가?**
  - 좋은 신호: "신규 단계에서 사용자가 정답 선택 시 다음 단계로 이동"
  - 나쁜 신호: "단계가 잘 작동함"
- [ ] **fresh 검증 증거가 있는가?**
  - 시나리오/스타일 변경: `npm run typecheck`, `npm run lint`, 가능하면 빌드
  - 백엔드 변경: `python -c "from main import app"` import 성공, 가능하면 pytest
  - 풀스택 변경: 양쪽 빌드 + integration-qa 통과
- [ ] **완료 주장 어조가 추측이 아닌가?**
  - 나쁜 신호: "should work", "probably fixes", "seems to handle"
  - 좋은 신호: "typecheck 0 에러 확인", "endpoint POST → 200 응답 확인"

### BLOCK 사유 예
- "구현 완료" 주장만 있고 typecheck 결과 없음
- "테스트 통과" 주장이 있는데 명령 실행 출력 없음
- 풀스택 변경인데 백엔드만 검증

---

## 6. 출력 형식

```markdown
## Karpathy Review 결과

**판정**: PASS / PASS with Minor / BLOCK

**리뷰 대상**: {파일 수}개 파일, +{add}/-{del} lines

### 위반 항목

| 등급 | 원칙 | 위치 | 내용 | 수정 제안 |
|------|------|------|------|----------|
| Critical | 2 (Simplicity) | `src/foo.ts:42` | 미사용 generic 인터페이스 추가 | 인터페이스 삭제, 직접 타입 사용 |
| Major | 3 (Surgical) | `src/bar.ts:10-15` | 인접 import 정렬 변경 | 정렬 변경 revert |
| Minor | 4 (Goal) | — | typecheck 결과 누락 | `npm run typecheck` 실행 후 결과 첨부 |

### 검증 증거

- [x] typecheck 출력 확인 — 0 에러
- [ ] 빌드 출력 — 누락
- [ ] integration-qa — 별도 호출 예정

### 후속 액션

- scenario-author → src/foo.ts:42의 generic 인터페이스 제거
- scenario-author → npm run build 실행 결과 첨부
```

## 7. 등급 가이드

| 등급 | 정의 | 처리 |
|------|------|------|
| Critical | 4원칙 명백 위반, 코드 의도 망가뜨림 | BLOCK |
| Major | 4원칙 위반이나 동작 자체는 OK | BLOCK (수정 요구) |
| Minor | 스타일·관용구 문제, 동작 OK | PASS with Minor |

검증 증거 누락은 항상 Major 이상 (Goal-Driven 위반).

## 8. 리뷰 시 하지 말 것

- ❌ **본인이 직접 코드 수정** — 작업 에이전트에게 돌려보내 책임 분리
- ❌ **사용자 요청 범위 재해석** — 오케스트레이터가 정한 범위 그대로
- ❌ **모든 변경에 트집** — 4원칙 위반만, 개인 선호는 배제
- ❌ **fresh 증거 없이 PASS** — 작업 에이전트의 "통과했다" 주장 신뢰 금지, 출력 직접 확인
