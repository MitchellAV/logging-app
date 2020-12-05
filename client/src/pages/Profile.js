import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import UserProvider from "../contexts/UserProvider";
import PostsList from "../components/PostsList";
import Loading from "../components/Loading";

export const Profile = ({ match }) => {
	const userId = match.params.id;
	const [isLoading, setIsLoading] = useState(true);

	const { posts, setPosts } = useContext(UserProvider.context);

	useEffect(() => {
		axios.get(`/api/${userId}/getPosts`).then((res) => {
			setPosts(res.data);
			setIsLoading(false);
		});
	}, []);

	return (
		<>
			<h4>{userId}'s Profile</h4>
			{isLoading ? (
				<Loading />
			) : (
				<PostsList posts={posts} isPublic={false} />
			)}
		</>
	);
};
export default Profile;
