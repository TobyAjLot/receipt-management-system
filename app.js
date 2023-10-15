const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const Receipt = require("./models/receipt");
const User = require("./models/user");
const authRoutes = require("./routes/auth");
const receiptRoutes = require("./routes/receipts");
const userRoutes = require("./routes/users");
const verifyToken = require("./middleware/auth");
const { users, receipts } = require("./data/index");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use("/api", authRoutes);
app.use("/api/users", receiptRoutes);
app.use("/api/users", userRoutes);

app.post(
  "/api/upload-receipt",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const { store, product, price, purchaseDate } = req.body;
      const userID = req.user.id;
      purchaseDate = new Date(purchaseDate);

      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).json({ error: "No image file uploaded" });
      }

      const image = req.file.path;

      const receipt = new Receipt({
        userID,
        store,
        product,
        price,
        purchaseDate,
        imagePath: image,
      });
      await receipt.save();

      res.status(201).json(receipt);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Receipt.insertMany(receipts);
  })
  .catch((error) => console.log(`${error} did not connect`));
