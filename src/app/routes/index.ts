import { Router } from "express";
import { ProductRoutes } from "../modules/product/product.route";
import { WishlistRoutes } from "../modules/wishlist/wishlist.route";
import { OrderRoutes } from "../modules/order/order.route";
import { ReviewRoutes } from "../modules/review/review.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/User/user.route";
import { StoreRoutes } from "../modules/store/store.route";
import { categoryRoutes } from "../modules/category/category.route";
import { becomeSellerRequestRoutes } from "../modules/becomeSellerRequest/becomeSellerRequest.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/wishlist",
    route: WishlistRoutes,
  },
  {
    path: "/order",
    route: OrderRoutes,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/store",
    route: StoreRoutes,
  },
  {
    path: "/category",
    route: categoryRoutes,
  },
  {
    path: "/become-a-seller-requests",
    route: becomeSellerRequestRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
