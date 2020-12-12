import React from "react";
import { Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Fade from "react-reveal/Fade";
import TextLoop from "react-text-loop";
import { AiFillGithub } from "react-icons/ai";
import logo from "../assets/efkolia-logo.svg";
import ParticleBackground from "./ParticleBackground";

function Landing() {
	const history = useHistory();
	const { currentUser } = useAuth();

	if (currentUser) {
		history.push("/dashboard");
	}

	return (
		<Container fluid className='h-100 w-auto no-select'>
			<Fade cascade>
				<div
					className='container d-flex flex-column juftify-content-end ml-2 w-auto'
					style={{ zIndex: 10, position: "fixed", top: "35%" }}>
					<img alt="logo efkolia" src={logo} style={{ width: "150px", marginBottom: "10px" }} />
					<h1 className='landing-display display-1 font-weight-bold mb-0'>
						Efkolia
					</h1>
					<h3 className='mt-0 pt-0'>
						<TextLoop interval="1200">
							<span>Organize</span>
							<span>Study</span>
							<span>Plan</span>
							<span>Schedule</span>
						</TextLoop>{" "}
						with ease
					</h3>
					<Container fluid className='p-0 m-0 mt-3'>
						<Button
							variant='outline-light'
							className='mr-2'
							onClick={() => history.push("/signup")}>
							Signup
						</Button>
						<Button
							variant='outline-light'
							onClick={() => history.push("/login")}>
							Login
						</Button>
					</Container>

					<Container fluid className='p-0 mt-5'>
						<h6>a project built with love and passion</h6>
						<h6>
							&copy; Syakhisk Al-Azmi 2020 -{" "}
							<a href='https://github.com/Syakhisk/efkolia-project-bs/'>
								Github Repository <AiFillGithub />
							</a>
						</h6>
					</Container>
				</div>
				<ParticleBackground />
			</Fade>
		</Container>
	);
}

export default Landing;
