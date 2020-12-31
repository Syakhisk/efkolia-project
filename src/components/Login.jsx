import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import ParticleBackground from "./ParticleBackground";

function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login, currentUser } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const history = useHistory();

	//handle if user already logged in
	if(currentUser) history.push("/dashboard")

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			// history.push("/dashboard");
		} catch (err) {
			setError("Failed to login");
		}

		setLoading(false);
	};

	return (
		<>
			<ParticleBackground />
			<Container
				fluid
				className='w-100 h-100 d-flex flex-column justify-content-center'
				style={{ maxWidth: "500px" }}>
				<Card bg='dark'>
					<Card.Body>
						<h2 className='text-center mb-4'>Log In</h2>
						{/* {currentUser.email} */}
						{error && <Alert variant='danger'>{error}</Alert>}
						<Form onSubmit={handleSubmit}>
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
									placeholder='******'
									required
								/>
							</Form.Group>
							<Button
								disabled={loading}
								className='w-100 mt-4'
								type='submit'
								variant='primary'>
								Log In
							</Button>
						</Form>
					</Card.Body>
				</Card>
				<div className='w-100 text-center mt-2' style={{zIndex: 1000}}>
					Need an account? <Link to='/signup'>Sign Up</Link>
				</div>
			</Container>
		</>
	);
}

export default Signup;
