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
import subCategoryRouter from "./src/modules/subCategory/subCategory.routes.js";
import brandRouter from "./src/modules/brand/brand.routes.js";
import ProductRouter from "./src/modules/product/product.routes.js";
import userRouter from "./src/modules/user/user.routes.js";

app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subcategories", subCategoryRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/users", userRouter);

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
  console.error(`Unhandled Rejection Error: ${err.message}`);
  console.error(err.stack);
  server.close(() => {
    process.exit(1);
  });
});
