import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
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

let Dataset = mongoose.models.news || mongoose.model("news", newsSchema);
export default Dataset;
