import React, { useState } from "react";
import { Form, Button, Col, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import ModalComponent from "./ModalComponent";
import moment from "moment";

function AddNewEntry(props) {
	const { modalShow, setModalShow } = props;
	const { currentUser, addEntry } = useAuth();

	const [entryType, setEntryType] = useState("task");
	const [selectedClass, setSelectedClass] = useState(
		currentUser?.classes[0]?.classCode
	);
	const [entryName, setEntryName] = useState("");
	// const [entryCode, setEntryCode] = useState("");
	const [timeDeadline, setTimeDeadline] = useState("");
	const [dateDeadline, setDateDeadline] = useState("");
	const [reminder, setReminder] = useState([]);
	const [description, setDescription] = useState("");
	const [formatHelper, setFormatHelper] = useState(false);

	const [error, setError] = useState("");
	const [dialog, setDialog] = useState("");

	const resetForm = () => {
		// setModalShow(false);
		setEntryType("task");
		setEntryName("");
		setDateDeadline("");
		setTimeDeadline("");
		setDescription("");
		setReminder("");

		setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		const date = moment(dateDeadline, "dd/mm/yy");
		const time = moment(timeDeadline, ["HH:mm", "H:mm"], true);
		if (!date.isValid() || !time.isValid()) setError("Invalid date or time");
		else {
			const data = {
				name: entryName,
				classCode: selectedClass,
				deadline: `${dateDeadline} ${timeDeadline}`,
				description: description,
				status: 0,
			};

			try {
				const addedType = await addEntry(entryType, data);
				setDialog(`Added new ${addedType}: ${data.name}!`);
				resetForm();
			} catch (er) {
				console.log(er);
				setError(`Failed to add task/agenda`);
			}
		}
	};

	const renderedTaskForm = (
		<>
			<Form.Row className='mb-2'>
				<Form.Label>Class:</Form.Label>
				<Form.Control
					required
					as='select'
					size='sm'
					custom
					onChange={(e) => setSelectedClass(e.target.value)}>
					{!selectedClass ? (
						<option value=''>You got no class :(</option>
					) : null}
					{currentUser?.classes.map((classItem, idx) => (
						<option key={idx} value={classItem.classCode}>
							{classItem.className}
						</option>
					))}
				</Form.Control>
			</Form.Row>
			<Form.Row className='mb-2'>
				<Form.Label>Task Name:</Form.Label>
				<Form.Control
					required
					type='text'
					value={entryName}
					onChange={(e) => setEntryName(e.currentTarget.value)}
				/>
			</Form.Row>
		</>
	);

	const renderedAgendaForm = (
		<>
			<Form.Row className='mb-2'>
				<Form.Label>Agenda Name:</Form.Label>
				<Form.Control
					required
					type='text'
					value={entryName}
					onChange={(e) => setEntryName(e.currentTarget.value)}
				/>
			</Form.Row>
		</>
	);

	return (
		<>
			<ModalComponent
				show={modalShow}
				onHide={() => {
					resetForm();
					setDialog("");
					setModalShow(false);
				}}
				header='Add New Entry'
				dialogClassName='modal-dialog'>
				{!error ? null : <Alert variant='danger'>{error}</Alert>}
				{!dialog ? null : <Alert variant='success'>{dialog}</Alert>}
				<Form className='px-3' onSubmit={(e) => handleSubmit(e)}>
					<Form.Row className='w-25 mb-2'>
						<Form.Label>Type:</Form.Label>
						<Form.Control
							as='select'
							size='sm'
							custom
							onChange={(e) => setEntryType(e.target.value)}>
							<option value='task'>Task</option>
							<option value='agenda'>Agenda</option>
						</Form.Control>
					</Form.Row>
					{entryType === "task" ? renderedTaskForm : renderedAgendaForm}
					<Form.Row className='mb-2'>
						<Form.Label>Description:</Form.Label>
						<Form.Control
							type='text'
							value={description}
							onChange={(e) => setDescription(e.currentTarget.value)}
						/>
					</Form.Row>
					<Form.Row className='mb-2'>
						<Form.Label>Reminder:</Form.Label>
						<Form.Control
							type='text'
							value={reminder}
							onChange={(e) => setReminder(e.currentTarget.value)}
						/>
					</Form.Row>
					<Form.Row className='mb-2'>
						<Col className='p-0 mr-3'>
							<Form.Label>Deadline Date:</Form.Label>
							<Form.Control
								required
								type='text'
								placeholder='25/04/2020'
								value={dateDeadline}
								onChange={(e) => setDateDeadline(e.currentTarget.value)}
								onFocus={() => setFormatHelper(true)}
								onBlur={() => setFormatHelper(false)}
							/>
							<small className={formatHelper ? "d-block" : "d-none"}>
								Format: dd/mm/yy
							</small>
						</Col>
						<Col className='p-0'>
							<Form.Label>Deadline Time:</Form.Label>
							<Form.Control
								required
								type='text'
								placeholder='13:15'
								value={timeDeadline}
								onChange={(e) => setTimeDeadline(e.currentTarget.value)}
								onFocus={() => setFormatHelper(true)}
								onBlur={() => setFormatHelper(false)}
							/>
							<small className={formatHelper ? "d-block" : "d-none"}>
								Format: 24h
							</small>
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
		</>
	);
}

export default AddNewEntry;
