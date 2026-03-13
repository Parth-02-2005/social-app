  import { User } from "@/models/user.model.js";
  import { loginResponseSchema, registerResponseSchema, type RegisterResponse, type LoginBody, type RegisterBody } from "@/schema/auth.schema.js";
  import { ApiError } from "../../utils/apiError.js";
  import { generateToken } from "../../utils/jwt.js";


  export class AuthenticationService {

    async login(data: LoginBody) {

      const user = await User.findOne({ email: data.email });

      if (!user) {
      throw new ApiError(404, "User not found");
    }

      const isPasswordValid = await user.isPasswordCorrect(data.password);

      if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials");
      }

      const token = generateToken(user._id.toString());

      // return {
      //   id: user._id,
      //   token
      // };
      // return loginResponseSchema.parse(user);

      return loginResponseSchema.parse({
        id: user._id.toString(),
        userName: user.userName,
        email: user.email,
        token
      });
    }

    async register(body: RegisterBody) {

 try {
   const { userName, bio, email, password, birthDate } = body;

  const existingUser = await User.findOne({
    $or: [{ email }, { userName }]
  });

  if (existingUser) {
    throw new ApiError(
      409,
      existingUser.email === email
        ? "Email already in use"
        : "Username already taken"
    );
  }

  const newUser = await User.create({
    userName: userName,
    email: email,
    password: password,
    bio: bio ?? '',
    birthDate: birthDate ?? ''
  });

  // return responseSchema.parse(newUser);

  return registerResponseSchema.parse({
      id: newUser._id.toString(),
      userName: newUser.userName,
      email: newUser.email,
      bio: newUser.bio,
      birthDate: newUser.birthDate?.toISOString,
      postsCount: newUser.postsCount,
      followersCount: newUser.followersCount,
      followingCount: newUser.followingCount,
      createdAt: newUser.createdAt.toISOString(),
      updatedAt: newUser.updatedAt.toISOString()
    });

 } catch (error) {
  throw new ApiError(
    500,'Internal Server Error',
    error
  )
 }
    }
  }