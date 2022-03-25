const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const checkAuth = require("../middleware/check-auth");
const commentsControllers = require("../controllers/comments");
const {
  getCommentsByPostId,
  createComment,
  updateComment,
  likeComment,
  unlikeComment,
  deleteComment,
} = commentsControllers;

router.get("/:postId", getCommentsByPostId);

router.use(checkAuth);

router.post("/", createComment);

router.patch("/:commentId", updateComment);

router.put("/:commentId/like", likeComment);

router.put("/:commentId/unlike", unlikeComment);

router.delete("/:commentId", deleteComment);

module.exports = router;
