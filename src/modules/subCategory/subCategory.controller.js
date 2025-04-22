import expressAsyncHandler from "express-async-handler";
import CategoryModel from "../../../db/models/category.model.js";
import SubCategoryModel from "../../../db/models/subCategory.model.js";
import { ApiError } from "../../utils/api.error.js";
import slugify from "slugify";
import mongoose from "mongoose";
import { ApiFeature } from "../../utils/api.features.js";

// ============================== createSubCategory =====================================//

export const createSubCategory = expressAsyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const { categoryId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return next(new ApiError("Invalid category ID format", 400));
  }

  const category = await CategoryModel.findById(categoryId);

  !category && next(new ApiError("No categories found", 404));

  const subCategory = await SubCategoryModel.create({
    name,
    slug: slugify(name),
    category: categoryId,
  });

  !subCategory && next(new ApiError("Sub-category not created", 400));

  return res.status(201).json({
    message: "Sub-category created successfully",
    data: subCategory,
  });
});

// ============================== getSubCategories =====================================//

export const getSubCategories = expressAsyncHandler(async (req, res, next) => {
  const query = SubCategoryModel.find({});
  const apiFeature = new ApiFeature(query, req.query).pagination();
  const subCategories = await apiFeature.mongooseQuery.populate({path: "category", select: "name"});
  !subCategories && next(new ApiError("No sub-categories found", 404));
  return res.status(200).json({
    message: "Sub-categories retrieved successfully",
    results: subCategories.length,
    page: req.query.page || 1,
    data: subCategories,
  });
});

// ============================== getSubCategoryById =====================================//

export const getSubCategoryById = expressAsyncHandler(
  async (req, res, next) => {
    const { id } = req.params;
    const subCategory = await SubCategoryModel.findById(id);
    // !subCategory && next(new ApiError("No sub-category found", 404));
    if (!subCategory) {
      return next(new ApiError("No sub-category found", 404));
    }
    return res.status(200).json({
      message: "Sub-category retrieved successfully",
      data: subCategory,
    });
  }
);

// ============================== updateSubCategory =====================================//
export const updateSubCategory = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subCategory = await SubCategoryModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );
  if (!subCategory) {
    return next(new ApiError("No sub-category found", 404));
  }
  return res.status(200).json({
    message: "Sub-category updated successfully",
    data: subCategory,
  });
});

// ============================== deleteSubCategory =====================================//
export const deleteSubCategory = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategoryModel.findByIdAndDelete(id);
  !subCategory && next(new ApiError("No sub-category found", 404));
  return res.status(200).json({
    message: "Sub-category deleted successfully",
  });
});
