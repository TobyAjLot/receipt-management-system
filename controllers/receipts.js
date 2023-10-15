const Receipt = require("../models/receipt");

const getReceipts = async (req, res) => {
  try {
    filter = {};

    filter.userID = req.user.id;

    if (req.query.store) {
      filter.store = req.query.store;
    }

    if (req.query.product) {
      filter.product = req.query.product;
    }

    if (req.query.price) {
      filter.price = req.query.price;
    }

    if (req.query.purchaseDate) {
      filter.purchaseDate = req.query.purchaseDate;
    }

    const receipts = await Receipt.find(filter).exec();
    res.json(receipts);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

const deleteReceipt = async (req, res) => {
  try {
    const receiptId = req.params.receiptId;
    const deletedReceipt = await Receipt.findByIdAndDelete(receiptId);

    if (!deletedReceipt) {
      return res.status(404).json({ error: "Receipt not found" });
    }

    res.json({ message: "Receipt deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = { getReceipts, deleteReceipt };
