import mongoose, { Types } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // rating: {
    //   type: Number,
    //   required: true,
    // },
    size: {
       type: String,
       required: true,
    },
    weight: {
       type: String,
       required: true,
    },
    category: {
      type: Types.ObjectId,
      ref:"Category",
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
