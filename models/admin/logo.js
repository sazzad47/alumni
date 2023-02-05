import mongoose from "mongoose";

const logoSchema = new mongoose.Schema(
  {
    file: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.logo || mongoose.model("logo", logoSchema);
export default Dataset;
