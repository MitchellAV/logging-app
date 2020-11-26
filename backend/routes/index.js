const express = require("express");
const router = express.Router();
// const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Post = require("../models/post");

router.get("/", (req, res) => {
	// res.render("./pages/login");
});

router.get("/dashboard", async (req, res) => {
	try {
		const posts = await Post.find().populate("user_id");
		// console.log(posts);
		// res.render("./pages/dashboard", { posts: posts });
	} catch (err) {
		console.error(err);
	}
});

router.get("/add", async (req, res) => {
	// res.render("./pages/add");
});

router.post("/add", async (req, res) => {
	try {
		const post = new Post({
			user_id: req.user._id,
			body: req.body.body
		});

		await post.save((err, document) => {
			try {
				// res.redirect("/dashboard");
			} catch (err) {
				console.error(err);
			}
		});
	} catch (err) {
		console.error(err);
	}
});

module.exports = router;
