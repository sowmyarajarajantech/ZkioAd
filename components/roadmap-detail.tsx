"use client"

import { useMemo, useState } from "react"
import { useApp } from "./app-provider"
import { groupBySection, calcProgress, heuristicSuggestions } from "@/lib/utils-app"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Lightbulb, RefreshCw } from "lucide-react"

export function RoadmapDetail() {
  const { state, dispatch } = useApp()
  const roadmap = useMemo(
    () => state.roadmaps.find((r) => r.id === state.ui.selectedRoadmapId) || null,
    [state.roadmaps, state.ui.selectedRoadmapId],
  )
  const progMap = (roadmap && state.progressByRoadmap[roadmap.id]) || {}
  const prog = roadmap ? calcProgress(roadmap, progMap) : { total: 0, done: 0, pct: 0 }
  const groups = roadmap ? groupBySection(roadmap.topics) : []
  const [tips, setTips] = useState<string[]>([])

  if (!roadmap) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Select a roadmap</CardTitle>
          <CardDescription>Choose one from the Roadmaps tab to begin tracking.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const completedSet = new Set(
    Object.entries(progMap)
      .filter(([, v]) => v)
      .map(([k]) => k),
  )

  const generateSuggestions = async () => {
    try {
      const params = new URLSearchParams({ roadmapId: roadmap.id })
      for (const id of completedSet) params.append("completed", id)
      const res = await fetch(`/api/suggest?${params.toString()}`)
      const data = await res.json()
      setTips(data.suggestions || [])
    } catch {
      setTips(heuristicSuggestions(roadmap, completedSet))
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle>{roadmap.title}</CardTitle>
              <CardDescription>{roadmap.description}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm">
                {prog.done}/{prog.total} topics
              </div>
              <div className="text-xs text-muted-foreground">{prog.pct}% complete</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={prog.pct} />
          <div className="space-y-6">
            {groups.map(({ section, topics }) => {
              const allDone = topics.every((t) => !!progMap[t.id])
              return (
                <div key={section} className="border rounded-md">
                  <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
                    <div className="font-medium">{section}</div>
                    <div className="flex items-center gap-2">
                      <Badge variant={allDone ? "default" : "secondary"}>{allDone ? "Done" : "In progress"}</Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          for (const t of topics) {
                            if (!progMap[t.id]) {
                              dispatch({ type: "toggleTopic", roadmapId: roadmap.id, topicId: t.id })
                            }
                          }
                        }}
                      >
                        Mark section done
                      </Button>
                    </div>
                  </div>
                  <ul className="divide-y">
                    {topics.map((t) => {
                      const checked = !!progMap[t.id]
                      return (
                        <li key={t.id} className="flex items-start gap-3 p-3">
                          <Checkbox
                            id={t.id}
                            checked={checked}
                            onCheckedChange={() =>
                              dispatch({ type: "toggleTopic", roadmapId: roadmap.id, topicId: t.id })
                            }
                          />
                          <div className="flex-1">
                            <label htmlFor={t.id} className="font-medium cursor-pointer">
                              {t.title}
                            </label>
                            {t.resources && t.resources.length > 0 ? (
                              <div className="mt-1 flex flex-wrap gap-2">
                                {t.resources.map((r, i) => (
                                  <a
                                    key={i}
                                    href={r.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-xs text-primary underline hover:no-underline"
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                    {r.label}
                                  </a>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <aside className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" /> Suggestions
            </CardTitle>
            <CardDescription>Personalized next steps and mini-project ideas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Button size="sm" onClick={generateSuggestions} className="gap-2">
                <RefreshCw className="h-4 w-4" /> Generate
              </Button>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              {tips.length ? (
                tips.map((t, i) => <li key={i}>{t}</li>)
              ) : (
                <li className="text-muted-foreground">Click Generate to get guidance.</li>
              )}
            </ul>
          </CardContent>
        </Card>
      </aside>
    </div>
  )
}
