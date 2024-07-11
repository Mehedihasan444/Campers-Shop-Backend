import { Router } from 'express';
import { ProductRoutes } from '../modules/product/product.route';
import { WishlistRoutes } from '../modules/wishlist/wishlist.route';

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

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;