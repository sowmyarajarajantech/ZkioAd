import type { NextRequest } from "next/server"
import { heuristicSuggestions } from "@/lib/utils-app"
import { sampleRoadmaps } from "@/lib/sample-roadmaps"
import type { Roadmap } from "@/types/types"

// Note: This route returns heuristic suggestions without using an AI model.
// To upgrade to AI, import the AI SDK and a provider, then call generateText().
// Example (pseudo):
// import { generateText } from "ai"
// import { xai } from "@ai-sdk/xai"
// const { text } = await generateText({ model: xai("grok-3"), prompt })

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const roadmapId = searchParams.get("roadmapId") || ""
  const completed = searchParams.getAll("completed") // topic ids
  const roadmap: Roadmap | undefined = sampleRoadmaps.find((r) => r.id === roadmapId)

  const body = {
    suggestions: heuristicSuggestions(roadmap, new Set(completed)),
  }

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
  })
}
