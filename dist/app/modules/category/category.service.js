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
exports.CategoryServices = void 0;
const category_model_1 = require("./category.model");
const createCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield category_model_1.Category.create(payload)).populate("productId");
    return result;
});
const getAllCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.find({ productId: payload.id });
    return result;
});
// get a single Category from the database
const getACategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findById(id);
    return result;
});
// update a Category with a new value
const updateACategory = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    return result;
});
// delete a Category from the database
const deleteACategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
