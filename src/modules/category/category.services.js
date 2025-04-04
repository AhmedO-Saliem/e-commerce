import slugify from "slugify";
import CategoryModel from "./../../../db/models/category.model.js";
class CategoryServices {
  async createCategory({name}) {
    return await CategoryModel.create({
      name,
      slug: slugify(name),
    });
  }
}
export default new CategoryServices();
