import React from "react";
import { Modal } from "react-bootstrap";

function ModalComponent(props) {
	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Modal.Header className='bg-dark' closeButton>
				{props.header}
			</Modal.Header>
			<Modal.Body className='bg-dark'>{props.children}</Modal.Body>
			<Modal.Footer className='bg-dark'>{props.footer}</Modal.Footer>
		</Modal>
	);
}

export default ModalComponent;
