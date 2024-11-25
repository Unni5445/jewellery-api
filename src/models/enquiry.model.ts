import mongoose, { Types } from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    product: {
      type: Types.ObjectId,
      ref: "Project",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Enquiry = mongoose.model("Enquiry",enquirySchema)

export default Enquiry;