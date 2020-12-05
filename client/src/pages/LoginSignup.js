import React from "react";
import axios from "axios";

export const LoginSignup = () => {
	return (
		<section className="card">
			<h4>Login/Signup</h4>
			<a className="btn" href="http://localhost:5000/auth/google">
				Log in with google
			</a>
		</section>
	);
};
export default LoginSignup;
