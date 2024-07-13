"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const wishlist_validation_1 = require("./wishlist.validation");
const wishlist_controller_1 = require("./wishlist.controller");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(wishlist_validation_1.WishlistProductValidation.wishlistValidationSchema), wishlist_controller_1.WishlistControllers.createWishlistProduct);
router.get("/", wishlist_controller_1.WishlistControllers.getWishlistProducts);
router.delete("/:id", wishlist_controller_1.WishlistControllers.deleteWishlistProduct);
exports.WishlistRoutes = router;
