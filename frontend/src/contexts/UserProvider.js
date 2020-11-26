import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const context = createContext();

const UserProvider = ({ children }) => {
	const [user, setUser] = useState("");

	useEffect(() => {
		axios
			.get("/api/user")
			.then((res) => {
				console.log(res);
				setUser(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<context.Provider value={{ user, setUser }}>
			{children}
		</context.Provider>
	);
};

UserProvider.context = context;

export default UserProvider;
