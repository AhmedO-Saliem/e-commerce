import * as handler from "../../utils/handlers.factory.js";
import ProductModel from "../../../db/models/product.model.js";



export const createProduct = handler.createOne(ProductModel,"product")

export const getProducts = handler.getAll(ProductModel,"product")

export const getProductByID = handler.getOne(ProductModel,"product") 

export const updateProduct = handler.updateOne(ProductModel,"product")

export const deleteProduct = handler.deleteOne(ProductModel,"product");
