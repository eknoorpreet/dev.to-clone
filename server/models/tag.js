const mongoose = require("mongoose");

//schema = blueprint of post (it must contain title, image, etc.)
const Schema = mongoose.Schema;

//model - based on schema - each instance is a new document
const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
  posts: [{ type: mongoose.Types.ObjectId, required: true, ref: "Post" }],
  followers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Tag", tagSchema); //returns a constructor function
