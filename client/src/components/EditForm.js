import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = ({ posts, setPosts }) => {
	const defaultState = { score: 1 };
	const [state, setState] = useState(defaultState);

	useEffect(() => {
		// axios.get(`/post/${}`).then(res=>setState(res.data))
	}, []);

	const formOptionRatings = (from, to) => {
		const range = [];
		for (from; from <= to; from++) {
			range.push(from);
		}
		return range.map((num) => {
			return (
				<option value={num} key={num}>
					{num}
				</option>
			);
		});
	};

	const handleChange = (e) => {
		console.log(e.target.name, e.target.value);

		const name = e.target.name;
		const value = e.target.value;
		setState({ ...state, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			axios.post("/api/addPost", state).then((res) => {
				axios.get("/api/getPosts").then((res) => setPosts(res.data));
			});
			setState(defaultState);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<fieldset>
				<label htmlFor="type">Type</label>
				<select
					name="type"
					value={state.type}
					onChange={handleChange}
				></select>
				<label htmlFor="score">Score</label>
				<select
					name="score"
					value={state.score}
					onChange={handleChange}
				>
					{formOptionRatings(1, 10)}
				</select>
				<input type="submit" />
			</fieldset>
		</form>
	);
};

export default Form;
