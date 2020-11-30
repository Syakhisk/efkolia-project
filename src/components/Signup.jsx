import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import ParticleBackground from "./ParticleBackground";

function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const { signup, currentUser } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const history = useHistory();

	//handle if user already logged in
	if (currentUser) history.push("/dashboard");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords don't match");
		}

		try {
			setError("");
			setLoading(true);
			await signup(
				emailRef.current.value,
				passwordRef.current.value,
				firstName,
				lastName
			);
			history.push("/dashboard");
		} catch (err) {
			console.log(err);
			setError("Failed to create an account");
		}

		setLoading(false);
	};

	return (
		<>
			<ParticleBackground />
			<Container
				fluid
				className='w-100 h-100 d-flex flex-column justify-content-center'
				style={{ maxWidth: "500px", zIndex: "1000" }}>
				<Card bg='dark'>
					<Card.Body>
						<h2 className='text-center mb-4'>Sign Up</h2>
						{error && <Alert variant='danger'>{error}</Alert>}
						<Form onSubmit={handleSubmit}>
							<Form.Row>
								<Form.Group as={Col} id='first-name'>
									<Form.Label>First Name</Form.Label>
									<Form.Control
										type='text'
										value={firstName}
										onChange={(e) => setFirstName(e.currentTarget.value)}
										placeholder='Mamank'
										required
									/>
								</Form.Group>
								<Form.Group as={Col} id='last-name'>
									<Form.Label>Last Name</Form.Label>
									<Form.Control
										type='text'
										value={lastName}
										onChange={(e) => setLastName(e.currentTarget.value)}
										placeholder='Gemink'
									/>
								</Form.Group>
							</Form.Row>
							<Form.Group id='email'>
								<Form.Label>Email</Form.Label>
								<Form.Control
									type='email'
									ref={emailRef}
									placeholder='mamank@gemink.com'
									required
								/>
							</Form.Group>
							<Form.Group id='password'>
								<Form.Label>Password</Form.Label>
								<Form.Control
									type='password'
									ref={passwordRef}
									placeholder='********'
									required
								/>
							</Form.Group>
							<Form.Group id='password-confirm'>
								<Form.Label>Password Confirmation</Form.Label>
								<Form.Control
									type='password'
									ref={passwordConfirmRef}
									placeholder='********'
									required
								/>
							</Form.Group>
							<Button
								disabled={loading}
								className='w-100 mt-4'
								type='submit'
								variant='primary'>
								Sign Up
							</Button>
						</Form>
					</Card.Body>
				</Card>
				<div className='w-100 text-center mt-2' style={{zIndex: 1000}}>
					Already have an account? <Link to='/login'>Log In</Link>
				</div>
			</Container>
		</>
	);
}

export default Signup;
