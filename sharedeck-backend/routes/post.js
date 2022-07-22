const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user");
const {
  getPostById,
  getPost,
  getAllPosts,
  getFeed,
  createPost,
  addReaction,
} = require("../controllers/post");

router.param("userId", getUserById);

router.route("/post").get(getAllPosts);

router.route("/post/:userId").get(getFeed).post(createPost);

router.param("postId", getPostById);

router.route("/post/:postId").get(getPost);

router.route("/post/:postId/:userId").post(addReaction);

module.exports = router;
