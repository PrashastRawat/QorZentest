import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      url: {
        type: String,
        required: [true, "Image is required"],
      },
      publicId: {
        type: String,
        required: true,
      },
    },  
    features: {
      type: [String],
      default: [],
    },
    whyChooseUs: {
      type: String,
      trim: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    priceStartingFrom: {
      type: Number,
      required: [true, "Starting price is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;
