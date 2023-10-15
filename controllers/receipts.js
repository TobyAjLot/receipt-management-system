const Receipt = require("../models/receipt");

const getReceipts = async (req, res) => {
  try {
    filter = {};

    filter.userID = req.user.id;

    if (req.query.store) {
      const store = req.query.store;
      filter.store = new RegExp(store, "i");
    }

    if (req.query.product) {
      const product = req.query.product;
      filter.product = new RegExp(product, "i");
    }

    if (req.query.price) {
      const price = req.query.price;
      filter.price = new RegExp(price, "i");
    }

    if (req.query.purchaseDate) {
      const purchaseDate = req.query.purchaseDate;
      filter.purchaseDate = new RegExp(purchaseDate, "i");
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
