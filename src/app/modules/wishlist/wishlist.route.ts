import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { WishlistProductValidation } from "./wishlist.validation";
import { WishlistControllers } from "./wishlist.controller";

const router = express.Router();
router.post(
  "/",
  validateRequest(WishlistProductValidation.wishlistValidationSchema),
  WishlistControllers.createWishlistProduct
);
router.get("/",
    WishlistControllers.getWishlistProducts
    );
router.delete("/:id", 
    WishlistControllers.deleteWishlistProduct
);

export const WishlistRoutes = router;