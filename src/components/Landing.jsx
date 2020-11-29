import React from "react";
import { Button, Container } from "react-bootstrap";
import Particles from "react-particles-js";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Fade from "react-reveal/Fade";

function Landing() {
	const history = useHistory();
	const { currentUser } = useAuth();

	if (currentUser) {
		history.push("/dashboard");
	}

	const params = {
		particles: {
			number: {
				value: 100,
				density: {
					enable: true,
					value_area: 1000,
				},
			},
			line_linked: {
				enable: true,
				opacity: 0.4,
			},
			move: {
				direction: "right",
				speed: 0.5,
			},
			size: {
				value: 2,
			},
			opacity: {
				anim: {
					enable: true,
					speed: 3,
					opacity_min: 0.05,
				},
			},
		},
		interactivity: {
			events: {
				onclick: {
					enable: true,
					mode: "push",
				},
				onhover: {
					enable: true,
					mode: "grab",
				},
			},
			modes: {
				push: {
					particles_nb: 1,
				},
			},
		},
		retina_detect: true,
	};

	return (
		<Container fluid style={{ backgroundColor: "#212223" }} className='h-100'>
			<Fade cascade>
				<div
					className='container d-flex flex-column juftify-content-end ml-5'
					style={{ zIndex: 10, position: "fixed", top: "60%" }}>
					<h1>Efkolia</h1>
					<h6>Organize your studying activity with ease</h6>
					<Container fluid className='p-0 m-0'>
						<Button
							variant='outline-secondary'
							className='mr-2'
							onClick={() => history.push("/signup")}>
							Signup
						</Button>
						<Button
							variant='outline-secondary'
							onClick={() => history.push("/login")}>
							Login
						</Button>
					</Container>
				</div>
				<Particles params={params} style={{ position: "fixed", zIndex: 0 }} />
			</Fade>
		</Container>
	);
}

export default Landing;
