import UserModel from "../../../db/models/user.model.js";
import * as handler from "../../utils/handlers.factory.js";


export const signUp=handler.signUp(UserModel)

export const getProfile = handler.getProfile(UserModel)

export const signIn = handler.signIn(UserModel)

export const getUserByID = handler.getOne(UserModel,"user")

export const verifyEmail = handler.verifyEmail(UserModel)

// export const updateUser = handler.updateOne(UserModel,"user")

// export const deleteUser = handler.deleteOne(UserModel,"user")
