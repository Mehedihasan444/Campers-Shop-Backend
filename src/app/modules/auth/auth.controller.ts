import httpStatus from "http-status";
import config from "../../config";
import { AuthServices } from "./auth.services";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const signUp = catchAsync(async (req, res) => {
  const result = await AuthServices.signUp(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User signup successfully!",
    data: result,
  });
});

const signIn = catchAsync(async (req, res) => {
  const { user, accessToken, refreshToken } = await AuthServices.signIn(
    req.body
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
  });
  user.password = "";
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully!",
    data: {
      ...user.toObject(),
    },
    token: accessToken,
  });
});

export const authControllers = {
  signUp,
  signIn,
};
