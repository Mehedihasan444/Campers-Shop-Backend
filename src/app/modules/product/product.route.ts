import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./product.validation";
import { ProductControllers } from "./product.controller";

const router = express.Router();
router.post(
  "/",
  validateRequest(ProductValidation.productValidationSchema),
  ProductControllers.createProduct
);
router.get("/", ProductControllers.getAllProducts);
router.get("/:id", ProductControllers.getAProduct);
router.put( "/:id",validateRequest(ProductValidation.updateProductValidationSchema),
  ProductControllers.updateAProduct
);
router.delete("/:id", ProductControllers.deleteAProduct);

export const ProductRoutes = router;
