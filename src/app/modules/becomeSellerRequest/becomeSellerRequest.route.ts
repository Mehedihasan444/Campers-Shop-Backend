import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import { becomeSellerRequestController } from "./becomeSellerRequest.controller";

const router = Router();

router.get(
  "/",
  auth(USER_ROLE.ADMIN),
  becomeSellerRequestController.getAllBecomeSellerRequestsFromDB
);
router.get(
  "/:id",
  auth(USER_ROLE.BUYER),
  becomeSellerRequestController.getSingleBecomeSellerRequestFromDB
);
router.post(
  "/",
  auth(USER_ROLE.BUYER),
  becomeSellerRequestController.createBecomeSellerRequest
);
router.post(
  "/:id/cancel",
  auth(USER_ROLE.BUYER),
  becomeSellerRequestController.cancelBecomeSellerRequest
);
router.put(
  "/:id",
  auth(USER_ROLE.ADMIN),
  becomeSellerRequestController.updateBecomeSellerRequest
);
router.delete(
  "/:id",
  auth(USER_ROLE.ADMIN, USER_ROLE.BUYER),
  becomeSellerRequestController.deleteBecomeSellerRequestFromDB
);

export const becomeSellerRequestRoutes = router;
