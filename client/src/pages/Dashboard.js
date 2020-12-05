import React, { useEffect, useContext, useState } from "react";
import UserProvider from "../contexts/UserProvider";
import axios from "axios";

import Form from "../components/Form";
import LoginSignup from "./LoginSignup";
import PostsList from "../components/PostsList";
import Loading from "../components/Loading";

export const Dashboard = () => {
	const { user, setUser, posts, setPosts } = useContext(UserProvider.context);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
			.get("/api/user", { withCredentials: true })
			.then((res) => {
				setUser(res.data);
				axios
					.get("/api/getPosts")
					.then((res) => {
						setPosts(res.data);
						console.log(res.data);
						setIsLoading(false);
					})
					.catch((err) => console.error(err));
			})
			.catch((err) => console.error(err));
	}, []);

	return user ? (
		<>
			<Form posts={posts} setPosts={setPosts} />
			{isLoading ? (
				<Loading />
			) : (
				<PostsList posts={posts} isPublic={true} />
			)}
		</>
	) : (
		<>
			<LoginSignup />
		</>
	);
};
export default Dashboard;
