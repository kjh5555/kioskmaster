const STORAGE_PREFIX = "japangi:onboardingDone:";

export function wasOnboardingSeen(scenarioId: string): boolean {
  try {
    return localStorage.getItem(STORAGE_PREFIX + scenarioId) === "1";
  } catch {
    return false;
  }
}

export function markOnboardingSeen(scenarioId: string): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + scenarioId, "1");
  } catch {
    // ignore
  }
}
