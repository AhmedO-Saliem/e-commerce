import { body, check } from "express-validator";
import { validatorMiddleware } from "../../middleware/validator.middleware.js";

export const getBrandValidator = [
  check("id").isMongoId().withMessage("invalid brand id"),
  validatorMiddleware,
];
export const createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("brand name is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("brand name must be between 3 to 30 characters")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];
export const updateBrandValidator = [
  check("id").isMongoId().withMessage("invalid brand id"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];
export const deleteBrandValidator = [
  check("id").isMongoId().withMessage("invalid brand id"),
  validatorMiddleware,
];
