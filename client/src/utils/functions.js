import axios from "axios";
export const handleDelete = (_id, setPosts) => {
	axios
		.delete(`/api/${_id}/delete`)
		.then((res) => {
			axios
				.get("/api/getPosts")
				.then((res) => {
					setPosts(res.data);
				})
				.catch((err) => console.error(err));
		})
		.catch((err) => console.error(err));
};
