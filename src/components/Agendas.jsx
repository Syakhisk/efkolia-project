import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CompletionStatus from "./CompletionStatus";
import EntryModal from "./EntryModal";

function Agendas(props) {
	const {
		match: { params },
	} = props;
	const history = useHistory();
	const { currentUser } = useAuth();
	const { agendas } = currentUser;
	const [modalShow, setModalShow] = useState(false);
	const [modalData, setModalData] = useState({});

	const handleEdit = (item) => {
		setModalData(item);
		setModalShow(true);
	};

	const renderedModal = modalShow ? (
		<EntryModal
			modalShow={modalShow}
			setModalShow={setModalShow}
			dataItem={modalData}
			type='edit'
		/>
	) : null;

	const renderedRow = agendas.map((agendaItem, idx) => (
		<tr key={idx}>
			<td>{idx + 1}</td>
			<td>{agendaItem.name}</td>
			<td>{agendaItem.description}</td>
			<td>
				<div className='d-flex justify-content-center align-items-center h-100'>
					<CompletionStatus status={agendaItem.status} wrap />
				</div>
			</td>
			<td>{agendaItem.deadline}</td>
			<td>
				<Button
					variant='outline-secondary'
					onClick={() => handleEdit(agendaItem)}
					block>
					Edit
				</Button>
			</td>
		</tr>
	));

	return (
		<div className='container-fluid p-3'>
			<div className='mb-3 bg-dark py-3 px-3 rounded'>
				<p className='mb-0'>
					📌 This is the place where you can see your all your tasks!
				</p>
			</div>
			<Table striped bordered hover size='sm'>
				<thead>
					<tr>
						<th style={{ maxWidth: "2rem" }}>#</th>
						<th style={{ maxWidth: "400px" }}>Agenda Name</th>
						<th style={{ maxWidth: "500px" }}>Description</th>
						<th>Status</th>
						<th>Deadline</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>{renderedRow}</tbody>
			</Table>
			{renderedModal}
		</div>
	);
}

export default Agendas;
