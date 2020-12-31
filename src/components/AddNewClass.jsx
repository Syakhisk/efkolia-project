import React, { useState } from "react";
import { Form, Button, Col, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import ModalComponent from "./ModalComponent";
import moment from "moment";

function AddNewClass(props) {
	const { modalShow, setModalShow } = props;
	const { addClass } = useAuth();
	const [entryName, setEntryName] = useState("");
	const [lecturerName, setLecturerName] = useState("");
	const [timeEnd, setTimeEnd] = useState("");
	const [timeStart, setTimeStart] = useState("");
	const [selectedDay, setSelectedDay] = useState("mon");
	const [classCode, setClassCode] = useState("");

	const [error, setError] = useState("");
	const [dialog, setDialog] = useState("");

	const resetForm = () => {
		setLecturerName("");
		setSelectedDay("mon");
		setEntryName("");
		setClassCode("");
		setTimeStart("");
		setTimeEnd("");
		setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		const timeS = moment(timeStart, ["HH:mm", "H:mm"], true);
		const timeE = moment(timeEnd, ["HH:mm", "H:mm"], true);
		if (!timeS.isValid() || !timeE.isValid()) setError("Invalid date or time");
		else {
			const data = {
				className: entryName,
				classCode: classCode,
				namaDosen: lecturerName,
				schedule: {
					day: selectedDay,
					timeStart: timeStart,
					timeEnd: timeEnd,
				},
			};

			try {
				addClass(data);
				setDialog(
					`Added new class: ${data.className}, with code ${data.classCode}!`
				);
				resetForm();
			} catch (er) {
				console.log(er);
				setError(`Failed to add class`);
			}
		}
	};

	return (
		<ModalComponent
			show={modalShow}
			onHide={() => {
				resetForm();
				setDialog("");
				setModalShow(false);
			}}
			header='Add New Class/Subject'
			dialogClassName='modal-dialog'>
			{!error ? null : <Alert variant='danger'>{error}</Alert>}
			{!dialog ? null : <Alert variant='success'>{dialog}</Alert>}
			<Form className='px-3' onSubmit={(e) => handleSubmit(e)}>
				<Form.Row className='mb-2'>
					<Form.Label>Class/Subject Name:</Form.Label>
					<Form.Control
						required
						type='text'
						value={entryName}
						onChange={(e) => setEntryName(e.currentTarget.value)}
					/>
				</Form.Row>

				<Form.Row className='mb-2'>
					<Form.Label>Class/Subject Code:</Form.Label>
					<Form.Control
						required
						type='text'
						value={classCode}
						onChange={(e) => setClassCode(e.currentTarget.value)}
					/>
				</Form.Row>

				<Form.Row className='mb-2'>
					<Form.Label>Lecturer:</Form.Label>
					<Form.Control
						required
						type='text'
						value={lecturerName}
						onChange={(e) => setLecturerName(e.currentTarget.value)}
					/>
				</Form.Row>

				<Form.Row className='mb-2'>
					<Form.Label>Day:</Form.Label>
					<Form.Control
						required
						as='select'
						size='sm'
						custom
						onChange={(e) => setSelectedDay(e.target.value)}>
						{[
							"Monday",
							"Tuesday",
							"Wednesday",
							"Thursday",
							"Friday",
							"Saturday",
							"Sunday",
						].map((dayItem) => (
							<option
								value={moment(dayItem, "dddd").format("ddd").toLowerCase()}>
								{dayItem}
							</option>
						))}
					</Form.Control>
				</Form.Row>

				<Form.Label>Time:</Form.Label>
				<Form.Row className='mb-2'>
					<Col className='p-0 mr-3'>
						<Form.Control
							required
							type='text'
							placeholder='10:00'
							value={timeStart}
							onChange={(e) => setTimeStart(e.currentTarget.value)}
						/>
					</Col>
					<Col className='p-0'>
						{/* <Form.Label>Time End:</Form.Label> */}
						<Form.Control
							required
							type='text'
							placeholder='13:15'
							value={timeEnd}
							onChange={(e) => setTimeEnd(e.currentTarget.value)}
						/>
					</Col>
				</Form.Row>

				<Form.Row className='mt-4'>
					<div className='ml-auto' />
					<Button
						type='submit'
						variant='outline-secondary'
						className='mr-3 px-3'>
						Add
					</Button>
					<Button
						variant='outline-danger'
						onClick={() => {
							setModalShow(false);
							setDialog("");
							resetForm();
						}}
						className='px-3'>
						{dialog ? "Done" : "Cancel"}
					</Button>
				</Form.Row>
			</Form>
		</ModalComponent>
	);
}

export default AddNewClass;
