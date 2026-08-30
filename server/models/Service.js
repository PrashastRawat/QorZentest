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
      },
      publicId: {
        type: String,
      },
    },
    categoryLabel: {
      type: String,
      trim: true,
    },
    tagline: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
    },
    iconName: {
      type: String,
    },
    approach: {
      type: String,
    },
    methodology: {
      type: [
        {
          step: String,
          title: String,
          desc: String,
        },
      ],
      default: [],
    },
    techniques: {
      type: [
        {
          title: String,
          desc: String,
        },
      ],
      default: [],
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
