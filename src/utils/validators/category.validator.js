import { check } from "express-validator";
import { validatorMiddleware } from "../../middleware/validator.middleware.js";

export const getCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id"),
  validatorMiddleware,
];
export const createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("category name is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("category name must be between 3 to 30 characters"),
  validatorMiddleware,
];
export const updateCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id"),
  validatorMiddleware,
];
export const deleteCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id"),
  validatorMiddleware,
];
