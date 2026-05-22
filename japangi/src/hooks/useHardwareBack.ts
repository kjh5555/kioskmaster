import { graniteEvent } from "@apps-in-toss/web-framework";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Wires Apps in Toss hardware back button to React Router.
 * At root ("/"), does nothing so the system can close the mini-app naturally.
 * Wrapped in try/catch because in browser dev mode (outside Toss WebView)
 * the granite SDK may not be available.
 */
export function useHardwareBack(): void {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    try {
      cleanup = graniteEvent.addEventListener("backEvent", {
        onEvent: () => {
          if (location.pathname === "/") {
            return;
          }
          navigate(-1);
        },
      });
    } catch {
      // Not running inside Apps in Toss WebView (e.g., plain browser dev).
    }
    return cleanup;
  }, [location.pathname, navigate]);
}
