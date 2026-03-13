import { User } from "@/models/user.model.js";
import { ApiError } from "../../utils/apiError.js";
import { getCurrentUserResponseSchema } from "@/schema/user.schema.js";

export class UserService {

    async getCurrentUser(userId: string) {
        try {
            const user = await User.findById(userId).select("-password");

            if(!user) {
                throw new ApiError(404, "User not found");
            }

            return getCurrentUserResponseSchema.parse({
            id: user._id.toString(),
            userName: user.userName,
            email: user.email,
            bio: user.bio,
            birthDate: user.birthDate,
            postsCount: user.postsCount,
            followersCount: user.followersCount,
            followingCount: user.followingCount,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString()
            });
            
        } catch (error) {
            console.log(error);
        }

        
    }

    async getAllUsers(currentUserId: string) {
        try {
            const users = await User.find({
                _id: { $ne: currentUserId } // exclude current user
                }).select("-password");

                 return users.map((user) => ({
                    id: user._id.toString(),
                    userName: user.userName,
                    email: user.email,
                    bio: user.bio,
                    birthDate: user.birthDate,
                    postsCount: user.postsCount,
                    followersCount: user.followersCount,
                    followingCount: user.followingCount,
                    createdAt: user.createdAt.toISOString(),
                    updatedAt: user.updatedAt.toISOString()
                    }));
        } catch (error) {
            console.error(error);
            throw new ApiError(500, "Failed to fetch users");
        }
    }
}