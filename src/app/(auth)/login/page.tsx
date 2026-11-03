import { prisma } from "@/lib/prisma"
import { SignInButton } from "@clerk/nextjs";

export default function LoginPage() {
    const task = prisma.task.findMany()
    return (
        <div>
            <h1>Login</h1>
             <SignInButton />
             <pre>{JSON.stringify(task, null, 2)}</pre>
        </div>
    )
}