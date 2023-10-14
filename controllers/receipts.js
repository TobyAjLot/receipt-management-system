const uploadReceipt = async (req, res) => {
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
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

module.exports = uploadReceipt;
