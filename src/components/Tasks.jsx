import React, { useEffect, useState } from "react";
import { Button, Form, Table, Accordion } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import CompletionStatus from "./CompletionStatus";
import moment from "moment";
import { Redirect, useHistory } from "react-router-dom";
import EntryModal from "./EntryModal";

function Tasks(props) {
	const {
		match: { params },
	} = props;
	const history = useHistory();
	const { currentUser } = useAuth();
	const { tasks, classes } = currentUser;
	const [selectedClassCode, setSelectedClassCode] = useState(params.classCode);
	const [selectedClass, setSelectedClass] = useState({});

	const [modalShow, setModalShow] = useState(false);
	const [modalData, setModalData] = useState({});

	useEffect(() => {
		if (classes.length) {
			setSelectedClass(classes[0]);
			setSelectedClassCode(classes[0].classCode);
		}
	}, []);

	const handleEdit = (item) => {
		setModalData(item);
		setModalShow(true);
	};

	const renderedModal = (
		<EntryModal
			modalShow={modalShow}
			setModalShow={setModalShow}
			dataItem={modalData}
			type='edit'
		/>
	);

	const handleClassChange = (e) => {
		history.push(`/tasks/${e.target.value}`);
		setSelectedClassCode(e.target.value);
		setSelectedClass(classes.find((el) => el.classCode === e.target.value));
	};

	useEffect(() => {
		if (params.classCode) {
			const theClass = classes.find((el) => el.classCode === params.classCode);
			if (theClass) {
				setSelectedClassCode(theClass.classCode);
				setSelectedClass(theClass);
			} else {
				history.push("/tasks");
			}
		}
	}, [params.classCode]);

	const getFullDayName = (short) => {
		return moment(short, "ddd").format("dddd");
	};

	const renderedClass = classes.map((classItem, idx) => (
		<option key={idx} value={classItem.classCode}>
			{classItem.className}
		</option>
	));

	const noClassRender = (
		<div className='h-100 flex-column-center'>
			<div className='bg-dark rounded border p-3'>
				<h1 className='display-1'>🙈</h1>
				<h5>You currently have no class/subjects...</h5>
				<h6>
					but you can add them at{" "}
					<Button
						onClick={() => history.push("/subjects")}
						className='p-0 m-0 mb-1 px-1'>
						/subjects
					</Button>
				</h6>
			</div>
		</div>
	);

	const renderedRow = tasks
		.filter((e) => e.classCode === selectedClassCode)
		.map((taskItem, idx) => (
			<tr key={idx}>
				<td>{idx + 1}</td>
				<td>{taskItem.name}</td>
				<td>{taskItem.description}</td>
				<td>
					<div className='d-flex justify-content-center align-items-center h-100'>
						<CompletionStatus status={taskItem.status} />
					</div>
				</td>
				<td>{taskItem.deadline}</td>
				<td>
					<Button
						onClick={() => handleEdit(taskItem)}
						variant='outline-secondary'
						block>
						Edit
					</Button>
				</td>
			</tr>
		));

	return (
		<div className='container-fluid p-3'>
			{!classes.length ? (
				noClassRender
			) : (
				<>
					<Form>
						<Form.Group className='d-flex justify-content-center align-items-center'>
							<Form.Label className='m-0 p-0 mr-3'>Class:</Form.Label>
							<Form.Control
								className='bg-dark text-light'
								as='select'
								size='sm'
								custom
								defaultValue={selectedClassCode}
								onChange={(e) => handleClassChange(e)}>
								{renderedClass}
							</Form.Control>
						</Form.Group>
					</Form>

					<div className='mb-3 bg-dark py-3 px-3 rounded'>
						<Accordion defaultActiveKey='0'>
							<Accordion.Toggle
								eventKey='0'
								as={Button}
								variant='link'
								className='text-light p-0'>
								<p className='m-0 p-0'>Class Details</p>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey='0'>
								<div>
									<hr
										className='my-0 mt-2'
										style={{ border: "1px solid rgba(255,255,255,0.1)" }}
									/>
									<h6 className='mb-0 mt-3'>Class Name:</h6>
									<h1 className='display-3 p-0' style={{ lineHeight: "4rem" }}>
										{selectedClass.className}
									</h1>
									<h6 className='mb-0 mt-3'>Lecturer:</h6>
									<h6>{selectedClass.namaDosen}</h6>
									<h6 className='mb-0 mt-3'>Schedule:</h6>
									<h6>{`${getFullDayName(selectedClass.schedule?.day)}, ${
										selectedClass.schedule?.timeStart
									} - ${selectedClass.schedule?.timeEnd}`}</h6>
								</div>
							</Accordion.Collapse>
						</Accordion>
					</div>

					<Table striped bordered hover size='sm'>
						<thead>
							<tr>
								<th style={{ width: "2rem" }}>#</th>
								<th style={{ width: "400px" }}>Task Name</th>
								<th style={{ width: "500px" }}>Description</th>
								<th>Status</th>
								<th>Deadline</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>{renderedRow}</tbody>
					</Table>
				</>
			)}

			{renderedModal}
		</div>
	);
}

export default Tasks;
