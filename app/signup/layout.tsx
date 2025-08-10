import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"

// Force light mode ONLY on the signup route (no dark mode here)
export default function SignUpLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" forcedTheme="light" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}
