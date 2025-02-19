import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({path:'../../config.env'});


const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.DB_URI)
        console.log(` MongoDB Connected: ${conn.connection.host}`);
    }catch(err){
        console.log(`Error ${err.message}`);
    }
}

export default connectDB;   