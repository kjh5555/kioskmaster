import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "japangi:highContrast";

function readStored(): boolean {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "true") return true;
    if (v === "false") return false;
  } catch {
    // ignore
  }
  return false;
}

function writeStored(v: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(v));
  } catch {
    // ignore
  }
}

function applyToDom(on: boolean): void {
  if (typeof document === "undefined") return;
  if (on) {
    document.documentElement.dataset.highContrast = "on";
  } else {
    delete document.documentElement.dataset.highContrast;
  }
}

interface HighContrastContextValue {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
}

const HighContrastContext = createContext<HighContrastContextValue | null>(
  null,
);

export const HighContrastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [enabled, setEnabledState] = useState<boolean>(readStored);

  useEffect(() => {
    applyToDom(enabled);
  }, [enabled]);

  const setEnabled = (v: boolean): void => {
    setEnabledState(v);
    writeStored(v);
  };

  return React.createElement(
    HighContrastContext.Provider,
    { value: { enabled, setEnabled } },
    children,
  );
};

export function useHighContrast(): HighContrastContextValue {
  const ctx = useContext(HighContrastContext);
  if (ctx === null) {
    throw new Error("useHighContrast must be used inside <HighContrastProvider>");
  }
  return ctx;
}
