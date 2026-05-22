import { Button } from "@toss/tds-mobile";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "weak" | "soft";

interface BigButtonProps {
  children: React.ReactNode;
  onClick?: ComponentPropsWithoutRef<"button">["onClick"];
  variant?: Variant;
  as?: "button" | "a";
  href?: string;
  disabled?: boolean;
}

// Maps our simplified variant names to TDS Button props.
// "soft" is rendered as fill+light since TDS has no "soft" variant.
function toTDSProps(variant: Variant): {
  variant: "fill" | "weak";
  color: "primary" | "light";
} {
  if (variant === "weak") return { variant: "weak", color: "primary" };
  if (variant === "soft") return { variant: "fill", color: "light" };
  return { variant: "fill", color: "primary" };
}

export function BigButton({
  children,
  onClick,
  variant = "primary",
  as,
  href,
  disabled,
}: BigButtonProps): React.ReactElement {
  const tdsProps = toTDSProps(variant);

  return (
    <div
      style={{
        minHeight: 64,
        width: "100%",
        display: "flex",
        alignItems: "stretch",
      }}
    >
      <Button
        display="full"
        size="xlarge"
        variant={tdsProps.variant}
        color={tdsProps.color}
        onClick={onClick}
        as={as}
        href={href}
        disabled={disabled}
        style={{
          fontSize: "var(--font-button)",
          minHeight: 64,
          width: "100%",
          borderRadius: 16,
        }}
      >
        {children}
      </Button>
    </div>
  );
}
