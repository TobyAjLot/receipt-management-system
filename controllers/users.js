const updateProfile = async (req, res) => {
  try {
    const userID = req.user.id;
    const { firstName, lastName } = req.body;

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = updateProfile;
