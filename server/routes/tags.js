const express = require("express");
const { check } = require("express-validator");

const tagsControllers = require("../controllers/tags");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
const {
  getAllTags,
  getPostsForHomeTags,
  getTagByName,
  getTagById,
  followTag,
  unfollowTag,
} = tagsControllers;

router.get("/", getAllTags);

router.get("/home", getPostsForHomeTags);

router.get("/:name", getTagByName);

router.get("/:name/:tagId", getTagById);

router.use(checkAuth);

router.put("/:tagId/follow", followTag);

router.put("/:tagId/unfollow", unfollowTag);

module.exports = router;
