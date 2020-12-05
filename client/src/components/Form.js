import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = ({ posts, setPosts }) => {
	const defaultState = { type: "poop", score: 1 };
	const [formState, setFormState] = useState(defaultState);

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
		const name = e.target.name;
		const value = e.target.value;
		setFormState({ ...formState, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			axios
				.post("/api/addPost", formState)
				.then((res) => {
					axios
						.get("/api/getPosts")
						.then((res) => {
							console.log(res.data);
							setPosts(res.data);
						})
						.catch((err) => console.error(err));
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
		<form onSubmit={handleSubmit}>
			<fieldset>
				<label htmlFor="type">Type</label>
				<select
					name="type"
					value={formState.type}
					onChange={handleChange}
				>
					<option value="poop">Poop</option>
					<option value="pee">Pee</option>
					<option value="sex">Sex</option>
					<option value="period">Period</option>
				</select>
				<label htmlFor="score">Score</label>
				<select
					name="score"
					value={formState.score}
					onChange={handleChange}
				>
					{formOptionRatings(1, 10)}
				</select>
				<label htmlFor="visibility">Visibility</label>

				<select
					name="visibility"
					value={formState.visibility}
					onChange={handleChange}
				>
					<option value="private">Private</option>
					<option value="public">Public</option>
				</select>
				<input type="submit" />
			</fieldset>
		</form>
	);
};

export default Form;
