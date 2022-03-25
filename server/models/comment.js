const mongoose = require("mongoose");

//schema = blueprint of post (it must contain title, image, etc.)
const Schema = mongoose.Schema;

//model - based on schema - each instance is a new document
const commentSchema = new Schema({
  body: { type: String, required: true },
  date: { type: Date, default: Date.now },
  parentPost: { type: mongoose.Types.ObjectId, required: true, ref: "Post" },
  parentId: { type: mongoose.Types.ObjectId, ref: "Comment", default: null },
  author: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  likes: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
});

module.exports = mongoose.model("Comment", commentSchema); //returns a constructor function
