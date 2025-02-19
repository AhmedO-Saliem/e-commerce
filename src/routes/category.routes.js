import { Router } from "express";
import * as CC from "../controllers/category.controller.js";
const router = Router();

router.route('/').post(CC.createCategory).get(CC.getCategory)
router.route('/:id').get(CC.getCategoryByID).put(CC.updateCategory).delete(CC.deleteCategory)

export default router;
