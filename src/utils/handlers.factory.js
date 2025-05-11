import mongoose from "mongoose";
import { ApiError } from "./api.error.js";
import { ApiFeature } from "./api.features.js";
import asyncHandler from "express-async-handler";
import CategoryModel from "../../db/models/category.model.js";

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
    return res
      .status(201)
      .json({
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
