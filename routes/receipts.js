const { Router } = require("express");
const { getReceipts, deleteReceipt } = require("../controllers/receipts");
const verifyToken = require("../middleware/auth");

const router = Router();

router.get("/receipts", verifyToken, getReceipts);
router.delete("/receipts/:receiptId", verifyToken, deleteReceipt);

module.exports = router;
