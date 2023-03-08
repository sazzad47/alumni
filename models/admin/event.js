import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    shortDescription: {
      type: String,
    },
    time: {
      type: Date,
    },
    place: {
      type: String,
    },
    redirectionLink: {
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

let Dataset = mongoose.models.event || mongoose.model("event", eventSchema);
export default Dataset;
