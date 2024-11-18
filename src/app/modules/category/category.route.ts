import { Router } from "express";
import { CategoryControllers } from "./category.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { categoryValidationSchema } from "./category.validation";
import { multerUpload } from "../../config/multer.config";
import validateImageFileRequest from "../../middlewares/validateImageFileRequest";
import { parseBody } from "../../middlewares/bodyParser";
import { ImageFilesArrayZodSchema } from "../imageUpload/image.validation";

const router = Router();

router.get("/", CategoryControllers.getAllCategory);
router.get("/:id", CategoryControllers.getACategory);
router.post(
  "/",
  auth(USER_ROLE.ADMIN),
  multerUpload.fields([{ name: "categoryImage" }]),
  validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  validateRequest(categoryValidationSchema.createCategorySchema),
  CategoryControllers.createCategory
);
router.put(
  "/:id",
  validateRequest(categoryValidationSchema.updateCategorySchema),
  CategoryControllers.updateACategory
);
router.delete(
  "/:id",
  auth(USER_ROLE.ADMIN),
  CategoryControllers.deleteACategory
);

export default router;
