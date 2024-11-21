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
exports.ProductServices = void 0;
const QueryBuilder_1 = require("../../builder/QueryBuilder");
const product_constant_1 = require("./product.constant");
const product_model_1 = require("./product.model");
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(payload);
    return result;
});
// get all Product from the database
const getAllProducts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // Create a new QueryBuilder instance for the product query
    const productQuery = new QueryBuilder_1.QueryBuilder(product_model_1.Product.find(), query)
        .search(product_constant_1.productSearchableFields)
        .sort()
        .fields()
        .filter()
        .paginate();
    // Execute the query to get the paginated results
    const result = yield productQuery.modelQuery;
    // Create a separate query to count the total number of products matching the filter criteria
    const countQuery = new QueryBuilder_1.QueryBuilder(product_model_1.Product.find(), query)
        .search(product_constant_1.productSearchableFields)
        .filter();
    // Execute the count query to get the total count
    const totalCount = yield countQuery.modelQuery.countDocuments();
    // Return both the paginated results and the total count
    return {
        totalCount,
        products: result,
    };
});
// get a single Product from the database
const getAProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id);
    return result;
});
// update a Product with a new value
const updateAProduct = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    return result;
});
// delete a Product from the database
const deleteAProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete(id);
    return result;
});
exports.ProductServices = {
    createProduct,
    getAllProducts,
    getAProduct,
    updateAProduct,
    deleteAProduct,
};
