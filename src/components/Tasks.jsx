import React, { useEffect, useState } from "react";
import { Button, Form, Table, Accordion } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import CompletionStatus from "./CompletionStatus";

function Tasks() {
	const { currentUser, getClassData } = useAuth();
	const { tasks, classes } = currentUser;
	const [selectedClass, setSelectedClass] = useState(classes[0].classCode);

	const renderedClass = classes.map((classItem, idx) => (
		<option
			key={idx}
			className='h1'
			key={classItem.classCode}
			value={classItem.classCode}>
			{classItem.className}
		</option>
	));

	const renderedRow = tasks
		.filter((e) => e.classCode == selectedClass)
		.map((taskItem, idx) => (
			<tr key={idx}>
				<td>{idx + 1}</td>
				<td>{taskItem.name}</td>
				<td>
					<div className='d-flex justify-content-center align-items-center h-100'>
						<CompletionStatus status={taskItem.status} />
					</div>
				</td>
				<td>{taskItem.deadline}</td>
				<td>
					<Button variant='outline-secondary' block>
						Edit
					</Button>
				</td>
			</tr>
		));

	return (
		<div className='container-fluid p-3'>
			<Form>
				<Form.Group className='d-flex justify-content-center align-items-center'>
					<Form.Label className='m-0 p-0 mr-3'>Class:</Form.Label>
					<Form.Control
						className='bg-dark text-light'
						onChange={(e) => setSelectedClass(e.target.value)}
						as='select'
						size='sm'
						custom>
						{renderedClass}
					</Form.Control>
				</Form.Group>
			</Form>

			<div className='mb-3 bg-dark py-3 px-3 rounded'>
				<Accordion defaultActiveKey='0'>
					<Accordion.Toggle eventKey='0' as={Button} variant="link" className="text-light p-0">
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
								{classes.find((el) => el.classCode == selectedClass).className}
							</h1>
							<h6 className='mb-0 mt-3'>Lecturer:</h6>
							<h4>
								{classes.find((el) => el.classCode == selectedClass).namaDosen}
							</h4>
							<h6 className='mb-0 mt-3'>Schedule:</h6>
							<h4>
								{JSON.stringify(
									classes.find((el) => el.classCode == selectedClass).schedule
								)}
							</h4>
						</div>
					</Accordion.Collapse>
				</Accordion>
			</div>

			<Table striped bordered hover size='sm'>
				<thead>
					<tr>
						<th style={{ width: "2rem" }}>#</th>
						<th>Task Name</th>
						<th>Status</th>
						<th>Deadline</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>{renderedRow}</tbody>
			</Table>
		</div>
	);
}

export default Tasks;
