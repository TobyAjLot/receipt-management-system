const express = require("express");
const multer = require("multer");
const User = require("./models/user");
const Receipt = require("./models/receipt");
const authRoutes = require("./routes/auth");
const verifyToken = require("./middleware/auth");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Define the folder to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use("/api", authRoutes);

app.post(
  "/api/upload-receipt",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const { store, product, price, purchaseDate } = req.body;
      const userID = req.user.id;
      const imagePath = req.file.path;

      const receipt = new Receipt({
        userID,
        store,
        product,
        price,
        purchaseDate,
        imagePath,
      });
      await receipt.save();

      res.status(201).json(receipt);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while uploading receipt." });
    }
  }
);

app.get("/api/receipts", async (req, res) => {
  try {
    filter = {};

    if (req.query.store) {
      filter.store = req.query.store;
    }

    if (req.query.product) {
      filter.product = req.query.product;
    }

    if (req.query.purchaseDate) {
      filter.purchaseDate = req.query.purchaseDate;
    }

    const receipts = await Receipt.find(filter).exec();
    res.json(receipts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching receipts." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
