import React, { useState } from "react";

import axios from "axios";

export const Login = () => {
	const defaultState = { username: "", password: "" };
	const [formState, setFormState] = useState(defaultState);

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFormState({ ...formState, [name]: value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			axios
				.post("/auth/login", formState)
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {
					console.error(err);
				});
			setFormState(defaultState);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<section className="card">
			<a className="btn" href="http://localhost:3000/signup">
				Signup
			</a>
			<h4>Login/Signup</h4>
			<a className="btn" href="http://localhost:5000/auth/google">
				Log in with google
			</a>
			<hr />
			<p>Or</p>
			<hr />
			<h4>Login</h4>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<label htmlFor="username">Username</label>
					<input
						name="username"
						id="username"
						value={formState.username}
						onChange={handleChange}
					/>

					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formState.password}
						onChange={handleChange}
					/>

					<input type="submit" value="Sign in" />
				</fieldset>
			</form>
		</section>
	);
};
export default Login;
