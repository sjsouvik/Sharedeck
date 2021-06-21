const Post = require("../models/post");

exports.getPostById = async (req, res, next, id) => {
  try {
    const post = await Post.findById(id).populate("user");

    if (!post) {
      return res.json({ message: "NOT Found the post" });
    }

    req.post = post;
    next();
  } catch (error) {
    res.status(400).json({
      message: "Error occured",
      errorMessage: error.message,
    });
  }
};

exports.getPost = (req, res) => {
  let { post } = req;
  post.__v = undefined;
  res.json({ post });
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user");
    res.json({ posts });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get the posts",
      errorMessage: error.message,
    });
  }
};

exports.getFeed = async (req, res) => {
  try {
    const posts = await Post.find({
      user: { $in: [...req.user.following, req.user._id] },
    }).populate("user");

    res.json({ posts });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get the posts for the user",
      errorMessage: error.message,
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    let newPost = new Post(req.body);
    newPost.user = req.user._id;
    const savedPost = await newPost.save();
    res.json({ savedPost });
  } catch (error) {
    res.status(500).json({
      message: "Unable to save the post",
      errorMessage: error.message,
    });
  }
};

exports.addReaction = async (req, res) => {
  try {
    const { reaction } = req.body;
    const userReacted = req.post.reactions[reaction].find((userId) =>
      userId.equals(req.user._id)
    );

    if (userReacted) {
      switch (reaction) {
        case "thumbsUp":
          await Post.updateOne(
            { _id: req.post._id },
            { $pull: { "reactions.thumbsUp": req.user._id } }
          );
          break;

        case "hooray":
          await Post.updateOne(
            { _id: req.post._id },
            { $pull: { "reactions.hooray": req.user._id } }
          );
          break;

        case "heart":
          await Post.updateOne(
            { _id: req.post._id },
            { $pull: { "reactions.heart": req.user._id } }
          );
          break;

        case "rocket":
          await Post.updateOne(
            { _id: req.post._id },
            { $pull: { "reactions.rocket": req.user._id } }
          );
          break;

        case "eyes":
          await Post.updateOne(
            { _id: req.post._id },
            { $pull: { "reactions.eyes": req.user._id } }
          );
      }

      // await Post.updateOne(
      //   { _id: req.post._id },
      //   { $pull: { "reactions.thumbsUp": req.user._id } }
      // );
    } else {
      switch (reaction) {
        case "thumbsUp":
          await Post.updateOne(
            { _id: req.post._id },
            { $push: { "reactions.thumbsUp": req.user._id } }
          );
          break;

        case "hooray":
          await Post.updateOne(
            { _id: req.post._id },
            { $push: { "reactions.hooray": req.user._id } }
          );
          break;

        case "heart":
          await Post.updateOne(
            { _id: req.post._id },
            { $push: { "reactions.heart": req.user._id } }
          );
          break;

        case "rocket":
          await Post.updateOne(
            { _id: req.post._id },
            { $push: { "reactions.rocket": req.user._id } }
          );
          break;

        case "eyes":
          await Post.updateOne(
            { _id: req.post._id },
            { $push: { "reactions.eyes": req.user._id } }
          );
      }

      // await Post.updateOne(
      //   { _id: req.post._id },
      //   { $push: { "reactions['reaction']": req.user._id } }
      // );
    }

    res.json({ message: "Successfully updated the reactions for the post" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error occured", errorMessage: error.message });
  }
};
