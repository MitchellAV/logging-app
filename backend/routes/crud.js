const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { ensureAuth } = require("../middleware/auth");
const Post = require("../models/post");

// @desc	Redirect to dashboard if Auth was successful
// @route	/api/user
router.get("/user", (req, res) => {
	if (req.user) {
		res.status(200).json(req.user.firstName);
	} else {
		res.status(401).json({ msg: "Unauthorized" });
	}
});

// @desc	Redirect to dashboard if Auth was successful
// @route	/api/addPost
router.post("/addPost", ensureAuth, async (req, res) => {
	const newPost = { ...req.body, user_id: req.user._id };
	try {
		await Post.create(newPost);
		res.status(200).json(newPost);
	} catch (err) {
		console.error(err);
	}
});

router.get("/getPosts", ensureAuth, async (req, res) => {
	try {
		const allPosts = await Post.find({}).populate("user_id");
		console.log(allPosts);
		res.status(200).json(allPosts);
	} catch (err) {
		console.error(err);
	}
});

module.exports = router;
