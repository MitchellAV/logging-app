const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User"
	},
	body: { type: String, required: true },
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Post", PostSchema);
