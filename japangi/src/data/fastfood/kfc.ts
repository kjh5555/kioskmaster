import type { ScenarioScript } from "../../features/scenarios/_engine/types";

export const KFC_SCENARIO: ScenarioScript = {
  id: "fastfood:kfc",
  goalSummary: "오늘은 징거버거 세트를 주문해볼게요.",
  theme: {
    name: "KFC",
    primary: "#E4002B",
    secondary: "#FFFFFF",
    onPrimary: "#FFFFFF",
    accent: "#231F20",
  },
  onboarding: [
    {
      emoji: "👋",
      title: "안녕하세요!",
      body: "KFC 키오스크 연습이에요. 실수해도 괜찮아요.",
    },
    {
      emoji: "👆",
      title: "한 단계씩 따라해봐요",
      body: "화면에 정답이 하나 있어요. 누르면 다음으로 넘어가요.",
    },
    {
      emoji: "❓",
      title: "막히면 ?를 눌러요",
      body: "오른쪽 아래 ? 버튼이 있어요. 친절한 설명이 나와요.",
    },
    {
      emoji: "🍔",
      title: "오늘의 목표",
      body: "징거버거 세트를 주문해 볼게요. 시작!",
    },
  ],
  steps: [
    {
      id: "start",
      instruction: "화면을 눌러서 주문을 시작해요",
      helpText:
        "키오스크는 처음에 큰 안내 화면이 떠 있어요. 어디든 한 번 누르면 주문 화면으로 넘어가요.",
      layout: "start",
      choices: [
        {
          id: "start-tap",
          label: "주문하시려면\n화면을 눌러주세요",
          emoji: "🍗",
        },
      ],
      correctChoiceId: "start-tap",
      successMessage: "좋아요, 시작해볼까요?",
      hintMessage: "화면 가운데 큰 버튼을 한 번 눌러주세요.",
    },
    {
      id: "dine-mode",
      instruction: "오늘은 매장에서 드시는 걸 골라요",
      helpText:
        "여기서 드시면 '여기서 드세요', 포장하실 거면 '포장이에요'를 눌러요.",
      layout: "duo",
      choices: [
        { id: "dine-in", label: "여기서 드세요", emoji: "🍽️" },
        { id: "takeout", label: "포장이에요", emoji: "🛍️" },
      ],
      correctChoiceId: "dine-in",
      successMessage: "잘하셨어요! 매장 식사로 골랐어요.",
      hintMessage: "오늘은 매장에서 드시는 거라 '여기서 드세요'를 눌러보세요.",
    },
    {
      id: "category",
      instruction: "버거를 골라봐요",
      helpText: "음식 종류를 먼저 골라요. 오늘은 버거를 살 거예요.",
      layout: "grid",
      choices: [
        { id: "burger", label: "버거", emoji: "🍔" },
        { id: "set", label: "세트", emoji: "🍟" },
        { id: "side", label: "사이드", emoji: "🍤" },
        { id: "drink", label: "음료", emoji: "🥤" },
      ],
      correctChoiceId: "burger",
      successMessage: "잘하셨어요! 버거 메뉴로 갈게요.",
      hintMessage: "버거가 그려진 카드를 눌러보세요.",
    },
    {
      id: "burger-choice",
      instruction: "징거버거를 골라요",
      helpText:
        "오늘은 징거버거 세트가 목표예요. 징거버거는 KFC의 대표 치킨버거예요.",
      layout: "grid",
      choices: [
        { id: "zinger", label: "징거버거", sublabel: "5,500원", emoji: "🍔" },
        { id: "tower", label: "타워버거", sublabel: "6,900원", emoji: "🍔" },
        { id: "twister", label: "트위스터", sublabel: "5,200원", emoji: "🍔" },
        {
          id: "hotcrispy",
          label: "핫크리스피버거",
          sublabel: "5,900원",
          emoji: "🍔",
        },
        { id: "garlic", label: "갈릭버거", sublabel: "6,300원", emoji: "🍔" },
        {
          id: "baconcheese",
          label: "베이컨치즈버거",
          sublabel: "7,800원",
          emoji: "🍔",
        },
      ],
      correctChoiceId: "zinger",
      successMessage: "징거버거! 맛있겠네요.",
      hintMessage: "왼쪽 위 '징거버거' 카드를 눌러보세요.",
    },
    {
      id: "set-or-single",
      instruction: "세트로 주문할게요",
      helpText:
        "세트로 하면 버거 + 감자튀김 + 음료가 같이 나와요. 단품이면 버거만 받아요.",
      layout: "duo",
      choices: [
        {
          id: "set",
          label: "세트",
          sublabel: "감자튀김+음료 포함",
          emoji: "🍟",
        },
        { id: "single", label: "단품", sublabel: "버거만", emoji: "🍔" },
      ],
      correctChoiceId: "set",
      successMessage: "세트로 골랐어요! 감자튀김도 같이 나와요.",
      hintMessage: "감자튀김 그림이 있는 '세트'를 눌러주세요.",
    },
    {
      id: "set-size",
      instruction: "보통 사이즈를 골라요",
      helpText:
        "세트 사이즈를 골라요. 보통이면 충분해요. 큰 사이즈는 양이 많고 값도 더 비싸요.",
      layout: "duo",
      choices: [
        { id: "regular", label: "보통", sublabel: "+0원", emoji: "🥤" },
        { id: "large", label: "큰 사이즈", sublabel: "+1,000원", emoji: "🥛" },
      ],
      correctChoiceId: "regular",
      successMessage: "보통 사이즈로 정했어요.",
      hintMessage: "왼쪽 '보통' 카드를 눌러주세요.",
    },
    {
      id: "pay-method",
      instruction: "카드로 결제할게요",
      helpText:
        "카드 또는 모바일 페이로 낼 수 있어요. 오늘은 카드를 골라요. 이건 연습이라 진짜 돈은 안 나가요.",
      layout: "duo",
      choices: [
        { id: "card", label: "카드", emoji: "💳" },
        { id: "mobilepay", label: "모바일 페이", emoji: "📱" },
      ],
      correctChoiceId: "card",
      successMessage: "카드 결제로 갈게요. 진짜 돈은 안 나가요!",
      hintMessage: "왼쪽 '카드' 카드를 눌러보세요.",
    },
    {
      id: "pay-confirm",
      instruction: "결제 버튼을 눌러서 주문을 마쳐요",
      helpText:
        "여기는 연습이에요. '결제하기'를 누르면 주문번호가 나와요. 진짜 돈은 절대 나가지 않아요.",
      layout: "start",
      choices: [
        { id: "confirm", label: "결제하기\n(연습이에요)", emoji: "✅" },
      ],
      correctChoiceId: "confirm",
      successMessage: "KFC 주문 완료! 잘하셨어요 🎉",
      hintMessage: "큰 '결제하기' 버튼을 한 번 눌러주세요.",
    },
  ],
};
