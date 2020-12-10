const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

module.exports = (req, res, next) => {
	const token = req.cookies.token;

	// Check for token
	if (!token)
		return res.status(401).json({ msg: "No token, authorization denied" });

	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		// Add user from payload
		const { id, username } = decoded.user;
		req.user = { id, username };
		next();
	} catch (err) {
		res.status(400).json({ msg: "Token is not valid" });
	}
};
