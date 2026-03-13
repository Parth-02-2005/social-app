type Message = {
  id: string
  text: string
  senderId: string
  time: string
}

type Props = {
  messages: Message[]
  currentUserId: string
}

export default function MessageList({ messages, currentUserId }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-[var(--line)]">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center opacity-40 italic">
          <p>No messages yet. Say hello! 👋</p>
        </div>
      ) : (
        messages.map((msg, index) => {
          const isMe = msg.senderId === currentUserId;
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? "items-end" : "items-start"} rise-in`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`max-w-[80%] md:max-w-[70%] px-5 py-3.5 rounded-3xl shadow-sm text-sm md:text-base leading-relaxed ${isMe
                  ? "bg-[var(--lagoon-deep)] text-white rounded-br-none shadow-[0_4px_12px_rgba(34,197,94,0.2)]"
                  : "bg-[var(--surface-strong)] text-[var(--sea-ink)] border border-[var(--line)] rounded-bl-none"
                }`}>
                {msg.text}
              </div>
              <span className="mt-1.5 text-[10px] font-bold text-[var(--sea-ink-soft)] uppercase tracking-widest opacity-60">
                {msg.time}
              </span>
            </div>
          );
        })
      )}
    </div>
  )
}