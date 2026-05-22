import { BottomSheet } from "@toss/tds-mobile";
import { useState } from "react";

interface HelpOverlayProps {
  helpText: string;
}

export function HelpOverlay({
  helpText,
}: HelpOverlayProps): React.ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="도움말 열기"
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          backgroundColor: "#3182F6",
          color: "#fff",
          fontSize: "var(--font-button)",
          fontWeight: 700,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          bottom: "calc(env(safe-area-inset-bottom, 0px) + 24px)",
          right: 16,
          zIndex: 90,
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      >
        ?
      </button>

      <BottomSheet open={open} onDimmerClick={() => setOpen(false)}>
        <BottomSheet.Header>도움말</BottomSheet.Header>
        <div
          style={{
            padding: "16px 24px 32px",
            fontSize: "var(--font-body)",
            lineHeight: 1.6,
            color: "#191919",
          }}
        >
          {helpText}
        </div>
        <BottomSheet.CTA
          ctaButton={{
            label: "닫기",
            onClick: () => setOpen(false),
          }}
        />
      </BottomSheet>
    </>
  );
}
