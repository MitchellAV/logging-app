// Filename : user.js
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
router.post(
	"/signup",
	[
		check("username", "Please Enter a Valid Username")
			.not()
			.isEmpty()
			.toLowerCase(),
		check("email", "Please enter a valid email").isEmail().toLowerCase(),
		check("password", "Please enter a valid password").isLength({
			min: 8
		})
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array()
			});
		}
		const { username, email, password } = req.body;
		try {
			let user = await User.findOne({
				email
			});
			if (user) {
				return res.status(400).json({
					msg: "User Already Exists"
				});
			}
			newUser = new User({
				username,
				email,
				password
			});
			const salt = await bcrypt.genSalt(10);
			newUser.password = await bcrypt.hash(password, salt);
			await newUser.save();
			const payload = {
				newUser: {
					id: newUser._id
				}
			};
			jwt.sign(
				payload,
				process.env.JWT_SECRET_KEY,
				{
					expiresIn: 10000
				},
				(err, token) => {
					if (err) throw err;
					res.status(200).json({
						token,
						user: {
							id: savedUser.id,
							name: savedUser.name,
							email: savedUser.email
						}
					});
				}
			);
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Error in Saving");
		}
	}
);

/**
 * @route   POST api/auth/login
 * @desc    Login user
 * @access  Public
 */

router.post(
	"/api/auth/login",
	[
		check("username", "Please Enter a Valid Username")
			.not()
			.isEmpty()
			.toLowerCase(),
		check("email", "Please enter a valid email").isEmail().toLowerCase(),
		check("password", "Please enter a valid password").isLength({
			min: 8
		})
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array()
			});
		}
		const { email, password } = req.body;

		try {
			let user = await User.findOne({
				email
			});
			if (!user) {
				return res.status(404).json({
					msg: "User does not exist"
				});
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(401).json({
					msg: "Invalid credentials"
				});
			}

			const payload = {
				newUser: {
					id: newUser._id
				}
			};
			jwt.sign(
				payload,
				process.env.JWT_SECRET_KEY,
				{
					expiresIn: 10000
				},
				(err, token) => {
					if (err) throw err;
					res.status(200).json({
						token,
						user: {
							id: savedUser.id,
							name: savedUser.name,
							email: savedUser.email
						}
					});
				}
			);
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Error in Saving");
		}
	}
);

module.exports = router;
