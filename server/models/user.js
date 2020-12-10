const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	googleId: {
		type: String,
		unique: true
	},

	email: {
		type: String,
		required: true,
		lowercase: true,
		unique: true
	},
	username: {
		type: String,
		unique: true,
		lowercase: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},

	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("User", UserSchema);
