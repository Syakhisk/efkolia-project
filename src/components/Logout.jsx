import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

function Logout() {
	const { logout } = useAuth();
	const history = useHistory();

	React.useEffect(() => {
		logout();
		history.push("/landing");
	}, []);

	return <div>Logging out...</div>;
}

export default Logout;
