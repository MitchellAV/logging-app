const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const { Post } = require("../models/post");

router.get("/dashboard", ensureAuth, async (req, res) => {
	try {
		const posts = await Post.find({}).lean();
		res.render("./pages/dashboard", { posts: posts });
	} catch (err) {
		console.error(err);
	}
});

router.get("/:id", ensureAuth, (req, res) => {});
router.post("/", ensureAuth, (req, res) => {});
router.put("/:id", ensureAuth, (req, res) => {});
router.delete("/:id", ensureAuth, (req, res) => {});

module.exports = router;
