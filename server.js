import express from 'express';
import dotenv from 'dotenv';
const app = express();
dotenv.config({path:'./config.env'});

// middleware
app.use(express.json());    

// connect to mongodb
import connectDB from './src/config/db.js';
connectDB();

// routes
import categoryRoutes from './src/routes/category.routes.js';
app.use('/api/v1/categories',categoryRoutes);
app.all('*',(req,res,next)=>{
    const err = new Error(`not found - ${req.originalUrl}`);
    next(err.message);
})
app.use((err,req,res,next)=>{
    res.status(500).json({error:err});
})




const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
}); 