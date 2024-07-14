"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistServices = void 0;
const wishlist_model_1 = require("./wishlist.model");
const createWishlistProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield wishlist_model_1.Wishlist.findOne({ product: payload.product });
    if (isExist) {
        return {
            status: 200,
            message: 'Product already exists in the wishlist',
            data: isExist
        };
    }
    const result = (yield wishlist_model_1.Wishlist.create(payload)).populate("product");
    return result;
});
const getWishlistProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishlist_model_1.Wishlist.find().populate("product");
    return result;
});
const deleteWishlistProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishlist_model_1.Wishlist.findByIdAndDelete(id).populate("product");
    return result;
});
exports.WishlistServices = {
    createWishlistProduct,
    getWishlistProducts,
    deleteWishlistProduct
};
