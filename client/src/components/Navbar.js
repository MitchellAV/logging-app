import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserProvider from "../contexts/UserProvider";

export const Navbar = () => {
	const { user, setUser } = useContext(UserProvider.context);
	return (
		<nav className="navbar">
			<ul className="nav-links">
				{user ? (
					<>
						<li>
							<Link to="/dashboard">Dashboard</Link>
						</li>
						<li>
							<Link to={`/profile/${user}`}>Profile</Link>
						</li>
						<li>
							<a
								href="http://localhost:5000/auth/logout"
								onClick={() => setUser("")}
							>
								Logout
							</a>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to="/">Login/Signup</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};
export default Navbar;
