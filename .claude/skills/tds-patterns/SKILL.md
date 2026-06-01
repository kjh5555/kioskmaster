---
name: tds-patterns
description: TDS Mobile(@toss/tds-mobile, @toss/tds-mobile-ait) 컴포넌트 매핑 및 @emotion/react 스타일링 패턴. 노인 친화 토큰(큰 폰트, 큰 터치, 명확한 대비)을 유지하면서 시나리오·홈·설정·피드백 화면을 스타일링할 때 사용. 새 스타일 도입, 기존 컴포넌트 리팩토링, 글씨 크기 토글 작업, 브랜드 테마 적용 등에 적극적으로 활용. tds-stylist 에이전트의 작업 가이드.
---

# tds-patterns — TDS Mobile 스타일링 가이드

## 1. 사용 가능한 패키지

```ts
import { ... } from "@toss/tds-mobile";       // 코어 컴포넌트
import { ... } from "@toss/tds-mobile-ait";   // Apps in Toss 전용 변형
import { colors } from "@toss/tds-colors";    // 색 토큰
import { css, keyframes } from "@emotion/react";
```

새 UI 라이브러리(styled-components, mantine, chakra 등) **도입 금지**. 모든 스타일은 TDS + emotion 조합으로.

## 2. TDS 컴포넌트 매핑 가이드

| 시나리오 단계 | 권장 TDS 컴포넌트 | 자체 구현 허용 조건 |
|-------------|------------------|------------------|
| 매장/포장 선택 | `Button` 큰 사이즈 2개 | — (TDS로 충분) |
| 카테고리 탭 | `Tab` 또는 `ListRow` | — |
| 메뉴 그리드 | 자체 `MenuCard` + TDS `Badge` | 메뉴 카드 시각 모사 필요 |
| 옵션 묶음 | `BottomSheet` | — |
| 수량 stepper | `ListRow` + 자체 `+/-` Button | — |
| 결제 안내 | `Dialog` / `Modal` | — |
| 주민번호 입력 | TDS `Keypad` + `TextField` | — (있으면) |
| 키오스크 시각 모사 | 자체 div + emotion css | 실제 키오스크 컬러·레이아웃 재현 시 |
| 좌석맵 | 자체 컴포넌트 | TDS 없음 |
| 일러스트/배지 | 자체 컴포넌트 | TDS Badge로 부족할 때 |

**원칙**: TDS로 표현 가능하면 무조건 TDS. 자체 div는 키오스크 시각 모사(McDonalds 빨간 헤더 등)에만.

## 3. 노인 친화 폰트 토큰

PRD 7.1 기준. 직접 px로 박지 말고 토큰 활용:

```ts
// styles/tokens.ts (이미 있으면 활용, 없으면 추가 후 사용)
export const ELDERLY_FONT = {
  body: "18px",      // 본문
  bodyLarge: "20px", // 본문 강조
  button: "22px",    // 버튼 라벨
  buttonLarge: "24px",
  header: "28px",    // 화면 헤더
  headline: "32px",  // 강조 헤드라인
} as const;
```

사용자 글씨 크기 토글(`useFontSize`)이 있는 경우, 위 토큰을 toggle 비율로 곱해서 사용.

## 4. 노인 친화 터치 영역

모든 인터랙티브 요소:

```ts
const tappable = css`
  min-width: 56px;
  min-height: 56px;
  padding: 12px 16px;
  margin: 4px;  // 인접 버튼과 12dp 간격
`;
```

TDS `Button`은 기본 크기로는 부족할 수 있다. `size` prop이 있으면 가장 큰 값 사용, 없으면 wrapper로 padding 추가.

## 5. 색 대비 (WCAG AAA 7:1)

- 본문 텍스트 vs 배경: 7:1 이상
- 큰 텍스트(18pt 이상): 4.5:1 이상 허용 (AAA 완화)
- 색 토큰: `@toss/tds-colors` 우선, 부족하면 키오스크 모사용 직접 `#` 색

**금지**: 회색 배경 + 회색 텍스트, 노랑 배경 + 흰 텍스트 등 저대비 조합.

**색만으로 정보 전달 금지**: 빨강/초록 구분 외 아이콘·텍스트 라벨 병행 (예: 정답 ✓ + 초록, 오답 ✗ + 빨강).

## 6. 애니메이션 규칙

```ts
const shakeKf = keyframes`
  0%   { transform: translateX(0); }
  20%  { transform: translateX(-8px); }
  40%  { transform: translateX(8px); }
  60%  { transform: translateX(-5px); }
  80%  { transform: translateX(5px); }
  100% { transform: translateX(0); }
`;
```

- ≤ 200ms (shake는 예외적으로 350ms 허용 — 기존 코드 관례)
- 깜빡임 금지 (안전 발작 위험)
- `prefers-reduced-motion: reduce` 사용자에게는 애니메이션 생략 (구현되어 있으면 유지)

## 7. emotion css 사용 패턴

기존 코드 스타일 그대로:

```tsx
import { css } from "@emotion/react";

export function MyStep({ step, onChoice }: CustomLayoutProps) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        padding: 16px;
        background: #fff;
      `}
    >
      {/* ... */}
    </div>
  );
}
```

- `styled` 변환 금지 (기존 코드는 inline `css` 사용)
- `className` 대신 `css` prop 사용
- 한 컴포넌트가 길어지면 함수 외부에 `const xxxStyle = css\`...\`` 추출 OK

## 8. 브랜드 테마 적용

`BrandTheme` (`primary`, `secondary`, `onPrimary`, `accent`)를 받아 헤더·CTA·강조 색으로 활용:

```tsx
<div css={css`
  background: ${theme.primary};
  color: ${theme.onPrimary};
`}>
  헤더
</div>
```

## 9. Apps in Toss WebView 고려

- `position: fixed` 사용 시 safe-area 고려 (Apps in Toss는 상단/하단 인셋 있음)
- viewport-meta는 이미 설정되어 있음 (수정 금지)
- 가로 모드 미지원 (세로 고정)

## 10. 자주 하는 실수

- ❌ TDS `Button`을 충분히 활용 가능한데 자체 div로 만든다
- ❌ 폰트 14~16px 사용 (노인용으로 너무 작음)
- ❌ 버튼 padding 8px 이하 (터치 영역 부족)
- ❌ 회색 텍스트 (#888) on 흰 배경 (대비 부족)
- ❌ 새로운 CSS-in-JS 라이브러리 도입
- ❌ 깜빡이는 강조 애니메이션

## 11. 추가 참고

- 기존 컴포넌트별 스타일 베스트 프랙티스: `references/styling-examples.md`
- 글씨 크기 토글 구현 패턴: `references/font-size-toggle.md`
