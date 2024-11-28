"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const store_controller_1 = require("./store.controller");
const store_validation_1 = require("./store.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const router = express_1.default.Router();
router.get("/", store_controller_1.StoreControllers.getStoresFromDB);
router.get("/:id", store_controller_1.StoreControllers.getStoreFromDB);
router.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), (0, validateRequest_1.default)(store_validation_1.storeValidationSchema.createStoreValidationSchema), store_controller_1.StoreControllers.createStore);
router.put("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.SELLER), (0, validateRequest_1.default)(store_validation_1.storeValidationSchema.updateStoreValidationSchema), store_controller_1.StoreControllers.updateStore);
router.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), store_controller_1.StoreControllers.deleteStoreFromDB);
exports.storeRoutes = router;
