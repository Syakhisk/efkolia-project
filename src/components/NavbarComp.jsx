import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Dropdown, Button } from "react-bootstrap";
import { BiPlus } from "react-icons/bi";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import moment from "moment";

// import useDimensions from "react-use-dimensions";

function NavbarComp({ handleToggleSidebar, toggled, location }) {
	// const [navbarRef, navbarSize] = useDimensions();
	const [clock, setClock] = useState(moment().format("hh:mm:ss"));
	const [date, setDate] = useState(moment().format("dddd, MMMM Do YYYY"));

	setTimeout(() => {
		setClock(moment().format("hh:mm:ss"));
		setDate(moment().format("dddd, MMMM Do YYYY"));
	}, 1000);

	const history = useHistory();
	const { logout } = useAuth();
	return (
		<div className='Navbar sticky-top'>
			<Navbar bg='dark' expand='md' variant='dark'>
				<button
					className='btn navbar-toggler'
					onClick={() => handleToggleSidebar(!toggled)}>
					<span className='btn navbar-toggler-icon' />
				</button>
				<Navbar.Brand>{location}</Navbar.Brand>
				<Navbar.Toggle
					aria-controls='basic-navbar-nav'
					onClick={() => handleToggleSidebar(false)}>
					<span className='btn navbar-toggler-icon' />
				</Navbar.Toggle>

				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ml-auto d-flex justify-content-center'>
						<Nav.Item className='small px-2 d-flex justify-content-center align-items-center text-md-right text-center'>
							{date}
							<br />
							{clock}
						</Nav.Item>
					</Nav>
					<Nav>
						<div className='vl d-none d-md-block' />
						<Dropdown drop='left'>
							<Dropdown.Toggle
								as='div'
								className='btn w-100 my-md-0 my-sm-2 py-2'>
								<img
									src='https://i.pravatar.cc/100'
									className='rounded-circle'
									style={{
										maxWidth: "30px",
										width: "100%",
										height: "100%",
										objectFit: "cover",
									}}
								/>
							</Dropdown.Toggle>
							<Dropdown.Menu className='bg-success'>
								<Dropdown.Item
									className='text-light'
									onClick={() => history.push("/user-profile")}>
									User Profile
								</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item className='text-light' onClick={() => logout()}>
									Log Out
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						<div className='vl d-none d-md-block' />
						<Nav.Item className='btn d-flex flex-row my-md-0 my-sm-2 py-2'>
							<button className='btn btn-success btn-sm w-100'>
								New <BiPlus />
							</button>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}

export default NavbarComp;
