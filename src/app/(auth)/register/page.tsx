import { SignUpButton } from "@clerk/nextjs";

export default function RegisterPage() {
    return (
        <div>
            <h1>Register</h1>
            <SignUpButton>
                  <button>
                    Sign Up
                  </button>
            </SignUpButton>
        </div>
    )
}