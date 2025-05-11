import * as handler from "../../utils/handlers.factory.js";
import BrandModel from "../../../db/models/brand.model.js";




export const createBrand = handler.createOne(BrandModel,"brand")

export const getBrands = handler.getAll(BrandModel,"brand")

export const getBrandByID = handler.getOne(BrandModel,"brand")

export const updateBrand = handler.updateOne(BrandModel,"brand")

export const deleteBrand = handler.deleteOne(BrandModel,"brand")
