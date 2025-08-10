"use client"

import { useApp } from "./app-provider"
import { calcProgress } from "@/lib/utils-app"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { FolderOpen } from "lucide-react"

export function RoadmapList() {
  const { state, dispatch } = useApp()

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {state.roadmaps.map((rm) => {
        const prog = calcProgress(rm, state.progressByRoadmap[rm.id])
        return (
          <Card
            key={rm.id}
            className="flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle className="line-clamp-1">{rm.title}</CardTitle>
              <CardDescription className="line-clamp-2">{rm.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div>
                  {prog.done} / {prog.total} topics
                </div>
                <div>{prog.pct}%</div>
              </div>
              <Progress value={prog.pct} />
              <div className="flex gap-2">
                <Button className="gap-2" onClick={() => dispatch({ type: "selectRoadmap", id: rm.id })}>
                  <FolderOpen className="h-4 w-4" /> Open
                </Button>
                {rm.isCustom ? (
                  <Button variant="outline" onClick={() => dispatch({ type: "deleteRoadmap", id: rm.id })}>
                    Delete
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
