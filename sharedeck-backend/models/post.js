const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: [true, "Please enter the caption"],
    },
    reactions: {
      thumbsUp: [{ type: ObjectId, ref: "User" }],
      hooray: [{ type: ObjectId, ref: "User" }],
      heart: [{ type: ObjectId, ref: "User" }],
      rocket: [{ type: ObjectId, ref: "User" }],
      eyes: [{ type: ObjectId, ref: "User" }],
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
    // createdAt: {
    //   type: Date,
    //   default: Date,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
