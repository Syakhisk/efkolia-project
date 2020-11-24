import { useState } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Navbar from "./components/NavbarComp";
import Sidebar from "./components/Sidebar";
import Signup from "./components/Signup";
import Timetable from "./components/Timetable";

import "./styles/app.scss";

function App() {
	const [collapsed, setCollapsed] = useState(false);
	const [toggled, setToggled] = useState(false);
	// const [contentMargin, setContentMargin] = useState(0);
	const location = useLocation().pathname;

	const handleCollapsedChange = (checked) => {
		setCollapsed(checked);
	};

	const handleToggleSidebar = (value) => {
		setToggled(value);
	};

	const renderedRouting = (
		<Switch>
			<Route
				path='/'
				exact
				render={(props) => <Dashboard {...props} collapsed={collapsed} />}
			/>
			<Route path='/timetable' component={Timetable}></Route>
			<Route path='/login' component={Login}></Route>
			<Route path='/signup' component={Signup}></Route>
			<Route path='/404' component={NotFound} />
			<Redirect to='/404' />
		</Switch>
	);

	if (location === "/404" || location === "/login" || location === "/signup") {
		return <>{renderedRouting}</>;
	}

	return (
		<div className={`app ${toggled ? "toggled" : ""}`}>
			<Sidebar
				collapsed={collapsed}
				toggled={toggled}
				handleToggleSidebar={handleToggleSidebar}
				handleCollapsedChange={handleCollapsedChange}
			/>

			<div className='content' style={{ marginLeft: collapsed ? 80 : 270 }}>
				<Navbar />
				<main>{renderedRouting}</main>
			</div>
		</div>
	);
}

export default App;
