import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { StoreControllers } from "./store.controller";
import { storeValidationSchema } from "./store.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = express.Router();
router.get("/",StoreControllers.getStoresFromDB);
router.get("/:id",StoreControllers.getStoreFromDB);
router.post("/",auth(USER_ROLE.ADMIN,), validateRequest(storeValidationSchema.createStoreValidationSchema),StoreControllers.createStore);
router.put("/:id",auth(USER_ROLE.SELLER),validateRequest(storeValidationSchema.updateStoreValidationSchema),StoreControllers.updateStore);
router.delete("/:id",auth(USER_ROLE.ADMIN,),StoreControllers.deleteStoreFromDB);

export const storeRoutes = router;
