import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      minlength: 3,
      maxlength: 100,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      minlength: 3,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    images: [String],
    coverImage: {
      type: String,
      required: [true, "cover image is required"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
      min: 1,
    },
    subPrice: {
      type: Number,
      default: 1,
    },
    sold: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      required: [true, "quantity is required"],
      default: 1,
    },
    colors: {
      type: [String],
    },
    rateAvg: {
      type: Number,
      default: 0,
      min: [0, "rate must be greater than or equal 0"],
      max: [5, "rate must be less than or equal 5"],
    },
    rateNum: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name",
  });
  next();
});

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
