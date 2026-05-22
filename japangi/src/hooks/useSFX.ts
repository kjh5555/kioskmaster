export interface SFXHook {
  playSuccess: () => void;
  playError: () => void;
}

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  try {
    if (audioCtx === null) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === "suspended") {
      void audioCtx.resume();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

function playTone(
  frequency: number,
  type: OscillatorType,
  durationMs: number,
  volume: number,
  startOffsetMs = 0,
  ctx: AudioContext,
): void {
  const startTime = ctx.currentTime + startOffsetMs / 1000;
  const endTime = startTime + durationMs / 1000;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startTime);

  gain.gain.setValueAtTime(volume, startTime);
  // Exponential decay to avoid click at end
  gain.gain.exponentialRampToValueAtTime(0.001, endTime);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(endTime);
}

export function useSFX(): SFXHook {
  const playSuccess = (): void => {
    const ctx = getAudioContext();
    if (ctx === null) return;
    try {
      // Two ascending notes: C5 (523Hz) → E5 (659Hz), ~120ms each
      playTone(523, "sine", 120, 0.3, 0, ctx);
      playTone(659, "sine", 120, 0.3, 130, ctx);
    } catch {
      // silently ignore
    }
  };

  const playError = (): void => {
    const ctx = getAudioContext();
    if (ctx === null) return;
    try {
      // Short low buzz: A3 (220Hz), ~200ms, sawtooth, low volume
      playTone(220, "sawtooth", 200, 0.08, 0, ctx);
    } catch {
      // silently ignore
    }
  };

  return { playSuccess, playError };
}
