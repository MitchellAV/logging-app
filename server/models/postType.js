const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
	type: { type: String, required: true },
	score: {
		type: Number,
		required: true
	},
	visibility: {
		type: String,
		enum: ["public", "private"],
		default: "private"
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("PostType", PostSchema);
