import React from "react";
import { Button, Table } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import CompletionStatus from "./CompletionStatus";

function Agendas() {
	const { currentUser, getClassData } = useAuth();
	const { agendas, classes } = currentUser;
	const renderedRow = agendas
		.map((agendaItem, idx) => (
			<tr key={idx}>
				<td>{idx + 1}</td>
				<td>{agendaItem.name}</td>
				<td>
					<div className='d-flex justify-content-center align-items-center h-100'>
						<CompletionStatus status={agendaItem.status} />
					</div>
				</td>
				<td>{agendaItem.deadline}</td>
				<td>
					<Button variant='outline-secondary' block>
						Edit
					</Button>
				</td>
			</tr>
		));

	return (
		<div className='container-fluid p-3'>
			<Table striped bordered hover size='sm'>
				<thead>
					<tr>
						<th style={{ width: "2rem" }}>#</th>
						<th>Agenda Name</th>
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

export default Agendas;
