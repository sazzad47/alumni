import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
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

let Dataset = mongoose.models.notice || mongoose.model("notice", noticeSchema);
export default Dataset;
