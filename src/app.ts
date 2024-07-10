import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response, Application } from "express";
import router from "./app/routes";
const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"] }));

// application routes
app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.send("Campers shop is running");
});
// app.use(globalErrorHandler);

//Not Found
// app.use(notFound);
export default app;
