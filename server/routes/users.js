const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const passport = require('passport');
const usersControllers = require('../controllers/users');
const notificationsControllers = require('../controllers/notifications');
const postsControllers = require('../controllers/posts');
const { fileUpload } = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');
require('dotenv').config;
const { CLIENT_URL } = process.env;

const {
  getUserById,
  signup,
  login,
  googleLogin,
  githubLogin,
  fbLogin,
  twitterLogin,
  twitterFailure,
  twitterLogout,
  updateUser,
  followUser,
  unfollowUser,
} = usersControllers;
const { getAllNotifications } = notificationsControllers;
const { getBookmarks } = postsControllers;

router.get('/:userId', getUserById);

router.post(
  '/signup',
  fileUpload.single('avatar'),
  [
    check('name').not().isEmpty(),
    check('email')
      .normalizeEmail() //Test@Test.com => test@test.com
      .isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  signup
);

router.post('/auth/google', googleLogin);

router.post('/auth/github', githubLogin);

router.post('/auth/facebook', fbLogin);

router.get('/auth/twitter/success', twitterLogin);

router.get('/auth/twitter/failed', twitterFailure);

router.get('/auth/twitter/logout', twitterLogout);

router.post('/login', login);

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/auth/twitter/failed',
  })
);

router.use(checkAuth);

router.get('/:userId/notifications', getAllNotifications);

router.get(
  '/:userId/notifications/unread',
  notificationsControllers.getUnreadNotifications
);

router.get('/:userId/bookmarks', getBookmarks);

router.patch('/:userId', fileUpload.single('avatar'), updateUser);

router.put('/follow', followUser);

router.put('/unfollow', unfollowUser);

module.exports = router;
