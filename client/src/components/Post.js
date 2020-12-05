import React, { useContext } from "react";

import UserProvider from "../contexts/UserProvider";
import { handleDelete } from "../utils/functions";

const Post = (props) => {
	const { setPosts } = useContext(UserProvider.context);
	const { user_id, type, score, _id, createdAt } = props;
	return (
		<>
			<article className="post">
				<h4>Date: {new Date(createdAt).toUTCString()}</h4>
				{/* <h4>User: {user_id}</h4> */}
				<h4>Type: {type}</h4>
				<h4>Score: {score}</h4>
				<button onClick={() => handleDelete(_id, setPosts)}>X</button>
			</article>
		</>
	);
};

export default Post;
