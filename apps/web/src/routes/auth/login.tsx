import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { loginUser } from "../../lib/api"
import { Button } from "../../components/ui/Button"
import { InputField } from "../../components/ui/InputField"
import { googleLogin } from "../../lib/api"

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})

  const validate = () => {
    const errors: { [key: string]: string } = {}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      errors.email = "Please use a valid email"
    }

    if (!password) {
      errors.password = "Password is required"
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)
    setError("")

    try {
      const response = await loginUser(email, password)

      // Store token and user info
      localStorage.setItem("token", response.token)
      localStorage.setItem("user", JSON.stringify({
        id: response.id,
        userName: response.userName,
        email: response.email
      }))

      // redirect after login
      navigate({ to: "/chat" })
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto min-h-screen py-10 relative w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <main className="w-full max-w-md rise-in">
        <div className="island-shell rounded-[2.5rem] p-8 md:p-12 border border-[var(--line)] shadow-2xl relative overflow-hidden bg-gradient-to-br from-[var(--surface-strong)] to-[var(--surface)]">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--lagoon)] blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="mb-10 text-center lg:text-left">
              <p className="island-kicker mb-3">Welcome Back</p>
              <h2 className="display-title text-4xl font-bold text-[var(--sea-ink)] mb-2">
                Sign In
              </h2>
              <p className="text-[var(--sea-ink-soft)] text-sm">
                Enter your credentials to access your account.
              </p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <InputField
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" })
                }}
                error={fieldErrors.email}
                required
                autoComplete="email"
              />

              <InputField
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: "" })
                }}
                error={fieldErrors.password}
                required
                autoComplete="current-password"
              />

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                  {error}
                </div>
              )}

              <div className="mt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Login"}
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[var(--line)]" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[var(--surface)] text-[var(--sea-ink-soft)]">
                    or continue with
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className="w-full flex items-center justify-center gap-3"
                  onClick={googleLogin}
                >
                  {/* Google SVG Icon */}
                  <svg width="18" height="18" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </svg>
                  Continue with Google
                </Button>
              </div>
            </div>


            <div className="mt-10 pt-8 border-t border-[var(--line)] text-center">
              <p className="text-[var(--sea-ink-soft)] text-sm">
                Don't have an account?{" "}
                <Link
                  to="/auth/register"
                  className="text-[var(--lagoon-deep)] font-bold hover:underline underline-offset-4"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}