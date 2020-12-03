import React, { useEffect, useState, useRef } from "react";
import { Button, Col, Container, Fade, Row } from "react-bootstrap";
import headerBg from "../assets/landscape-background.jpg";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useWindowSize } from "../hooks/useWindowSize";
// import Fade from "react-reveal/Fade";

import CarouselComponent from "./CarouselComponent";

import { greet } from "../random-greetings.js";
import user from "../objects/user";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

function Dashboard(props) {
	const [greeting, setGreeting] = useState("Hello");
	const [fullHeight, setFullHeight] = useState(true);
	const size = useWindowSize();
	const contentRef = useRef(0);
	const { currentUser, logout } = useAuth();
	const [error, setError] = useState("");
	const history = useHistory();
	const calculatedHeight = isNaN(size.height) ? 0 : size.height;

	const { toggled, collapsed, isScrolled, setIsScrolled } = props;

	const headerStyling = {
		background: "#a3a3a3",
		backgroundImage: `url(${headerBg})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		height: fullHeight ? calculatedHeight - 56 : "215px",
		transition: "0.3s",
	};

	useEffect(() => {
		if (isScrolled) {
			setFullHeight(false);
		}
	}, [isScrolled]);

	useEffect(() => {
		setIsScrolled(false);
	}, [fullHeight]);

	useEffect(() => {
		setGreeting(greet());
	}, []);

	// useEffect(() => {

	// 	window.addEventListener("scroll", handleScroll);
	// 	return () => {
	// 		window.removeEventListener("scroll", handleScroll);
	// 	};
	// }, []);

	// const handleScroll = (e) => {
	// 	setFullHeight(false);
	// };

	const handleFullHeight = (e) => {
		setFullHeight(!fullHeight);
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

	const truncate = {
		display: "-webkit-box",
		WebkitBoxOrient: "vertical",
		WebkitLineClamp: 1,
		overflow: "hidden",
		textOverflow: "ellipsis",
	};

	return (
		<div id='content-wrapper' ref={contentRef}>
			<Container
				fluid
				className={`welcome-container p-3 ${
					!fullHeight ? "dash-minified" : ""
				}`}
				style={headerStyling}>
				<Fade appear in>
					<div className='d-flex flex-column h-100'>
						<Row>
							<Col sm md={9} className='pb-2 pb-sm-1'>
								<div className='display-4'>
									{greeting}, {currentUser._firstName}
									<Button
										className='ml-2 ml-lg-3'
										variant='outline-primary'
										size='sm'
										onClick={() => handleFullHeight(true)}>
										Toggle Dashboard
									</Button>
								</div>
							</Col>
						</Row>

						<h3 className={`${!fullHeight ? "hideDetails" : ""}`}>You have:</h3>
						<Row className={`mb-5 ${!fullHeight ? "hideDetails" : ""}`}>
							<Col sm className='d-flex flex-column'>
								<h1>Class at 14:00, Today</h1>
								<p style={truncate}>Web Programming</p>
								<div className='bottom-right'>
									<Button className='btn-primary btn-sm'>
										Go to Timetables
									</Button>
								</div>
							</Col>
							<Col sm className='d-flex flex-column'>
								<h1>
									{currentUser.tasks.filter((task) => task.status !== 3).length}{" "}
									Task(s)
								</h1>
								<p style={truncate}>
									{currentUser.tasks
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
										currentUser.agendas.filter((agenda) => agenda.status !== 3)
											.length
									}{" "}
									Agenda(s)
								</h1>
								<p style={truncate}>
									{currentUser.agendas
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
						<div className='music-container'>
							<h3>Music?</h3>
							<iframe
								title='spotify'
								src='https://open.spotify.com/embed/playlist/37i9dQZF1E35mIgoM5Dq8x?si=FjvDBu8zTqm0XfC2pcEYjQ'
								width='300'
								height='80'
								frameBorder='0'
								allowtransparency='true'
								allow='encrypted-media'></iframe>
						</div>

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
				<Container fluid className='pt-3'>
					<CarouselComponent
						title='tasks'
						items={currentUser.tasks}
						toggled={toggled}
						collapsed={collapsed}
					/>
				</Container>
			</Fade>

			<Fade appear in={!fullHeight} className='delay-2'>
				<Container fluid className='pt-3'>
					<CarouselComponent
						title='agendas'
						items={currentUser.agendas}
						toggled={toggled}
						collapsed={collapsed}
					/>
				</Container>
			</Fade>
		</div>
	);
}

export default Dashboard;
