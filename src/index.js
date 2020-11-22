import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import "./styles/index.scss";
import App from "./App";
import Router from "react-router-dom/BrowserRouter";
// import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<App />
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);
