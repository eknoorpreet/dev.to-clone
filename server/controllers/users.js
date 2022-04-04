const { validationResult } = require('express-validator');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();
const { GOOGLE_API_KEY, JWT_KEY, GH_CLIENT_ID, GH_CLIENT_SECRET } = process.env;
const client = new OAuth2Client(GOOGLE_API_KEY);
const HttpError = require('../models/http-error');
const User = require('../models/user');
const Post = require('../models/post');
const { fileUpload } = require('../middleware/file-upload');
const { createJWTtoken } = require('../utils');
const DEFAULT_AVATAR =
  'https://res.cloudinary.com/drkvr9wta/image/upload/v1647701003/undraw_profile_pic_ic5t_ncxyyo.png';

const {
  followNotification,
  removeFollowNotification,
} = require('../controllers/notifications');
const { uploadToCloudinary } = require('../utils');

const getUserById = async (req, res, next) => {
  let { userId } = req.params;
  let user;
  try {
    user = await User.findById(userId, '-password')
      .populate({
        path: 'posts',
        populate: {
          path: 'tags',
        },
      })
      .populate('followedTags');
    //exclude password, i.e. return only name and email
  } catch (err) {
    return next(new HttpError('Getting user failed, please try again!', 500));
  }
  res.status(200).json({
    user: user.toObject({ getters: true }),
  });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data', 422)
    );
  }
  const { name, email, password } = req.body;

  //check if there is an existing user
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError('Signing up failed, please try again!', 500));
  }

  //user already exists => tell him/her to login
  if (existingUser) {
    return next(
      new HttpError('User already exists, please login instead', 422)
    );
  }

  //hash the password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12); //12 - number of salting rounds (can't be reverse-engineered)
  } catch (err) {
    return next(new HttpError('Could not create user, please try again', 500));
  }

  const imageUrl = await uploadToCloudinary(req.file);

  //create a new user with hashed password
  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    avatar: imageUrl,
  });

  //save the user
  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError('Signup failed, please try again', 500));
  }

  //generate a token
  let token;
  try {
    token = jwt.sign(
      //takes payload (the data you want to encode)
      { userId: createdUser.id, email: createdUser.email },
      JWT_KEY,
      { expiresIn: '1h' } //token expires in 1 hr
    );
  } catch (err) {
    return next(new HttpError('Signup failed, please try again', 500));
  }

  res.status(201).json({
    user: {
      name: createdUser.name,
      userId: createdUser.id,
      email: createdUser.email,
      token,
      bio: createdUser.bio,
      avatar: createdUser.avatar,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email }).populate('followedTags');
  } catch (err) {
    return next(new HttpError('Logging in failed, please try again.', 500));
  }

  //user doesn't exist (invalid credentials)
  if (!existingUser) {
    return next(new HttpError('Invalid credentials, login failed!', 403));
  }

  //validate password
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(
      new HttpError('Login failed, please check your credentials!', 500)
    );
  }

  //invalid password
  if (!isValidPassword) {
    return next(new HttpError('Invalid credentials, login failed!', 401));
  }

  //everything ok => generate token
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(new HttpError('Login failed, please try again', 500));
  }
  res.json({
    user: {
      name: existingUser.name,
      userId: existingUser.id,
      email: existingUser.email,
      token,
      bio: existingUser.bio,
      avatar: existingUser.avatar,
      tags: existingUser.followedTags,
    },
  });
};

const googleLogin = async (req, res, next) => {
  const { tokenId } = req.body;
  //does the token already exist in the user db?
  //verify if the token sent by client and the one being used in backend is the same
  const response = await client.verifyIdToken({
    idToken: tokenId,
    audience: GOOGLE_API_KEY,
  });
  const { name, email, picture, email_verified, sub } = response.getPayload();
  let existingUser;
  let user;
  let emailVerified;
  if (email_verified) {
    try {
      //Has the user signed in with google before
      emailVerified = true;

      existingUser = await User.findOne({ email }, '-password').populate(
        'followedTags'
      );
      user = existingUser;
    } catch (err) {
      return next(new HttpError('Signing up failed, please try again!', 500));
    }
  }

  if (!existingUser) {
    //create a new user with the name, email from the payload
    //and fictional payload
    emailVerified = false;

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(email + name + email, 12); //12 - number of salting rounds (can't be reverse-engineered)
    } catch (err) {
      return next(
        new HttpError('Could not create user, please try again', 500)
      );
    }

    user = new User({
      name,
      email,
      password: hashedPassword,
      avatar: picture || DEFAULT_AVATAR,
    });
    user = user.populate('followedTags');
    try {
      await user.save();
    } catch (err) {
      return next(new HttpError('Signup failed, please try again', 500));
    }
  }

  let token;
  try {
    token = jwt.sign(
      //takes payload (the data you want to encode)
      { userId: user.id, email: user.email },
      JWT_KEY,
      { expiresIn: '1h' } //token expires in 1 hr
    );
  } catch (err) {
    return next(new HttpError('Signup failed, please try again', 500));
  }

  res.status(201).json({
    user: {
      name: user.name,
      userId: user.id,
      email: user.email,
      token,
      bio: user.bio,
      avatar: user.avatar,
      tags: user.followedTags,
    },
  });
};

