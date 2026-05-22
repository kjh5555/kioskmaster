import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  to?: string;
}

export function BackButton({ to }: BackButtonProps = {}): React.ReactElement {
  const navigate = useNavigate();

  function handleClick(): void {
    if (to !== undefined) {
      navigate(to);
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
