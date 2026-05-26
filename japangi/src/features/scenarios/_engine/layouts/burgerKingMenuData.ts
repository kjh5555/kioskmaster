// Real Burger King Korea menu data scraped from their mob-prd CDN endpoint.
// Each item references the actual product photo on burgerking.co.kr's CDN.

const CDN = "https://mob-prd.burgerking.co.kr/images/menu/web/main";

export interface BkMenuItem {
  id: string;
  name: string;
  components?: string;
  imageUrl: string;
  badge?: "NEW" | "BEST";
}

export interface BkMenuTab {
  id: string;
  label: string;
  items: ReadonlyArray<BkMenuItem>;
}

export const BK_MENU_TABS: ReadonlyArray<BkMenuTab> = [
  {
    id: "recommend",
    label: "추천메뉴",
    items: [
      { id: "1100826", name: "오리지널스 엘파소 치폴레", components: "오리지널스 엘파소 치폴레", imageUrl: `${CDN}/2026/05/20/ea8f8fca-c784-4795-ab83-cad5bb16ad0b.png`, badge: "NEW" },
      { id: "7714192", name: "오리지널스 엘파소 치폴레 세트", components: "+ 프렌치프라이(R) + 코카콜라(R)", imageUrl: `${CDN}/2026/05/20/f6c58af9-ad7d-4d67-81c1-5aa5e0280d38.png`, badge: "NEW" },
      { id: "1100730", name: "오리지널스 뉴욕 스테이크", components: "오리지널스 뉴욕 스테이크", imageUrl: `${CDN}/2025/05/16/de79cfd1-e414-4bf7-9e5f-c7a5afcd80c5.png`, badge: "BEST" },
      { id: "7713419", name: "오리지널스 뉴욕 스테이크 세트", components: "+ 프렌치프라이(R) + 코카콜라(R)", imageUrl: `${CDN}/2025/05/16/d31d01b0-bba2-471e-8e28-74609d7f23a3.png`, badge: "BEST" },
      { id: "1100809", name: "스모크 비프립 와퍼", components: "스모크 비프립 와퍼", imageUrl: `${CDN}/2026/03/25/b6f4b216-8e21-47b8-8707-3d80f1d1f6a0.png`, badge: "NEW" },
      { id: "1100797", name: "갈릭불고기 맥시멈2", components: "갈릭불고기 맥시멈2", imageUrl: `${CDN}/2026/02/24/b8891d42-e66e-4187-85db-fab09ebbdfcc.png`, badge: "NEW" },
      { id: "1115481", name: "더 크리스퍼 베이컨&치즈", components: "더 크리스퍼 베이컨&치즈", imageUrl: `${CDN}/2026/01/13/e7067ea7-1992-4fae-bb9e-8ab039e5d72e.png`, badge: "NEW" },
      { id: "7713767", name: "베이비 버거", components: "베이비 콰트로치즈 + 통새우 + 불고기", imageUrl: `${CDN}/2025/10/28/f550bedc-a598-414a-b0a2-ce2b52409640.png`, badge: "BEST" },
      { id: "1080121", name: "통새우와퍼", components: "통새우와퍼", imageUrl: `${CDN}/2025/01/06/b29489df-fafb-43f1-b0e1-21ab7b0c19e3.png` },
    ],
  },
  {
    id: "originals",
    label: "오리지널스&맥시멈",
    items: [
      { id: "1100826", name: "오리지널스 엘파소 치폴레", imageUrl: `${CDN}/2026/05/20/ea8f8fca-c784-4795-ab83-cad5bb16ad0b.png`, badge: "NEW" },
      { id: "7714192", name: "오리지널스 엘파소 치폴레 세트", imageUrl: `${CDN}/2026/05/20/f6c58af9-ad7d-4d67-81c1-5aa5e0280d38.png`, badge: "NEW" },
      { id: "7714193", name: "오리지널스 엘파소 치폴레 라지세트", imageUrl: `${CDN}/2026/05/20/a8160642-3abb-4c3d-9fd8-1a552b26715e.png`, badge: "NEW" },
      { id: "1100730", name: "오리지널스 뉴욕 스테이크", imageUrl: `${CDN}/2025/05/16/de79cfd1-e414-4bf7-9e5f-c7a5afcd80c5.png`, badge: "BEST" },
      { id: "7713419", name: "오리지널스 뉴욕 스테이크 세트", imageUrl: `${CDN}/2025/05/16/d31d01b0-bba2-471e-8e28-74609d7f23a3.png`, badge: "BEST" },
      { id: "1100797", name: "갈릭불고기 맥시멈2", imageUrl: `${CDN}/2026/02/24/b8891d42-e66e-4187-85db-fab09ebbdfcc.png`, badge: "NEW" },
      { id: "1100798", name: "갈릭불고기 맥시멈3", imageUrl: `${CDN}/2026/02/24/cd0ede20-337d-47a1-8980-62f06626737e.png`, badge: "NEW" },
      { id: "1100799", name: "갈릭불고기 맥시멈 원파운더", imageUrl: `${CDN}/2026/02/24/ca29b03d-8a94-44eb-a397-2e1869f37485.png`, badge: "NEW" },
      { id: "1100739", name: "더오치 맥시멈2", imageUrl: `${CDN}/2025/08/07/d426a52d-4137-4406-9e9c-a7d8b252c281.png`, badge: "BEST" },
    ],
  },
  {
    id: "premium",
    label: "프리미엄",
    items: [
      { id: "1100809", name: "스모크 비프립 와퍼", imageUrl: `${CDN}/2026/03/25/b6f4b216-8e21-47b8-8707-3d80f1d1f6a0.png`, badge: "NEW" },
      { id: "1100810", name: "스모크 베이컨 와퍼", imageUrl: `${CDN}/2026/03/25/b1fd7764-f5f2-40d2-8a42-b7b6935c4763.png`, badge: "NEW" },
      { id: "1100811", name: "스모크 비프립 샌드위치 버거", imageUrl: `${CDN}/2026/03/25/a5536f1b-b619-46d1-8ce3-682169e5b72a.png`, badge: "NEW" },
      { id: "1080215", name: "몬스터와퍼", imageUrl: `${CDN}/2025/01/06/ffefc938-62f3-4bc0-8a54-bad31db5d63a.png`, badge: "BEST" },
      { id: "1080009", name: "베이컨치즈와퍼", imageUrl: `${CDN}/2025/01/06/cafd8a5d-fbed-42c6-946d-c2f9cf009446.png` },
      { id: "1100197", name: "콰트로치즈와퍼", imageUrl: `${CDN}/2025/01/06/fe3b84c2-1e1c-47c1-aea2-a8a7f6d5a069.png` },
      { id: "1080121", name: "통새우와퍼", imageUrl: `${CDN}/2025/01/06/b29489df-fafb-43f1-b0e1-21ab7b0c19e3.png` },
      { id: "7713767", name: "베이비 버거", imageUrl: `${CDN}/2025/10/28/f550bedc-a598-414a-b0a2-ce2b52409640.png`, badge: "BEST" },
      { id: "7713768", name: "베이비 버거 세트", imageUrl: `${CDN}/2025/10/28/ac89fcbc-fd42-4b6a-b198-268682935dc7.png`, badge: "BEST" },
    ],
  },
  {
    id: "whopper",
    label: "와퍼&주니어",
    items: [
      { id: "1080013", name: "와퍼", imageUrl: `${CDN}/2025/01/06/c9811022-3678-4988-9fa4-1d3fc6a69bf5.png` },
      { id: "7111052", name: "와퍼 세트", imageUrl: `${CDN}/2025/01/06/ff0da2b6-ec36-4f37-ad92-c39eeb0eeec3.png` },
      { id: "7111691", name: "와퍼 라지세트", imageUrl: `${CDN}/2025/01/06/c8784db1-69ae-4a4a-b655-aebd88ef98f4.png` },
      { id: "1080010", name: "치즈와퍼", imageUrl: `${CDN}/2025/01/06/d14c3a22-568d-41f8-ba30-02ee39bfe647.png` },
      { id: "1100385", name: "불고기와퍼", imageUrl: `${CDN}/2025/01/06/fc969a33-3281-4601-91bb-b3aa789afc11.png` },
      { id: "1100412", name: "갈릭불고기와퍼", imageUrl: `${CDN}/2025/01/06/c84d6cc7-298a-440f-8328-1839031ef46e.png` },
      { id: "1100808", name: "콰트로치즈와퍼주니어", imageUrl: `${CDN}/2026/03/19/d948f0bc-05bf-4c8e-9acb-cf9d3b18cc66.png` },
      { id: "1090178", name: "통새우와퍼주니어", imageUrl: `${CDN}/2024/12/04/f9899937-0f95-4d89-9a9a-5fef132a7346.png` },
      { id: "1090015", name: "와퍼주니어", imageUrl: `${CDN}/2024/12/04/da324f38-2864-4382-ae9a-a97faf5bd265.png` },
      { id: "1090013", name: "치즈와퍼주니어", imageUrl: `${CDN}/2025/01/06/b1b8de28-8b85-450a-9c58-c40a9a2fad3d.png` },
      { id: "1100562", name: "더블비프불고기버거", imageUrl: `${CDN}/2025/01/06/d8688732-ccfa-41b1-8afa-ff3646d45c2a.png` },
      { id: "1050006", name: "치즈버거", imageUrl: `${CDN}/2025/01/06/d7977b8b-93c0-403f-834b-d9164f06cad6.png` },
    ],
  },
  {
    id: "chicken-shrimp",
    label: "치킨&슈림프\n버거",
    items: [
      { id: "1115480", name: "더 크리스퍼", imageUrl: `${CDN}/2026/01/13/d895878b-82cf-4563-8b0e-ae369eabd10f.png`, badge: "BEST" },
      { id: "1115481", name: "더 크리스퍼 베이컨&치즈", imageUrl: `${CDN}/2026/01/13/e7067ea7-1992-4fae-bb9e-8ab039e5d72e.png`, badge: "NEW" },
      { id: "1115459", name: "치킨킹", imageUrl: `${CDN}/2025/01/06/b24d04e3-96d6-4cc1-b07d-fc171a7fc6b8.png` },
      { id: "1115460", name: "치킨킹BLT", imageUrl: `${CDN}/2025/01/06/fd99206f-4072-4c2f-955c-12386291073a.png` },
      { id: "1100456", name: "통새우슈림프버거", imageUrl: `${CDN}/2025/01/06/b14f9d55-6932-4b58-8bfe-2a21ed63f376.png` },
      { id: "1115242", name: "치킨버거", imageUrl: `${CDN}/2025/01/06/eea3248f-3d79-4618-a87d-c9e07b61c432.png` },
      { id: "1115473", name: "치킨 치즈 마요 버거", imageUrl: `${CDN}/2025/07/22/bed42084-4793-41bc-b89f-9cae7bc211d7.png` },
      { id: "1115474", name: "치킨 치즈 마요 버거", imageUrl: `${CDN}/2025/07/28/cf9402e0-615e-4d0f-a5ca-af1a2485ee75.png` },
    ],
  },
  {
    id: "allday",
    label: "올데이스낵\n&올데이킹",
    items: [
      { id: "2200282", name: "크리스퍼 텐더", imageUrl: `${CDN}/2025/07/21/ae5df265-3f21-4e94-9565-6ad44ad45cf8.png` },
      { id: "2200284", name: "크리스퍼 랩", imageUrl: `${CDN}/2025/07/21/f8a73788-9144-41dd-959f-9d45779373eb.png` },
      { id: "2030348", name: "코코넛슈림프 3조각", imageUrl: `${CDN}/2025/01/06/b0eb0ebd-7603-4a03-ab2e-dcb2bb7506d1.png` },
      { id: "2030261", name: "21치즈스틱", imageUrl: `${CDN}/2025/01/06/b9b45861-8b06-4342-a3ef-ed6405f5457a.png` },
      { id: "2200285", name: "리얼어니언링(R)", imageUrl: `${CDN}/2025/07/08/d5c11ba6-9247-4bce-91e4-b845300130d8.png` },
      { id: "1100667", name: "몬스터 주니어", imageUrl: `${CDN}/2025/06/11/aa9ef4a9-ec10-4664-9080-d9b07f368867.png` },
      { id: "4020034", name: "밀크 선데", imageUrl: `${CDN}/2025/04/28/e4c9587f-7cde-4915-b7df-2899f07cb763.png` },
      { id: "4020035", name: "초코 선데", imageUrl: `${CDN}/2025/04/28/c3a36287-7c00-4bd3-9d0c-1269126b14de.png` },
      { id: "4400062", name: "킹플로트", imageUrl: `${CDN}/2025/05/22/bec2c132-481a-43fe-a4cc-1d97cd20d12c.png` },
    ],
  },
  {
    id: "side",
    label: "사이드",
    items: [
      { id: "2200282-s", name: "크리스퍼 텐더", imageUrl: `${CDN}/2025/07/21/ae5df265-3f21-4e94-9565-6ad44ad45cf8.png` },
      { id: "2030420", name: "바삭킹 2조각", imageUrl: `${CDN}/2025/01/06/f3792d8c-339f-47fd-bb5b-f40733991c1f.png` },
      { id: "2030421", name: "바삭킹 4조각", imageUrl: `${CDN}/2025/01/06/ab34a753-5337-4f98-a3ef-3b82f56a8a6b.png` },
      { id: "2200247", name: "리얼 어니언링(R)", imageUrl: `${CDN}/2025/01/06/ad192026-f0d0-45c7-bcad-1ffc043c8d02.png` },
      { id: "2030054", name: "너겟킹 4조각", imageUrl: `${CDN}/2025/01/06/dfc0294f-d53b-4dfc-b2eb-eaf313d4f77b.png` },
      { id: "2030056", name: "너겟킹 10조각", imageUrl: `${CDN}/2025/01/06/e0890014-66be-4f39-826b-74a428d6e410.png` },
      { id: "2200050", name: "쉐이킹프라이 구운갈릭", imageUrl: `${CDN}/2025/02/05/de724408-8d82-4417-8a0e-beb0b8baa149.png` },
      { id: "2030018", name: "프렌치프라이(R)", imageUrl: `${CDN}/2024/12/05/d601acd4-19ac-4462-9fdc-0d170e4d04e4.png` },
      { id: "2030015", name: "프렌치프라이(L)", imageUrl: `${CDN}/2024/12/05/bb859c97-0a00-4082-8fb7-0a8e67fe0ab5.png` },
      { id: "4020014", name: "코울슬로", imageUrl: `${CDN}/2025/01/06/d5da97e1-c516-4ebc-bbae-a41502e2b4d9.png` },
      { id: "4020001", name: "콘샐러드", imageUrl: `${CDN}/2024/12/05/ddaf5550-6e96-4b86-9798-150571843d34.png` },
    ],
  },
  {
    id: "drink-dessert",
    label: "음료&디저트",
    items: [
      { id: "4400069", name: "고구마 크림치즈 파이 로얄", imageUrl: `${CDN}/2025/12/12/b102c0d3-69b8-4ba7-8273-7822fc091673.png` },
      { id: "4400068", name: "딥 크런치 아포가토", imageUrl: `${CDN}/2025/10/10/d26503e1-c079-4ad3-96ad-c77a6ab1a437.png` },
      { id: "3030086", name: "아메리카노", imageUrl: `${CDN}/2025/01/06/c77ae44c-30a2-4b09-9438-4a072ce7299e.png` },
      { id: "3030087", name: "아이스아메리카노", imageUrl: `${CDN}/2025/01/06/ca880124-cf85-4412-a939-4ea32c9ab70c.png` },
      { id: "3040012", name: "코카콜라(L)", imageUrl: `${CDN}/2025/01/06/be1dfb8d-4ca6-4c23-a46e-b9ffc70999c0.png` },
      { id: "3040016", name: "코카콜라(R)", imageUrl: `${CDN}/2025/01/06/bd5158be-277d-483e-a5af-b3827feaf821.png` },
      { id: "3040015", name: "코카콜라 제로(L)", imageUrl: `${CDN}/2025/01/06/c4c1d0d8-7445-4673-9925-e2d5c16574b2.png` },
      { id: "3040014", name: "스프라이트(L)", imageUrl: `${CDN}/2025/01/06/ce899031-ae52-43d2-9bdd-e8572eed1051.png` },
      { id: "3020011", name: "미닛메이드 오렌지", imageUrl: `${CDN}/2025/01/06/fc7f243f-afa2-4315-a1b4-e53e83e855ec.png` },
      { id: "3020033", name: "순수(미네랄워터)", imageUrl: `${CDN}/2024/12/05/e8a25b53-a554-4869-bc92-0184f1ede143.png` },
      { id: "3030041", name: "핫초코", imageUrl: `${CDN}/2025/01/06/bbea6272-3573-42b1-aed4-f62402c810c3.png` },
      { id: "4010101", name: "아이스초코", imageUrl: `${CDN}/2025/01/06/c88ce7dd-34fd-4167-bfbb-75ecf167c1d2.png` },
    ],
  },
];
