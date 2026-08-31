import mongoose from "mongoose";

// Admin-managed category list for the public Course/Training browse pages.
// `name` must match the free-text `category` string stored on Course/Training
// documents exactly, so the tab actually filters real data. `order` drives
// nav-bar position (ascending), `trending` drives the "Trending" badge shown
// on that category's tab + cards on the public pages.
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
    },
    label: {
      type: String,
      trim: true, // optional shorter display label; falls back to `name` if blank
    },
    scope: {
      type: String,
      enum: ["course", "training"],
      required: [true, "Scope is required"],
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    trending: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// A category name must be unique within its own scope (course vs training
// are managed independently, so the same name can exist in both).
categorySchema.index({ scope: 1, name: 1 }, { unique: true });

export default mongoose.model("Category", categorySchema);
