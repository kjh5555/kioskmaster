import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  to?: string;
}

export function BackButton({ to }: BackButtonProps = {}): React.ReactElement {
  const navigate = useNavigate();

  function handleClick(): void {
    if (to !== undefined) {
      // 명시적 to 는 항상 replace — 같은 페이지를 history 에 또 쌓아
      // "설정 → 의견 → 뒤로 → 설정 → 뒤로 → 의견" 같은 무한 핑퐁을 막는다.
      // 노인 멘탈모델: "뒤로"는 한 계층 위로 가는 것이지 직전 화면 되감기가 아니다.
      navigate(to, { replace: true });
      return;
    }
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  return (
    <button
      onClick={handleClick}
      aria-label="이전 화면으로"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        minWidth: 56,
        minHeight: 56,
        padding: "0 8px",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "var(--font-body)",
        color: "#191919",
      }}
    >
      <span style={{ fontSize: 22 }}>←</span>
      <span>이전</span>
    </button>
  );
}
