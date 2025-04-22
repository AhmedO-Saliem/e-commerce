import slugify from "slugify";
import CategoryModel from "./../../../db/models/category.model.js";
import asyncHandler from "express-async-handler";
import { ApiError } from "../../utils/api.error.js";
import categoryServices from "./category.services.js";

// ============================== createCategory =====================================//

export const createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const cat = await categoryServices.createCategory({ name });
  !cat && next(new ApiError("Category not created", 400));
  res.status(201).json({ message: "Category Created Successfully", data: cat });
});

// ============================== getCategories =====================================//

export const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await categoryServices.getCategories(req.query).populate("subCategory");

  if (!categories || categories.length === 0) {
    return next(new ApiError("No categories found", 404));
  }
  res.status(200).json({
    message: "Categories retrieved successfully",
    results: categories.length,
    page: req.query.page || 1,
    data: categories,
  });
});

// ============================== getCategoryBySlug =====================================//
export const getCategoryBySlug = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  const cat = await CategoryModel.findOne({ slug });
});

// ============================== getCategoryById =====================================//

export const getCategoryByID = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const cat = await CategoryModel.findById(id);
  0;
  if (!cat) return next(new ApiError("No categories found", 404));
  res.status(201).json({ message: "Success", data: cat });
});

// ============================== updateCategory =====================================//

export const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const cat = await categoryServices.updateCategory(name, id);

  if (!cat) return next(new ApiError("No categories found", 404));
  res.status(201).json({ message: "Category updated successfully", data: cat });
});

// ============================== deleteDCategory =====================================//

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const cat = await CategoryModel.findByIdAndDelete(id);
  if (!cat) return next(new ApiError("No categories found", 404));
  res.status(204).json({ message: "Category deleted successfully" });
});
