"use client"

import Link from "next/link"
import { useActionState } from "react"
import { signup } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function SignUpPage() {
  const [state, action, pending] = useActionState(signup, null as any)

  return (
    <main className="min-h-[100dvh] bg-gradient-to-br from-[#D6E6F2] via-[#FFFFFF] to-[#C8ABE6]">
      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          ZkioAd
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="rounded-full">
            <Link href="/">Back to app</Link>
          </Button>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900">Join ZkioAd</h1>
            <p className="mt-3 text-lg md:text-xl text-neutral-800">Your journey to mastery starts today!</p>
            <p className="mt-4 text-sm md:text-base text-neutral-900">
              {"You’re here for a reason—and that’s enough. Let’s turn intention into momentum."}
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <div className="mx-auto max-w-md">
              <div className="rounded-3xl border bg-white shadow-xl overflow-hidden">
                <div className="p-6">
                  <Card className="border-0 shadow-none bg-transparent">
                    <CardHeader className="p-0">
                      <CardTitle className="text-2xl text-black">Create your own account</CardTitle>
                      <CardDescription className="text-neutral-700">Start tracking skills in minutes.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 pt-4">
                      <form action={action} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-black">
                            Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Ada Lovelace"
                            autoComplete="name"
                            className="rounded-full border-2 border-black bg-black text-white placeholder:white/70 focus-visible:border-black focus-visible:ring-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-black">
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            className="rounded-full border-2 border-black bg-black text-white placeholder:white/70 focus-visible:border-black focus-visible:ring-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-black">
                            Password
                          </Label>
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            className="rounded-full border-2 border-black bg-black text-white placeholder:white/70 focus-visible:border-black focus-visible:ring-black"
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={pending}
                          className="w-full rounded-full bg-[#6EB8E1] text-neutral-900 hover:bg-[#6EB8E1]/90"
                        >
                          {pending ? "Creating account..." : "Sign up"}
                        </Button>
                      </form>
                      {state && (
                        <div className={`mt-4 text-sm ${state.ok ? "text-emerald-700" : "text-red-600"}`}>
                          {state.message}
                        </div>
                      )}
                      <div className="mt-3 text-xs text-neutral-700">
                        Already have an account?{" "}
                        <Link href="/" className="underline underline-offset-4">
                          Go home
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Palette chips */}
              <div className="mt-4 flex gap-2">
                <span className="h-2 w-10 rounded-full bg-[#D6E6F2]" />
                <span className="h-2 w-10 rounded-full bg-[#C8ABE6]" />
                <span className="h-2 w-10 rounded-full bg-[#6EB8E1]" />
                <span className="h-2 w-10 rounded-full bg-white border" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
