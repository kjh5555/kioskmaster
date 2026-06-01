# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

> Source: [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills)

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

## 하네스: 「자판기 어렵지않아요」 (노인용 키오스크 연습 미니앱)

**목표:** 5명 전문 에이전트 팀(scenario-author / tds-stylist / fastapi-builder / karpathy-reviewer / integration-qa)이 시나리오 추가, 백엔드 API, 풀스택 기능, 노인 접근성 검수를 협업으로 처리한다. Karpathy 4원칙은 karpathy-reviewer가 항상 강제한다.

**트리거:** 키오스크 시나리오/단계 추가·수정, FastAPI 모델/엔드포인트 추가, TDS 스타일링·노인 접근성 작업, 풀스택 기능, "다시/재실행/수정/보완" 같은 후속 요청 시 `kiosk-workflow` 스킬을 사용하라. 단순 질문(설명·탐색)은 직접 응답.

**변경 이력:**
| 날짜 | 변경 내용 | 대상 | 사유 |
|------|----------|------|------|
| 2026-06-01 | 초기 구성 (에이전트 5 + 스킬 6) | 전체 | 시나리오 4종/풀스택 운영 모듈/노인 접근성 강제를 위한 하네스 구축 |
| 2026-06-01 | PRD 재정렬 — N9 신설 (보호자 기능 v2 후퇴) | docs/PRD.md | 보호자·자녀 페어링이 검증된 사용자 요구 없이 추가되어 IA가 분열되고 노인 본인 진입 흐름이 흐려짐. MVP는 노인 단독 사용 전제로 회귀. 코드는 보존하고 라우터에서만 분리 예정 |
| 2026-06-01 | Navigation flow regression 룰 추가 | skills/integration-qa-checks | "설정 → 의견 → 뒤로 → 의견" 핑퐁 버그를 계기로 BackButton history 누적·노인 멘탈모델·PRD N9 가시점 점검을 QA 체크리스트에 상시 룰화. 라우팅/페이지 변경 시 항상 적용 |
| 2026-06-01 | 카페 4종 시나리오 추가 (스타벅스/이디야/메가/일반카페) + Visual Mimicry First 룰 박음 | backend/app/seed + japangi/.../layouts + skills/scenario-patterns | 사용자 요구 "최대한 현재 키오스크 화면과 비슷해야 노인이 거리감 없게"를 단발 적용으로 끝내지 않고 scenario-patterns 7장에 의무 사항(색/헤더/버튼/로고/단말기 모사 + 자기 점검 4항목)으로 영구 룰화. 다음 시나리오부터 자동 강제 |

