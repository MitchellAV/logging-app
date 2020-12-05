import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const context = createContext();

const UserProvider = ({ children }) => {
	const [user, setUser] = useState("");
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		axios
			.get("/api/user")
			.then((res) => {
				console.log(res.data);
				setUser(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<context.Provider value={{ user, setUser, posts, setPosts }}>
			{children}
		</context.Provider>
	);
};

UserProvider.context = context;

export default UserProvider;
