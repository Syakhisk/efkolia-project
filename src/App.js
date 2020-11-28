import { useState } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Navbar from "./components/NavbarComp";
import Sidebar from "./components/Sidebar";
import Signup from "./components/Signup";
import Timetable from "./components/Timetable";
import Landing from "./components/Landing";
import ComponentTest from "./components/ComponentTest";
import PrivateRoute from "./components/PrivateRoute";

import "./styles/app.scss";
import AuthProvider from "./contexts/AuthContext";

function App() {
	const [collapsed, setCollapsed] = useState(false);
	const [toggled, setToggled] = useState(false);
	const location = useLocation().pathname;

	const handleCollapsedChange = (checked) => {
		setCollapsed(checked);
	};

	const handleToggleSidebar = (value) => {
		setToggled(value);
	};

	const renderedRouting = (
		<Switch>
			<Route path='/' exact component={Landing} />
			<Route path='/test' component={ComponentTest}></Route>
			<Route path='/login' component={Login}></Route>
			<Route path='/signup' component={Signup}></Route>
			<Route path='/landing' component={Landing}></Route>
			<PrivateRoute
				path='/dashboard'
				collapsed={collapsed}
				component={Dashboard}
			/>
			<PrivateRoute path='/timetable' component={Timetable}></PrivateRoute>
			<Route path='/404' component={NotFound} />
			<Redirect to='/404' />
		</Switch>
	);

	if (
		location === "/" ||
		location === "/404" ||
		location === "/login" ||
		location === "/signup" ||
		location === "/landing" ||
		location === "/test"
	) {
		return <AuthProvider>{renderedRouting}</AuthProvider>;
	}

	return (
		<AuthProvider>
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
		</AuthProvider>
	);
}

export default App;
