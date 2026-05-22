interface PracticeBadgeProps {
  position?: "fixed" | "static";
}

export function PracticeBadge({
  position = "fixed",
}: PracticeBadgeProps): React.ReactElement {
  const isFixed = position === "fixed";

  return (
    <div
      aria-label="연습 중 표시"
      style={{
        position: isFixed ? "fixed" : "static",
        // Respect safe-area-inset-top for notched devices
        top: isFixed ? "calc(env(safe-area-inset-top, 0px) + 12px)" : undefined,
        right: isFixed ? 16 : undefined,
        backgroundColor: "#FFD400",
        color: "#191919",
        fontWeight: 700,
        fontSize: 14,
        padding: "4px 10px",
        borderRadius: 20,
        zIndex: isFixed ? 100 : undefined,
        whiteSpace: "nowrap",
        boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
      }}
    >
      연습 중
    </div>
  );
}