const githubLogin = async (req, res, next) => {
  const { code } = req.body;
  if (!code) {
    return next(
      new HttpError('Signing up with GitHub failed, please try again!', 500)
    );
  }
  const response = await axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${GH_CLIENT_ID}&client_secret=${GH_CLIENT_SECRET}&code=${code}`,
    headers: {
      accept: 'application/json',
    },
  });
  const { access_token } = response.data;
  const { data } = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      Authorization: `token ${access_token}`,
    },
  });
  const { name, email, avatar_url } = data;
  let existingUser;
  let user;
  try {
    existingUser = await User.findOne({ email }, '-password').populate(
      'followedTags'
    );
    user = existingUser;
  } catch (err) {
    return next(new HttpError('Signing up failed, please try again!', 500));
  }

  if (!existingUser) {
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(email + name + email, 12); //12 - number of salting rounds (can't be reverse-engineered)
    } catch (err) {
      return next(
        new HttpError('Could not create user, please try again', 500)
      );
    }
    user = new User({
      name,
      email,
      password: hashedPassword,
      avatar: avatar_url || DEFAULT_AVATAR,
    });
    user = user.populate('followedTags');

    try {
      await user.save();
    } catch (err) {
      return next(new HttpError('Signup failed, please try again', 500));
    }
  }
  let token = createJWTtoken(user.id, user.email);
  res.status(201).json({
    user: {
      name: user.name,
      userId: user.id,
      email: user.email,
      token,
      bio: user.bio,
      avatar: user.avatar,
      tags: user.followedTags,
    },
  });
};

const fbLogin = async (req, res, next) => {
  const { accessToken, userId } = req.body;

  let urlGraphFb = `https://graph.facebook.com/v2.11/${userId}/?fields=id,name,email&access_token=${accessToken}`;

  const response = await axios({
    method: 'post',
    url: urlGraphFb,
    headers: {
      accept: 'application/json',
    },
  });
  const { name, email } = response.data;
  let existingUser;
  let user;
  try {
    existingUser = await User.findOne({ email }, '-password').populate(
      'followedTags'
    );
    user = existingUser;
  } catch (err) {
    return next(new HttpError('Signing up failed, please try again!', 500));
  }

  if (!existingUser) {
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(email + name + email, 12); //12 - number of salting rounds (can't be reverse-engineered)
    } catch (err) {
      return next(
        new HttpError('Could not create user, please try again', 500)
      );
    }
    user = new User({
      name,
      email,
      password: hashedPassword,
      avatar: DEFAULT_AVATAR,
    });
    user = user.populate('followedTags');

    try {
      await user.save();
    } catch (err) {
      return next(new HttpError('Signup failed, please try again', 500));
    }
  }

  const token = createJWTtoken(user.id, user.email);
  res.status(201).json({
    user: {
      name: user.name,
      userId: user.id,
      email: user.email,
      token,
      bio: user.bio,
      avatar: user.avatar,
      tags: user.followedTags,
    },
  });
};

// when login is successful, retrieve user info
const twitterLogin = (req, res) => {
  if (req.user) {
    const {
      name,
      id: userId,
      email,
      bio,
      avatar,
      followedTags: tags,
    } = req.user;
    const token = createJWTtoken(req.user.id, req.user.email);
    res.status(201).json({
      user: {
        name,
        userId,
        email,
        bio,
        avatar,
        token,
        tags,
      },
    });
  }
};

// when login failed, send failed msg
const twitterFailure = (req, res) => {
  res.status(401).json({
    success: false,
    message: 'user failed to authenticate.',
  });
};

const twitterLogout = (req, res) => {
  if (req.user) {
    req.logout();
    res.json({ message: 'Logout successful' });
  }
};

const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const { body } = req;

  if (req.file) {
    const imageUrl = await uploadToCloudinary(req.file);
    req = { ...req, body: { ...body, avatar: imageUrl } };
  }

  let user;
  try {
    user = User.findByIdAndUpdate(
      userId,
      req.body,
      { new: true },
      (err, data) => {
        if (err) {
          return next(new HttpError('Could not find user to update', 500));
        } else {
          const { name, id: userId, bio, email, avatar } = data;
          res.status(200).json({ user: { name, userId, bio, email, avatar } });
        }
      }
    );
  } catch (err) {
    return next(new HttpError('Could not update user', 500));
  }
};

const followUser = async (req, res, next) => {
  const { userId, followId } = req.body;
  let user;
  try {
    user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { following: followId } },
      { new: true }
    );
    userToFollow = await User.findByIdAndUpdate(
      followId,
      { $addToSet: { followers: userId } },
      { new: true }
    );
    await followNotification(userId, followId);
    res.status(201).json(user);
  } catch (err) {
    return next(new HttpError('Follow failed, please try again', 400));
  }
};

const unfollowUser = async (req, res, next) => {
  const { userId, followId } = req.body;
  let user;
  try {
    user = await User.findByIdAndUpdate(
      userId,
      { $pull: { following: followId } },
      { new: true }
    );
    userToFollow = await User.findByIdAndUpdate(
      followId,
      { $pull: { followers: userId } },
      { new: true }
    );
    await removeFollowNotification(userId, followId);
    res.status(201).json(user);
  } catch (err) {
    return next(new HttpError('Unfollow failed, please try again', 400));
  }
};

exports.getUserById = getUserById;
exports.signup = signup;
exports.login = login;
exports.googleLogin = googleLogin;
exports.githubLogin = githubLogin;
exports.fbLogin = fbLogin;
exports.twitterFailure = twitterFailure;
exports.twitterLogin = twitterLogin;
exports.twitterLogout = twitterLogout;
exports.updateUser = updateUser;
exports.followUser = followUser;
exports.unfollowUser = unfollowUser;
