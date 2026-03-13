import { useState } from "react"
import { Button } from "../ui/Button"
import { getSocket } from "@/lib/socket"

type Props = {
  selectedUser: any
  currentUser: any
}

export default function MessageInput({ selectedUser, currentUser }: Props) {
  const socket = getSocket()
  const [message, setMessage] = useState("")

  const sendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!message.trim() || !selectedUser || !currentUser) return

    const payload = {
      senderId: currentUser.id || currentUser._id,
      receiverId: selectedUser.id || selectedUser._id,
      message: message.trim()
    }

    socket.emit("send_message", payload)
    setMessage("")
  }

  return (
    <div className="p-4 md:p-6 bg-gradient-to-t from-[var(--surface-strong)] to-transparent">
      <form onSubmit={sendMessage} className="flex items-end gap-3 max-w-5xl mx-auto bg-[var(--surface-strong)] p-2 rounded-[2rem] border border-[var(--line)] shadow-xl relative z-10">
        <textarea
          rows={1}
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          className="flex-1 px-6 py-3.5 bg-transparent border-none text-[var(--sea-ink)] outline-none resize-none max-h-32"
          style={{ minHeight: '48px' }}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={!message.trim()}
          className="!p-3.5 !rounded-2xl shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </Button>
      </form>
    </div>
  )
}