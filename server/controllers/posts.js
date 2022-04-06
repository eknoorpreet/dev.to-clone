const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const Post = require('../models/post');
const User = require('../models/user');
const Tag = require('../models/tag');
const { uploadToCloudinary } = require('../utils');
const { createTags, updateTags } = require('./tags');
const {
  likeNotification,
  removeLikeNotification,
} = require('../controllers/notifications');

const getAllPosts = async (req, res, next) => {
  let posts;
  try {
    posts = await Post.find()
      .sort({ date: 'desc' })
      .populate('author')
      .populate('tags');
  } catch (err) {
    return next(new HttpError('Could not fetch posts, please try again', 500));
  }
  res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
};

const getPostById = async (req, res, next) => {
  const { postId } = req.params;
  let post;
  try {
    post = await Post.findById(postId)
      .populate('author')
      .populate('comments')
      .populate('tags');
    //findById works directly on the contructor fn
  } catch (err) {
    //stop execution in case of error
    return next(new HttpError('Something went wrong with the server', 500));
  }
  if (!post) {
    return next(new HttpError('Could not find post for the provided ID', 404));
  }
  //post is a special mongoose obj; convert it to normal JS obj using toObject
  //get rid of "_" in "_id" using { getters: true }
  res.json({ post: post.toObject({ getters: true }) });
};

const getPostsByUserId = async (req, res, next) => {
  const { userId } = req.params;
  let posts;
  try {
    posts = await Post.find({ author: userId }).populate('author');
  } catch (err) {
    return next(new HttpError('Fetching posts failed. Please try again', 500));
  }
  if (!posts || posts.length === 0) {
    //forward the error to the middleware and stop execution
    return next(new HttpError('Could not find posts for the user ID', 404));
  }
  res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
};

const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please try again!', 422));
  }
  const imageUrl = await uploadToCloudinary(req.file);
  const { title, body, tags, titleURL, author } = req.body;
  const createdPost = await Post.create({
    title,
    image: imageUrl,
    body,
    titleURL,
    author,
  });
  await createTags(JSON.parse(tags), createdPost);
  let user;
  try {
    user = await User.findById(author); //check if the user ID exists
  } catch (err) {
    return next(new HttpError('Creating post failed, please try again', 500));
  }
  if (!user) {
    return next(new HttpError('Could not find user for provided ID', 404));
  }

  //2 operations to execute:
  //1. save new doc with the new post
  //2. add post id to the corresponding user
  //execute multiple indirectly related operations such that if one fails, we undo all operations: transcations
  //transcations are built on "sessions"
  try {
    const sess = await mongoose.startSession(); //start session
    sess.startTransaction(); //start transaction
    await createdPost.save({ session: sess }); //save new doc with the new post
    user.posts.push(createdPost); //add post id to the corresponding user
    //(BTS: MongoDB grabs just the post id and adds it to the "posts" array in the "user" doc)
    await user.save({ session: sess }); //save the updated user (part of our current session)
    await sess.commitTransaction(); //session commits the transaction
    //only at this point, the changes are saved in DB... anything goes wrong, EVERYTHING is undone by MongoDB
  } catch (err) {
    return next(new HttpError('Creating post failed, please try again', 500));
  }
  res.status(201).json({
    post: createdPost.populate('author').toObject({ getters: true }),
  });
};

const updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please try again!', 422));
  }
  const { postId } = req.params;
  const { body } = req;

  if (req.file) {
    const imageUrl = await uploadToCloudinary(req.file);
    req = { ...req, body: { ...body, image: imageUrl } };
  }

  let post;
  try {
    post = await Post.findById(postId).populate('tags');
  } catch (err) {
    return next(new HttpError('Could not update post, please try again!', 500));
  }

  if (post.author.toString() !== req.body.author) {
    return next(new HttpError('You are not allowed to update the post', 401));
  }
  Object.keys(req.body).map((key) => {
    if (key !== 'tags') post[key] = req.body[key];
  });
  await updateTags(JSON.parse(req.body.tags), post);
  try {
    await post.save();
    res.status(200).json({
      post: post.toObject({ getters: true }),
    });
  } catch (err) {
    return next(new HttpError('Could not update post', 500));
  }
};

