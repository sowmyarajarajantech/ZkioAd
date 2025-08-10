"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AppProvider, useApp } from "@/components/app-provider"
import { RoadmapList } from "@/components/roadmap-list"
import { RoadmapDetail } from "@/components/roadmap-detail"
import { Builder } from "@/components/builder"
import { Community } from "@/components/community"
import { Profile } from "@/components/profile"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpenCheck, Hammer, LineChart, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

function HomeInner() {
  const { state } = useApp()
  const [activeTab, setActiveTab] = useState<string>("roadmaps")

  useEffect(() => {
    if (state.ui.selectedRoadmapId) setActiveTab("detail")
  }, [state.ui.selectedRoadmapId])

  return (
    <main className="min-h-[100dvh]">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <BookOpenCheck className="h-6 w-6" />
            <span className="font-semibold">ZkioAd</span>
          </Link>
          <nav className="ml-auto hidden md:flex items-center gap-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5 bg-[#D6E6F2]">
                <TabsTrigger value="roadmaps" className="gap-2">
                  <LineChart className="h-4 w-4" /> Roadmaps
                </TabsTrigger>
                <TabsTrigger value="detail" className="gap-2">
                  <BookOpenCheck className="h-4 w-4" /> Detail
                </TabsTrigger>
                <TabsTrigger value="builder" className="gap-2">
                  <Hammer className="h-4 w-4" /> Builder
                </TabsTrigger>
                <TabsTrigger value="community" className="gap-2">
                  <Users className="h-4 w-4" /> Community
                </TabsTrigger>
                <TabsTrigger value="profile" className="gap-2">
                  Profile
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button asChild className="rounded-full bg-[#6EB8E1] text-neutral-900 hover:bg-[#6EB8E1]/90">
              <Link href="/signup">Sign up</Link>
            </Button>
            <ThemeToggle />
          </nav>
          <div className="md:hidden ml-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 bg-[#D6E6F2]">
                <TabsTrigger value="roadmaps">Roadmaps</TabsTrigger>
                <TabsTrigger value="builder">Builder</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="ml-2 inline-flex align-middle flex-col">
              <ThemeToggle />
              <Button
                asChild
                size="sm"
                className="mt-2 rounded-full bg-[#6EB8E1] text-neutral-900 hover:bg-[#6EB8E1]/90"
              >
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full">
        <div className="bg-gradient-to-r from-[#6EB8E1] via-[#D6E6F2] to-[#C8ABE6] text-neutral-900 dark:text-white">
          <div className="container mx-auto px-4 py-3 text-sm md:text-base font-medium text-center">
            {"You’re here for a reason—and that’s enough. Let’s turn intention into momentum."}
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 py-4 md:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="roadmaps" className="mt-0">
            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Preloaded Learning Roadmaps</CardTitle>
                    <CardDescription>
                      Explore curated paths for DSA, AI, Cybersecurity, and more. Track progress, earn XP, and collect
                      badges.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RoadmapList />
                  </CardContent>
                </Card>
              </div>
              <aside className="space-y-4">
                <Profile variant="compact" />
              </aside>
            </div>
          </TabsContent>

          <TabsContent value="detail" className={cn("mt-0", !state.ui.selectedRoadmapId && "opacity-60")}>
            <RoadmapDetail />
          </TabsContent>

          <TabsContent value="builder" className="mt-0">
            <Builder />
          </TabsContent>

          <TabsContent value="community" className="mt-0">
            <Community />
          </TabsContent>

          <TabsContent value="profile" className="mt-0">
            <Profile />
          </TabsContent>
        </Tabs>
      </section>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-3 items-center">
          <div className="text-sm text-muted-foreground">
            {"© "}
            {new Date().getFullYear()} ZkioAd. Gamify your learning journey.
          </div>
          <div className="md:ml-auto flex gap-3">
            {/* Removed Docs button */}
            <Button variant="ghost" asChild>
              <a href="https://vercel.com/help" target="_blank" rel="noreferrer">
                Support
              </a>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default function Page() {
  return (
    <AppProvider>
      <HomeInner />
    </AppProvider>
  )
}
