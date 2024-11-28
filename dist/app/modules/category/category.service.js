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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = require("../../builder/QueryBuilder");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const category_model_1 = require("./category.model");
const createCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.create(payload);
    return result;
});
const getAllCategory = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // Create a new QueryBuilder instance for the product query
    const productQuery = new QueryBuilder_1.QueryBuilder(category_model_1.Category.find(), query)
        .search(["name"])
        .sort()
        .fields()
        .filter()
        .paginate();
    // Execute the query to get the paginated results
    const result = yield productQuery.modelQuery;
    // Create a separate query to count the total number of products matching the filter criteria
    const countQuery = new QueryBuilder_1.QueryBuilder(category_model_1.Category.find(), query)
        .search(["name"])
        .filter();
    // Execute the count query to get the total count
    const totalCount = yield countQuery.modelQuery.countDocuments();
    return { totalCount, categories: result };
});
// get a single Category from the database
const getACategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findById(id);
    return result;
});
// update a Category with a new value
const updateACategory = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield category_model_1.Category.findById(id);
    if (!isExist) {
        return new AppError_1.default(http_status_1.default.NOT_FOUND, "Category not found!");
    }
    const result = yield category_model_1.Category.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    return result;
});
// delete a Category from the database
const deleteACategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield category_model_1.Category.findById(id);
    if (!isExist) {
        return new AppError_1.default(http_status_1.default.NOT_FOUND, "Category not found!");
    }
    const result = yield category_model_1.Category.findByIdAndDelete(id);
    return result;
});
exports.CategoryServices = {
    createCategory,
    getAllCategory,
    getACategory,
    updateACategory,
    deleteACategory,
};
