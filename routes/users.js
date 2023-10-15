const { Router } = require("express");
const verifyToken = require("../middleware/auth");
const updateProfile = require("../controllers/users");

const router = Router();

router.put("/update-profile", verifyToken, updateProfile);

module.exports = router;
