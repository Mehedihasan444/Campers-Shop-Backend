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
exports.storeServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = require("../../builder/QueryBuilder");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const store_model_1 = require("./store.model");
const createStore = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const store = yield store_model_1.Store.create(payload);
    return store;
});
const updateStore = (storeId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isStoreExist = yield store_model_1.Store.findById(storeId);
    if (!isStoreExist) {
        throw new Error("Store not found");
    }
    const store = yield store_model_1.Store.findByIdAndUpdate(storeId, payload, { new: true });
    return store;
});
const getStoresFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const storeQuery = new QueryBuilder_1.QueryBuilder(store_model_1.Store.find(), query)
        .search(["name"])
        .sort()
        .fields()
        .filter()
        .paginate();
    storeQuery.modelQuery.populate("owner");
    const result = yield storeQuery.modelQuery;
    const countQuery = new QueryBuilder_1.QueryBuilder(store_model_1.Store.find(), query)
        .search(["name"])
        .filter();
    const totalCount = yield countQuery.modelQuery.countDocuments();
    return { totalCount, stores: result };
});
const getStoreFromDB = (storeId) => __awaiter(void 0, void 0, void 0, function* () {
    const store = yield store_model_1.Store.findById(storeId).populate("owner");
    return store;
});
const deleteStoreFromDB = (storeId) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield store_model_1.Store.findById(storeId);
    if (!isExist) {
        return new AppError_1.default(http_status_1.default.NOT_FOUND, "Store not found!");
    }
    const store = yield store_model_1.Store.findByIdAndDelete(storeId);
    return store;
});
exports.storeServices = {
    createStore,
    updateStore,
    getStoreFromDB,
    getStoresFromDB,
    deleteStoreFromDB,
};
