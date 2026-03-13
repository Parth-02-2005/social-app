import { createFileRoute, redirect } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import ChatLayout from "../../components/chats/ChatLayout"
import ChatSidebar from "../../components/chats/ChatSidebar"
import ChatWindow from "../../components/chats/ChatWindow"
import { isAuthenticated } from "#/lib/auth"

export const Route = createFileRoute("/chat/")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: "/",
      })
    }
  },
  component: ChatPage,
})

function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user")
      if (userStr && userStr !== "undefined" && userStr !== "null") {
        setCurrentUser(JSON.parse(userStr)) 
      }
    } catch (e) {
      console.error("Failed to parse current user session", e)
    }
  }, [])

  return (
    <div className="h-full w-full overflow-hidden rise-in">
      <ChatLayout
        sidebar={<ChatSidebar onSelectUser={setSelectedUser} activeUserId={selectedUser?.id} />}
        chat={<ChatWindow selectedUser={selectedUser} currentUser={currentUser} />}
      />
    </div>
  )
}