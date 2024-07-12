import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { OrderValidation } from "./order.validation";
import { OrderControllers } from "./order.controller";


const router = express.Router();
router.post(
  "/",
  validateRequest(OrderValidation.OrderValidationSchema),
  OrderControllers.createOrder
);
// router.get("/",
//     OrderControllers.getOrderProducts
//     );
// router.delete("/:id", 
//     OrderControllers.deleteOrderProduct
// );

export const OrderRoutes = router;