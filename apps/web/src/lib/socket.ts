import { io, Socket } from "socket.io-client"

let socket: Socket | null = null

const SOCKET_URL = "http://localhost:5000"

export const getSocket = (): Socket => {

  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      transports: ["websocket"],
      withCredentials: true,
    })

    // logs
    socket.on("connect", () => {
      console.log("Socket connected:", socket?.id)
    })

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason)
    })

    socket.on("connect_error", (err) => {
      console.log("Socket connection error:", err.message)
    })
  }

  return socket
}

export const connectSocket = () => {
  const token = localStorage.getItem("token")
  const socket = getSocket()

  if (!token) {
    console.warn("No token found, socket not connected")
    return
  }

  if (socket.connected) return

  socket.auth = { token }
  socket.connect()
}

export const disconnectSocket = () => {
  if (!socket) return

  if (socket.connected) {
    socket.disconnect()
  }
}