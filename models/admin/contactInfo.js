import mongoose from "mongoose";

const contactInfo = new mongoose.Schema(
  {
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.contactInfo || mongoose.model("contactInfo", contactInfo);
export default Dataset;
