import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
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

let Dataset = mongoose.models.passwordResetOtp || mongoose.model("passwordResetOtp", otpSchema);
export default Dataset;
