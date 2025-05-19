import mongoose from "mongoose";
import { ApiError } from "./api.error.js";
import { ApiFeature } from "./api.features.js";
import asyncHandler from "express-async-handler";
import CategoryModel from "../../db/models/category.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../../db/models/user.model.js";
import { sendEmail } from "../service/send.email.js";

// ============================== createOne =====================================//

export const createOne = (model, controllerName) =>
  asyncHandler(async (req, res, next) => {
    if (controllerName === "subCategory") {
      const { categoryId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return next(new ApiError("Invalid category ID format", 400));
      }
      const category = await CategoryModel.findById(categoryId);
      if (!category) {
        return next(new ApiError("No category found", 404));
      }
      req.body.category = categoryId;
    }
    const document = await model.create(req.body);
    if (!document) {
      return next(new ApiError(`${controllerName} not created`, 400));
    }
    res.status(201).json({
      message: `${controllerName} created successfully`,
      data: document,
    });
  });

// ============================== signUp =====================================//

export const signUp = (model) =>
  asyncHandler(async (req, res, next) => {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password || !phone || !address)
      return next(
        new ApiError(
          "name , email , password , phone , address are required",
          400
        )
      );

    const existingUser = await model.findOne({ email });
    if (existingUser) return next(new ApiError("Email already in use", 400));

    const token = jwt.sign({ email }, "confirmEmail");
    const link = `http://localhost:3000/api/v1/users/verify-email/${token}`;

    const checkSendEmail = await sendEmail(
      email,
      "Hi",
      `<a href="${link}">Verify Email</a>`
    );
    if (!checkSendEmail) return next(new ApiError("Email not sent", 400));
    const hashedPassword = await bcrypt.hash(password, 10);

    const document = await model.create({
      ...req.body,
      password: hashedPassword,
    });
    const documentObj = document.toObject();
    delete documentObj.password;

    if (!document) return next(new ApiError(`User not created`, 400));

    res.status(201).json({
      message: `User created successfully`,
      data: documentObj,
    });
  });

// ============================== verifyEmail =====================================//
export const verifyEmail = (model) =>
  asyncHandler(async (req, res, next) => {
    const { token } = req.params;
    if (!token) return next(new ApiError("Token is required", 400));
    const decoded = jwt.verify(token, "confirmEmail");
    if (!decoded?.email) return next(new ApiError("Invalid token", 400));
    const user = await model.findOneAndUpdate(
      { email: decoded.email, confirmed: false },
      { confirmed: true },
      { new: true }
    );
    if (!user)
      return next(new ApiError("Email not found or already confirmed", 404));
    res.status(200).json({ message: "Email verified successfully" });
  });

// ============================== signIn =====================================//

export const signIn = (model) =>
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ApiError("email and password are required", 400));
    }

    const user = await model.findOne({ email, confirmed: true });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return next(
        new ApiError("Invalid email or password or not confirmed", 404)
      );
    }

    const token = jwt.sign({ id: user._id, email }, "secret");

    res.status(200).json({
      message: "Success",
      token,
    });
  });

// ============================== getProfile =====================================//

export const getProfile = (model) =>
  asyncHandler(async (req, res, next) => {
    res.status(200).json({ message: "Success", data: req.user });
  });

// ============================== getOne =====================================//

export const getOne = (model, controllerName) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findById(id);
    if (!document)
      return next(new ApiError(`${controllerName} not found`, 404));
    res.status(200).json({ message: "Success", data: document });
  });

// ============================== getAll =====================================//

export const getAll = (model, controllerName) =>
  asyncHandler(async (req, res, next) => {
    let filter = {};
    if (req.filterObject) filter = req.filterObject;
    const apiFeature = new ApiFeature(model.find(filter), req.query)
      .filter()
      .sort()
      .select()
      .search(controllerName);

    // Clone the query to count documents
    const countQuery = apiFeature.clone();
    const totalDocs = await countQuery.countDocuments();
    const apiFeatureWithPagination = apiFeature.pagination(totalDocs);

    const { mongooseQuery, paginationResult } = apiFeatureWithPagination;

    const documents = await mongooseQuery;
    !documents && next(new ApiError(`${controllerName} not found`, 404));

    return res.status(200).json({
      message: `${controllerName} retrieved successfully`,
      results: documents.length,
      paginationResult,
      data: documents,
    });
  });

// ============================== updateOne =====================================//

export const updateOne = (model, controllerName) =>
  asyncHandler(async (req, res, next) => {
    const document = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document)
      return next(new ApiError(`${controllerName} not found`, 404));
    return res.status(201).json({
      message: `${controllerName} updated successfully`,
      data: document,
    });
  });

// ============================== deleteOne =====================================//

export const deleteOne = (model, controllerName) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await model.findByIdAndDelete(id);
    if (!document)
      return next(new ApiError(`${controllerName} not found`, 404));
    return res
      .status(204)
      .json({ message: `${controllerName} deleted successfully` });
  });
