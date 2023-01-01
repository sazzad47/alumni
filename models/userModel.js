import mongoose from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema(
  {
    userId: Number,
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    ssc_batch: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "user",
    },
    root: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

if (!mongoose.models.user) {
  userSchema.plugin(AutoIncrement, {
    id: "userId_counter",
    inc_field: "userId",
  });
}

let Dataset = mongoose.models.user || mongoose.model("user", userSchema);
export default Dataset;
