---
name: integration-qa-checks
description: 「자판기 어렵지않아요」 풀스택·시나리오·백엔드 변경의 경계면 정합성 검증 체크리스트. 단순 "파일 존재 확인"이 아닌 "FE 훅 shape ↔ BE Pydantic 모델 1:1 비교", "CUSTOM_LAYOUTS 키 ↔ Step.customLayoutId 매칭", "시드 데이터 idempotency" 등 사일런트 실패를 잡는 교차 비교 절차. 코드 변경 직후 점진적으로 호출되어야 하며, FAIL 시 원인 에이전트에 수정 요청을 보낸다. integration-qa 에이전트의 작업 가이드.
---

# integration-qa-checks — 경계면 정합성 검증 절차

## 1. 핵심 원칙: 교차 비교

**QA의 본질은 "존재 확인"이 아닌 "경계면 교차 비교"다.**

- ❌ 잘못된 QA: "POST /api/feedback 라우터 존재함" (확인했다고 통과)
- ✅ 올바른 QA: `backend/app/api/feedback.py`의 `FeedbackOut` shape와 `japangi/src/features/feedback/api.ts`의 응답 타입을 같이 읽고 필드 1:1 비교

같은 정보가 양쪽에 표현되는 모든 경계면에 적용.

---

## 2. 작업 유형별 체크리스트

### 2-1. 시나리오 단계 추가 시

#### A. `CUSTOM_LAYOUTS` 매칭
```bash
# 추가된 단계 컴포넌트
grep -l "export function" japangi/src/features/scenarios/_engine/layouts/{Brand}*.tsx

# CUSTOM_LAYOUTS 등록 확인
grep -E '".*-.*":\s+\w+' japangi/src/features/scenarios/_engine/layouts/index.ts
```

체크:
- [ ] 새 `{Brand}{Step}.tsx`의 export가 `CUSTOM_LAYOUTS`에 키-값 쌍으로 등록됨
- [ ] 시나리오 스크립트(`Step.customLayoutId`)의 모든 키가 `CUSTOM_LAYOUTS`에 존재 (백엔드 시드 데이터에 정의됨 → 백엔드 코드도 확인)

#### B. Step 정합성
```python
# 백엔드 시드 데이터에서 Step 정의 추출
grep -E "customLayoutId|correctChoiceId|branchTo|detourTo" backend/app/seed/data/
```

체크:
- [ ] `correctChoiceId`가 `choices[].id` 중 하나
- [ ] `branchTo`/`detourTo` 타깃 step id가 실제 step 배열에 존재
- [ ] `successMessage`, `hintMessage` 한국어 평어체

#### C. 노인 접근성 회귀
```bash
# 새 컴포넌트의 폰트 크기 확인
grep -E "font-size:\s*1[0-7]px" japangi/src/features/scenarios/_engine/layouts/{Brand}*.tsx
# 위 grep이 결과를 반환하면 18px 미만 폰트 사용 → 위반
```

체크:
- [ ] 모든 폰트 ≥ 18px
- [ ] 모든 인터랙티브 요소 ≥ 56px (min-width + min-height 또는 padding)
- [ ] 결제 단계면 "연습", "시뮬레이션" 안내 문구 존재

#### D. 빌드 검증
```bash
cd japangi && npm run typecheck
cd japangi && npm run lint
```

---

### 2-2. 백엔드 API 추가 시

#### A. 라우터 등록
```bash
grep -E "include_router|app.api" backend/main.py
```

체크:
- [ ] 새 라우터가 `main.py`에 `include_router(prefix="/api")`로 등록
- [ ] `app/models/__init__.py`에 새 모델 export

#### B. Pydantic 모델 정합성
```bash
# 새 라우터의 In/Out 모델
grep -E "class \w+In|class \w+Out" backend/app/api/{name}.py
```

체크:
- [ ] `{Name}In` 모든 필드가 라우터 함수 본문에서 사용됨
- [ ] `{Name}Out`의 필드가 DB 모델에 모두 존재 (또는 변환 로직 명시)
- [ ] external_id 인증이 필요한 엔드포인트는 `_resolve_user` 호출
- [ ] 관리자 엔드포인트는 `Depends(_require_admin)` 포함

