import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { registerUser } from "../../lib/api"
import { Button } from "../../components/ui/Button"
import { InputField } from "../../components/ui/InputField"

export const Route = createFileRoute("/auth/register")({
  component: RegisterPage,
})

// Helper functions for password strength
const calculateStrength = (pass: string) => {
  if (!pass) return 0;
  let score = 0;
  if (pass.length >= 6) score++;
  if (pass.length >= 10) score++;
  if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score++;
  if (/[^A-Za-z0-9]/.test(pass)) score++;
  return Math.min(score, 4);
};

const getStrengthText = (strength: number) => {
  switch (strength) {
    case 1: return "Weak";
    case 2: return "Fair";
    case 3: return "Good";
    case 4: return "Strong";
    default: return "";
  }
};

function RegisterPage() {
  const navigate = useNavigate()

  const [userName, setuserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})

  const validate = () => {
    const errors: { [key: string]: string } = {}

    if (userName.trim().length < 3) {
      errors.userName = "Username must be at least 3 characters"
    } else if (userName.trim().length > 30) {
      errors.userName = "Username must be at most 30 characters"
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      errors.email = "Please use a valid email"
    }

    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters"
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)
    setError("")

    try {
      await registerUser({
        userName,
        email,
        password,
      })
      // after register go to login
      navigate({ to: "/auth/login" })
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.")
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
              <p className="island-kicker mb-3">Get Started</p>
              <h2 className="display-title text-4xl font-bold text-[var(--sea-ink)] mb-2">
                Create Account
              </h2>
              <p className="text-[var(--sea-ink-soft)] text-sm">
                Join our community and start chatting today.
              </p>
            </div>

            <form onSubmit={handleRegister} className="flex flex-col gap-5">
              <InputField
                label="Full Name"
                type="text"
                placeholder="John Doe"
                value={userName}
                onChange={(e) => {
                  setuserName(e.target.value)
                  if (fieldErrors.userName) setFieldErrors({ ...fieldErrors, userName: "" })
                }}
                error={fieldErrors.userName}
                required
                autoComplete="name"
              />

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

              <div className="flex flex-col gap-2">
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
                  autoComplete="new-password"
                />

                {/* Password Strength Bars */}
                {password.length > 0 && (
                  <div className="flex flex-col gap-2 px-1">
                    <div className="flex gap-1.5 h-1.5">
                      {[1, 2, 3, 4].map((index) => {
                        const strength = calculateStrength(password);
                        const isActive = index <= strength;
                        let bgColor = "bg-[var(--line)]";

                        if (isActive) {
                          if (strength === 1) bgColor = "bg-red-500";
                          else if (strength === 2) bgColor = "bg-orange-400";
                          else if (strength === 3) bgColor = "bg-yellow-400";
                          else if (strength === 4) bgColor = "bg-[var(--lagoon)]";
                        }

                        return (
                          <div
                            key={index}
                            className={`flex-1 rounded-full transition-all duration-500 ${bgColor} ${isActive ? 'shadow-[0_0_8px_rgba(0,0,0,0.1)]' : 'opacity-20'}`}
                          />
                        );
                      })}
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--sea-ink-soft)] flex justify-between">
                      <span>Security Strength</span>
                      <span className={
                        calculateStrength(password) === 4 ? "text-[var(--lagoon-deep)]" :
                          calculateStrength(password) === 1 ? "text-red-500" : ""
                      }>
                        {getStrengthText(calculateStrength(password))}
                      </span>
                    </p>
                  </div>
                )}
              </div>

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
                  {loading ? "Creating account..." : "Register Now"}
                </Button>
              </div>
            </form>

            <div className="mt-10 pt-8 border-t border-[var(--line)] text-center">
              <p className="text-[var(--sea-ink-soft)] text-sm">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="text-[var(--lagoon-deep)] font-bold hover:underline underline-offset-4"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}