const deletePost = async (req, res, next) => {
  const { postId } = req.params;
  let post;
  try {
    //"populate" allows us to refer to another collection and work with it
    //works only if "ref" property is there in the model
    post = await Post.findById(postId).populate('author');
  } catch (err) {
    return next(new HttpError('Could not delete post.', 500));
  }

  if (!post) {
    return next(new HttpError('Could not find post for the provided ID.', 404));
  }
  if (post.author.id !== req.body.author) {
    return next(new HttpError('You are not allowed to delete the post', 401));
  }

  try {
    const sess = await mongoose.startSession(); //start session
    sess.startTransaction(); //start transaction
    await post.remove({ session: sess }); //remove doc; make sure we refer to the current session
    post.author.posts.pull(post); //remove post id from the corresponding user
    await post.author.save({ session: sess }); //save the updated user (part of our current session)
    await sess.commitTransaction(); //session commits the transaction
    //only at this point, the changes are saved in DB... anything goes wrong, EVERYTHING is undone by MongoDB
  } catch (err) {
    return next(new HttpError('Deleting post failed, please try again', 500));
  }
  res.status(201).json({ message: 'Deleted post' });
};

const likePost = async (req, res, next) => {
  const { postId, userId } = req.body;
  let post;
  try {
    post = await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { likes: userId } },
      { new: true }
    );
    const authorId = post.author.toString();
    if (authorId !== userId) {
      await likeNotification(userId, postId, authorId, next);
    }
  } catch (err) {
    return next(new HttpError('Like failed!', 500));
  }
  res.status(200).json({
    post: post.toObject({ getters: true }),
  });
};

const unlikePost = async (req, res, next) => {
  const { postId, userId } = req.body;
  let post;
  try {
    post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
      { new: true }
    );
    const authorId = post.author.toString();

    if (authorId !== userId) {
      await removeLikeNotification(userId, postId, authorId, next);
    }
  } catch (err) {
    return next(new HttpError('Unlike failed!', 500));
  }
  res.status(200).json({
    post: post.toObject({ getters: true }),
  });
};

const bookmarkPost = async (req, res, next) => {
  const { postId, userId } = req.body;
  let post;
  try {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $addToSet: { bookmarks: userId },
      },
      { new: true }
    );
  } catch (err) {
    return next(new HttpError('Could not bookmark post', 500));
  }
  res.status(200).json({
    post: post.toObject({ getters: true }),
  });
};

const unbookmarkPost = async (req, res, next) => {
  const { postId, userId } = req.body;
  let post;
  try {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { bookmarks: userId },
      },
      { new: true }
    );
  } catch (err) {
    return next(new HttpError('Could not unbookmark post', 500));
  }
  res.status(200).json({
    post: post.toObject({ getters: true }),
  });
};

const unicornPost = async (req, res, next) => {
  const { postId, userId } = req.body;
  let post;
  try {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $addToSet: { unicorns: userId },
      },
      { new: true }
    );
  } catch (err) {
    return next(new HttpError('Could not unicorn post', 500));
  }
  res.status(200).json({
    post: post.toObject({ getters: true }),
  });
};

const ununicornPost = async (req, res, next) => {
  const { postId, userId } = req.body;
  let post;
  try {
    post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { unicorns: userId },
      },
      { new: true }
    );
  } catch (err) {
    return next(new HttpError('Could not ununicorn post', 500));
  }
  res.status(200).json({
    post: post.toObject({ getters: true }),
  });
};

const getSearchResults = async (req, res, next) => {
  const query = {};
  if (req.query.search) {
    const options = '$options';
    query.title = { $regex: req.query.search, [options]: 'i' };
    let posts;
    try {
      posts = await Post.find(query).populate('author').populate('tags');
    } catch (err) {
      return next(new HttpError('Search failed, please try again', 400));
    }
    res
      .status(201)
      .json({ posts: posts.map((post) => post.toObject({ getters: true })) });
  }
};

const getBookmarks = async (req, res, next) => {
  const { userId } = req.params;
  let posts;
  try {
    posts = await Post.find({ bookmarks: userId })
      .populate('tags')
      .populate('author');
  } catch (err) {
    return next(
      new HttpError('Fetching posts failed. Please try again later', 500)
    );
  }
  res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
};

exports.getAllPosts = getAllPosts;
exports.getPostById = getPostById;
exports.getPostsByUserId = getPostsByUserId;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
exports.likePost = likePost;
exports.unlikePost = unlikePost;
exports.bookmarkPost = bookmarkPost;
exports.unbookmarkPost = unbookmarkPost;
exports.unicornPost = unicornPost;
exports.ununicornPost = ununicornPost;
exports.getBookmarks = getBookmarks;
exports.getSearchResults = getSearchResults;
