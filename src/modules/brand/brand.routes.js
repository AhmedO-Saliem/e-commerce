import { Router } from "express";
import * as BV from "./brand.validator.js";
import * as BC from "./brand.controller.js";

const router = Router();

router.route("/").post(BC.createBrand).get(BC.getBrands);
router
  .route("/:id")
  .get(BV.getBrandValidator, BC.getBrandByID)
  .put(BV.updateBrandValidator, BC.updateBrand)
  .delete(BV.deleteBrandValidator, BC.deleteBrand);

export default router;
