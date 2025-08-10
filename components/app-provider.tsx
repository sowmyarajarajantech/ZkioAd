"use client"

import type React from "react"

import { createContext, useContext, useEffect, useMemo, useReducer } from "react"
import { sampleRoadmaps } from "@/lib/sample-roadmaps"
import { loadState, saveState } from "@/lib/storage"
import { todayISO, isYesterday, maybeAwardBadges, incrementActivity } from "@/lib/utils-app"
import type { AppState, AppAction, Roadmap, Badge } from "@/types/types"

const initialState: AppState = {
  roadmaps: sampleRoadmaps,
  progressByRoadmap: {},
  user: {
    displayName: "Student",
    peerVisible: false,
    xp: 0,
    focusSessions: 0,
    lastActiveISO: null,
    currentStreak: 0,
    longestStreak: 0,
    badges: [],
    activity: {},
  },
  ui: { selectedRoadmapId: null },
  peers: [],
}

function ensureStreak(state: AppState, activeDate?: string) {
  const nowISO = activeDate || todayISO()
  const prev = state.user.lastActiveISO
  if (!prev) {
    state.user.currentStreak = 1
    state.user.longestStreak = Math.max(state.user.longestStreak, state.user.currentStreak)
    state.user.lastActiveISO = nowISO
    return
  }
  if (prev === nowISO) return
  if (isYesterday(prev, nowISO)) {
    state.user.currentStreak += 1
  } else {
    state.user.currentStreak = 1
  }
  state.user.longestStreak = Math.max(state.user.longestStreak, state.user.currentStreak)
  state.user.lastActiveISO = nowISO
}

function reducer(state: AppState, action: AppAction): AppState {
  const s: AppState = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case "selectRoadmap": {
      s.ui.selectedRoadmapId = action.id
      return s
    }
    case "toggleTopic": {
      const { roadmapId, topicId, activeDate } = action
      const prog = s.progressByRoadmap[roadmapId] || {}
      const before = !!prog[topicId]
      prog[topicId] = !before
      s.progressByRoadmap[roadmapId] = prog
      ensureStreak(s, activeDate)
      incrementActivity(s, action.activeDate || todayISO(), 1)
      if (!before) {
        s.user.xp += 10
      } else {
        s.user.xp = Math.max(0, s.user.xp - 10)
      }
      const roadmap = s.roadmaps.find((r) => r.id === roadmapId)
      const awarded: Badge[] = maybeAwardBadges(s, roadmap)
      if (awarded.length) s.user.badges.push(...awarded)
      return s
    }
    case "addRoadmap": {
      s.roadmaps.push(action.roadmap)
      return s
    }
    case "updateRoadmap": {
      s.roadmaps = s.roadmaps.map((r) => (r.id === action.roadmap.id ? action.roadmap : r))
      return s
    }
    case "deleteRoadmap": {
      s.roadmaps = s.roadmaps.filter((r) => r.id !== action.id)
      delete s.progressByRoadmap[action.id]
      if (s.ui.selectedRoadmapId === action.id) s.ui.selectedRoadmapId = null
      return s
    }
    case "setDisplayName": {
      s.user.displayName = action.name
      return s
    }
    case "setPeerVisible": {
      s.user.peerVisible = action.value
      return s
    }
    case "addXP": {
      ensureStreak(s, action.activeDate)
      incrementActivity(s, action.activeDate || todayISO(), 1)
      s.user.xp += action.amount
      const awards = maybeAwardBadges(s)
      if (awards.length) s.user.badges.push(...awards)
      return s
    }
    case "addFocusSession": {
      ensureStreak(s, action.activeDate)
      incrementActivity(s, action.activeDate || todayISO(), 1)
      s.user.focusSessions += 1
      s.user.xp += 15
      const awards = maybeAwardBadges(s)
      if (awards.length) s.user.badges.push(...awards)
      return s
    }
    case "awardBadge": {
      if (!s.user.badges.find((b) => b.id === action.badge.id)) {
        s.user.badges.push(action.badge)
      }
      return s
    }
    case "ingestActivity": {
      incrementActivity(s, action.date, action.delta || 1)
      return s
    }
    case "addPeer": {
      s.peers = Array.from(new Set([...(s.peers || []), action.value]))
      return s
    }
    case "importPayload": {
      if (action.state.roadmaps) s.roadmaps = mergeRoadmaps(s.roadmaps, action.state.roadmaps)
      if (action.state.progressByRoadmap)
        s.progressByRoadmap = { ...s.progressByRoadmap, ...action.state.progressByRoadmap }
      if (action.state.user) s.user = { ...s.user, ...action.state.user }
      return s
    }
    default:
      return s
  }
}

function mergeRoadmaps(curr: Roadmap[], incoming: Roadmap[]) {
  const map = new Map<string, Roadmap>(curr.map((r) => [r.id, r]))
  for (const r of incoming) {
    if (!map.has(r.id)) map.set(r.id, r)
  }
  return Array.from(map.values())
}

const AppCtx = createContext<{ state: AppState; dispatch: React.Dispatch<AppAction> } | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    const loaded = loadState<AppState>(init)
    // Ensure sample roadmaps exist
    if (!loaded.roadmaps?.length) {
      loaded.roadmaps = init.roadmaps
    } else {
      const existing = new Set(loaded.roadmaps.map((r) => r.id))
      for (const r of sampleRoadmaps) {
        if (!existing.has(r.id)) loaded.roadmaps.push(r)
      }
    }
    return loaded
  })

  useEffect(() => {
    saveState(state)
  }, [state])

  const value = useMemo(() => ({ state, dispatch }), [state])

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

export function useApp() {
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}
