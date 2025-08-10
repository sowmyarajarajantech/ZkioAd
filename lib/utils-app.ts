import type { AppState, Roadmap, Badge, Topic } from "@/types/types"

// Date helpers
export function todayISO(date?: Date) {
  const d = date ?? new Date()
  return d.toISOString().slice(0, 10)
}

export function isYesterday(prevISO: string, nowISO: string) {
  const prev = new Date(prevISO + "T00:00:00")
  const now = new Date(nowISO + "T00:00:00")
  const diff = (now.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
  return diff === 1
}

export function groupBySection(topics: Topic[]) {
  const map = new Map<string, Topic[]>()
  for (const t of topics) {
    map.set(t.section, [...(map.get(t.section) || []), t])
  }
  return Array.from(map.entries()).map(([section, list]) => ({ section, topics: list }))
}

export function calcProgress(roadmap: Roadmap, progressMap: Record<string, boolean> | undefined) {
  const total = roadmap.topics.length
  const done = roadmap.topics.filter((t) => progressMap?.[t.id]).length
  const pct = total ? Math.round((done / total) * 100) : 0
  return { total, done, pct }
}

// XP and leveling
export function levelFromXP(xp: number) {
  // Simple: 100 XP per level
  return 1 + Math.floor(xp / 100)
}

export function heuristicSuggestions(roadmap: Roadmap | undefined, completed: Set<string>) {
  if (!roadmap) {
    return ["Pick a roadmap to get personalized guidance.", "Browse Roadmaps and select one to start."]
  }
  const remaining = roadmap.topics.filter((t) => !completed.has(t.id))
  const next = remaining[0]?.title
  const ideas: string[] = []
  if (next) ideas.push(`Next Topic: ${next}`)
  // Suggest a mini project when foundations are done
  const foundationsDone = roadmap.topics
    .filter((t) => t.section.toLowerCase().includes("foundation"))
    .every((t) => completed.has(t.id))
  if (foundationsDone) {
    ideas.push("Mini-project: Build something small to apply your foundations.")
  }
  // Suggest spaced repetition
  if (completed.size >= Math.ceil(roadmap.topics.length / 3)) {
    ideas.push("Review previously completed topics using spaced repetition (quick notes or flashcards).")
  }
  // Encourage sharing
  ideas.push("Share your progress with peers to stay accountable (Community tab).")
  return ideas
}

export function defaultBadges(): Badge[] {
  return []
}

export function maybeAwardBadges(state: AppState, roadmap?: Roadmap) {
  const earned = new Set(state.user.badges.map((b) => b.id))
  const out: Badge[] = []

  const add = (id: string, name: string, description: string) => {
    if (!earned.has(id)) {
      out.push({
        id,
        name,
        description,
        earnedAt: new Date().toISOString(),
      })
      earned.add(id)
    }
  }

  // First step
  const anyCompletion = Object.values(state.progressByRoadmap).some((p) => Object.values(p).some(Boolean))
  if (anyCompletion) add("first-step", "First Step", "Completed your first topic!")

  // 50% in any roadmap
  for (const r of state.roadmaps) {
    const prog = state.progressByRoadmap[r.id] || {}
    const { pct } = calcProgress(r, prog)
    if (pct >= 50) {
      add("halfway", "Halfway There", "Reached 50% progress on a roadmap.")
    }
    if (pct === 100) {
      add("roadmap-master", "Roadmap Master", "Completed an entire roadmap!")
    }
  }

  // Streaks
  if (state.user.currentStreak >= 3) {
    add("streak-3", "Consistency x3", "Maintained a 3-day streak.")
  }
  if (state.user.currentStreak >= 7) {
    add("streak-7", "Consistency x7", "Maintained a 7-day streak.")
  }

  // Focus sessions
  if (state.user.focusSessions >= 4) {
    add("pomodoro-pro", "Pomodoro Pro", "Completed 4 focus sessions.")
  }

  // XP thresholds
  if (state.user.xp >= 100) add("level-2", "Level 2", "Reached Level 2.")
  if (state.user.xp >= 300) add("level-4", "Level 4", "Reached Level 4.")

  return out
}

export function incrementActivity(state: AppState, iso: string, delta = 1) {
  const curr = state.user.activity[iso] || 0
  state.user.activity[iso] = curr + delta
}

export function compressObject(obj: unknown): string {
  // Lightweight compression using base64 JSON (readable + URL-safe-ish)
  const json = JSON.stringify(obj)
  const b64 =
    typeof window !== "undefined"
      ? window.btoa(unescape(encodeURIComponent(json)))
      : Buffer.from(json, "utf-8").toString("base64")
  // URL-safe base64
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")
}

export function decompressObject<T = unknown>(input: string): T | null {
  try {
    const b64 = input.replace(/-/g, "+").replace(/_/g, "/")
    const pad = b64.length % 4 === 0 ? "" : "=".repeat(4 - (b64.length % 4))
    const data = b64 + pad
    const json =
      typeof window !== "undefined"
        ? decodeURIComponent(escape(window.atob(data)))
        : Buffer.from(data, "base64").toString("utf-8")
    return JSON.parse(json) as T
  } catch {
    return null
  }
}
