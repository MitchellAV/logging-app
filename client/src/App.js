import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import UserProvider from "./contexts/UserProvider";

import "./App.css";
// Pages
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Error from "./pages/Error";

// Components
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
	return (
		<Router>
			<UserProvider>
				<Navbar />
				<Switch>
					<Route exact path="/" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/profile/:id" component={Profile} />
					<Route path="*" component={Error} />
				</Switch>
			</UserProvider>
		</Router>
	);
}

export default App;
