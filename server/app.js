const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const commentsRoutes = require('./routes/comments');
const tagsRoutes = require('./routes/tags');
const HttpError = require('./models/http-error');
const { socketHandlers } = require('./utils/socket');

const {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  COOKIE_KEY,
  PORT,
  NODE_ENV,
  CLIENT_URL,
} = process.env;

const httpServer = createServer(app);

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: [COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000, // session will expire after 24 hours
    secure: NODE_ENV === 'development' ? false : true,
    sameSite: NODE_ENV === 'development' ? false : 'none',
  })
);

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport-twitter');

const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_URL,
    methods: ['GET', 'POST'],
  },
});
socketHandlers(io);

app.use(
  cors({
    origin: CLIENT_URL, // allow to server to accept request from different origin (client)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use('/api/posts', postsRoutes);

app.use('/api/users', usersRoutes);

app.use('/api/comments', commentsRoutes);

app.use('/api/tags', tagsRoutes);

app.get('/', (req, res) => {
  res.send('DEV.to is running');
});

// app.use((req, res, next) => {
//   throw new HttpError('Could not find the route', 404);
// });

app.use((error, req, res, next) => {
  if (res.headerSent) {
    //res already sent ? => don't send res, just forward the error
    return next(error);
  }
  //else, send a res
  res.status(error.code || 500);
  res.json({
    message: error.message || 'An unknown error occurred',
  });
});

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ynmnh.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    httpServer.listen(PORT || 5000, () => {
      console.log('Starting server');
    });
  })
  .catch((err) => {
    console.log(err);
  });
