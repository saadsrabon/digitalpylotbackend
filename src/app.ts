import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import morgan from "morgan";
import routes from "./routes";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
// app.use(morgan("dev"));

app.use("/api", routes);
app.use(errorMiddleware)

export default app;