import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../../config.env" });

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DB_URI);
  console.log(` MongoDB Connected: ${conn.connection.host}`);
};

export default connectDB;
