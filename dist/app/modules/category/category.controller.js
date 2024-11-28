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
exports.CategoryControllers = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const category_service_1 = require("./category.service");
// create Category in the database
const createCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const CategoryImage = req.files;
    const CategoryData = req.body;
    req.body.image = Array.isArray(CategoryImage)
        ? CategoryImage[0].path
        : CategoryImage === null || CategoryImage === void 0 ? void 0 : CategoryImage.categoryImage[0].path;
    const result = yield category_service_1.CategoryServices.createCategory(CategoryData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Category created successfully",
        data: result,
    });
}));
//get all Category
const getAllCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.CategoryServices.getAllCategory(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Categories are retrieved successfully",
        data: result,
    });
}));
//get a single Category
const getACategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.CategoryServices.getACategory(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Category is retrieved successfully",
        data: result,
    });
}));
//update a Category
const updateACategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.files) {
        req.body.image = Array.isArray(req.files) ? req.files[0].path : (_a = req.files) === null || _a === void 0 ? void 0 : _a.categoryImage[0].path;
    }
    const CategoryId = req.params.id;
    const updateData = req.body;
    const result = yield category_service_1.CategoryServices.updateACategory(CategoryId, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Category is updated successfully",
        data: result,
    });
}));
// delete a Category
const deleteACategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const CategoryId = req.params.id;
    const result = yield category_service_1.CategoryServices.deleteACategory(CategoryId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Category is deleted successfully",
        data: result,
    });
}));
exports.CategoryControllers = {
    createCategory,
    getAllCategory,
    getACategory,
    deleteACategory,
    updateACategory,
};
