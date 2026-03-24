import { v2 as cloudinary } from "cloudinary"
import { ApiError } from "./apiError.js"
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

// console.log("Cloudinary config:", {
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET ? "set" : "missing"
// })

export const uploadOnCloudinary = async (
  file: File,
): Promise<{ url: string; publicId: string; fileType: "image" | "pdf" }> => {
  if (!file) throw new ApiError(400, "File is required")

  const allowed = ["image/jpeg", "image/png", "application/pdf"]
  if (!allowed.includes(file.type)) {
    throw new ApiError(400, "Only JPG, PNG, and PDF files are allowed")
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new ApiError(400, "File size must be under 10MB")
  }

  const isPdf = file.type === "application/pdf"
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const uploaded = await new Promise<{ secure_url: string; public_id: string }>(
    (resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: isPdf ? "raw" : "image",
          folder: "chat-social-app",
        },
        (error, result) => {
          if (error || !result) return reject(error)
          resolve(result)
        }
      )
      stream.end(buffer)
    }
  )

  return {
    url: uploaded.secure_url,
    publicId: uploaded.public_id,
    fileType: isPdf ? "pdf" : "image",
  }
}