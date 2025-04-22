import {mongoose , Types} from "mongoose";

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minlength: [3, "too short sub-category name"],
    maxlength: [30, "too long sub-category name"],
    required: [true, "sub-category name is required"],
    unique: [true, "sub-category name must be unique"],
    lowercase: [true, "sub-category name must be lowercase"],
  },
  slug: {
    type: String,
  },
  category: {
    // type: mongoose.Schema.Types.ObjectId,
    type: Types.ObjectId,
    ref: "Category",
    required: [true, "subcategory must belong to a parent category"],
  },
}, { timestamps: true, versionKey: false });

const SubCategoryModel = mongoose.model("SubCategory", subCategorySchema);

export default SubCategoryModel;