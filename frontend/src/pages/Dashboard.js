import React, { useEffect, useContext, useState } from "react";
import UserProvider from "../contexts/UserProvider";
import axios from "axios";

import Form from "../components/Form";
import LoginSignup from "./LoginSignup";
import PostsList from "../components/PostsList";

export const Dashboard = () => {
	const { user, setUser } = useContext(UserProvider.context);

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		axios
			.get("/api/user", { withCredentials: true })
			.then((res) => {
				setUser(res.data);
			})
			.catch((err) => console.error(err));
	}, []);

	useEffect(() => {
		axios.get("/api/getPosts").then((res) => setPosts(res.data));
	}, []);
	return user ? (
		<>
			<Form posts={posts} setPosts={setPosts} />
			<PostsList posts={posts} />
		</>
	) : (
		<>
			<LoginSignup />
		</>
	);
};
export default Dashboard;
