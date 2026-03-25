import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true, // required for cookie auth
  headers: {
    "Content-Type": "application/json",
  },
})

// LOGIN
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    })

    return response.data
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Login failed"
    )
  }
}

// REGISTER
export const registerUser = async (data: {
  userName: string
  email: string
  password: string
}) => {
  try {
    const response = await api.post("/auth/register", data)
    return response.data
  } catch (error: any) {
    console.log(error.response.data)
    throw new Error(
      error?.response?.data?.message || "Registration failed"
    )
  }
}

// GETUSERS
export const getAllUsers = async () => {
    try {
    const response = await api.get("/users")
    return response.data
  } catch (error: any) {
    console.log(error);
    throw new Error(error?.response?.data?.message || "Failed to fetch users")
  }
}

export const googleLogin = () => {
  // simple redirect — no axios needed, browser navigates directly
  window.location.href = "http://localhost:5000/api/v1/auth/google"
}

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/users/me")
    return response.data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch user")
  }
}

export const getUserChatHistory = async (otherUserId: string) => {
  try {
    const response = await api.get(`/messages/${otherUserId}`)
    return response.data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch messages")
  }
}