import slugify from "slugify";
import { body, check } from "express-validator";
import { ApiError } from "../../utils/api.error.js";
import CategoryModel from "../../../db/models/category.model.js";
import SubCategoryModel from "../../../db/models/subCategory.model.js";
import { validatorMiddleware } from "../../middleware/validator.middleware.js";

export const createProductValidator = [
  check("title")
    .isLength({ min: 5, max: 100 })
    .withMessage("title must be between 5 to 100 characters")
    .notEmpty()
    .withMessage("title is required")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("description")
    .isLength({ min: 10, max: 200 })
    .withMessage("description must be between 10 to 200 characters")
    .notEmpty()
    .withMessage("description is required"),
  check("quantity")
    .notEmpty()
    .withMessage("quantity is required")
    .isNumeric()
    .withMessage("quantity must be a number"),
  check("price")
    .notEmpty()
    .withMessage("price is required")
    .isNumeric()
    .withMessage("price must be a number"),
  check("sold").optional().isNumeric().withMessage("sold must be a number"),
  check("subPrice")
    .optional()
    .isNumeric()
    .withMessage("subPrice must be a number")
    .custom((value, { req }) => {
      if (req.body.price === undefined) {
        throw new Error("Price is required to validate subPrice");
      }
      if (req.body.price <= value) {
        throw new Error("subPrice must be less than price");
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("colors must be an array of strings"),
  check("coverImage").notEmpty().withMessage("coverImage is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("images must be an array of strings"),
  check("category")
    .notEmpty()
    .withMessage("category is required")
    .isMongoId()
    .withMessage("category must be a valid MongoDB ObjectId")
    .custom((categoryId) =>
      CategoryModel.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(new ApiError("invalid category id"));
        }
        return true;
      })
    ),
  //:todo: check if subcategory is active =>
  check("subcategories")
    .notEmpty()
    .isMongoId()
    .withMessage("subCategory must be a valid MongoDB ObjectId")
    .custom(async (subCategoryIds) => {
      try {
        const ids = Array.isArray(subCategoryIds)
          ? subCategoryIds
          : [subCategoryIds];

          console.log("Validating subcategories:", ids);
          

          const results = await SubCategoryModel.find({
            _id: { $exists: true, $in: ids },
          });
          console.log("Validating subcategories results:", results); 
          
          if (results.length !== ids.length) {
            throw new ApiError("Some subcategory IDs do not exist");
          }
          console.log("Validating subcategories results length:", results.length); 

        return true;
      } catch (error) {
        throw new ApiError("Subcategory validation error:" + error.message);
      }
    })
    .custom(async (val, { req }) => {
      if (!val || !Array.isArray(val)) {
        return Promise.reject(new ApiError("Invalid subcategories format"));
      }

      const subCategories = await SubCategoryModel.find({
        category: req.body.category,
      });
      const subcategoriesIds = subCategories.map((subcategory) =>
        subcategory._id.toString()
      );

      if (!val.every((v) => subcategoriesIds.includes(v))) {
        return Promise.reject(
          new ApiError("Some subcategories do not belong to the specified category")
        );
      }
      return true;
    }),
  check("brand")
    .optional()
    .isMongoId()
    .withMessage("brand must be a valid MongoDB ObjectId"),
  check("rateAvg")
    .optional()
    .isNumeric()
    .withMessage("rateAvg must be a number")
    .isLength({ min: 1, max: 5 })
    .withMessage("rateAvg must be between 1 to 5"),
  check("rateNum")
    .optional()
    .isNumeric()
    .withMessage("rateNum must be a number"),
  validatorMiddleware,
];
export const getProductValidator = [
  check("id").isMongoId().withMessage("invalid brand id"),
  validatorMiddleware,
];
export const updateProductValidator = [
  check("id").isMongoId().withMessage("invalid brand id"),
  body("title")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];
export const deleteProductValidator = [
  check("id").isMongoId().withMessage("invalid brand id"),
  validatorMiddleware,
];
