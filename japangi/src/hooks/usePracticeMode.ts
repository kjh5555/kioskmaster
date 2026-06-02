import { useEffect, useState } from "react";

// 연습 모드 — 사용자가 키오스크 시나리오를 어떤 톤으로 경험할지 결정
//
// • free   — 자유 탐색. 정답 검사 없이 모든 클릭이 다음 단계로 진행.
//            (StepEngine 의 scenario.freeExplore 가 강제로 true 가 됨)
// • guided — AI 가 정해준 메뉴를 따라가는 일반 모드(기본값).
//            useDynamicGoal 의 selections 가 step.correctChoiceId 를 덮어씀.
export type PracticeMode = "free" | "guided";

const STORAGE_KEY = "japangi.practiceMode";
const STORAGE_EVENT = "japangi.practiceMode.changed";

function read(): PracticeMode {
  if (typeof window === "undefined") return "guided";
  const v = window.localStorage.getItem(STORAGE_KEY);
  if (v === "free" || v === "guided") return v;
  // 과거 'pro' 값이 저장되어 있던 사용자는 기본값(guided)으로 fallback
  return "guided";
}

export function usePracticeMode(): {
  mode: PracticeMode;
  setMode: (m: PracticeMode) => void;
} {
  const [mode, setLocal] = useState<PracticeMode>(read);

  useEffect(() => {
    function onChange() {
      setLocal(read());
    }
    // 다른 탭에서 변경
    window.addEventListener("storage", onChange);
    // 같은 탭의 다른 컴포넌트에서 변경 (storage 이벤트는 자기 탭에서 발생 X)
    window.addEventListener(STORAGE_EVENT, onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener(STORAGE_EVENT, onChange);
    };
  }, []);

  function setMode(m: PracticeMode): void {
    window.localStorage.setItem(STORAGE_KEY, m);
    setLocal(m);
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }

  return { mode, setMode };
}
