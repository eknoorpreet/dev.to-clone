const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const Post = require('../models/post');
const User = require('../models/user');
const Tag = require('../models/tag');

const createTags = async (tags, post) => {
  for (const [i, tag] of tags.entries()) {
    const postTag = await Tag.findOneAndUpdate(
      { name: tag.toLowerCase() },
      { $addToSet: { posts: post._id } },
      { upsert: true, new: true }
    );
    await Post.updateOne(
      { _id: post._id },
      { $addToSet: { tags: postTag._id } }
    );
  }
};

const removeTags = async (tags, post) => {
  for (const [i, tag] of post.tags.entries()) {
    if (!tags.includes(tag.name)) {
      await Tag.updateOne(
        { _id: post.tags[i]._id },
        { $pull: { posts: post._id } }
      );
      await Post.updateOne(
        { _id: post._id },
        { $pull: { tags: post.tags[i]._id } }
      );
    }
  }
};

const updateTags = async (tags, post) => {
  await createTags(tags, post);
  await removeTags(tags, post);
};

const getAllTags = async (req, res, next) => {
  let tags;
  try {
    tags = await Tag.find({});
  } catch (err) {
    return next(new HttpError('Could not fetch tags, please try again', 500));
  }
  res.json({ tags: tags.map((tag) => tag.toObject({ getters: true })) });
};

const getTagByName = async (req, res, next) => {
  const tagName = req.params.name;
  let tag;
  try {
    tag = await Tag.findOne({ name: tagName })
      .populate({
        path: 'posts',
        populate: {
          path: 'tags',
        },
      })
      .populate({
        path: 'posts',
        populate: {
          path: 'author',
        },
      });
  } catch (err) {
    return next(new HttpError('Something went wrong with the server', 500));
  }
  if (!tag) {
    return next(new HttpError('Could not find the provided tag', 404));
  }
  res.json({
    tag: tag.toObject({ getters: true }),
  });
};

const getTagById = async (req, res, next) => {
  const { tagId } = req.params;
  let tag;
  try {
    tag = await Tag.findById(tagId).populate('posts');
  } catch (err) {
    return next(new HttpError('Something went wrong with the server', 500));
  }
  if (!tag) {
    return next(new HttpError('Could not find a tag for the provided ID', 404));
  }
  res.json({
    tag: tag.toObject({ getters: true }),
  });
};

const getTagsByUserId = async (req, res, next) => {
  const { userId } = req.params;
  let tags;
  try {
    tags = await Tag.find({ followers: userId });
  } catch (err) {
    return next(new HttpError('Fetching tags failed. Please try again', 500));
  }
  if (!tags || tags.length === 0) {
    return next(new HttpError('Could not find tags for provided user ID', 404));
  }
  res.json({ tags: tags.map((tag) => tag.toObject({ getters: true })) });
};

const getPostsForHomeTags = async (req, res, next) => {
  let tags;
  try {
    tags = await Tag.find({
      $or: [{ name: 'news' }, { name: 'discuss' }, { name: 'webdev' }],
    })
      .populate('posts')
      .limit(5);
  } catch (err) {
    return next(new HttpError('Fetching tags failed. Please try again', 500));
  }
  if (!tags || tags.length === 0) {
    return next(new HttpError('Could not find tags for home', 404));
  }
  res.json({ tags: tags.map((post) => post.toObject({ getters: true })) });
};

const followTag = async (req, res, next) => {
  const { tagId, userId } = req.body;
  let tag;
  let user;
  try {
    tag = await Tag.findByIdAndUpdate(
      tagId,
      { $addToSet: { followers: userId } },
      { new: true }
    );
    user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { followedTags: tagId } },
      { new: true }
    ).populate('followedTags');
  } catch (err) {
    return next(new HttpError('Could not follow tag', 500));
  }
  res.status(200).json({
    tag: tag.toObject({ getters: true }),
    user: user.toObject({ getters: true }),
  });
};

const unfollowTag = async (req, res, next) => {
  const { tagId, userId } = req.body;
  let tag;
  let user;
  try {
    tag = await Tag.findByIdAndUpdate(
      tagId,
      { $pull: { followers: userId } },
      { new: true }
    );
    user = await User.findByIdAndUpdate(
      userId,
      { $pull: { followedTags: tagId } },
      { new: true }
    ).populate('followedTags');
  } catch (err) {
    return next(new HttpError('Could not unfollow tag', 500));
  }
  res.status(200).json({
    tag: tag.toObject({ getters: true }),
    user: user.toObject({ getters: true }),
  });
};

exports.createTags = createTags;
exports.updateTags = updateTags;
exports.getAllTags = getAllTags;
exports.getTagById = getTagById;
exports.getTagByName = getTagByName;
// exports.getTagsByUserId = getTagsByUserId;
exports.getPostsForHomeTags = getPostsForHomeTags;
exports.followTag = followTag;
exports.unfollowTag = unfollowTag;
