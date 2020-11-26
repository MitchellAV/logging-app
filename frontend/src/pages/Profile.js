import React from "react";

export const Profile = ({ match }) => {
	console.log(match.params);
	return <h1>Profile Page</h1>;
};
export default Profile;
