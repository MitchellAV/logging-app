import React from "react";
import Post from "./Post";

const PostsList = ({ posts, isPublic }) => {
	return posts ? (
		posts.map((post) => {
			return <Post {...post} key={post._id} />;
		})
	) : (
		<></>
	);
};

export default PostsList;
