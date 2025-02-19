import slugify from "slugify";
import CategoryModel from "../models/category.model.js";
import asyncHandler from "express-async-handler";

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const cat = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ message: "Category created successfully", data: cat });
});
export const getCategory = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const cat = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(201).json({ results: cat.length, data: cat });
});
export const getCategoryByID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const cat = await CategoryModel.findById(id);
  if (!cat) return res.status(404).json({ message: "Category not found" });
  res.status(201).json({data: cat });
});
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {name} = req.body

  const cat = await CategoryModel.findOneAndUpdate({_id: id}, {name, slug: slugify(name)}, {new: true});
  if (!cat) return res.status(404).json({ message: "Category not found" });
  res.status(201).json({data: cat });
});
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const cat = await CategoryModel.findByIdAndDelete(id);
  if (!cat) return res.status(404).json({ message: "Category not found" });
  res.status(204).send();
});
