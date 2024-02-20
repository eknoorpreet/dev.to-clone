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

// Configure CORS
const corsOptions = {
  origin: '*', // Allow requests from any origin
  methods: ['GET', 'POST'], // Specify the allowed HTTP methods
  credentials: true, // Enable sending cookies in CORS requests
};

// Apply CORS middleware
app.use(cors(corsOptions));

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
  cors: {corsOptions},
});
socketHandlers(io);

// Define your routes
app.use('/api/posts',cors(), postsRoutes);
app.use('/api/users',cors(), usersRoutes);
app.use('/api/comments', cors(), commentsRoutes);
app.use('/api/tags', cors(), tagsRoutes);

// Define a default route
app.get('/', cors(), (req, res) => {
  res.send('DEV.to is running');
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || 'An unknown error occurred',
  });
});

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.avchopq.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
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
