const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema(
  {
    userID: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "User",
      type: String,
      required: true,
    },
    store: { type: String, required: true },
    product: { type: String, required: true },
    price: { type: Number, required: true },
    purchaseDate: { type: Date, required: true },
    imagePath: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Receipt", receiptSchema);
