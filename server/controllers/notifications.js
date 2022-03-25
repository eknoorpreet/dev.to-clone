const mongoose = require('mongoose');
const Post = require('../models/post');
const User = require('../models/user');
const Notification = require('../models/notification');
const HttpError = require('../models/http-error');

const getAllNotifications = async (req, res, next) => {
  let { userId } = req.params;
  let notifications;
  try {
    await Notification.updateMany({ receiver: userId }, { read: true });
    notifications = await Notification.find({ receiver: userId })
      .sort({ date: 'desc' })
      .populate('receiver')
      .populate('sender')
      .populate('post')
      .populate('comment', 'body');
  } catch (err) {
    return next(
      new HttpError('Could not fetch notifications, please try again', 500)
    );
  }
  res.json({
    notifications: notifications.map((notification) =>
      notification.toObject({ getters: true })
    ),
  });
};

const getUnreadNotifications = async (req, res, next) => {
  let { userId } = req.params;
  let notifications;
  try {
    notifications = await Notification.find({
      receiver: userId,
      read: false,
    })
      .populate('receiver')
      .populate('sender')
      .populate('post')
      .populate('comment', 'body');
  } catch (err) {
    return next(
      new HttpError('Could not fetch notifications, please try again', 500)
    );
  }
  res.json({
    notifications: notifications.map((notification) =>
      notification.toObject({ getters: true })
    ),
  });
};

const likeNotification = async (senderId, postId, receiverId, next) => {
  //senderId : logged in user
  //receiverId : the user to notify
  try {
    const createdNotification = new Notification({
      notificationType: 'like',
      sender: senderId,
      receiver: receiverId,
      post: postId,
    });
    await createdNotification.save();
    return;
  } catch (err) {
    return new HttpError('Could not create the like notification', 500);
  }
};

//remove the notification when like has been deleted
const removeLikeNotification = async (senderId, postId, receiverId, next) => {
  try {
    await Notification.findOneAndDelete({
      receiver: receiverId,
      notificationType: 'like',
      sender: senderId,
      post: postId,
    });
    return;
  } catch (err) {
    return new HttpError('Could not delete the notification', 500);
  }
};

const commentNotification = async (senderId, postId, commentId, receiverId) => {
  try {
    const createdNotification = new Notification({
      notificationType: 'comment',
      sender: senderId,
      receiver: receiverId,
      post: postId,
      comment: commentId,
    });
    await createdNotification.save();
    return;
  } catch (err) {
    return new HttpError('Could not create the notification', 500);
  }
};

//remove the notification when comment has been deleted
const removeCommentNotification = async (
  senderId,
  postId,
  commentId,
  receiverId
) => {
  try {
    await Notification.findOneAndDelete({
      receiver: receiverId,
      notificationType: 'comment',
      sender: senderId,
      post: postId,
      comment: commentId,
    });
    return;
  } catch (err) {
    return new HttpError('Could not delete the notification', 500);
  }
};

const followNotification = async (senderId, receiverId) => {
  try {
    const createdNotification = new Notification({
      receiver: receiverId,
      notificationType: 'follow',
      sender: senderId,
    });
    await createdNotification.save();
    return;
  } catch (err) {
    return new HttpError('Could not create the notification', 500);
  }
};

const removeFollowNotification = async (senderId, receiverId) => {
  try {
    await Notification.findOneAndDelete({
      receiver: receiverId,
      notificationType: 'follow',
      sender: senderId,
    });
    return;
  } catch (err) {
    return new HttpError('Could not delete the notification', 500);
  }
};

exports.likeNotification = likeNotification;
exports.removeLikeNotification = removeLikeNotification;
exports.commentNotification = commentNotification;
exports.removeCommentNotification = removeCommentNotification;
exports.followNotification = followNotification;
exports.removeFollowNotification = removeFollowNotification;
exports.getAllNotifications = getAllNotifications;
exports.getUnreadNotifications = getUnreadNotifications;
