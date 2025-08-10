"use client"

import { useEffect, useMemo, useState } from "react"
import { useApp } from "./app-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { compressObject, decompressObject } from "@/lib/utils-app"
import type { AppState } from "@/types/types"
import { Copy, Upload } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export function Community() {
  const { state, dispatch } = useApp()
  const [shareUrl, setShareUrl] = useState<string>("")
  const [importValue, setImportValue] = useState<string>("")

  const payload: Partial<AppState> = useMemo(
    () => ({
      user: state.user.peerVisible ? state.user : undefined,
      roadmaps: state.roadmaps.filter((r) => r.isCustom),
      progressByRoadmap: state.progressByRoadmap,
    }),
    [state],
  )

  useEffect(() => {
    const compressed = compressObject(payload)
    const url = `${window.location.origin}?import=${compressed}`
    setShareUrl(url)
  }, [payload])

  useEffect(() => {
    // Auto-import if ?import= present
    const sp = new URLSearchParams(window.location.search)
    const token = sp.get("import")
    if (token) {
      tryImport(token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tryImport = (tokenOrUrl: string) => {
    let token = tokenOrUrl
    try {
      const u = new URL(tokenOrUrl)
      const p = new URLSearchParams(u.search)
      token = p.get("import") || token
    } catch {}
    const parsed = decompressObject<Partial<AppState>>(token)
    if (parsed) {
      dispatch({ type: "importPayload", state: parsed })
      dispatch({ type: "addPeer", value: token })
      alert("Imported successfully!")
    } else {
      alert("Invalid import token.")
    }
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
    } catch {}
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <Card>
        <CardHeader>
          <CardTitle>Share & Import</CardTitle>
          <CardDescription>Collaborate and keep each other accountable.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Share Link</Label>
            <div className="flex gap-2">
              <Input value={shareUrl} readOnly />
              <Button onClick={copy} className="gap-2">
                <Copy className="h-4 w-4" /> Copy
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              This link includes your custom roadmaps and, if enabled, your profile (no secrets).
            </p>
          </div>
          <div className="space-y-2">
            <Label>Import Link or Token</Label>
            <div className="flex gap-2">
              <Input
                value={importValue}
                onChange={(e) => setImportValue(e.target.value)}
                placeholder="Paste link or token..."
              />
              <Button onClick={() => tryImport(importValue)} className="gap-2">
                <Upload className="h-4 w-4" /> Import
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Raw Token (for advanced users)</Label>
            <Textarea readOnly value={shareUrl.split("?import=")[1] || ""} />
          </div>
        </CardContent>
      </Card>

      <aside className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Peers</CardTitle>
            <CardDescription>Recent shared tokens you imported.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {state.peers.length ? (
              state.peers.map((p, i) => (
                <div key={i} className="text-xs break-all border rounded p-2">
                  {p}
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">No peers yet. Import a link to see it here.</div>
            )}
          </CardContent>
        </Card>
      </aside>
    </div>
  )
}
