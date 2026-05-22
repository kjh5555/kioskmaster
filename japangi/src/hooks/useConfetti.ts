import confetti from "canvas-confetti";

const COLORS = ["#3182F6", "#FFD400", "#00C896", "#FF7A9D"];

export function useConfetti(): { burst: () => void } {
  const burst = (): void => {
    // Bottom-left burst
    void confetti({
      particleCount: 40,
      spread: 60,
      ticks: 80,
      origin: { x: 0.1, y: 1 },
      angle: 60,
      colors: COLORS,
    });
    // Bottom-right burst
    void confetti({
      particleCount: 40,
      spread: 60,
      ticks: 80,
      origin: { x: 0.9, y: 1 },
      angle: 120,
      colors: COLORS,
    });
  };

  return { burst };
}
