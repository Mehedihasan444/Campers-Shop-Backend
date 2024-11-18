import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response, Application, NextFunction } from "express";
import Stripe from "stripe";
import router from "./app/routes";
import config from "./app/config";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import httpStatus from "http-status";
// Create a new instance of Stripe with your secret key
const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: "2024-06-20",
});

const app: Application = express();

//parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "https://campers-shop-frontend.vercel.app",
    ],
    // origin: "https://campers-shop-frontend.vercel.app",
  })
);

// application routes
app.use("/api/v1", router);

// Create payment intent endpoint
app.post(
  "/create-payment-intent",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { products } = req.body;

      // Validate products
      if (!products || !Array.isArray(products)) {
        return res.status(400).send({ error: "Invalid products data" });
      }

      // Calculate the amount
      const amount = products.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      // Validate amount
      if (isNaN(amount) || amount <= 0) {
        return res
          .status(400)
          .send({ error: "Invalid amount calculated from products" });
      }

      // Create PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
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
    } catch (error) {
      next(error);
    }
  }
);

app.get("/", (req: Request, res: Response) => {
  res.send("Campers shop is running");
});
//Testing
app.get("/", (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: "Welcome to the Campers shop API",
  });
});
app.use(globalErrorHandler);

// Not Found
app.use(notFound);
export default app;
