import slugify from "slugify";
import { ApiFeature } from "../../utils/api.features.js";
import CategoryModel from "./../../../db/models/category.model.js";
class CategoryServices {
   createCategory({name}) {
    return  CategoryModel.create({
      name,
      slug: slugify(name),
    });
    
  }
   getCategories(req) {
    const query = CategoryModel.find({});
    const apiFeature = new ApiFeature(query, req).pagination();
    const categories =  apiFeature.mongooseQuery;
    return categories;
  }
   updateCategory(name, id) {
 
   return  CategoryModel.findOneAndUpdate(
     { _id: id },
     { name, slug: slugify(name) },
     { new: true }
   );
  }
}
export default new CategoryServices();
