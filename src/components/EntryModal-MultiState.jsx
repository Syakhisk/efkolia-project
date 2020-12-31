import React, { useState, useEffect } from "react";
import { Form, Button, Col, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import ModalComponent from "./ModalComponent";
import moment from "moment";

function EntryModal(props) {
	const { modalShow, setModalShow, type = "add", dataItem = {} } = props;
	const { currentUser, addEntry, updateEntry } = useAuth();

	const [entryType, setEntryType] = useState("task");
	const [selectedClass, setSelectedClass] = useState(
		currentUser?.classes[0]?.classCode
	);
	const [entryName, setEntryName] = useState("");
	// const [entryCode, setEntryCode] = useState("");
	const [timeDeadline, setTimeDeadline] = useState("");
	const [dateDeadline, setDateDeadline] = useState("");
	const [reminder, setReminder] = useState([]);
	const [status, setStatus] = useState(0);
	const [description, setDescription] = useState("");
	const [formatHelper, setFormatHelper] = useState(false);

	const [error, setError] = useState("");
	const [dialog, setDialog] = useState("");

	// console.log("0", status)

	useEffect(() => {
		if (type === "edit") {
			const deadline = dataItem.deadline?.split(" ");
			setEntryName(dataItem.name);
			setSelectedClass(dataItem.classCode);
			if (entryType == "tasks") setSelectedClass(dataItem.classCode);
			setDescription(dataItem.description);
			setTimeDeadline(deadline ? deadline[1] : "");
			setDateDeadline(deadline ? deadline[0] : "");
			setStatus(Number(dataItem.status));
			console.log("data:", dataItem);
			console.log("classcode:", selectedClass);
		}
	}, [modalShow]);

	const resetForm = () => {
		// setModalShow(false);
		setEntryType("task");
		setEntryName("");
		setDateDeadline("");
		setTimeDeadline("");
		setDescription("");
		setReminder("");
		setStatus(0);

		setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		const date = moment(dateDeadline, "DD-MM-YY");
		const time = moment(timeDeadline, ["HH:mm", "H:mm"], true);
		if (!date.isValid() || !time.isValid()) setError("Invalid date or time");
		else {
			let data = {};
			if (entryType == "task") {
				data = {
					name: entryName,
					classCode: selectedClass,
					deadline: `${date.format("DD/MM/YY")} ${timeDeadline}`,
					description: description,
					status: Number(status),
				};
			} else if (entryType == "agenda") {
				data = {
					name: entryName,
					deadline: `${date.format("DD/MM/YY")} ${timeDeadline}`,
					description: description,
					status: Number(status),
				};
			}

			try {
				if (type == "add") {
					const addedType = await addEntry(entryType, data);
					setDialog(`Added new ${addedType}: ${data.name}!`);
				} else if (type == "edit") {
					const oldData = dataItem;
					const addedType = await updateEntry(entryType, data, oldData);
					setDialog(`Edited ${addedType}: ${data.name}!`);
				}
				resetForm();
			} catch (er) {
				console.log(er);
				console.log(data);
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
					defaultValue={selectedClass}
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

	const renderedStatus = (
		<>
			<Form.Row className='mb-2'>
				<Form.Label>Status:</Form.Label>
				<Form.Control
					as='select'
					size='sm'
					custom
					onChange={(e) => setStatus(e.target.value)}
					defaultValue={status}>
					<option value={0}>Not Started</option>
					<option value={1}>On Going</option>
					<option value={2}>Done</option>
				</Form.Control>
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
				header={type == "edit" ? "Edit Entry" : "Add New Entry"}
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
							onChange={(e) => setEntryType(e.target.value)}
							defaultValue={entryType}>
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
					{type == "edit" ? renderedStatus : null}
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
							{type == "edit" ? "Apply Edit" : "Add"}
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

export default EntryModal;
