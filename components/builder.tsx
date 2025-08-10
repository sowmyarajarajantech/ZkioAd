"use client"

import type React from "react"

import { useState } from "react"
import { DndContext, useSensor, useSensors, PointerSensor, closestCenter } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useApp } from "./app-provider"
import type { Roadmap, Topic } from "@/types/types"
import { nanoid } from "nanoid"
import { GripVertical, Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

type BuilderSection = { id: string; name: string; topics: Topic[] }

function SortableItem({
  id,
  children,
  className,
}: {
  id: string
  children: React.ReactNode
  className?: string
}) {
  // dnd-kit SortableItem can be implemented; here we rely on id ordering in SortableContext only
  return (
    <div className={className} data-id={id}>
      {children}
    </div>
  )
}

export function Builder() {
  const { dispatch } = useApp()
  const [title, setTitle] = useState<string>("My Custom Roadmap")
  const [desc, setDesc] = useState<string>("A personalized path tailored to my goals.")
  const [sections, setSections] = useState<BuilderSection[]>([{ id: nanoid(), name: "Section 1", topics: [] }])

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const addSection = () => {
    setSections((prev) => [...prev, { id: nanoid(), name: `Section ${prev.length + 1}`, topics: [] }])
  }

  const addTopic = (sid: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sid
          ? {
              ...s,
              topics: [...s.topics, { id: nanoid(), title: "New Topic", section: s.name, resources: [] }],
            }
          : s,
      ),
    )
  }

  const removeTopic = (sid: string, tid: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sid
          ? {
              ...s,
              topics: s.topics.filter((t) => t.id !== tid),
            }
          : s,
      ),
    )
  }

  const updateTopic = (sid: string, tid: string, title: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sid
          ? {
              ...s,
              topics: s.topics.map((t) => (t.id === tid ? { ...t, title } : t)),
            }
          : s,
      ),
    )
  }

  const updateSectionName = (sid: string, name: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === sid ? { ...s, name, topics: s.topics.map((t) => ({ ...t, section: name })) } : s)),
    )
  }

  const onDragEnd = (e: any) => {
    const { active, over } = e
    if (!over || active.id === over.id) return
    // Simple: Reorder sections only for now
    const oldIndex = sections.findIndex((s) => s.id === active.id)
    const newIndex = sections.findIndex((s) => s.id === over.id)
    if (oldIndex === -1 || newIndex === -1) return
    setSections(arrayMove(sections, oldIndex, newIndex))
  }

  const save = () => {
    const topics = sections.flatMap((s) => s.topics.map((t) => ({ ...t, section: s.name })))
    const roadmap: Roadmap = {
      id: `custom-${nanoid(6)}`,
      title: title || "Custom Roadmap",
      description: desc || "Custom plan",
      topics,
      createdAt: new Date().toISOString(),
      isCustom: true,
    }
    dispatch({ type: "addRoadmap", roadmap })
    dispatch({ type: "selectRoadmap", id: roadmap.id })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <Card>
        <CardHeader>
          <CardTitle>Custom Roadmap Builder</CardTitle>
          <CardDescription>Drag to reorder sections. Add topics to craft your path.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My Roadmap" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="A plan to reach my goals" />
            </div>
          </div>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {sections.map((s) => (
                  <SortableItem key={s.id} id={s.id} className="border rounded-md">
                    <div className="flex items-center gap-2 px-3 py-2 border-b bg-muted/50">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                      <Input
                        value={s.name}
                        onChange={(e) => updateSectionName(s.id, e.target.value)}
                        className="font-medium"
                      />
                      <Button size="sm" className="ml-auto gap-1" onClick={() => addTopic(s.id)}>
                        <Plus className="h-4 w-4" /> Topic
                      </Button>
                    </div>
                    <div className="p-3 space-y-2">
                      {s.topics.length === 0 ? (
                        <div className="text-sm text-muted-foreground">No topics yet. Add your first topic.</div>
                      ) : (
                        s.topics.map((t) => (
                          <div key={t.id} className={cn("flex items-center gap-2 rounded-md border p-2")}>
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                            <Input value={t.title} onChange={(e) => updateTopic(s.id, t.id, e.target.value)} />
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeTopic(s.id, t.id)}
                              aria-label="Remove"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </SortableItem>
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <div className="flex gap-2">
            <Button variant="outline" onClick={addSection} className="gap-2 bg-transparent">
              <Plus className="h-4 w-4" /> Section
            </Button>
            <Button onClick={save}>Save Roadmap</Button>
          </div>
        </CardContent>
      </Card>

      <aside className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Tips</CardTitle>
            <CardDescription>Ideas to make your roadmap standout</CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <ul className="list-disc pl-5 space-y-1">
              <li>Organize by milestones (Foundations, Intermediate, Advanced).</li>
              <li>Add quick notes per topic after studying.</li>
              <li>Balance theory with mini-projects for each section.</li>
            </ul>
          </CardContent>
        </Card>
      </aside>
    </div>
  )
}
