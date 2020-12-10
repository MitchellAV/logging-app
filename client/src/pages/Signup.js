import React, { useState } from "react";

import axios from "axios";

export const Login = () => {
	const defaultState = { username: "", email: "", password: "" };
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
				.post("/auth/signup", formState)
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
			<h4>Signup</h4>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<label htmlFor="username">Username</label>
					<input
						name="username"
						id="username"
						value={formState.username}
						onChange={handleChange}
					/>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formState.email}
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
