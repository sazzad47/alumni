import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    facilities: Array,
    price: {
      type: Number,
    },
    per: {
      type: String,
    },
    currency: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.subscriptionModel || mongoose.model("subscriptionModel", subscriptionSchema);
export default Dataset;
