"use client"

import { Progress } from "@/components/ui/progress"

export function RoadmapProgressBar({ value = 0 }: { value?: number } = { value: 0 }) {
  return <Progress value={value} />
}
