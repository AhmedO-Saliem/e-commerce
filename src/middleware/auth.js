import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import UserModel from "../../db/models/user.model.js";
import { ApiError } from "../utils/api.error.js";

export const auth = asyncHandler(async (req, res, next) => {
  const { token } = req.headers;

  if (!token) return next(new ApiError("token is required", 400));

  if (!token.startsWith("ah__"))
    return next(new ApiError("Invalid token", 400));

  const newToken = token.split("ah__")[1];
  if (!newToken) return next(new ApiError("token not found", 400));

  const decoded = jwt.verify(newToken, "secret");

  if (!decoded?.id) return next(new ApiError("Invalid payload", 400));

  const user = await UserModel.findById(decoded.id);

  if (!user) return next(new ApiError("User not found", 404));

  const userObj = user.toObject();
  delete userObj.password;

  req.user = userObj;

  next();
});