#### C. 시드 idempotency
```bash
# 새 시드 코드
grep -E "session.add\(|session.exec\(select" backend/app/seed/seed.py backend/app/seed/data/
```

체크:
- [ ] 새 시드 함수에서 `session.add` 전에 `select(...).first()`로 존재 확인
- [ ] 두 번 실행해도 row 수가 같음 (수동 테스트)

#### D. 임포트 검증
```bash
cd backend && python -c "from main import app; print('OK')"
```

---

### 2-3. 풀스택 변경 시 (시나리오 + 백엔드 동시)

#### A. FE 호출 ↔ BE 응답 shape 비교

**가장 중요한 체크**. 양쪽 코드를 같이 읽고 1:1 비교:

1. 백엔드 응답 모델 추출:
   ```python
   class FeedbackOut(BaseModel):
       id: int
       category: str
       message: str
       contact: Optional[str]
       status: str
       operator_note: Optional[str]
       created_at: datetime
       updated_at: datetime
   ```

2. 프론트엔드 호출 코드/타입 추출:
   ```ts
   // api.ts
   type Feedback = {
     id: number;
     category: string;
     message: string;
     contact: string | null;
     status: string;
     operatorNote: string | null;   // ⚠️ snake_case ↔ camelCase 불일치!
     createdAt: string;
     updatedAt: string;
   };
   ```

3. 비교 표 작성:
   | 필드 | BE 타입 | FE 타입 | 일치 |
   |------|--------|--------|------|
   | id | int | number | ✅ |
   | operator_note | str/None | operatorNote? | ❌ 필드명 불일치 |

4. **불일치 발견 시 FAIL 보고**, 어느 쪽을 수정할지 명시 (보통 BE의 snake_case를 그대로 FE에서 받음)

#### B. 인증 헤더 흐름
- 백엔드가 `X-Admin-Token` 요구하면 FE 호출 코드에 헤더 포함되었는지
- `external_id` 필수 body면 FE 호출에 포함되었는지

#### C. CORS 확인
```bash
grep -E "cors_origins" backend/app/config.py backend/main.py
```
- 프론트 origin이 `CORS_ORIGINS` 환경변수에 포함되었는지 (로컬 개발: `http://localhost:5173`)

#### D. 양쪽 빌드
```bash
cd backend && python -c "from main import app"
cd japangi && npm run typecheck && npm run build
```

---

## 3. 출력 형식

```markdown
## Integration QA 결과

**판정**: PASS / FAIL
**작업 유형**: 풀스택 / 시나리오 / 백엔드
**대상**: {file count} 파일

### 경계면 비교 결과

#### 1. {경계면 이름} (예: FeedbackOut ↔ FE Feedback type)

| 필드 | BE | FE | 일치 |
|------|----|----|------|
| ... | ... | ... | ✅/❌ |

#### 2. {다른 경계면}
...

### 실행한 검증 명령

```
$ cd japangi && npm run typecheck
... 0 에러
$ cd backend && python -c "from main import app"
OK
```

### FAIL 항목 (있을 시)

| # | 위치 | 문제 | 수정 담당 |
|---|------|------|---------|
| 1 | `japangi/src/features/feedback/api.ts:15` | operatorNote → operator_note로 변경 필요 | scenario-author |

### 후속 액션
- 해당 에이전트에 SendMessage 발송됨
- 수정 완료 후 재호출 요청
```

## 4. 사용 가능한 도구

- `Bash` — git diff, grep, npm run, python import test
- `Read` — 양쪽 파일 동시 읽기 (이게 핵심!)
- `mcp__plugin_oh-my-claudecode_t__lsp_diagnostics_directory` — typecheck 빠른 실행 (있으면)

## 5. Navigation Flow Regression (네비게이션 흐름 회귀 — 라우팅/페이지 변경 시 필수)

라우팅·진입점·BackButton 변경 시 자주 회귀하는 패턴들. **새 페이지 추가, 기존 페이지 라우트 이동, BackButton 동작 변경, Top.RightButton/NavBtn 같은 진입 버튼 추가 시 항상 점검**한다.

