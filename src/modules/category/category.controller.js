import * as handler from "../../utils/handlers.factory.js";
import CategoryModel from "./../../../db/models/category.model.js";



export const createCategory = handler.createOne(CategoryModel, "category");

export const getCategories = handler.getAll(CategoryModel, "category");

export const getCategoryByID = handler.getOne(CategoryModel, "category");

export const updateCategory = handler.updateOne(CategoryModel, "category");

export const deleteCategory = handler.deleteOne(CategoryModel, "category");
