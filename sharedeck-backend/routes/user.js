const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  getAllUsers,
  updateConnections,
} = require("../controllers/user");

router.route("/user").get(getAllUsers);

router.param("userId", getUserById);

router.route("/user/:userId").get(getUser);

router.route("/user/follow/:userId").post(updateConnections);

module.exports = router;
