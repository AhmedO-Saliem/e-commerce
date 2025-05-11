import asyncHandler from "express-async-handler";
import * as handler from "../../utils/handlers.factory.js";
import SubCategoryModel from "../../../db/models/subCategory.model.js";

export const createSubCategoryFilter = asyncHandler(
  async (req, res, next) => {
    let filterObj = {};
    if (req.params.categoryId) filterObj = { category: req.params.categoryId };
    req.filterObject = filterObj;
    next();
  }
);
export const createSubCategory = handler.createOne(SubCategoryModel,"subCategory");

export const getSubCategories = handler.getAll(SubCategoryModel, "subCategory");

export const getSubCategoryById = handler.getOne(SubCategoryModel,"subCategory");

export const updateSubCategory = handler.updateOne(SubCategoryModel,"subCategory");

export const deleteSubCategory = handler.deleteOne(SubCategoryModel,"subCategory");
