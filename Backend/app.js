import express from "express";
import cors from 'cors';
import productRoute from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import errorHandler from './middlewares/error.js';
import cookieParser from "cookie-parser";

const app = express();
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api", productRoute);
app.use("/api", userRouter);
app.use(errorHandler);

export default app;