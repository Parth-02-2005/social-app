import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./apiError.js";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadOnCloudinary = async (localFilePath: string): Promise<string> => {
    if (!localFilePath) {
        throw new ApiError(400, "File path is required");
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
        folder: "avatars-social-app",
    });

    // Remove temp file after successful upload
    fs.unlinkSync(localFilePath);

    return response.secure_url;
};