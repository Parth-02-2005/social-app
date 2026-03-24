type Message = {
  id: string
  text: string
  senderId: string
  time: string
  fileUrl?: string | null
  fileType?: "image" | "pdf" | null
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
          const isMe = msg.senderId === currentUserId
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? "items-end" : "items-start"} rise-in`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`max-w-[80%] md:max-w-[70%] rounded-3xl shadow-sm text-sm md:text-base leading-relaxed overflow-hidden ${
                isMe
                  ? "bg-[var(--lagoon-deep)] text-white rounded-br-none shadow-[0_4px_12px_rgba(34,197,94,0.2)]"
                  : "bg-[var(--surface-strong)] text-[var(--sea-ink)] border border-[var(--line)] rounded-bl-none"
              }`}>

                {/* Image */}
                {msg.fileType === "image" && msg.fileUrl && (
                  <a 
                  href={msg.fileUrl} target="_blank" rel="noopener noreferrer">
                    <img
                      src={msg.fileUrl}
                      alt="image"
                      className="w-full max-w-sm object-cover rounded-3xl"
                    />
                  </a>
                )}

                {/* PDF */}
                {msg.fileType === "pdf" && msg.fileUrl && (
                  <a
                    href={msg.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 px-5 py-3.5 hover:opacity-80 transition-opacity ${
                      isMe ? "text-white" : "text-[var(--sea-ink)]"
                    }`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-red-500 rounded-xl shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-sm font-semibold ${isMe ? "text-white" : "text-[var(--sea-ink)]"}`}>PDF Document</span>
                      <span className={`text-xs ${isMe ? "text-white/60" : "text-[var(--sea-ink-soft)]"}`}>Tap to open</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto opacity-60">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </a>
                )}

                {/* Text / caption */}
                {msg.text && (
                  <p className={`px-5 py-3.5 ${msg.fileUrl ? "pt-2" : ""}`}>
                    {msg.text}
                  </p>
                )}

              </div>
              <span className="mt-1.5 text-[10px] font-bold text-[var(--sea-ink-soft)] uppercase tracking-widest opacity-60">
                {msg.time}
              </span>
            </div>
          )
        })
      )}
    </div>
  )
}