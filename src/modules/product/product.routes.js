import { Router } from "express";
import * as PV from "./product.validator.js";
import * as PC from "./product.controller.js";

const router = Router();

router.route("/").post(PV.createProductValidator,PC.createProduct).get(PC.getProducts);
router
  .route("/:id")
  .get(PV.getProductValidator, PC.getProductByID)
  .put(PV.updateProductValidator, PC.updateProduct)
  .delete(PV.deleteProductValidator, PC.deleteProduct);

export default router;