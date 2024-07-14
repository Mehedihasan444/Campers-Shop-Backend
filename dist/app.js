"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const stripe_1 = __importDefault(require("stripe"));
const routes_1 = __importDefault(require("./app/routes"));
const config_1 = __importDefault(require("./app/config"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const stripe = new stripe_1.default(config_1.default.stripe_secret_key, {
    apiVersion: "2024-06-20",
});
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: ["http://localhost:5173", "https://campers-shop-frontend.vercel.app"] }));
// application routes
app.use("/api/v1", routes_1.default);
// Create payment intent endpoint
app.post("/create-payment-intent", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products } = req.body;
        // Validate products
        if (!products || !Array.isArray(products)) {
            return res.status(400).send({ error: "Invalid products data" });
        }
        // Calculate the amount
        const amount = products.reduce((total, item) => total + item.price * item.quantity, 0);
        // Validate amount
        if (isNaN(amount) || amount <= 0) {
            return res.status(400).send({ error: "Invalid amount calculated from products" });
        }
        // Create PaymentIntent
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // amount in cents
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
            stripePaymentId: paymentIntent.id, // Include the PaymentIntent ID in the response
        });
    }
    catch (error) {
        next(error);
    }
}));
app.get("/", (req, res) => {
    res.send("Campers shop is running");
});
app.use(globalErrorHandler_1.default);
// Not Found
app.use(notFound_1.default);
exports.default = app;
