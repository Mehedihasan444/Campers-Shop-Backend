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
exports.OrderServices = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // Create the order and populate the product field
    // const result = await Order.create(payload);
    const result = (yield order_model_1.Order.create(payload)).populate("items.id");
    // Extract product IDs and quantities from the order items
    const productsId = (_a = payload.items) === null || _a === void 0 ? void 0 : _a.map(item => item.id);
    const quantities = (_b = payload.items) === null || _b === void 0 ? void 0 : _b.map(item => item.purchasedQuantity);
    // Update product quantities
    for (let i = 0; i < productsId.length; i++) {
        const productId = productsId[i];
        const quantity = quantities[i];
        yield product_model_1.Product.findByIdAndUpdate(productId, {
            $inc: { quantity: -quantity }
        });
    }
    return result;
});
exports.OrderServices = {
    createOrder,
};
