import React, { useEffect, useState, useRef } from "react";
import { Button, Col, Container, Fade, Row } from "react-bootstrap";
import headerBg from "../assets/landscape-background.jpg";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useWindowSize } from "../hooks/useWindowSize";
// import Fade from "react-reveal/Fade";

import CarouselComponent from "./CarouselComponent";

import { greet } from "../random-greetings.js";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

function Dashboard(props) {
	const size = useWindowSize();
	const { currentUser, logout } = useAuth();
	const [greeting, setGreeting] = useState("Hello");
	const contentRef = useRef(0);
	const history = useHistory();

	const { toggled, collapsed, scrollingRef } = props;

	const [fullHeight, setFullHeight] = useState(true);
	const [userUpdated, setUserUpdated] = useState(currentUser);

	// eslint-disable-next-line
	const [error, setError] = useState("");
	const calculatedHeight = isNaN(size.height) ? 0 : size.height;

	const [scrollPos, setScrollPos] = useState(0);
	const [scrolling, setScrolling] = useState(false);

	const headerStyling = {
		background: "#a3a3a3",
		backgroundImage: `url(${headerBg})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		height: fullHeight ? calculatedHeight - 56 : "215px",
		transition: "height 0.3s ease",
		cursor: !fullHeight ? "pointer" : "",
	};

	//debounce the scroll state
	useEffect(() => {
		const timer = setTimeout(() => {
			// console.log("Scroll stopped");
			setScrolling(false);
		}, 500);

		return () => clearTimeout(timer);
	}, [scrollPos]);

	useEffect(() => {
		//listen to db realtime update
		setUserUpdated(currentUser);

		const onScroll = () => {
			setScrollPos(scrollingRef.current.scrollTop);
			if (fullHeight) setFullHeight(false);
		};
		scrollingRef.current.addEventListener("scroll", onScroll);

		return () => scrollingRef.current.removeEventListener("scroll", onScroll);
	}, [currentUser]);

	useEffect(() => {
		setGreeting(greet());
	}, []);

	const handleFullHeight = (e) => {
		const c = scrollingRef.current;
		const isNotOnTop = c.scrollTop;
		c.scrollTo({ top: 0, behavior: "smooth" });

		setTimeout(
			() => {
				setFullHeight(!fullHeight);
			},
			isNotOnTop ? 600 : 0
		);
	};

	const handleLogout = async () => {
		setError("");
		try {
			await logout();
			history.push("/landing");
		} catch (err) {
			setError("Failed to log out");
			console.log(err);
		}
	};

	return (
		<div id='content-wrapper' ref={contentRef}>
			<Container
				fluid
				className={`welcome-container p-3 ${
					!fullHeight ? "dash-minified" : ""
				}`}
				onClick={() => (!fullHeight ? handleFullHeight(true) : null)}
				style={headerStyling}>
				<div className='d-flex vh-center w-100 h-100'></div>
				<Fade appear in>
					<div className='d-flex flex-column h-100'>
						<Row>
							<Col sm md={9} className='pb-2 pb-sm-1'>
								<div className='display-4'>
									{greeting}, {userUpdated._firstName}
								</div>
							</Col>
						</Row>

						<h3 className={`${!fullHeight ? "hideDetails" : ""}`}>You have:</h3>
						<Row className={`mb-5 ${!fullHeight ? "hideDetails" : ""}`}>
							<Col sm className='d-flex flex-column'>
								<h1>Class at 14:00, Today</h1>
								<p className='truncate'>Web Programming</p>
								<div className='bottom-right'>
									<Button className='btn-primary btn-sm'>
										Go to Timetables
									</Button>
								</div>
							</Col>
							<Col sm className='d-flex flex-column'>
								<h1>
									{userUpdated.tasks.filter((task) => task.status !== 3).length}{" "}
									Task(s)
								</h1>
								<p className='truncate'>
									{userUpdated.tasks
										.filter((task) => task.status !== 3)
										.map((task) => task.name)
										.join(", ")}
								</p>
								<div className='bottom-right'>
									<Button className='btn-primary btn-sm'>Go to Tasks</Button>
								</div>
							</Col>
							<Col sm className='d-flex flex-column'>
								<h1>
									{
										userUpdated.agendas.filter((agenda) => agenda.status !== 3)
											.length
									}{" "}
									Agenda(s)
								</h1>
								<p className='truncate'>
									{userUpdated.agendas
										.filter((agenda) => agenda.status !== 3)
										.map((agenda) => agenda.name)
										.join(", ")}
								</p>
								<div className='bottom-right'>
									<Button className='btn-primary btn-sm'>Go to Agendas</Button>
								</div>
							</Col>
						</Row>

						{/* https://open.spotify.com/playlist/37i9dQZF1E35mIgoM5Dq8x?si=FjvDBu8zTqm0XfC2pcEYjQ */}
						{/* <div className='music-container'>
							<h3>Music?</h3>
							<iframe
								title='spotify'
								src='https://open.spotify.com/embed/playlist/37i9dQZF1E35mIgoM5Dq8x?si=FjvDBu8zTqm0XfC2pcEYjQ'
								width='300'
								height='80'
								frameBorder='0'
								allowtransparency='true'
								allow='encrypted-media'></iframe>
						</div> */}

						<div className='flex-grow-1' />
						<div
							className={`${
								!fullHeight ? "invisible" : "visible"
							} d-flex justify-content-center overflow-hidden`}>
							<Button
								variant='outline-primary'
								onClick={() => setFullHeight(false)}>
								<MdKeyboardArrowUp style={{ transform: "scale(2,2)" }} />
							</Button>
						</div>
					</div>
				</Fade>
			</Container>

			<Fade appear in={!fullHeight} className='delay-1'>
				<div>
					<Container fluid className='pt-3'>
						<CarouselComponent
							title='tasks'
							classes={userUpdated.classes}
							items={userUpdated.tasks}
							toggled={toggled}
							collapsed={collapsed}
						/>
					</Container>

					<Container fluid className='pt-3'>
						<CarouselComponent
							title='agendas'
							items={userUpdated.agendas}
							toggled={toggled}
							collapsed={collapsed}
						/>
					</Container>
				</div>
			</Fade>
		</div>
	);
}

export default Dashboard;
