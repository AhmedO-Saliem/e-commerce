import dotenv from "dotenv";
import express from "express";
import { ApiError } from "./src/utils/api.error.js";

dotenv.config({ path: "./config/config.env" });

const app = express();

// Middleware setup
app.use(express.json());

// Connect to database
import connectDB from "./db/db.js";
connectDB();

// Mount Routes
import categoryRouter from "./src/modules/category/category.routes.js";
app.use("/api/v1/categories", categoryRouter);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});

// Global error handling middleware for express
import { globalErrorHandler } from "./src/middleware/error.middleware.js";
app.use(globalErrorHandler);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Error ${err}`);
    server.close(() => {
        process.exit(1);
    });
});
