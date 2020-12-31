import React, { useState, useEffect } from "react";
import { Form, Button, Col, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import ModalComponent from "./ModalComponent";
import moment from "moment";

function EntryModal(props) {
	const { modalShow, setModalShow, type = "add", dataItem = {} } = props;
	const { currentUser, addEntry, updateEntry } = useAuth();

	const [formData, setFormData] = useState({ entryType: "task", status: 0 });

	const [formatHelper, setFormatHelper] = useState(false);
	const [error, setError] = useState("");
	const [dialog, setDialog] = useState("");

	useEffect(() => {
		if (type === "edit") {
			const deadline = dataItem.deadline?.split(" ");
			const obj = {
				entryType: dataItem.classCode ? "task" : "agenda",
				entryName: dataItem.name,
				selectedClass: dataItem.classCode,
				description: dataItem.description,
				dateDeadline: deadline ? deadline[0] : null,
				timeDeadline: deadline ? deadline[1] : null,
				status: dataItem.status,
			};

			setFormData({ ...formData, ...obj });
		}
	}, [modalShow]);

	const resetForm = () => {
		setFormData({
			entryType: "task",
			entryName: "",
			dateDeadline: "",
			timeDeadline: "",
			description: "",
			status: 0,
		});

		setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		const date = moment(formData.dateDeadline, "DD-MM-YY");
		const time = moment(formData.timeDeadline, ["HH:mm", "H:mm"], true);
		if (!date.isValid() || !time.isValid()) setError("Invalid date or time");
		else {
			let data = {};
			if (formData.entryType === "task") {
				data = {
					name: formData.entryName,
					classCode: formData.selectedClass,
					deadline: `${date.format("DD/MM/YY")} ${formData.timeDeadline}`,
					description: formData.description,
					status: Number(formData.status),
				};
			} else if (formData.entryType === "agenda") {
				data = {
					name: formData.entryName,
					deadline: `${date.format("DD/MM/YY")} ${formData.timeDeadline}`,
					description: formData.description,
					status: Number(formData.status),
				};
			}

			try {
				if (type === "add") {
					const addedType = await addEntry(formData.entryType, data);
					setDialog(`Added new ${addedType}: ${data.name}!`);
				} else if (type === "edit") {
					const oldData = dataItem;
					const addedType = await updateEntry(
						formData.entryType,
						data,
						oldData
					);
					setDialog(`Edited ${addedType}: ${data.name}!`);
					setModalShow(false);
					if (window.location.pathname !== "/dashboard")
						window.location.reload();
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
					// defaultValue={formData.selectedClass}
					value={formData.selectedClass}
					// onChange={(e) => setSelectedClass(e.target.value)}>
					onChange={(e) =>
						setFormData({ ...formData, selectedClass: e.target.value })
					}>
					{!formData.selectedClass ? (
						<option value=''>Select a class!</option>
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
					value={formData.entryName}
					// onChange={(e) => setEntryName(e.currentTarget.value)}
					onChange={(e) =>
						setFormData({ ...formData, entryName: e.currentTarget.value })
					}
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
					value={formData.entryName}
					// onChange={(e) => setEntryName(e.currentTarget.value)}
					onChange={(e) =>
						setFormData({ ...formData, entryName: e.currentTarget.value })
					}
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
					// onChange={(e) => setStatus(e.target.value)}
					onChange={(e) => setFormData({ ...formData, status: e.target.value })}
					defaultValue={0}
					value={formData.status}>
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
				header={type === "edit" ? "Edit Entry" : "Add New Entry"}
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
							value={formData.entryType}
							onChange={(e) =>
								setFormData({ ...formData, entryType: e.target.value })
							}>
							<option value='task'>Task</option>
							<option value='agenda'>Agenda</option>
						</Form.Control>
					</Form.Row>
					{formData.entryType === "task"
						? renderedTaskForm
						: renderedAgendaForm}

					<Form.Row className='mb-2'>
						<Form.Label>Description:</Form.Label>
						<Form.Control
							type='text'
							value={formData.description}
							// onChange={(e) => setDescription(e.currentTarget.value)}
							onChange={(e) =>
								setFormData({ ...formData, description: e.currentTarget.value })
							}
						/>
					</Form.Row>
					{type === "edit" ? renderedStatus : null}
					<Form.Row className='mb-2'>
						<Col className='p-0 mr-3'>
							<Form.Label>Deadline Date:</Form.Label>
							<Form.Control
								required
								type='text'
								placeholder='25/04/2020'
								value={formData.dateDeadline}
								// onChange={(e) => setDateDeadline(e.currentTarget.value)}
								onChange={(e) =>
									setFormData({
										...formData,
										dateDeadline: e.currentTarget.value,
									})
								}
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
								value={formData.timeDeadline}
								// onChange={(e) => setTimeDeadline(e.currentTarget.value)}
								onChange={(e) =>
									setFormData({
										...formData,
										timeDeadline: e.currentTarget.value,
									})
								}
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
							{type === "edit" ? "Apply Edit" : "Add"}
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
