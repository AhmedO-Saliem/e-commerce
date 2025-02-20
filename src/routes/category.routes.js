import { Router } from "express";
import * as CC from "../controllers/category.controller.js";
import { param, validationResult } from "express-validator";
import { validator } from "../middleware/validator.middleware.js";
const router = Router();

router.route("/").post(CC.createCategory).get(CC.getCategories);
router
  .route("/:id")
  .get(
    param("id").isMongoId().withMessage("invalid category id"),
    validator,
    CC.getCategoryByID
  )
  .put(CC.updateCategory)
  .delete(CC.deleteCategory);

export default router;
