"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_validation_1 = require("./category.validation");
const multer_config_1 = require("../../config/multer.config");
const validateImageFileRequest_1 = __importDefault(require("../../middlewares/validateImageFileRequest"));
const bodyParser_1 = require("../../middlewares/bodyParser");
const image_validation_1 = require("../imageUpload/image.validation");
const router = (0, express_1.Router)();
router.get("/", category_controller_1.CategoryControllers.getAllCategory);
router.get("/:id", category_controller_1.CategoryControllers.getACategory);
router.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), multer_config_1.multerUpload.fields([{ name: "categoryImage" }]), (0, validateImageFileRequest_1.default)(image_validation_1.ImageFilesArrayZodSchema), bodyParser_1.parseBody, (0, validateRequest_1.default)(category_validation_1.categoryValidationSchema.createCategorySchema), category_controller_1.CategoryControllers.createCategory);
router.put("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), multer_config_1.multerUpload.fields([{ name: "categoryImage" }]), (0, validateImageFileRequest_1.default)(image_validation_1.ImageFilesArrayZodSchema), bodyParser_1.parseBody, (0, validateRequest_1.default)(category_validation_1.categoryValidationSchema.updateCategorySchema), category_controller_1.CategoryControllers.updateACategory);
router.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), category_controller_1.CategoryControllers.deleteACategory);
exports.categoryRoutes = router;
