"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_route_1 = require("../modules/product/product.route");
const wishlist_route_1 = require("../modules/wishlist/wishlist.route");
const order_route_1 = require("../modules/order/order.route");
const review_route_1 = require("../modules/review/review.route");
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/User/user.route");
const store_route_1 = require("../modules/shop/store.route");
const category_route_1 = require("../modules/category/category.route");
const becomeSellerRequest_route_1 = require("../modules/becomeSellerRequest/becomeSellerRequest.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/products",
        route: product_route_1.ProductRoutes,
    },
    {
        path: "/wishlist",
        route: wishlist_route_1.WishlistRoutes,
    },
    {
        path: "/order",
        route: order_route_1.OrderRoutes,
    },
    {
        path: "/reviews",
        route: review_route_1.ReviewRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/store",
        route: store_route_1.storeRoutes,
    },
    {
        path: "/category",
        route: category_route_1.categoryRoutes,
    },
    {
        path: "/become-a-seller-requests",
        route: becomeSellerRequest_route_1.becomeSellerRequestRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
