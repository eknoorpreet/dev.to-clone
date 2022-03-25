const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, //'unique' adds index => fastens the querying prcoess
  password: { type: String, required: true, minLength: 6 },
  avatar: { type: String },
  bio: { type: String },
  links: { type: String },
  joinDate: { type: Date, default: Date.now },
  location: { type: String },
  work: { type: String },
  skills: { type: String },
  posts: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
  comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
  following: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  followedTags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
  bookmarks: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
