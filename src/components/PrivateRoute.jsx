import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PrivateRoute({ component: Component, ...rest }) {
	const { currentUser } = useAuth();

	return (
		<Route
			{...rest}
			render={(props) => {
				return currentUser ? <Component {...props} collapsed={rest.collapsed}/> : <Redirect to='/landing' />;
			}}
		/>
	);
}

export default PrivateRoute;
