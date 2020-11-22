import Switch from "react-router-dom/Switch";
import Route from "react-router-dom/Route";
import Dashboard from "./components/Dashboard";
import Timetable from "./components/Timetable";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";
import Navbar from './components/NavbarComp'
import Sidebar from './components/Sidebar'

function App(props) {
	const renderedRouting = (
		<Switch>
			<Route path='/' exact component={Dashboard} />
			<Route path='/timetable' component={Timetable}></Route>
			<Route path='/login' component={Login}></Route>
			<Route path='/signup' component={Signup}></Route>
			<Route path='*' component={NotFound} />
		</Switch>
	);

	const renderedNav = (
		<>
			<Navbar />
			<Sidebar />
		</>
	);

	return (
    <div>
      {renderedNav}
      <div className="content">
        {renderedRouting}
      </div>
    </div>
  );
}

export default App;
