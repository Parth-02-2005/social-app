import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { loginUser } from "../../lib/api"
import { Button } from "../../components/ui/Button"
import { InputField } from "../../components/ui/InputField"

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