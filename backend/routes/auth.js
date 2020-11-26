const express = require("express");
const passport = require("passport");
const router = express.Router();

// GOOGLE Authentication
// @desc	Authenticate user
// @route	/auth/google
router.get(
	"/google",
	passport.authenticate("google", {
		scope: ["profile"]
	})
);

// @desc	Redirect to dashboard if Auth was successful
// @route	/auth/google/callback
router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "/login" }),
	(req, res) => {
		// Successful authentication, redirect home.
		res.redirect("http://localhost:3000/dashboard");
	}
);

// @desc	Logout user
// @route	/auth/logout
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("http://localhost:3000/");
});

module.exports = router;
