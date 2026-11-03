import { SignUpButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">SignUp</h1>
      <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
        <Button>Cadastrar</Button>
      </SignUpButton>
    </main>
  )
}