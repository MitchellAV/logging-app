const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const Post = require("../models/post");
const User = require("../models/user");

/**
 * @method - POST
 * @description - Get LoggedIn User
 * @param - /api/user/
 */
router.get("/user", auth, async (req, res) => {
	try {
		console.log(req.user.id);
		const user = await User.findById(req.user.id.toString());
		console.log(user);
		res.json(user);
	} catch (err) {
		console.error(err);
		res.status(400).json({ msg: "Error in Fetching user" });
	}
});

// @desc	Redirect to dashboard if Auth was successful
// @route	/api/addPost
router.post("/addPost", auth, async (req, res) => {
	const newPost = { ...req.body, user_id: req.user._id };
	try {
		await Post.create(newPost);
		res.status(201).json(newPost);
	} catch (err) {
		console.error(err);
		res.json(err);
	}
});

router.get("/getPosts/", auth, async (req, res) => {
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

router.get("/:user_id/getPosts", auth, async (req, res) => {
	const id = req.params.user_id;
	try {
		const allPosts = await Post.find({ user_id: id });
		res.status(200).json(allPosts);
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.delete("/:post_id/delete", auth, async (req, res) => {
	const id = req.params.post_id;
	try {
		const deletedPost = await Post.findByIdAndDelete(id);
		res.status(200).json(deletedPost);
	} catch (err) {
		console.error(err);
		res.json(err);
	}
});

router.patch("/:post_id/updatePost", auth, async (req, res) => {
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
