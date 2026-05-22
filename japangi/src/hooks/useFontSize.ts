import React, { createContext, useContext, useEffect, useState } from "react";

import { FONT_SIZE_TOKENS, type FontSizeLevel } from "../styles/tokens";

const STORAGE_KEY = "japangi:fontSize";

const VALID_LEVELS: readonly FontSizeLevel[] = ["normal", "large", "xlarge"];

function isValidLevel(value: string): value is FontSizeLevel {
  return (VALID_LEVELS as readonly string[]).includes(value);
}

function readStoredLevel(): FontSizeLevel {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null && isValidLevel(stored)) {
      return stored;
    }
  } catch {
    // localStorage may be unavailable in some environments
  }
  return "normal";
}

function applyCssVars(level: FontSizeLevel): void {
  const tokens = FONT_SIZE_TOKENS[level];
  const root = document.documentElement;
  root.style.setProperty("--font-body", `${tokens.body}px`);
  root.style.setProperty("--font-button", `${tokens.button}px`);
  root.style.setProperty("--font-header", `${tokens.header}px`);
}

interface FontSizeContextValue {
  level: FontSizeLevel;
  setLevel: (level: FontSizeLevel) => void;
}

const FontSizeContext = createContext<FontSizeContextValue | null>(null);

export const FontSizeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [level, setLevelState] = useState<FontSizeLevel>(readStoredLevel);

  useEffect(() => {
    applyCssVars(level);
  }, [level]);

  const setLevel = (next: FontSizeLevel): void => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
    setLevelState(next);
  };

  return React.createElement(
    FontSizeContext.Provider,
    { value: { level, setLevel } },
    children,
  );
};

export function useFontSize(): FontSizeContextValue {
  const ctx = useContext(FontSizeContext);
  if (ctx === null) {
    throw new Error("useFontSize must be used inside FontSizeProvider");
  }
  return ctx;
}
