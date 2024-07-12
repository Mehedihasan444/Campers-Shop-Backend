import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response, Application, NextFunction } from "express";
import Stripe from "stripe";
import router from "./app/routes";
import config from "./app/config";
const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: "2024-06-20",
});

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"] }));

// application routes
app.use("/api/v1", router);

// Create payment intent endpoint
app.post("/create-payment-intent", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { products } = req.body;
  
    if (!products || !Array.isArray(products)) {
      return res.status(400).send({ error: "Invalid products data" });
    }
    const amount = products.reduce((total, item) => total + item.price * item.quantity, 0);
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).send({ error: "Invalid amount calculated from products" });
    }
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
});

app.get("/", (req: Request, res: Response) => {
  res.send("Campers shop is running");
});
// app.use(globalErrorHandler);

//Not Found
// app.use(notFound);
export default app;
