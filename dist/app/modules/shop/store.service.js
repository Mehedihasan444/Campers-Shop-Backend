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
exports.storeServices = void 0;
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
const getStoresFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const store = yield store_model_1.Store.find().populate('owner');
    return store;
});
const getStoreFromDB = (storeId) => __awaiter(void 0, void 0, void 0, function* () {
    const store = yield store_model_1.Store.findById(storeId).populate('owner');
    return store;
});
const deleteStoreFromDB = (storeId) => __awaiter(void 0, void 0, void 0, function* () {
    const store = yield store_model_1.Store.findByIdAndDelete(storeId);
    return store;
});
exports.storeServices = {
    createStore,
    updateStore,
    getStoreFromDB,
    getStoresFromDB,
    deleteStoreFromDB
};
