"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Ensure <html class="dark"> is synced on the client
  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    const isDark = theme === "dark" || (theme === "system" && resolvedTheme === "dark")
    root.classList.toggle("dark", isDark)
    root.style.colorScheme = isDark ? "dark" : "light"
  }, [mounted, theme, resolvedTheme])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle theme" title="Toggle theme">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div className="inline-flex items-center gap-1">
      <Button
        variant={theme === "light" ? "default" : "ghost"}
        size="icon"
        aria-label="Light mode"
        title="Light mode"
        onClick={() => setTheme("light")}
        className="bg-[#FFFFFF] text-neutral-800 hover:bg-[#D6E6F2]"
        aria-pressed={theme === "light"}
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button
        variant={isDark ? "default" : "ghost"}
        size="icon"
        aria-label="Dark mode"
        title="Dark mode"
        onClick={() => setTheme("dark")}
        className="bg-[#6EB8E1] text-white hover:bg-[#6EB8E1]/90"
        aria-pressed={theme === "dark"}
      >
        <Moon className="h-4 w-4" />
      </Button>
      <Button
        variant={theme === "system" ? "default" : "ghost"}
        size="icon"
        aria-label="System theme"
        title="System theme"
        onClick={() => setTheme("system")}
        className="bg-[#C8ABE6] text-white hover:bg-[#C8ABE6]/90"
        aria-pressed={theme === "system"}
      >
        <Monitor className="h-4 w-4" />
      </Button>
    </div>
  )
}
