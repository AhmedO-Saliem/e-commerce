import slugify from "slugify";
import { body, check } from "express-validator";
import { validatorMiddleware } from "../../middleware/validator.middleware.js";

export const createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("sub-category name is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("sub-category name must be between 3 to 30 characters")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("categoryId")
    .notEmpty()
    .isMongoId()
    .withMessage("invalid category id format"),
  validatorMiddleware,
];
export const getSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id format"),
  validatorMiddleware,
];
export const updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id format"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];
export const deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("invalid category id format"),
  validatorMiddleware,
];
