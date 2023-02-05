import mongoose from "mongoose";

const coverPhotoSchema = new mongoose.Schema(
  {
    file: {
      type: String,
    },
    caption: {
      type: String,
    },
    addToGallery: {
      type: Boolean,
    }
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.coverPhoto || mongoose.model("coverPhoto", coverPhotoSchema);
export default Dataset;
