"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.becomeSellerRequestService = void 0;
const user_model_1 = require("../User/user.model");
const becomeSellerRequest_interface_1 = require("./becomeSellerRequest.interface");
const becomeSellerRequest_model_1 = require("./becomeSellerRequest.model");
const store_model_1 = require("../store/store.model");
const user_constant_1 = require("../User/user.constant");
const mongoose_1 = __importStar(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createBecomeSellerRequest = (becomeSellerRequest) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield becomeSellerRequest_model_1.BecomeSellerRequest.create(becomeSellerRequest);
    return result;
});
const getAllBecomeSellerRequestsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield becomeSellerRequest_model_1.BecomeSellerRequest.find();
    return result;
});
const getSingleBecomeSellerRequestFromDB = (requestId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield becomeSellerRequest_model_1.BecomeSellerRequest.findById(requestId);
    return result;
});
const deleteBecomeSellerRequestFromDB = (requestId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield becomeSellerRequest_model_1.BecomeSellerRequest.findByIdAndDelete(requestId);
    return result;
});
const cancelBecomeSellerRequest = (requestId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield becomeSellerRequest_model_1.BecomeSellerRequest.findByIdAndUpdate(requestId, {
        $set: {
            status: becomeSellerRequest_interface_1.becomeSellerRequestStatus.CANCELED,
        },
    }, { new: true });
    return result;
});
const updateBecomeSellerRequest = (requestId, becomeSellerRequest, user) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        let result;
        const isExist = yield becomeSellerRequest_model_1.BecomeSellerRequest.findById(requestId);
        if (!isExist) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Request not found");
        }
        if (becomeSellerRequest.status === "APPROVED") {
            result = yield becomeSellerRequest_model_1.BecomeSellerRequest.findByIdAndUpdate(requestId, {
                $set: {
                    status: becomeSellerRequest.status,
                },
            }, { new: true, session: session });
            const getUser = yield user_model_1.User.findOne({ email: user.email });
            if (!getUser) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
            }
            const StoreData = {
                name: isExist.name + "'s Store",
                owner: getUser === null || getUser === void 0 ? void 0 : getUser._id,
                location: isExist.address,
                description: "This is the store of " + isExist.name,
            };
            yield store_model_1.Store.create([StoreData], { session: session });
            yield user_model_1.User.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user._id, { $set: { role: user_constant_1.USER_ROLE.SELLER } }, { new: true, session: session });
            yield session.commitTransaction();
        }
        else if (becomeSellerRequest.status === "REJECTED") {
            result = yield becomeSellerRequest_model_1.BecomeSellerRequest.findByIdAndUpdate(requestId, {
                $set: {
                    status: becomeSellerRequest.status,
                    rejectionReason: becomeSellerRequest.rejectionReason,
                },
            }, { new: true });
        }
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        throw new mongoose_1.Error(error.message);
    }
    finally {
        yield session.endSession();
    }
});
exports.becomeSellerRequestService = {
    createBecomeSellerRequest,
    getAllBecomeSellerRequestsFromDB,
    getSingleBecomeSellerRequestFromDB,
    deleteBecomeSellerRequestFromDB,
    updateBecomeSellerRequest,
    cancelBecomeSellerRequest,
};
