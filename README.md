<h1 align="center">
  <br>
  <a href="https://devfrom.netlify.app"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--QG4or-x4--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/jrzutxzs0l43wqvw5k8z.png" alt="Markdownify" width="200"></a>
  <br>
  <br>
  <b>DEV.to Clone</b>
  <br>
</h1>

An DEV.to clone created with MongoDB, Express, React, and Socket.io

[![Netlify Status](https://api.netlify.com/api/v1/badges/c804d244-6f9d-4e37-be5d-3a8f5bd4e414/deploy-status)](https://app.netlify.com/sites/devfrom/deploys)

[![forthebadge](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOTUuMjEiIGhlaWdodD0iMzUiIHZpZXdCb3g9IjAgMCAxOTUuMjEgMzUiPjxyZWN0IGNsYXNzPSJzdmdfX3JlY3QiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMTUuMzEiIGhlaWdodD0iMzUiIGZpbGw9IiNFRjQwNDEiLz48cmVjdCBjbGFzcz0ic3ZnX19yZWN0IiB4PSIxMTMuMzEiIHk9IjAiIHdpZHRoPSI4MS45IiBoZWlnaHQ9IjM1IiBmaWxsPSIjQzIyNzJEIi8+PHBhdGggY2xhc3M9InN2Z19fdGV4dCIgZD0iTTE1LjY5IDIyTDE0LjIyIDIyTDE0LjIyIDEzLjQ3TDE2LjE0IDEzLjQ3TDE4LjYwIDIwLjAxTDIxLjA2IDEzLjQ3TDIyLjk3IDEzLjQ3TDIyLjk3IDIyTDIxLjQ5IDIyTDIxLjQ5IDE5LjE5TDIxLjY0IDE1LjQzTDE5LjEyIDIyTDE4LjA2IDIyTDE1LjU1IDE1LjQzTDE1LjY5IDE5LjE5TDE1LjY5IDIyWk0yOC40OSAyMkwyNi45NSAyMkwzMC4xNyAxMy40N0wzMS41MCAxMy40N0wzNC43MyAyMkwzMy4xOCAyMkwzMi40OSAyMC4wMUwyOS4xOCAyMC4wMUwyOC40OSAyMlpNMzAuODMgMTUuMjhMMjkuNjAgMTguODJMMzIuMDcgMTguODJMMzAuODMgMTUuMjhaTTQxLjE0IDIyTDM4LjY5IDIyTDM4LjY5IDEzLjQ3TDQxLjIxIDEzLjQ3UTQyLjM0IDEzLjQ3IDQzLjIxIDEzLjk3UTQ0LjA5IDE0LjQ4IDQ0LjU3IDE1LjQwUTQ1LjA1IDE2LjMzIDQ1LjA1IDE3LjUyTDQ1LjA1IDE3LjUyTDQ1LjA1IDE3Ljk1UTQ1LjA1IDE5LjE2IDQ0LjU3IDIwLjA4UTQ0LjA4IDIxLjAwIDQzLjE5IDIxLjUwUTQyLjMwIDIyIDQxLjE0IDIyTDQxLjE0IDIyWk00MC4xNyAxNC42Nkw0MC4xNyAyMC44Mkw0MS4xNCAyMC44MlE0Mi4zMCAyMC44MiA0Mi45MyAyMC4wOVE0My41NSAxOS4zNiA0My41NiAxNy45OUw0My41NiAxNy45OUw0My41NiAxNy41MlE0My41NiAxNi4xMyA0Mi45NiAxNS40MFE0Mi4zNSAxNC42NiA0MS4yMSAxNC42Nkw0MS4yMSAxNC42Nkw0MC4xNyAxNC42NlpNNTUuMDkgMjJMNDkuNTEgMjJMNDkuNTEgMTMuNDdMNTUuMDUgMTMuNDdMNTUuMDUgMTQuNjZMNTEuMDAgMTQuNjZMNTEuMDAgMTcuMDJMNTQuNTAgMTcuMDJMNTQuNTAgMTguMTlMNTEuMDAgMTguMTlMNTEuMDAgMjAuODJMNTUuMDkgMjAuODJMNTUuMDkgMjJaTTY2LjY1IDIyTDY0LjY4IDEzLjQ3TDY2LjE1IDEzLjQ3TDY3LjQ3IDE5Ljg4TDY5LjEwIDEzLjQ3TDcwLjM0IDEzLjQ3TDcxLjk2IDE5Ljg5TDczLjI3IDEzLjQ3TDc0Ljc0IDEzLjQ3TDcyLjc3IDIyTDcxLjM1IDIyTDY5LjczIDE1Ljc3TDY4LjA3IDIyTDY2LjY1IDIyWk04MC4zOCAyMkw3OC45MCAyMkw3OC45MCAxMy40N0w4MC4zOCAxMy40N0w4MC4zOCAyMlpNODYuODcgMTQuNjZMODQuMjMgMTQuNjZMODQuMjMgMTMuNDdMOTEuMDAgMTMuNDdMOTEuMDAgMTQuNjZMODguMzQgMTQuNjZMODguMzQgMjJMODYuODcgMjJMODYuODcgMTQuNjZaTTk2LjI0IDIyTDk0Ljc1IDIyTDk0Ljc1IDEzLjQ3TDk2LjI0IDEzLjQ3TDk2LjI0IDE3LjAyTDEwMC4wNSAxNy4wMkwxMDAuMDUgMTMuNDdMMTAxLjUzIDEzLjQ3TDEwMS41MyAyMkwxMDAuMDUgMjJMMTAwLjA1IDE4LjIxTDk2LjI0IDE4LjIxTDk2LjI0IDIyWiIgZmlsbD0iI0ZGRkZGRiIvPjxwYXRoIGNsYXNzPSJzdmdfX3RleHQiIGQ9Ik0xMjkuODggMjJMMTI3LjUwIDIyTDEyNy41MCAxMy42MEwxMzEuMzQgMTMuNjBRMTMyLjQ4IDEzLjYwIDEzMy4zMiAxMy45OFExMzQuMTYgMTQuMzUgMTM0LjYyIDE1LjA2UTEzNS4wNyAxNS43NiAxMzUuMDcgMTYuNzFMMTM1LjA3IDE2LjcxUTEzNS4wNyAxNy42MiAxMzQuNjUgMTguMzBRMTM0LjIyIDE4Ljk4IDEzMy40MyAxOS4zNkwxMzMuNDMgMTkuMzZMMTM1LjI0IDIyTDEzMi43MCAyMkwxMzEuMTcgMTkuNzdMMTI5Ljg4IDE5Ljc3TDEyOS44OCAyMlpNMTI5Ljg4IDE1LjQ3TDEyOS44OCAxNy45M0wxMzEuMjAgMTcuOTNRMTMxLjkzIDE3LjkzIDEzMi4zMCAxNy42MVExMzIuNjcgMTcuMjkgMTMyLjY3IDE2LjcxTDEzMi42NyAxNi43MVExMzIuNjcgMTYuMTIgMTMyLjMwIDE1Ljc5UTEzMS45MyAxNS40NyAxMzEuMjAgMTUuNDdMMTMxLjIwIDE1LjQ3TDEyOS44OCAxNS40N1pNMTQ2LjYxIDIyTDEzOS44NiAyMkwxMzkuODYgMTMuNjBMMTQ2LjQ1IDEzLjYwTDE0Ni40NSAxNS40NEwxNDIuMjIgMTUuNDRMMTQyLjIyIDE2Ljg1TDE0NS45NSAxNi44NUwxNDUuOTUgMTguNjNMMTQyLjIyIDE4LjYzTDE0Mi4yMiAyMC4xN0wxNDYuNjEgMjAuMTdMMTQ2LjYxIDIyWk0xNTIuODMgMjJMMTUwLjQwIDIyTDE1NC4xMSAxMy42MEwxNTYuNDUgMTMuNjBMMTYwLjE3IDIyTDE1Ny43MCAyMkwxNTcuMDQgMjAuMzdMMTUzLjQ5IDIwLjM3TDE1Mi44MyAyMlpNMTU1LjI3IDE1LjkzTDE1NC4xOCAxOC42MUwxNTYuMzQgMTguNjFMMTU1LjI3IDE1LjkzWk0xNjMuOTAgMTcuODBMMTYzLjkwIDE3LjgwUTE2My45MCAxNi41NCAxNjQuNDkgMTUuNTRRMTY1LjA5IDE0LjU1IDE2Ni4xNCAxMy45OVExNjcuMjAgMTMuNDMgMTY4LjUxIDEzLjQzTDE2OC41MSAxMy40M1ExNjkuNjcgMTMuNDMgMTcwLjU5IDEzLjg0UTE3MS41MSAxNC4yNSAxNzIuMTMgMTUuMDJMMTcyLjEzIDE1LjAyTDE3MC42MiAxNi4zOVExNjkuODAgMTUuNDAgMTY4LjY0IDE1LjQwTDE2OC42NCAxNS40MFExNjcuOTUgMTUuNDAgMTY3LjQyIDE1LjcwUTE2Ni44OCAxNiAxNjYuNTkgMTYuNTRRMTY2LjI5IDE3LjA5IDE2Ni4yOSAxNy44MEwxNjYuMjkgMTcuODBRMTY2LjI5IDE4LjUxIDE2Ni41OSAxOS4wNVExNjYuODggMTkuNjAgMTY3LjQyIDE5LjkwUTE2Ny45NSAyMC4yMCAxNjguNjQgMjAuMjBMMTY4LjY0IDIwLjIwUTE2OS44MCAyMC4yMCAxNzAuNjIgMTkuMjJMMTcwLjYyIDE5LjIyTDE3Mi4xMyAyMC41OFExNzEuNTIgMjEuMzUgMTcwLjU5IDIxLjc2UTE2OS42NyAyMi4xNyAxNjguNTEgMjIuMTdMMTY4LjUxIDIyLjE3UTE2Ny4yMCAyMi4xNyAxNjYuMTQgMjEuNjFRMTY1LjA5IDIxLjA1IDE2NC40OSAyMC4wNVExNjMuOTAgMTkuMDYgMTYzLjkwIDE3LjgwWk0xNzguNDYgMTUuNDhMMTc1Ljg3IDE1LjQ4TDE3NS44NyAxMy42MEwxODMuNDAgMTMuNjBMMTgzLjQwIDE1LjQ4TDE4MC44MyAxNS40OEwxODAuODMgMjJMMTc4LjQ2IDIyTDE3OC40NiAxNS40OFoiIGZpbGw9IiNGRkZGRkYiIHg9IjEyNi4zMSIvPjwvc3ZnPg==)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

## [Live Site](https://devfrom.netlify.app)

## [Backend API](https://devfrom.herokuapp.com/)

## Tech

- UI: <a href="https://github.com/facebook/react">React</a>
- Routing: <a href="https://github.com/ReactTraining/react-router">React Router</a>
- Real-time Notifications: <a href="https://github.com/socketio/socket.io">Socket.io</a>
- Backend: <a href="https://github.com/expressjs/express">Express</a>
- Database: <a href="https://github.com/mongodb/mongo">MongoDB</a>
- ORM: <a href="https://github.com/Automattic/mongoose">Mongoose</a>
- Image hosting: <a href="https://cloudinary.com/">Cloudinary</a>

## Features

- Login / Signup
- Google Oauth
- Create / Remove / Update / Delete Post
- Like / Unicorn / Bookmark Post
- Reading List
- Create / Add Tags to Post
- Follow Tags
- Find Posts by Tags
- Comment / Replies
- Like Comment
- Edit / Delete Comment
- View Profile
- Edit Profile
- Follow User
- Search Posts
- Real-time Notifications

## How to setup locally

### Clone

Clone the repo to your local machine using `https://github.com/eknoorpreet/dev.to-clone`

### Setup

Install npm dependencies in both `client` and `server` subdirectories using `npm install`

```shell
$ cd server && npm install
$ cd client && npm install
```

Set up a MongoDB database either locally or online via <a href='https://www.mongodb.com/cloud/atlas'>MongoDB Atlas</a>

Create a <a href="https://cloudinary.com/">Cloudinary account</a>

Create a new project on <a href='https://console.cloud.google.com'>Google Cloud Platform</a>

Create a `.env` file in in both `client` and `server` subdirectories

Set up the following environment variables

In `client/.env`:

```js
REACT_APP_BASE_URL=http://localhost:5000/api
REACT_APP_SOCKET_IO_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=<GOOGLE_CLIENT_ID>
```

In `server/.env`:

```js
DB_USER= //user name for db
DB_PASSWORD= //password for db
DB_NAME= // name for db
JWT_KEY= //random string

//cloundiary will provide you with the following credentials
CLOUDINARY_CLOUD_NAME= //cloud name
CLOUDINARY_API_KEY= //API key
CLOUDINARY_API_SECRET; //API secret

//Google will provide you with the following credentials
GOOGLE_API_KEY = //API key
```

Finally, run <code>npm start</code> in both `client` and `server` subdirectories

```shell
$ cd server && npm start
$ cd client && npm start
```
