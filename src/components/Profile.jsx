import React, { useState, useRef, useEffect } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import Modal from "./ModalComponent";
import { useHistory } from "react-router-dom";

function Profile() {
	const history = useHistory();
	const { currentUser, changePassword, changeEmail, editProfile } = useAuth();
	const [firstName, setFirstName] = useState(currentUser._firstName);
	const [lastName, setLastName] = useState(currentUser._lastName);
	const [email, setEmail] = useState(currentUser.email);
	const [modalShow, setModalShow] = useState(false);
	const [alertModalShow, setAlertModalShow] = useState(false);
	const [modalData, setModalData] = useState({});

	const [loading, setLoading] = useState(false);
	const [buttonShow, setButtonShow] = useState(false);

	const newEmailRef = useRef("");
	const passwordRef = useRef("");
	const newPasswordRef = useRef("");
	const confirmNewPasswordRef = useRef("");

	useEffect(() => {
		// if (
		// 	lastName == currentUser._lastName ||
		// 	firstName == currentUser._firstName
		// ) {
		// 	setButtonShow(true);
		// } else {
		// 	setButtonShow(false);
		// }

		// console.log(buttonShow);
		if (
			lastName !== currentUser._lastName ||
			firstName !== currentUser._firstName
		) {
			setButtonShow(true);
		} else {
			setButtonShow(false);
		}
	}, [firstName, lastName]);

	const handleChangeEmail = async () => {
		const newEmail = newEmailRef.current.value;
		const password = passwordRef.current.value;

		setLoading(true);
		try {
			await changeEmail(email, password, newEmail);
			setModalShow(false);

			setLoading(false);
			window.alert("Email successfully changed!");
			window.location.reload();
		} catch (error) {
			console.log(error);
			window.alert(`Failed to change email\ncode: ${error.code}`);
			setLoading(false);
		}
	};
	const handleChangePassword = async () => {
		const password = passwordRef.current.value;
		const newPassword = newPasswordRef.current.value;
		const confirmNewPassword = confirmNewPasswordRef.current.value;

		setLoading(true);

		if (newPassword !== confirmNewPassword) {
			window.alert("Password don't match!");
			setLoading(false);
		} else {
			try {
				await changePassword(email, password, newPassword);
				setModalShow(false);
				setLoading(false);
				window.alert("Password successfully changed!");
				window.location.reload();
			} catch (error) {
				console.log(error);
				window.alert(`Failed to change password\ncode: ${error.code}`);
				setLoading(false);
			}
		}
	};

	const handleModal = (isShow, data) => {
		if (data === "password") {
			setModalData({
				header: "Change Password",
				onApply: () => handleChangePassword(),
				onDiscard: () => setModalShow(false),
				content: (
					<Form className='px-3'>
						<Form.Row className='mb-3'>
							<Form.Label>Current Email</Form.Label>
							<Form.Control type='text' value={currentUser._email} readOnly />
						</Form.Row>
						<Form.Row className='mb-3'>
							<Form.Label>Current Password</Form.Label>
							<Form.Control type='password' ref={passwordRef} />
						</Form.Row>
						<Form.Row className='mb-3'>
							<Form.Label>New Password</Form.Label>
							<Form.Control
								type='password'
								// onChange={(e) => setNewPassword(e.currentTarget.value)}
								ref={newPasswordRef}
							/>
						</Form.Row>
						<Form.Row>
							<Form.Label>Confirm New Password</Form.Label>
							<Form.Control
								type='password'
								// onChange={(e) => setConfirmNewPassword(e.currentTarget.value)}
								ref={confirmNewPasswordRef}
							/>
						</Form.Row>
					</Form>
				),
			});
		} else if (data === "email") {
			setModalData({
				header: "Change Email",
				onDiscard: () => setModalShow(false),
				onApply: () => handleChangeEmail(),
				content: (
					<Form className='px-3'>
						<Form.Row className='mb-3'>
							<Form.Label>Current Email</Form.Label>
							<Form.Control type='text' value={currentUser._email} readOnly />
						</Form.Row>
						<Form.Row className='mb-3'>
							<Form.Label>New Email</Form.Label>
							<Form.Control
								type='email'
								// onChange={(e) => setNewEmail(e.currentTarget.value)}
								ref={newEmailRef}
							/>
						</Form.Row>
						<Form.Row className='mb-3'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								// onChange={(e) => setPassword(e.currentTarget.value)}
								ref={passwordRef}
							/>
						</Form.Row>
					</Form>
				),
			});
		}
		setModalShow(isShow);
	};

	const handleApply = async () => {
		setLoading(true);
		try {
			await editProfile(firstName, lastName);
			window.alert("Profile updated successfully");
			window.location.reload();
		} catch (error) {
			console.log(error);
			window.alert(`Failed to update profile\ncode: ${error.code}`);
			setLoading(false);
		}
	};

	return (
		<>
			<Card bg='dark' border='light' className='m-3'>
				<Card.Header>
					<Row>
						<Col md={12} lg='auto'>
							<div className='avatar-container'></div>
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
						</Form.Row>
						<Form.Row>
							<Button
								variant='outline-warning'
								className='mr-3 col-sm-12 col-md-auto px-3 my-2'
								onClick={() => handleModal(true, "email")}>
								Change Email
							</Button>
						</Form.Row>
						<hr />

						<Form.Row>
							<h6>Password and Authentication</h6>
						</Form.Row>
						<Form.Row>
							<Button
								variant='outline-warning'
								className='mr-3 col-sm-12 col-md-auto px-3 my-2'
								onClick={() => handleModal(true, "password")}>
								Change Password
							</Button>
						</Form.Row>

						<Form.Row
							className={`mt-4 flex-row-reverse ${
								buttonShow ? "d-flex" : "d-none"
							}`}>
							<Button
								onClick={() => handleApply()}
								variant='outline-primary'
								className='mr-3 col-sm-12 col-md-auto px-3 my-2'>
								Apply
							</Button>
							<Button
								variant='outline-danger'
								onClick={() => {
									if (window.confirm("Are you sure you wish to discard?")) {
										setFirstName(currentUser._firstName);
										setLastName(currentUser._lastName);
										setEmail(currentUser.email);
									}
								}}
								className='mr-3 col-sm-12 col-md-auto px-3 my-2'>
								Discard
							</Button>
						</Form.Row>
					</Form>
				</Card.Body>
				<Modal
					show={modalShow}
					onHide={() => setModalShow(false)}
					header={modalData.header}
					dialogClassName='modal-dialog'
					footer={
						<div className={loading ? "d-none" : "d-block"}>
							<Button
								onClick={modalData.onApply}
								variant='outline-secondary'
								className='mr-3 px-3'>
								Apply
							</Button>
							<Button
								variant='outline-danger'
								onClick={modalData.onDiscard}
								className='px-3'>
								Discard
							</Button>
						</div>
					}>
					{modalData.content}
				</Modal>
			</Card>
			<Modal
				show={alertModalShow}
				onHide={() => {
					setAlertModalShow(false);
				}}
				dialogClassName='modal-dialog'>
				test geming
			</Modal>
		</>
	);
}

export default Profile;
