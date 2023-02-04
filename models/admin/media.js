import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    file: {
      type: String,
    },
    caption: {
      type: String,
    },
    addToHome: {
      type: Boolean,
    }
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.media || mongoose.model("media", mediaSchema);
export default Dataset;
