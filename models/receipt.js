const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    store: { type: String, required: true },
    product: { type: String, required: true },
    price: { type: Number, required: true },
    purchaseDate: { type: Date, required: true },
    imagePath: { type: String, required: true }, // You can store the path to the image files
  },
  { timestamps: true }
);

module.exports = mongoose.model("Receipt", receiptSchema);
