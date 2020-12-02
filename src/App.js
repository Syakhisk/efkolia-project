import { useRef, useState } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";

/*Route Components*/
import ComponentTest from "./components/ComponentTest";
import Dashboard from "./components/Dashboard";
import Tasks from "./components/Tasks"
import Agendas from "./components/Agendas"
import Subjects from "./components/Subjects"
import Playlists from "./components/Playlists"
import Timetable from "./components/Timetable";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Landing from "./components/Landing";
import NotFound from "./components/NotFound";

/*Granular Components*/
import Navbar from "./components/NavbarComp";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar";
import AuthProvider from "./contexts/AuthContext";
import "./styles/app.scss";

function App() {
	const [collapsed, setCollapsed] = useState(false);
	const contentRef = useRef();
	const [isScrolled, setIsScrolled] = useState(false);
	const [toggled, setToggled] = useState(false);
	const location = useLocation().pathname;

	const handleScroll = (e) => {
		if (!isScrolled) {
			setIsScrolled(true);
		}
	};

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
			<Route path='/landing' component={Landing}></Route>
			<Route path='/login' component={Login}></Route>
			<Route path='/signup' component={Signup}></Route>
			<PrivateRoute
				path='/dashboard'
				setIsScrolled={setIsScrolled}
				isScrolled={isScrolled}
				collapsed={collapsed}
				component={Dashboard}
			/>
			<PrivateRoute path='/tasks' component={Tasks} />
			<PrivateRoute path='/agendas' component={Agendas} />
			<PrivateRoute path='/subjects' component={Subjects} />
			<PrivateRoute path='/timetable' component={Timetable} />
			<PrivateRoute path='/playlists' component={Playlists} />
			<PrivateRoute path='/user-profile' component={Profile} />
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

				<div
					className='content'
					onScroll={() => setIsScrolled(true)}
					style={{ marginLeft: collapsed ? 80 : 270 }}>
					<Navbar
						location={location}
						handleToggleSidebar={handleToggleSidebar}
						toggled={toggled}
					/>
					<main>{renderedRouting}</main>
				</div>
			</div>
		</AuthProvider>
	);
}

export default App;
