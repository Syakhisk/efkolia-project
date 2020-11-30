import React, { useEffect, useState, useRef } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import headerBg from "../assets/landscape-background.jpg";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useWindowSize } from "../hooks/useWindowSize";
import Fade from "react-reveal/Fade";

import CardCarouselTask from "./CardCarouselTask";
import CardCarouselAgenda from "./CardCarouselAgenda";

import user from "../objects/user";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

function Dashboard(props) {
	const [fullHeight, setFullHeight] = useState(true);
	const size = useWindowSize();
	const contentRef = useRef(0);
	const { currentUser, logout } = useAuth();
	const [error, setError] = useState("");
	const history = useHistory();
	const calculatedHeight = isNaN(size.height) ? 0 : size.height;

	const headerStyling = {
		background: "#a3a3a3",
		backgroundImage: `url(${headerBg})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		height: fullHeight ? calculatedHeight - 56 : "200px",
		transition: "0.3s",
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleScroll = (e) => {
		setFullHeight(false);
	};

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
				{/* <Fade> */}
				<Row>
					<Col sm md={9} className='pb-2 pb-sm-1'>
						<div className='display-4'>
							Hello, {currentUser._firstName}
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
							<Button className='btn-primary btn-sm'>Go to Timetables</Button>
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
					} d-flex justify-content-center pb-3 overflow-hidden`}>
					<Button
						variant='outline-primary'
						onClick={() => setFullHeight(false)}>
						<MdKeyboardArrowUp
							className='my-1'
							style={{ transform: "scale(2,2)" }}
						/>
					</Button>
				</div>
				{/* </Fade> */}
			</Container>

			<Container fluid className='pt-3'>
				<Fade when={!fullHeight}>
					<CardCarouselTask
						items={user.tasks}
						collapsed={props.collapsed}
						contentRef={contentRef}
					/>
				</Fade>

				<Fade when={!fullHeight} delay={250}>
					<CardCarouselTask
						items={user.tasks}
						collapsed={props.collapsed}
						contentRef={contentRef}
					/>
				</Fade>
			</Container>
		</div>
	);
}

export default Dashboard;
