import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    code: {
      type: Number,
    },
    expireIn: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.otp || mongoose.model("otp", userSchema);
export default Dataset;
