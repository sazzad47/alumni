import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
    },
    name: {
      type: String,
    },
    profession: {
      type: String,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.reviews || mongoose.model("reviews", reviewsSchema);
export default Dataset;
