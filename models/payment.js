import mongoose from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);


const paymentSchema = new mongoose.Schema(
  {
    paymentId: Number,
    tran_id: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
    },
    amount: {
        type: Number,
    },
    currency: {
        type: String,
    },
    membership: {
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

if (!mongoose.models.payment) {
  paymentSchema.plugin(AutoIncrement, {
    id: "paymentId_counter",
    inc_field: "paymentId",
  });
}

let Dataset = mongoose.models.payment || mongoose.model("payment", paymentSchema);
export default Dataset;
