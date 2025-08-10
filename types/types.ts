export type ResourceLink = {
  label: string
  url: string
  type?: "video" | "course" | "article"
}

export type Topic = {
  id: string
  title: string
  section: string
  resources?: ResourceLink[]
}

export type Roadmap = {
  id: string
  title: string
  description: string
  topics: Topic[]
  createdAt?: string
  isCustom?: boolean
}

export type ProgressMap = Record<string, boolean> // topicId -> completed

export type RoadmapProgress = {
  roadmapId: string
  progress: ProgressMap
}

export type Badge = {
  id: string
  name: string
  description: string
  earnedAt: string
  icon?: string
}

export type ActivityLog = Record<string, number> // yyyy-mm-dd -> count

export type UserState = {
  displayName: string
  peerVisible: boolean
  xp: number
  focusSessions: number
  lastActiveISO: string | null
  currentStreak: number
  longestStreak: number
  badges: Badge[]
  activity: ActivityLog
}

export type AppState = {
  roadmaps: Roadmap[]
  progressByRoadmap: Record<string, ProgressMap>
  user: UserState
  ui: {
    selectedRoadmapId: string | null
  }
  peers: string[] // stored share/import links or payloads
}

export type AppAction =
  | { type: "selectRoadmap"; id: string | null }
  | { type: "toggleTopic"; roadmapId: string; topicId: string; activeDate?: string }
  | { type: "addRoadmap"; roadmap: Roadmap }
  | { type: "updateRoadmap"; roadmap: Roadmap }
  | { type: "deleteRoadmap"; id: string }
  | { type: "setDisplayName"; name: string }
  | { type: "setPeerVisible"; value: boolean }
  | { type: "addXP"; amount: number; reason?: string; activeDate?: string }
  | { type: "addFocusSession"; activeDate?: string }
  | { type: "awardBadge"; badge: Badge }
  | { type: "ingestActivity"; date: string; delta?: number }
  | { type: "addPeer"; value: string }
  | { type: "importPayload"; state: Partial<AppState> }
