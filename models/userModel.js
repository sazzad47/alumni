import mongoose from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

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
    phone: {
      type: String,
    },
    password: {
      type: String,
    },
    placeOfBirth: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    currentLocation: {
      type: String,
    },
    education: {
      type: Array,
    },
    profession: {
      type: Array,
    },
    expertise: {
      type: String,
    },
    biography: {
      type: String,
    },
    socialLinks: {
      type: Array,
    },
    status: {
      type: String,
      default: "pending",
    },
    membership: {
      type: String,
      default: "none",
    },
    expireIn: {
      type: Date,
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
    deleted: {
      type: Boolean,
      default: false,
    },
    uploadedByAdmin: {
      type: Boolean,
      default: false,
    },
    cloud: {
      type: Array,
    },
    payment: [{ type: Schema.Types.ObjectId, ref: "payment" }],
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
