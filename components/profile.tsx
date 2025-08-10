"use client"

import { useState, useEffect } from "react"
import { useApp } from "./app-provider"
import { levelFromXP, todayISO } from "@/lib/utils-app"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge as UIBadge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { TimerReset } from "lucide-react"

export function Profile({ variant = "full" }: { variant?: "full" | "compact" } = { variant: "full" }) {
  const { state, dispatch } = useApp()
  const level = levelFromXP(state.user.xp)
  const nextLevelXP = level * 100
  const pct = Math.min(100, Math.round(((state.user.xp % 100) / 100) * 100))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Streaks, XP, badges, and focus timer.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input
              id="name"
              value={state.user.displayName}
              onChange={(e) => dispatch({ type: "setDisplayName", name: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-between rounded-md border p-3">
            <div>
              <div className="font-medium">Peer Visibility</div>
              <div className="text-xs text-muted-foreground">Opt-in to share your profile data in Community.</div>
            </div>
            <Switch
              checked={state.user.peerVisible}
              onCheckedChange={(v) => dispatch({ type: "setPeerVisible", value: !!v })}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-md border p-3">
            <div className="text-sm text-muted-foreground mb-1">Level</div>
            <div className="text-2xl font-bold">Lv {level}</div>
            <div className="text-xs text-muted-foreground">
              {state.user.xp} / {nextLevelXP} XP
            </div>
            <Progress value={pct} className="mt-2" />
          </div>
          <div className="rounded-md border p-3">
            <div className="text-sm text-muted-foreground mb-1">Streak</div>
            <div className="text-2xl font-bold">{state.user.currentStreak} days</div>
            <div className="text-xs text-muted-foreground">Longest: {state.user.longestStreak} days</div>
          </div>
        </div>

        <Heatmap activity={state.user.activity} days={variant === "compact" ? 14 : 30} />

        <FocusTimer />

        {variant === "full" && (
          <div>
            <div className="font-medium mb-2">Badges</div>
            <div className="flex flex-wrap gap-2">
              {state.user.badges.length ? (
                state.user.badges.map((b) => <BadgePill key={b.id} name={b.name} description={b.description} />)
              ) : (
                <div className="text-sm text-muted-foreground">No badges yet. Start learning to earn some!</div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function BadgePill({ name, description }: { name: string; description: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1">
      <UIBadge variant="secondary">{name}</UIBadge>
      <span className="text-xs text-muted-foreground">{description}</span>
    </div>
  )
}

function Heatmap({ activity, days = 30 }: { activity: Record<string, number>; days?: number }) {
  const today = new Date()
  const cells = Array.from({ length: days }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (days - 1 - i))
    const iso = d.toISOString().slice(0, 10)
    const count = activity[iso] || 0
    let bg = "bg-muted"
    if (count >= 1) bg = "bg-emerald-100 dark:bg-emerald-900"
    if (count >= 2) bg = "bg-emerald-200 dark:bg-emerald-800"
    if (count >= 3) bg = "bg-emerald-300 dark:bg-emerald-700"
    if (count >= 5) bg = "bg-emerald-400 dark:bg-emerald-600"
    return { iso, count, bg }
  })

  return (
    <div>
      <div className="font-medium mb-2">Activity</div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((c) => (
          <div key={c.iso} className={`h-4 rounded ${c.bg}`} title={`${c.iso}: ${c.count} activity`} />
        ))}
      </div>
    </div>
  )
}

function FocusTimer() {
  const { dispatch } = useApp()
  const [duration, setDuration] = useState<number>(25 * 60) // seconds
  const [remaining, setRemaining] = useState<number>(25 * 60)
  const [running, setRunning] = useState<boolean>(false)

  useEffect(() => {
    if (!running) return
    const iv = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(iv)
          setRunning(false)
          dispatch({ type: "addFocusSession", activeDate: todayISO() })
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(iv)
  }, [running, dispatch])

  const start = () => {
    if (remaining === 0) setRemaining(duration)
    setRunning(true)
  }
  const pause = () => setRunning(false)
  const reset = () => {
    setRunning(false)
    setRemaining(duration)
  }

  const mins = Math.floor(remaining / 60)
    .toString()
    .padStart(2, "0")
  const secs = (remaining % 60).toString().padStart(2, "0")

  return (
    <div className="rounded-md border p-3 space-y-3">
      <div className="flex items-center justify-between">
        <div className="font-medium">Focus Timer</div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setDuration(25)
            setRemaining(25)
          }}
          className="gap-1"
        >
          <TimerReset className="h-4 w-4" /> 25s Demo
        </Button>
      </div>
      <div className="text-4xl font-bold tabular-nums text-center">
        {mins}:{secs}
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Button onClick={start} disabled={running}>
          Start
        </Button>
        <Button onClick={pause} variant="secondary" disabled={!running}>
          Pause
        </Button>
        <Button onClick={reset} variant="outline">
          Reset
        </Button>
      </div>
      <div className="text-xs text-muted-foreground">
        Completing a session adds XP and counts toward your daily streak.
      </div>
    </div>
  )
}
