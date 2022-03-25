const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: `*`,
    methods: ['GET', 'POST'],
  },
});
socketHandlers(io);

app.use(bodyParser.json());

// app.use("*", cloudinaryConfig);

//attach 3 headers to the response (on every route) to let the browser know it's okay
//that the request is coming from localhost:3000 to localhost:5000
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //which domains have access (here, any domain)
  res.setHeader(
    'Access-Control-Allow-Headers', //which headers incoming requests may have
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE'
  ); //which HTTP methods may be used in requests
  next(); //continue to other middlewares
});

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
    httpServer.listen(process.env.PORT || 5000, () => {
      console.log('Starting server');
    });
  })
  .catch((err) => {
    console.log(err);
  });
