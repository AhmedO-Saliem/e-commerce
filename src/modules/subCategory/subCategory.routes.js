import Router from "express";
import * as Scc from "./subCategory.controller.js";
import * as Scv from "./subCategory.validator.js";
const router = Router();

router.route("/").get(Scc.getSubCategories);
router
  .route("/:categoryId")
  .post(Scv.createSubCategoryValidator, Scc.createSubCategory);
router
  .route("/:id")
  .get(Scv.getSubCategoryValidator, Scc.getSubCategoryById)
  .put(Scv.updateSubCategoryValidator, Scc.updateSubCategory)
  .delete(Scv.deleteSubCategoryValidator, Scc.deleteSubCategory);
export default router;
