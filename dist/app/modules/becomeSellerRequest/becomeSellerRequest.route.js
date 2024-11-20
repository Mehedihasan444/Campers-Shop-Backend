"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.becomeSellerRequestRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const becomeSellerRequest_controller_1 = require("./becomeSellerRequest.controller");
const router = (0, express_1.Router)();
router.get("/", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), becomeSellerRequest_controller_1.becomeSellerRequestController.getAllBecomeSellerRequestsFromDB);
router.get("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.BUYER), becomeSellerRequest_controller_1.becomeSellerRequestController.getSingleBecomeSellerRequestFromDB);
router.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.BUYER), becomeSellerRequest_controller_1.becomeSellerRequestController.createBecomeSellerRequest);
router.post("/:id/cancel", (0, auth_1.default)(user_constant_1.USER_ROLE.BUYER), becomeSellerRequest_controller_1.becomeSellerRequestController.cancelBecomeSellerRequest);
router.put("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), becomeSellerRequest_controller_1.becomeSellerRequestController.updateBecomeSellerRequest);
router.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.BUYER), becomeSellerRequest_controller_1.becomeSellerRequestController.deleteBecomeSellerRequestFromDB);
exports.becomeSellerRequestRoutes = router;
