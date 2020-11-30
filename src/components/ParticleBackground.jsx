import React from "react";
import Particles from "react-particles-js";

function ParticleBackground() {
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

	return <Particles params={params} style={{ position: "fixed", zIndex: 0 }} />;
}

export default ParticleBackground;
