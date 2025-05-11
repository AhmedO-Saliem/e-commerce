import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: "../../config.env" });

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DB_URI);
  console.log(` MongoDB Connected: ${conn.connection.host}`);
};

export default connectDB;
