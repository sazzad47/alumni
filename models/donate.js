import mongoose from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);


const donationSchema = new mongoose.Schema(
  {
    donationId: Number,
    tran_id: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    amount: {
        type: Number,
    },
    currency: {
        type: String,
    },
    paid: {
        type: Boolean,
        default: false,
    }
  },
  {
    timestamps: true,
  }
);

if (!mongoose.models.donation) {
  donationSchema.plugin(AutoIncrement, {
    id: "donationId_counter",
    inc_field: "donationId",
  });
}

let Dataset = mongoose.models.donation || mongoose.model("donation", donationSchema);
export default Dataset;
