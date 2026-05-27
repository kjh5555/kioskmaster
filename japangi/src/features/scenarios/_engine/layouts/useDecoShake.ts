import { css, keyframes } from "@emotion/react";
import { useCallback, useRef, useState } from "react";

// Tiny helper so "decorative" kiosk buttons (영양정보, 쿠폰, 전체취소, 이전, X,
// page arrows when no other page exists, mode toggles in the wrong context,
// etc.) give a visible click feedback — a brief shake — instead of feeling
// dead. Use:
//
//   const { shakeNow, shakeStyle } = useDecoShake();
//   <button onClick={() => shakeNow("info")}
//           css={[infoChip, shakeStyle("info")]}>영양정보</button>

const shake = keyframes`
  0%   { transform: translateX(0); }
  20%  { transform: translateX(-6px); }
  40%  { transform: translateX(6px); }
  60%  { transform: translateX(-4px); }
  80%  { transform: translateX(4px); }
  100% { transform: translateX(0); }
`;

export function useDecoShake() {
  const [shaking, setShaking] = useState<string | null>(null);
  const timer = useRef<number | null>(null);

  const shakeNow = useCallback((id: string) => {
    setShaking(id);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setShaking(null), 360);
  }, []);

  const shakeStyle = useCallback(
    (id: string) =>
      shaking === id &&
      css`
        animation: ${shake} 320ms ease;
      `,
    [shaking],
  );

  return { shakeNow, shakeStyle };
}
