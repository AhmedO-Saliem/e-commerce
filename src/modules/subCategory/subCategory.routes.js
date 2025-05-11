import { Router } from "express";
import * as Scv from "./subCategory.validator.js";
import * as Scc from "./subCategory.controller.js";

const router = Router({ mergeParams: true });

router.route("/").get(Scc.createSubCategoryFilter,Scc.getSubCategories);

router
  .route("/:categoryId")
  .post(Scv.createSubCategoryValidator, Scc.createSubCategory);

router
  .route("/:id")
  .get(Scv.getSubCategoryValidator, Scc.getSubCategoryById)
  .put(Scv.updateSubCategoryValidator, Scc.updateSubCategory)
  .delete(Scv.deleteSubCategoryValidator, Scc.deleteSubCategory);

export default router;