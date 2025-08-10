"use server"

export type SignupState = { ok: boolean; message: string } | null

export async function signup(prevState: SignupState, formData: FormData): Promise<SignupState> {
  // Simulate latency
  await new Promise((r) => setTimeout(r, 700))

  const name = (formData.get("name") as string | null)?.toString().trim() ?? ""
  const email = (formData.get("email") as string | null)?.toString().trim() ?? ""
  const password = (formData.get("password") as string | null)?.toString() ?? ""

  if (!name || !email || !password) {
    return { ok: false, message: "Please fill in all fields." }
  }

  // Demo-only: accept everything and return success.
  return { ok: true, message: `Welcome, ${name}! Your account was created.` }
}
