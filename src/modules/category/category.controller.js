import slugify from "slugify";
import CategoryModel from "./../../../db/models/category.model.js";
import asyncHandler from "express-async-handler";
import { ApiError } from "../../utils/api.error.js";
import categoryServices from "./category.services.js";
import { ApiFeature } from "../../utils/api.features.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const cat = await categoryServices.createCategory({ name });
  res.status(201).json({ message: "Category created successfully", data: cat });
});

// export const getCategories = asyncHandler(async (req, res, next) => {
//   // const page = req.query.page * 1 || 1;
//   // const limit = req.query.limit * 1 || 5;
//   // const skip = (page - 1) * limit;
//   const cat = await CategoryModel.find({}).skip(skip).limit(limit);
//   if (!cat) return next(new ApiError("No categories found", 404));
//   res.status(201).json({ results: cat.length, data: cat });
// });
export const getCategories = asyncHandler(async (req, res, next) => {
  // const page = req.query.page * 1 || 1;
  // const limit = req.query.limit * 1 || 5;
  // const skip = (page - 1) * limit;
  // const cat = await CategoryModel.find({}).skip(skip).limit(limit);
   const ApiFeature = new ApiFeature(
    // CategoryModel.find({}),
    req.query
  ).pagination();
  if (!cat) return next(new ApiError("No categories found", 404));
  res.status(201).json({ results: cat.length, data: cat });
});
export const getCategoryByID = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const cat = await CategoryModel.findById(id);
  if (!cat) return next(new ApiError("No categories found", 404));
  res.status(201).json({ data: cat });
});
export const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const cat = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!cat) return next(new ApiError("No categories found", 404));
  res.status(201).json({ data: cat });
});
export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const cat = await CategoryModel.findByIdAndDelete(id);
  if (!cat) return next(new ApiError("No categories found", 404));
  res.status(204).send();
});
