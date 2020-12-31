import React from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import moment from "moment";

function Timetable() {
	const { currentUser } = useAuth();
	const { classes } = currentUser;
	const history = useHistory();
	const classByDay = {
		mon: classes.filter((classItem) => classItem.schedule.day === "mon"),
		tue: classes.filter((classItem) => classItem.schedule.day === "tue"),
		wed: classes.filter((classItem) => classItem.schedule.day === "wed"),
		thu: classes.filter((classItem) => classItem.schedule.day === "thu"),
		fri: classes.filter((classItem) => classItem.schedule.day === "fri"),
		sat: classes.filter((classItem) => classItem.schedule.day === "sat"),
		sun: classes.filter((classItem) => classItem.schedule.day === "sun"),
	};

	const handleGoToSubjects = (e) => {
		if (
			window.confirm(
				"You can add/remove class at the /subjects page \n\ngo to /subjects?"
			)
		)
			history.push("/subjects");
	};

	const classComponent = (classItem) => (
		<div
			className='timetable-item mb-2'
			onClick={() => history.push(`/tasks/${classItem.classCode}`)}>
			<div className='alert alert-secondary p-0 m-0'>{classItem.className}</div>
			<small className='d-block'>{classItem.namaDosen}</small>
			<small className='d-block'>{`${classItem.schedule.timeStart} - ${classItem.schedule.timeEnd}`}</small>
		</div>
	);

	return (
		<>
			<div className='container-fluid p-3'>
				<div className='row mb-3 bg-dark py-3 px-3 rounded mx-auto'>
					<p className='col-md col-lg-10 flex-grow-1 mb-md-2 p-0 m-lg-0 d-flex align-items-center'>
						📄 This is the place where you can see your timetable!
					</p>
					<Button
						onClick={(e) => handleGoToSubjects(e)}
						variant='success'
						className='col-sm'>
						Add class/subjects <BiPlus />
					</Button>
				</div>
				<div
					className='row justify-content-center'
					style={{ overflowX: "auto" }}>
					{[
						"Monday",
						"Tuesday",
						"Wednesday",
						"Friday",
						"Saturday",
						"Sunday",
					].map((dayName) => (
						<>
							<ul className='mb-5'>
								<li className='h6 timetable-day'>{`📅 ${dayName}`}</li>
								{classByDay[
									moment(dayName, "dddd").format("ddd").toLowerCase()
								].map((item) => classComponent(item))}
							</ul>
							{/* <div className='vl p-0 m-0'></div> */}
						</>
					))}
				</div>
			</div>
		</>
	);
}

export default Timetable;
