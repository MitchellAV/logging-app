const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const express = require("express");
const session = require("express-session");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");

const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const connectToDB = require("./config/db");

const app = express();
connectToDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sessions
app.use(
	session({
		secret: process.env.SESSION_SECRET_KEY,
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({
			mongooseConnection: mongoose.connection
		}),
		cookie: {
			httpOnly: true,
			maxAge: 3600 * 1000
		}
	})
);

// Passport config
require("./config/passport")(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
// app.use("/", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/api", require("./routes/crud"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
