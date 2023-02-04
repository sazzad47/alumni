import mongoose from "mongoose";

const socialLinks = new mongoose.Schema(
  {
    links: Array,
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.socialLinks || mongoose.model("socialLinks", socialLinks);
export default Dataset;
