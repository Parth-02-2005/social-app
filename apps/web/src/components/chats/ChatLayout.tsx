import React from "react"

export type ChatLayoutProps = {
  sidebar: React.ReactNode
  chat: React.ReactNode
}

export default function ChatLayout({ sidebar, chat }: ChatLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-[var(--bg-base)] overflow-hidden relative">
      <div className="flex h-full w-full max-w-full mx-auto overflow-hidden border-x border-[var(--line)]">
        {sidebar}
        {chat}
      </div>
    </div>
  )
}