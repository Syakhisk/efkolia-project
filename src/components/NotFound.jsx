import React from "react";
import { useHistory } from "react-router-dom";
import ParticleBackground from "./ParticleBackground";

function NotFound() {
	const history = useHistory();
	return (
		<>
			<ParticleBackground />
			<div className='bg-notfound d-flex justify-content-center align-items-center h-100'>
				<div className='card mx-5' style={{ borderRadius: "1.5rem" }}>
					<div className='card-body'>
						<blockquote className='blockquote mb-0'>
							<h1 className='display-1'>
								Are you lost <strike>baby girl?</strike>
							</h1>
							<footer className='blockquote-footer'>Joko Widodo</footer>
						</blockquote>
					</div>
					<button
						onClick={() => history.push("/landing")}
						className='btn btn-secondary m-3'
						style={{ borderRadius: ".8rem" }}>
						Yes, take me back senpai {">.<"}
					</button>
				</div>
			</div>
		</>
	);
}

export default NotFound;
