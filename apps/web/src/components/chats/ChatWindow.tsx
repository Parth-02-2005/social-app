import MessageList from "./MessageList"
import MessageInput from "./MessageInput"
import { getSocket, connectSocket } from "@/lib/socket"
import { useEffect, useState, useRef } from "react"
import { getUserChatHistory } from "#/lib/api"

type Props = {
  selectedUser: any
  currentUser: any
}

export default function ChatWindow({ selectedUser, currentUser }: Props) {

  const socket = getSocket();
  const [messages, setMessages] = useState<any[]>([])
  const [isConnected, setIsConnected] = useState(socket.connected)
  const scrollRef = useRef<HTMLDivElement>(null)


  // Socket Connection
  useEffect(() => {
    if (!currentUser) return

    const handleConnect = () => setIsConnected(true)
    const handleDisconnect = () => setIsConnected(false)


    socket.on("connect", handleConnect)
    socket.on("disconnect", handleDisconnect)

    connectSocket()

    return () => {
      socket.off("connect", handleConnect)
      socket.off("disconnect", handleDisconnect)
    }
  }, [currentUser])

  // Messaging Logic

  useEffect(() => {
    if (!currentUser || !selectedUser) return

    const myId = currentUser.id || currentUser._id
    const theirId = selectedUser.id || selectedUser._id

    const fetchMessages = async () => {
      try {
        const data = await getUserChatHistory(theirId);

        const formatted = data.map((msg: any) => ({
          id: msg._id,
          text: msg.message,
          senderId: msg.senderId,
          fileUrl: msg.fileUrl ?? null,
          fileType: msg.fileType ?? null,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }))

        setMessages(formatted)
      } catch (err) {
        console.error("Failed to load messages", err)
      }
    }

    fetchMessages()

    const handleReceive = (payload: any) => {
      const sender = payload.senderId.toString()
      const receiver = payload.receiverId.toString()

      const me = myId.toString()
      const them = theirId.toString()

      const isRelevant =
        (sender === me && receiver === them) ||
        (sender === them && receiver === me)

      if (isRelevant) {
        setMessages(prev => {
          if (prev.find(m => m.id === payload.id)) return prev

          return [
            ...prev,
            {
              id: payload.id,
              text: payload.message,
              senderId: sender,
              fileUrl: payload.fileUrl ?? null,
              fileType: payload.fileType ?? null,
              time: new Date(payload.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ]
        })
      }
    }

    socket.on("receive_message", handleReceive)

    return () => {
      socket.off("receive_message", handleReceive)
    }

  }, [selectedUser, currentUser])

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages])

  if (!selectedUser) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[var(--bg-base)] text-center p-10">
        <div className="w-20 h-20 rounded-full bg-[var(--lagoon)] flex items-center justify-center text-white text-3xl mb-4 shadow-lg">👋</div>
        <h2 className="text-2xl font-bold text-[var(--sea-ink)]">Select a chat</h2>
        <p className="text-[var(--sea-ink-soft)] mt-2">Pick a friend to start messaging.</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-[var(--bg-base)] relative overflow-hidden">
      <header className="px-8 py-4 flex items-center justify-between border-b border-[var(--line)] bg-[var(--surface-strong)]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--lagoon)] to-[var(--lagoon-deep)] flex items-center justify-center text-white font-bold">
            {selectedUser.userName?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold text-[var(--sea-ink)]">{selectedUser.userName}</h3>
            <span className="text-[10px] uppercase tracking-wider text-[var(--sea-ink-soft)] font-bold">
              {isConnected ? "Connected" : "Connecting..."}
            </span>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex flex-col relative">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 [scrollbar-width:none]">
          <MessageList messages={messages} currentUserId={currentUser?.id || currentUser?._id} />
        </div>
      </div>

      <MessageInput selectedUser={selectedUser} currentUser={currentUser} />
    </div>
  )
}