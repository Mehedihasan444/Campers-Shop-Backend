import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import jwt from "jsonwebtoken";
import config from "../../config";
import { isPasswordMatched } from "./auth.utils";
import { TSignInUser } from "./auth.interface";

const signUp = async (payload: TUser): Promise<any> => {
  //user existence check
  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw new Error("User already exists");
  }
  //create user
  const newUser = await User.create(payload);

  return newUser;
};

const signIn = async (payload: TSignInUser) => {
  const user = await User.findOne({ email: payload.email }).select("+password");

  if (!user) {
    throw new Error("User not found");
  }

  const passwordMatch = await isPasswordMatched(
    payload.password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Password not matched");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_refresh_expires_in,
    }
  );

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  signUp,
  signIn,
};
