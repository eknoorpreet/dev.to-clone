const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const Comment = require('../models/comment');
const User = require('../models/user');
const Post = require('../models/post');
const {
  commentNotification,
  removeCommentNotification,
} = require('../controllers/notifications');

const getCommentsByPostId = async (req, res, next) => {
  const { postId } = req.params;
  let comments;
  try {
    comments = await Comment.find({ parentPost: postId }).populate('author');
  } catch (err) {
    return next(
      new HttpError('Fetching comments failed. Please try again', 500)
    );
  }
  if (!comments || comments.length === 0) {
    return res.status(200).json({ message: 'No comments for the post' });
  }
  res.json({
    comments: comments.map((comment) => comment.toObject({ getters: true })),
  });
};

const createComment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422)
    );
  }
  const { parentPost, body, author, date, parentId, userId } = req.body;
  let post;
  try {
    post = await Post.findById(parentPost); //check if the post ID exists
  } catch (err) {
    return next(
      new HttpError('Creating comment failed, please try again', 500)
    );
  }

  if (!post) {
    return next(new HttpError('Could not find post for provided ID', 404));
  }

  let user;
  try {
    user = await User.findById(author); //check if the user ID exists
  } catch (err) {
    return next(
      new HttpError('Creating comment failed, please try again', 500)
    );
  }

  if (!user) {
    return next(new HttpError('Could not find user for provided ID', 404));
  }

  let createdComment = new Comment({
    parentId,
    parentPost,
    body,
    author,
    date,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    createdComment = await Comment.populate(createdComment, { path: 'author' });
    post.comments.push(createdComment);
    user.comments.push(createdComment);
    createdComment.likes.push(author);
    await createdComment.save({ session: sess });
    await post.save({ session: sess });
    await user.save({ session: sess });
    await sess.commitTransaction();
    if (post.author.toString() !== userId) {
      await commentNotification(
        userId, //sender
        post.id,
        createdComment.id,
        post.author.toString() //author => receiver
      );
    }
  } catch (err) {
    return next(
      new HttpError('Creating comment failed, please try again', 500)
    );
  }
  res.status(201).json({ comment: createdComment.toObject({ getters: true }) });
};

const updateComment = async (req, res, next) => {
  const { commentId } = req.params;

  let comment;
  try {
    comment = await Comment.findById(commentId).populate('author');
  } catch (err) {
    return next(new HttpError('Could not update post, please try again!', 500));
  }

  if (comment.author.id !== req.body.author) {
    return next(
      new HttpError('You are not allowed to update the comment!', 401)
    );
  }

  comment.body = req.body.body;

  try {
    await comment.save();
    res.status(200).json({
      comment: comment.toObject({ getters: true }),
    });
  } catch (err) {
    return next(new HttpError('Could not update comment', 500));
  }
};

const deleteComment = async (req, res, next) => {
  const { commentId } = req.params;
  let comment;
  try {
    comment = await Comment.findById(commentId)
      .populate('author')
      .populate('parentPost');
  } catch (err) {
    return next(new HttpError('Could not delete comment.', 500));
  }
  if (!comment) {
    return next(
      new HttpError('Could not find comment for the provided ID.', 404)
    );
  }
  if (comment.author.id !== req.body.author) {
    return next(
      new HttpError('You are not allowed to delete the comment', 401)
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await comment.remove({ session: sess });
    comment.author.comments.pull(comment);
    comment.parentPost.comments.pull(comment);
    await comment.author.save({ session: sess });
    await comment.parentPost.save({ session: sess });
    await removeCommentNotification(
      comment.author.id,
      comment.parentPost.id,
      commentId,
      comment.parentPost.author
    );
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError('Deleting comment failed, please try again', 500)
    );
    return next(error);
  }
  res.status(201).json({ message: 'Deleted comment' });
};

const likeComment = async (req, res, next) => {
  const { commentId, userId } = req.body;
  let comment;
  try {
    comment = await Comment.findByIdAndUpdate(
      commentId,
      { $addToSet: { likes: userId } },
      { new: true }
    ).populate('author');
  } catch (err) {
    return next(new HttpError('Could not like comment', 500));
  }
  res.status(200).json({
    comment: comment.toObject({ getters: true }),
  });
};

const unlikeComment = async (req, res, next) => {
  const { commentId, userId } = req.body;
  let comment;
  try {
    comment = await Comment.findByIdAndUpdate(
      commentId,
      { $pull: { likes: userId } },
      { new: true }
    ).populate('author');
  } catch (err) {
    return next(new HttpError('Could not unlike comment', 500));
  }
  res.status(200).json({
    comment: comment.toObject({ getters: true }),
  });
};

exports.getCommentsByPostId = getCommentsByPostId;
exports.createComment = createComment;
exports.updateComment = updateComment;
exports.deleteComment = deleteComment;
exports.likeComment = likeComment;
exports.unlikeComment = unlikeComment;