### 5-1. BackButton 흐름 검증

각 페이지의 BackButton 동작을 다음 표로 추적:

| 페이지 | `to` 명시? | 기대 목적지 | 노인 멘탈모델 일치? |
|--------|----------|-----------|------------------|
| SettingsPage | `to="/"` | 홈 | ✅ "설정 닫으면 홈" |
| FeedbackPage | `to="/settings"` | 설정 | ✅ "한 계층 위" |
| BrandSelectPage | `to="/"` | 홈 | ✅ |
| ScenarioStepPage | (없음) | history pop | 시나리오 단계 내 자연 뒤로 |

**원칙:**
- 명시적 `to` BackButton은 반드시 `navigate(to, { replace: true })`로 호출 — push 시 같은 페이지가 history에 누적되어 "뒤로가기 핑퐁" 버그 발생
- "노인 멘탈모델"에 맞춘 목적지인지 점검: 깊은 화면(의견 보내기)에서 뒤로 → 한 계층 위(설정)가 자연스러움. 갑자기 홈으로 점프하지 않을 것.
- 같은 페이지에 여러 진입 경로가 있으면(예: HomePage Top → 설정, 시나리오 완료 → 설정), 모두 BackButton 결과가 일관되게 한 곳으로 가야 함 — `replace`가 이를 보장.

### 5-2. 무한 핑퐁 패턴 (재발 방지)

다음 시나리오를 머릿속으로 dry-run:
1. 홈 → A 페이지 (history: `[/, /a]`)
2. A 페이지에서 B 페이지로 navigate (history: `[/, /a, /b]`)
3. B의 BackButton → A로 push? replace?
4. A의 BackButton → 어디로?

**push로 돌아갔다면 history가 `[/, /a, /b, /a]`** — A에서 뒤로 누르면 B로 다시 감 (사용자가 "닫았다고 생각한" 화면이 다시 열림). 항상 replace.

### 5-3. PRD N9 일관성 (보호자 진입 가시점)

- 노인 화면에서 보호자 진입 버튼(예: "가족 연결")이 새로 추가되지 않았는지 grep
- SettingsPage의 "누가 사용하나요?" 토글이 다시 노출되지 않았는지 (주석으로 가린 상태 유지)
- 새 페이지가 `/pair`, `/guardian/*`, `/role-select` 같은 보호자 라우트로 직접 navigate하면 노인 진입점에서는 숨겨야 함

### 5-4. 점검 명령

```bash
# 모든 BackButton 사용 패턴
grep -rn "BackButton" japangi/src/features/ | grep -v "_engine"

# 명시적 navigate("/") 또는 navigate("/특정경로") 흐름
grep -rn "navigate(\"/" japangi/src/features/ | grep -v "_engine"

# 새 진입점 추가 여부 (Top.RightButton, NavBtn 등)
grep -rn "RightButton\|NavBtn" japangi/src/features/
```

각 grep 결과의 새 항목을 위 5-1 표에 추가하고 노인 멘탈모델 일치 여부 점검.

---

## 6. 자주 놓치는 사일런트 실패

- 백엔드 응답 필드명이 snake_case인데 프론트에서 camelCase로 받음 → 런타임에 `undefined`만 나옴, 타입 에러 안 남
- `CUSTOM_LAYOUTS`에 등록 빠뜨림 → 시나리오가 generic layout으로 폴백, 시각만 다름
- 시드 함수에서 존재 확인 빠뜨림 → 부팅마다 중복 row 누적, 한참 후 발견
- 관리자 엔드포인트에 `_require_admin` 빠뜨림 → 보안 사고
- 결제 시뮬레이션 단계에 "연습이에요" 누락 → PRD R4 위반, 사용자 신뢰 손상

## 7. QA가 하지 말 것

- ❌ **직접 코드 수정** — 원인 에이전트에 돌려보내 책임 분리
- ❌ **"파일 존재함" 으로 통과** — 반드시 shape 교차 비교
- ❌ **이전 typecheck 결과 신뢰** — 항상 fresh 실행
- ❌ **빌드 환경 무시** — 의존성 누락 시 사용자에게 명시 후 수동 검증 요청
