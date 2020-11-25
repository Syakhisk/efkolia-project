import React, { useEffect, useState, useRef } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import headerBg from "../assets/landscape-background.jpg";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useWindowSize } from "../hooks/useWindowSize";

import CardCarousel from "./CardCarousel";

import user from "../objects/user";

function Dashboard(props) {
	const [fullHeight, setFullHeight] = useState(true);
	const size = useWindowSize();
	// const [dashboardRef, dashboardSize] = useDimensions();

	const contentRef = useRef(0)

	const headerStyling = {
		background: "#a3a3a3",
		backgroundImage: `url(${headerBg})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		height: fullHeight ? size.height - 56 : "200px",
		transition: "0.3s",
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleScroll = (e) => {
		// if (window.scrollY == 0) {
		// 	// setHeaderStyle("fullheight");
		// 	setFullHeight(true);
		// } else {
		// 	// setHeaderStyle("");
		// 	setFullHeight(false);
		// }
		setFullHeight(false);
	};

	const handleFullHeight = (e) => {
		setFullHeight(!fullHeight);
	};

	const truncate = {
		display: "-webkit-box",
		WebkitBoxOrient: "vertical",
		WebkitLineClamp: 1,
		overflow: "hidden",
		textOverflow: "ellipsis",
	};

	// console.log(user.getTaskWithStatus(0).map(t => t.name).join(", "));
	// console.log(dashboardSize);

	return (
		<div id="content-wrapper" ref={contentRef}>
			<Container
				fluid
				className={`welcome-container p-3 ${
					!fullHeight ? "dash-minified" : ""
				}`}
				style={headerStyling}>
				<Row>
					<Col sm md={9} className='pb-2 pb-sm-1'>
						<div className='display-4'>
							Hello, {user.name}
							<Button
								className='ml-2 ml-lg-3'
								variant='outline-primary'
								size='sm'
								onClick={() => handleFullHeight(true)}>
								Toggle Dashboard
							</Button>
						</div>
					</Col>
					{/* <Col sm className='d-flex justify-content-sm-start'>
						<div className='clock-container'>
							<h3 className='mb-0'>Tuesday, June 9th</h3>
							<div className='display-3 mb-0'>16:00</div>
						</div>
					</Col> */}
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
						<h1>{user.getUnfinishedTask().length} Task(s)</h1>
						<p style={truncate}>
							{user
								.getUnfinishedTask()
								.map((t) => t.name)
								.join(", ")}
						</p>
						<div className='bottom-right'>
							<Button className='btn-primary btn-sm'>Go to Tasks</Button>
						</div>
					</Col>
					<Col sm className='d-flex flex-column'>
						<h1>{user.getAgendaWithStatus(0).length} Agenda(s)</h1>
						<p style={truncate}>
							{user
								.getAgendaWithStatus(0)
								.map((t) => t.name)
								.join(", ")}
						</p>
						<div className='bottom-right'>
							<Button className='btn-primary btn-sm'>Go to Agendas</Button>
						</div>
					</Col>
				</Row>

				<div className='music-container'>
					<h3>Music?</h3>
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
			</Container>

			<Container fluid className="d-flex justify-content-center">
				<CardCarousel
					items={user.tasks}
					collapsed={props.collapsed}
					contentRef={contentRef}
				/>
			</Container>
		</div>
	);
}

export default Dashboard;
