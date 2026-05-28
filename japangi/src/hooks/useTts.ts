import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "japangi:ttsEnabled";

function readStored(): boolean {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "true") return true;
    if (v === "false") return false;
  } catch {
    // ignore
  }
  // Default OFF — opt-in. Auto-playing speech can surprise users.
  return false;
}

function writeStored(v: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY, String(v));
  } catch {
    // ignore
  }
}

interface TtsContextValue {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  available: boolean;
  speak: (text: string) => void;
  cancel: () => void;
}

const TtsContext = createContext<TtsContextValue | null>(null);

export const TtsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [enabled, setEnabledState] = useState<boolean>(readStored);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const available =
    typeof window !== "undefined" && "speechSynthesis" in window;

  const setEnabled = useCallback((v: boolean) => {
    setEnabledState(v);
    writeStored(v);
    if (!v && available) {
      window.speechSynthesis.cancel();
    }
  }, [available]);

  const cancel = useCallback(() => {
    if (available) window.speechSynthesis.cancel();
  }, [available]);

  const speak = useCallback(
    (text: string) => {
      if (!available) return;
      if (!text || text.trim().length === 0) return;
      // Stop anything previously queued before speaking the new instruction.
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "ko-KR";
      u.rate = 0.95; // slightly slower for elderly listeners
      u.pitch = 1.0;
      utterRef.current = u;
      window.speechSynthesis.speak(u);
    },
    [available],
  );

  // Cancel speech when the user toggles TTS off mid-utterance.
  useEffect(() => {
    if (!enabled) cancel();
  }, [enabled, cancel]);

  // Stop speech when the component tree unmounts (e.g. tab switch).
  useEffect(() => {
    return () => {
      if (available) window.speechSynthesis.cancel();
    };
  }, [available]);

  return React.createElement(
    TtsContext.Provider,
    { value: { enabled, setEnabled, available, speak, cancel } },
    children,
  );
};

export function useTts(): TtsContextValue {
  const ctx = useContext(TtsContext);
  if (ctx === null) {
    throw new Error("useTts must be used inside <TtsProvider>");
  }
  return ctx;
}
