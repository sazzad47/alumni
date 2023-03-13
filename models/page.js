import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    shortDescription: {
      type: String,
    },
    keywords: {
      type: String,
    },
    photo: {
      type: String,
    },
    detailedPage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.page || mongoose.model("page", pageSchema);
export default Dataset;
