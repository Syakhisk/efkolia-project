import React, { useState } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { MdModeEdit } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ModalComponent from "./ModalComponent";

function Profile() {
	const { currentUser, changePassword } = useAuth();
	const history = useHistory();
	const [firstName, setFirstName] = useState(currentUser._firstName);
	const [lastName, setLastName] = useState(currentUser._lastName);
	const [email, setEmail] = useState(currentUser.email);
  const [modalShow, setModalShow] = useState(false);
  
	return (
		<Card bg='dark' border='light' className='m-3'>
			<Card.Header>
				<Row>
					<Col md={12} lg='auto'>
						<div className='avatar-container' style={{}}>
							<img
								src='https://i.pravatar.cc/200'
								className='rounded-circle'
								style={{
									maxWidth: "200px",
									width: "100%",
									height: "100%",
									objectFit: "cover",
								}}
							/>
						</div>
					</Col>
					<Col
						md={12}
						lg='7'
						className='d-flex flex-column justify-content-center py-3'>
						<h2>
							{currentUser._firstName} {currentUser._lastName}
						</h2>
						<small>{currentUser.email}</small>
					</Col>
				</Row>
			</Card.Header>
			<Card.Body className='d-flex justify-content-center'>
				{/* <Card.Text>quick text</Card.Text> */}
				<Form className='col-12 col-lg-8'>
					<Form.Row>
						<h6>My Profile</h6>
					</Form.Row>
					<Form.Row>
						<Form.Group
							className='col-md-6 col-sm-12 pl-0'
							as={Col}
							controlId='formGridFirstName'>
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type='text'
								value={firstName}
								onChange={(e) => setFirstName(e.currentTarget.value)}
							/>
						</Form.Group>

						<Form.Group
							className='col-md-6 col-sm-12'
							as={Col}
							controlId='formGridLastName'>
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type='text'
								value={lastName}
								onChange={(e) => setLastName(e.currentTarget.value)}
							/>
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Label>Email</Form.Label>
						<Form.Control
							type='email'
							value={email}
							onChange={(e) => setEmail(e.currentTarget.value)}
						/>
					</Form.Row>
					<hr />

					<Form.Row>
						<h6>Password and Authentication</h6>
					</Form.Row>
					<Form.Row>
						<Button
							variant='outline-warning'
							className='mr-3 col-sm-12 col-md-auto px-3 my-2'
							onClick={() => setModalShow(true)}>
							Change Password
						</Button>
					</Form.Row>

					<Form.Row className='mt-4 d-flex flex-row-reverse'>
						<Button
							variant='outline-secondary'
							className='mr-3 col-sm-12 col-md-auto px-3 my-2'>
							Apply
						</Button>
						<Button
							variant='outline-danger'
							onClick={() => {
								setFirstName(currentUser._firstName);
								setLastName(currentUser._lastName);
								setEmail(currentUser.email);
							}}
							className='mr-3 col-sm-12 col-md-auto px-3 my-2'>
							Discard
						</Button>
					</Form.Row>
				</Form>
			</Card.Body>
			<ModalComponent
				show={modalShow}
				onHide={() => setModalShow(false)}
				header='Change Password'
				dialogClassName='modal-dialog'
				footer={
					<div>
						<Button variant='outline-secondary' className='mr-3 px-3'>
							Apply
						</Button>
						<Button
							variant='outline-danger'
							onClick={() => setModalShow(false)}
							className='px-3'>
							Discard
						</Button>
					</div>
				}>
				<Form className='px-3'>
					<Form.Row className='mb-3'>
						<Form.Label>New Password</Form.Label>
						<Form.Control type='password' />
					</Form.Row>
					<Form.Row>
						<Form.Label>Confirm New Password</Form.Label>
						<Form.Control type='password' />
					</Form.Row>
				</Form>
			</ModalComponent>
		</Card>
	);
}

export default Profile;
