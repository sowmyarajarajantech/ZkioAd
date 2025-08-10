import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DocsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">ZkioAd Documentation</h1>
          <p className="text-muted-foreground mt-2">
            ZkioAd is a web-based skill tracker and roadmap builder to gamify learning with progress tracking and
            community engagement.
          </p>
        </div>

        <div className="rounded-md bg-[#D6E6F2] dark:bg-muted p-4 border">
          <p className="text-sm md:text-base font-medium text-neutral-900 dark:text-foreground">
            {"You’re here for a reason—and that’s enough. Let’s turn intention into momentum."}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Setup</CardTitle>
            <CardDescription>Run locally or deploy in one click.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ol className="list-decimal pl-5 space-y-2">
              <li>Deploy with the Deploy button or download and run locally.</li>
              <li>Local install: pnpm install (or npm/yarn), then pnpm dev to start the dev server.</li>
              <li>The app uses localStorage for persistence; no env vars needed to start.</li>
              <li>Dark mode toggle is available in-app (not on /signup).</li>
              <li>
                Visit <code>/signup</code> to try the light-only sign-up page.
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>What&apos;s included out of the box.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <ul className="list-disc pl-5 space-y-1">
              <li>Preloaded Roadmaps: DSA, AI, Cybersecurity with logical sections and topics.</li>
              <li>Completion Tracking: Check off topics, see per-roadmap progress bars.</li>
              <li>Gamification: Streaks, XP, levels, badges, and an activity heatmap.</li>
              <li>Focus Timer: Pomodoro-style sessions that boost streaks and XP.</li>
              <li>Custom Builder: Drag-and-drop to create and save personalized roadmaps.</li>
              <li>External Resources: Quick links to YouTube, Udemy, Scholarpeak searches per topic.</li>
              <li>Community: Share/import roadmaps or profiles with compressed links (no backend needed).</li>
              <li>Suggestions: Heuristic recommendations with an optional AI route you can upgrade later.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Design System</CardTitle>
            <CardDescription>Brand colors, theming, and accessibility.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-3">
            <div>
              <div className="font-semibold mb-2">Background Palette</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-md border overflow-hidden">
                  <div className="h-10 bg-[#D6E6F2]" />
                  <div className="p-2 text-xs">#D6E6F2</div>
                </div>
                <div className="rounded-md border overflow-hidden">
                  <div className="h-10 bg-[#C8ABE6]" />
                  <div className="p-2 text-xs">#C8ABE6</div>
                </div>
                <div className="rounded-md border overflow-hidden">
                  <div className="h-10 bg-[#6EB8E1]" />
                  <div className="p-2 text-xs">#6EB8E1</div>
                </div>
                <div className="rounded-md border overflow-hidden">
                  <div className="h-10 bg-[#FFFFFF] border-b" />
                  <div className="p-2 text-xs">#FFFFFF</div>
                </div>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-1">Dark Mode</div>
              <p>Available throughout the app via the header theme toggle. The sign-up page is intentionally light.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
