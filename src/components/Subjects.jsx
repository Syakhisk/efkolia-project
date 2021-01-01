import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import moment from "moment";
import { BiPlus } from "react-icons/bi";
import { BsFillTrashFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
import AddNewClass from "./AddNewClass";

function Subjects() {
	const { currentUser, removeClass } = useAuth();
	const { classes, tasks } = currentUser;
	const [modalShow, setModalShow] = useState(false);

	const getFullDayName = (short) => {
		return moment(short, "ddd").format("dddd");
	};

	const handleConfirm = (classItem) => {
		if (
			window.confirm(
				`Are you sure to delete the '${classItem.className}' class?`
			)
		) {
			const classTasks = tasks.filter(
				(el) => el.classCode == classItem.classCode
			);
			try {
				removeClass(classItem, classTasks);
				window.location.reload();
			} catch (err) {
				console.log(err);
			}
		}
	};

	const renderedRow = classes.map((classItem, idx) => (
		<tr key={idx}>
			<td>{idx + 1}</td>
			<td>{classItem.className}</td>
			<td>{classItem.namaDosen}</td>
			<td>{getFullDayName(classItem.schedule.day)}</td>
			<td>{`${classItem.schedule.timeStart} - ${classItem.schedule.timeEnd}`}</td>
			<td className='d-flex vh-center'>
				<Button
					onClick={(e) => handleConfirm(classItem)}
					variant='outline-danger'>
					<BsFillTrashFill />
				</Button>
			</td>
		</tr>
	));

	return (
		<div className='container-fluid p-3'>
			<div className='row mb-3 bg-dark py-3 px-3 rounded mx-auto'>
				<p className='col-md col-lg-10 flex-grow-1 mb-md-2 p-0 m-lg-0 d-flex align-items-center'>
					📚 This is the place where you can see your subject details!
				</p>
				<Button
					variant='success'
					className='col-sm'
					onClick={() => setModalShow(true)}>
					Add class/subjects <BiPlus />
				</Button>
			</div>
			<Table striped bordered hover size='sm'>
				<thead>
					<tr>
						<th
							rowSpan='2'
							style={{ maxWidth: "2rem", verticalAlign: "middle" }}>
							#
						</th>
						<th rowSpan='2' style={{ width: "400px", verticalAlign: "middle" }}>
							Subjects Name
						</th>
						<th
							rowSpan='2'
							style={{ maxWidth: "500px", verticalAlign: "middle" }}>
							Lecturer
						</th>
						<th colSpan='2' style={{ textAlign: "center" }}>
							Schedule
						</th>
						<th
							rowSpan='2'
							style={{ maxWidth: "400px", verticalAlign: "middle" }}>
							Action
						</th>
					</tr>
					<tr>
						<th>Day</th>
						<th>Time</th>
					</tr>
				</thead>
				<tbody>{renderedRow}</tbody>
			</Table>
			<AddNewClass modalShow={modalShow} setModalShow={setModalShow} />
		</div>
	);
}

export default Subjects;
