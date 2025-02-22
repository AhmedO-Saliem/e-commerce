import { Router } from "express";
import * as CC from "../controllers/category.controller.js";
import * as CV from "../utils/validators/category.validator.js";
const router = Router();

router.route("/").post(CC.createCategory).get(CC.getCategories);
router
  .route("/:id")
  .get(CV.getCategoryValidator, CC.getCategoryByID)
  .put(CV.updateCategoryValidator, CC.updateCategory)
  .delete(CV.deleteCategoryValidator, CC.deleteCategory);

export default router;
