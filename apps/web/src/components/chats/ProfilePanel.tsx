import { useState } from "react"
// import { updateUser } from "../../lib/api"

type Props = {
  user: { userName: string; email: string; id?: string } | null
  onClose: () => void
}

export default function ProfilePanel({ user, onClose }: Props) {

  const [userName, setUserName] = useState(user?.userName || "")
  const [email, setEmail] = useState(user?.email || "")
  const [password, setPassword] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSave = async () => {
    try {
      setSaving(true)
      setError(null)
    //   await updateUser({ userName, email, ...(password && { password }) })

      // Update localStorage
      const stored = localStorage.getItem("user")
      if (stored) {
        const parsed = JSON.parse(stored)
        localStorage.setItem("user", JSON.stringify({ ...parsed, userName, email }))
      }
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
    } catch {
      setError("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  return (
    // Overlay the entire sidebar
    <div className="absolute inset-0 z-10 flex flex-col bg-white animate-in slide-in-from-right duration-200">
      
      {/* Header */}
      <div className="p-4 border-b border-[var(--line)] flex items-center gap-3">
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-xl bg-[var(--surface-strong)] flex items-center justify-center hover:bg-[var(--line)] transition-colors"
        >
          ←
        </button>
        <h2 className="font-bold text-[var(--sea-ink)]">Edit Profile</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
        
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--lagoon)] to-[var(--lagoon-deep)] flex items-center justify-center text-white text-3xl font-bold">
            {userName?.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-[var(--sea-ink-soft)] mb-1 block">Username</label>
            <input
              value={userName}
              onChange={e => setUserName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-[var(--sand)] text-sm outline-none focus:ring-2 focus:ring-[var(--lagoon)]"
            />
          </div>
          <div>
            <label className="text-xs text-[var(--sea-ink-soft)] mb-1 block">Email</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              className="w-full px-4 py-2 rounded-xl bg-[var(--sand)] text-sm outline-none focus:ring-2 focus:ring-[var(--lagoon)]"
            />
          </div>
          <div>
            <label className="text-xs text-[var(--sea-ink-soft)] mb-1 block">New password</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="Leave blank to keep current"
              className="w-full px-4 py-2 rounded-xl bg-[var(--sand)] text-sm outline-none focus:ring-2 focus:ring-[var(--lagoon)]"
            />
          </div>
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}
        {success && <p className="text-xs text-green-500">Profile updated!</p>}

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-2.5 rounded-xl bg-[var(--lagoon)] text-white font-bold text-sm disabled:opacity-50 transition-opacity"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>

        {/* Danger zone */}
        <div className="border-t border-[var(--line)] pt-4 mt-2">
          <p className="text-xs text-[var(--sea-ink-soft)] mb-3">Danger zone</p>
          <button className="w-full py-2 rounded-xl border border-red-300 text-red-500 text-sm hover:bg-red-50 transition-colors">
            Delete account
          </button>
        </div>
      </div>
    </div>
  )
}