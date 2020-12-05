const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { ensureAuth } = require("../middleware/auth");
const Post = require("../models/post");

// @desc	Redirect to dashboard if Auth was successful
// @route	/api/user
router.get("/user", (req, res) => {
	if (req.user) {
		res.status(200).json(req.user._id);
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
		res.status(201).json(newPost);
	} catch (err) {
		console.error(err);
		res.json(err);
	}
});

router.get("/getPosts/", ensureAuth, async (req, res) => {
	try {
		const allPosts = await Post.find({ visibility: "public" }).populate(
			"user_id"
		);
		res.status(200).json(allPosts);
	} catch (err) {
		console.error(err);
		res.json(err);
	}
});

router.get("/:user_id/getPosts", ensureAuth, async (req, res) => {
	const id = req.params.user_id;
	try {
		const allPosts = await Post.find({ user_id: id });
		res.status(200).json(allPosts);
	} catch (err) {
		res.status(500).json(err);
		console.error(err);
	}
});

router.delete("/:post_id/delete", ensureAuth, async (req, res) => {
	const id = req.params.post_id;
	try {
		const deletedPost = await Post.findByIdAndDelete(id);
		res.status(200).json(deletedPost);
	} catch (err) {
		console.error(err);
		res.json(err);
	}
});

router.patch("/:post_id/updatePost", ensureAuth, async (req, res) => {
	const id = req.params.post_id;
	try {
		const deletedPost = await Post.findByIdAndUpdate(id, {
			$set: {}
		});
		res.status(200).json(deletedPost);
	} catch (err) {
		console.error(err);
		res.json(err);
	}
});

module.exports = router;
