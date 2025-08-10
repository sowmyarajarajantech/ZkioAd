const KEY = "skilltrack_v1"

export function loadState<T>(fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function saveState<T>(state: T) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {}
}
