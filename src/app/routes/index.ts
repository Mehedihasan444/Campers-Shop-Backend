import { Router } from 'express';
import { ProductRoutes } from '../modules/product/product.route';
import { WishlistRoutes } from '../modules/wishlist/wishlist.route';
import { OrderRoutes } from '../modules/order/order.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/wishlist',
    route: WishlistRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
 

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;