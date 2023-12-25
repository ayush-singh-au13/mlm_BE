const { model, Schema } = require("mongoose");

const transactionSchema = new Schema(
  {
    email: { type: String, required: true },
    referralId: { type: String, required: true },
    memberId: { type: String },
    status: { type: Boolean, enum:["created","failed","success"]},
    transactionId : { type: String},
    raw_data_hex:{ type: String},
    signature:{ type: Array},
    amount:{type: Number},
    toAddress:{type: String},
    fromAddress:{type: String},

  },
  { timestamps: true }
);

module.exports = model("transactions", transactionSchema);
