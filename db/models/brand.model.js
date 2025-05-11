import mongoose from "mongoose";
const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "brand name is required"],
    unique: [true, "brand name must be unique"],
    minlength: [3, "too short brand name"],
    maxlength: [30, "too long brand name"],
    lowercase: [true, "brand name must be lowercase"],
  },
  slug: {
    type: String,
    lowercase: true,
  },
  image:String,
}, { timestamps: true , versionKey: false });
const BrandModel = mongoose.model("Brand", brandSchema);

export default BrandModel;
