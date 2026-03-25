import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"
import { getCurrentUser } from "../../lib/api"

export const Route = createFileRoute("/auth/callback")({
  component: CallbackPage,
})

function CallbackPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const token = params.get("token")
    const id = params.get("id")
    const userName = params.get("userName")
    const email = params.get("email")

    // console.log("Callback params:", { token, id, userName, email })

    if (token && id && userName && email) {
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify({ id, userName, email }))
      navigate({ to: "/chat" })
    } else {
      navigate({ to: "/auth/login" })
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-[var(--sea-ink-soft)] text-sm animate-pulse">
        Signing you in...
      </p>
    </div>
  )
}