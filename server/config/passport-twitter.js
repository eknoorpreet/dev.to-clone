const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
require('dotenv').config();
const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, JWT_KEY } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).populate('followedTags');
    done(null, user);
  } catch (err) {
    done(new Error('Failed to deserialize a user'));
  }
});

passport.use(
  new TwitterStrategy(
    {
      // options for the twitter start
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: '/api/users/auth/twitter/callback',
      includeEmail: true,
    },
    async (token, tokenSecret, profile, done) => {
      const { id, displayName, photos } = profile;
      const { profile_image_url: picture, email } = profile._json;
      let user;
      try {
        //Has the user signed in with twitter before
        user = await User.findOne({ email }, '-password');
      } catch (err) {
        console.log(err);
      }
      if (!user) {
        let hashedPassword;
        try {
          hashedPassword = await bcrypt.hash(id + displayName + id, 12); //12 - number of salting rounds (can't be reverse-engineered)
        } catch (err) {
          console.log(err);
        }
        user = new User({
          name: displayName,
          email,
          password: hashedPassword,
          avatar: picture || DEFAULT_AVATAR,
        });
        try {
          await user.save();
        } catch (err) {
          console.log(err);
        }
      }
      done(null, user);
    }
  )
);
