import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "category name is required"],
    unique: [true, "category name must be unique"],
    minlength: [3, "too short category name"],
    maxlength: [30, "too long category name"],
    lowercase: [true, "category name must be lowercase"],
  },
  slug: {
    type: String,
    lowercase: true,
  },
  image:String,
}, { timestamps: true , versionKey: false });
const CategoryModel = mongoose.model("Category", categorySchema);

export default CategoryModel;
