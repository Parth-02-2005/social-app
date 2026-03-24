import { useState, useRef } from "react"
import { Button } from "../ui/Button"
import { getSocket } from "@/lib/socket"
import { api } from "@/lib/api"

type Props = {
  selectedUser: any
  currentUser: any
}

export default function MessageInput({ selectedUser, currentUser }: Props) {
  const socket = getSocket()
  const [message, setMessage] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return

    setFile(selected)

    // Show preview for images only
    if (selected.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = () => setPreview(reader.result as string)
      reader.readAsDataURL(selected)
    } else {
      // PDF — just show filename
      setPreview(null)
    }
  }

  const clearFile = () => {
    setFile(null)
    setPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!message.trim() && !file) return
    if (!selectedUser || !currentUser) return

    let fileUrl = null
    let fileType = null

    // Step 1 — upload file if present
    if (file) {
      try {
        setUploading(true)
        const formData = new FormData()
        formData.append("file", file)

        const res = await api.post("/messages/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })

        fileUrl = res.data.url
        fileType = res.data.fileType
      } catch (err) {
        console.error("File upload failed:", err)
        setUploading(false)
        return
      } finally {
        setUploading(false)
      }
    }

    // Step 2 — emit socket with message + file
    socket.emit("send_message", {
      receiverId: selectedUser.id || selectedUser._id,
      message: message.trim(),
      fileUrl,
      fileType,
    })

    setMessage("")
    clearFile()
  }

  const canSend = (message.trim() || file) && !uploading

  return (
    <div className="p-4 md:p-6 bg-gradient-to-t from-[var(--surface-strong)] to-transparent">

      {/* File preview */}
      {file && (
        <div className="max-w-5xl mx-auto mb-2 px-2">
          <div className="flex items-center gap-3 bg-[var(--surface-strong)] border border-[var(--line)] rounded-2xl p-3 w-fit">
            {preview ? (
              <img src={preview} alt="preview" className="w-16 h-16 object-cover rounded-xl" />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center bg-red-50 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[var(--sea-ink)] max-w-[200px] truncate">{file.name}</span>
              <span className="text-xs text-[var(--sea-ink-soft)]">{(file.size / 1024).toFixed(1)} KB</span>
            </div>
            <button
              type="button"
              onClick={clearFile}
              className="ml-2 text-[var(--sea-ink-soft)] hover:text-red-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={sendMessage}
        className="flex items-end gap-3 max-w-5xl mx-auto bg-[var(--surface-strong)] p-2 rounded-[2rem] border border-[var(--line)] shadow-xl relative z-10"
      >
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Attach button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="p-3 text-[var(--sea-ink-soft)] hover:text-[var(--lagoon)] transition-colors shrink-0"
          title="Attach image or PDF"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
          </svg>
        </button>

        <textarea
          rows={1}
          placeholder={file ? "Add a caption..." : "Message..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              sendMessage()
            }
          }}
          className="flex-1 px-6 py-3.5 bg-transparent border-none text-[var(--sea-ink)] outline-none resize-none max-h-32"
          style={{ minHeight: "48px" }}
        />

        {/* Send button */}
        <Button
          type="submit"
          variant="primary"
          disabled={!canSend}
          className="!p-3.5 !rounded-2xl shrink-0"
        >
          {uploading ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          )}
        </Button>
      </form>
    </div>
  )
}