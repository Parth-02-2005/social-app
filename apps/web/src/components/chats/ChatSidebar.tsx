import { useEffect, useState } from "react"
import { getAllUsers } from "../../lib/api"
import ProfilePanel from "./ProfilePanel"

type Props = {
  onSelectUser: (user: any) => void
  activeUserId?: string
  currentUser: { userName: string; email: string; id?: string } | null
}

export default function ChatSidebar({ onSelectUser, activeUserId, currentUser }: Props) {

  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    
    const fetchUsers = async () => {
      try {
        setError(null)
        const data = await getAllUsers()

        // Get current user ID to filter self out
        const meStr = localStorage.getItem("user")
        const myId = meStr ? JSON.parse(meStr).id || JSON.parse(meStr)._id : null

        setUsers((data || []).filter((u: any) => u && (u.id || u._id) !== myId))
      } catch (err: any) {
        setError("Failed to load users")
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase().trim()
    return (
      user?.userName?.toLowerCase().includes(query) ||
      user?.email?.toLowerCase().includes(query)
    )
  })

  return (
    <div className="w-80 h-full flex flex-col bg-[var(--surface-strong)] border-r border-[var(--line)] overflow-hidden relative">
      <div className="p-6 bg-[var(--surface)] border-b border-[var(--line)]">
        <h2 className="display-title text-2xl font-bold text-[var(--sea-ink)]">Messages</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full mt-4 px-4 py-2 rounded-xl bg-[var(--sand)] text-sm focus:ring-2 focus:ring-[var(--lagoon)] outline-none"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {loading ? (
          <div className="p-4 space-y-4 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-16 bg-[var(--line)] rounded-2xl" />)}
          </div>
        ) : error ? (
          <p className="p-8 text-center text-red-500 text-sm">{error}</p>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <button
              key={user.id || user._id}
              onClick={() => onSelectUser(user)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border ${activeUserId === (user.id || user._id)
                ? "bg-[var(--surface)] border-[var(--line)] shadow-sm"
                : "border-transparent hover:bg-[var(--surface)]"
                }`}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--lagoon)] to-[var(--lagoon-deep)] flex items-center justify-center text-white font-bold">
                {user.userName?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 text-left overflow-hidden">
                <h3 className="font-bold text-[var(--sea-ink)] truncate">{user.userName}</h3>
                <p className="text-xs text-[var(--sea-ink-soft)] truncate">Click to chat</p>
              </div>
            </button>
          ))
        ) : (
          <p className="p-8 text-center text-[var(--sea-ink-soft)] text-sm italic">No users found</p>
        )}
      </div>

      {currentUser && (
        <button
          onClick={() => setShowProfile(true)}
          className="px-6 py-4 bg-[var(--surface)] border-t border-[var(--line)] flex items-center gap-3 w-full hover:bg-[var(--surface-strong)] transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--lagoon)] to-[var(--lagoon-deep)] flex items-center justify-center text-white font-bold text-sm shrink-0">
            {currentUser.userName?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="font-bold text-[var(--sea-ink)] text-sm truncate">{currentUser.userName}</p>
            <p className="text-xs text-[var(--sea-ink-soft)] truncate">{currentUser.email}</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
        </button>
      )}

      {showProfile && (
        <ProfilePanel
          user={currentUser}
          onClose={() => setShowProfile(false)}
        />
      )}
      
    </div>
  )
}