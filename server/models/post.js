const mongoose = require('mongoose');

//schema = blueprint of post (it must contain title, image, etc.)
const Schema = mongoose.Schema;

//model - based on schema - each instance is a new document
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tags: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Tag' }],
  date: { type: Date, default: Date.now },
  titleURL: {
    type: String,
    required: true,
  },
  likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  bookmarks: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  unicorns: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  //1 post => 1 author, hence an object
  //mongoose.Types.ObjectId tells mongoose it's a real mongoose id
  //'ref' establishes connection between postSchema and userSchema
  //The ref option is what tells Mongoose which model to use during population (It will populate post with the author)
  comments: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Comment' }],
  author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});

module.exports = mongoose.model('Post', postSchema); //returns a constructor function
