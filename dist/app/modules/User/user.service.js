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
exports.UserServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const QueryBuilder_1 = require("../../builder/QueryBuilder");
const user_constant_1 = require("./user.constant");
const user_model_1 = require("./user.model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.create(payload);
    return user;
});
const getAllUsersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const users = new QueryBuilder_1.QueryBuilder(user_model_1.User.find().populate("followers"), query)
        .fields()
        .paginate()
        .sort()
        .filter()
        .search(user_constant_1.UserSearchableFields);
    const result = yield users.modelQuery;
    return result;
});
const getSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id).populate("followers");
    return user;
});
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    if (user.role === "ADMIN") {
        throw new Error("You can not delete an admin user");
    }
    const result = yield user_model_1.User.findByIdAndDelete(userId);
    return result;
});
const updateProfilePhoto = (payload, image) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(image.image[0].path, "image");
    const result = yield user_model_1.User.findByIdAndUpdate(payload === null || payload === void 0 ? void 0 : payload.userId, { profilePhoto: image.image[0].path }, { new: true });
    return result;
});
exports.UserServices = {
    createUser,
    getAllUsersFromDB,
    getSingleUserFromDB,
    deleteUserFromDB,
    updateProfilePhoto,
};
