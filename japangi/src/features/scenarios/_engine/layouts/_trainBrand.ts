// KTX / SRT 공용 컴포넌트의 brand 분기.
// scenario.id 가 'train:srt' 면 SRT 톤, 그 외(기본은 KTX) 는 코레일 톤.

export type TrainBrand = {
  name: string;            // "KTX" | "SRT"
  trainNum1: string;       // 첫 번째 운행 열차 번호
  trainNum2: string;       // 두 번째 운행 열차 번호 (사용자 기본 선택)
  trainNumSold1: string;   // 매진 1
  trainNumSold2: string;   // 매진 2
  originStation: string;
  destStation: string;
  primaryDark: string;     // 헤더/큰 버튼 배경
  primaryDarkHover: string;
  primary: string;         // 메인 캡슐 진한 색
  primaryLight: string;    // 메인 캡슐 연한 색
  trainBodyDark: string;   // 일러스트 열차 차체
  trainBodyLight: string;
  paymentHeaderBg: string; // 결제 화면 보라 헤더
  selectedSeatBg: string;
  ticketLogo: string;      // 영수증/티켓 옆 라벨
};

export function trainBrand(scenarioId: string): TrainBrand {
  if (scenarioId.includes("srt")) {
    return {
      name: "SRT",
      trainNum1: "SRT 311",
      trainNum2: "SRT 305",
      trainNumSold1: "SRT 309",
      trainNumSold2: "SRT 315",
      originStation: "수서",
      destStation: "동탄",
      primaryDark: "#5b1f5f",
      primaryDarkHover: "#481648",
      primary: "#8b248f",
      primaryLight: "#d4a2d8",
      trainBodyDark: "#5b1f5f",
      trainBodyLight: "#a350a8",
      paymentHeaderBg: "#5b1f5f",
      selectedSeatBg: "#d4a2d8",
      ticketLogo: "SRT",
    };
  }
  return {
    name: "KTX",
    trainNum1: "KTX 802",
    trainNum2: "KTX 802",
    trainNumSold1: "KTX 506",
    trainNumSold2: "KTX 707",
    originStation: "서울",
    destStation: "오송",
    primaryDark: "#1a3d5c",
    primaryDarkHover: "#14304a",
    primary: "#2c6fc8",
    primaryLight: "#97b6dd",
    trainBodyDark: "#2a6fa6",
    trainBodyLight: "#4ea8d9",
    paymentHeaderBg: "#4a3d8c",
    selectedSeatBg: "#8fbce0",
    ticketLogo: "KTX",
  };
}
