import React from "react";

const Post = ({ type, score, user_id, createdAt }) => {
	const { firstName } = user_id;
	return (
		<>
			<article className="post">
				<h4>{new Date(createdAt).toUTCString()}</h4>
				<h4>{firstName}</h4>
				<h4>Type: {type}</h4>
				<h4>Score: {score}</h4>
			</article>
		</>
	);
};

export default Post;
