import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Dropdown } from "react-bootstrap";
import { BiPlus } from "react-icons/bi";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import moment from "moment";
import EntryModal from "./EntryModal";
import { MdPerson } from "react-icons/md";

function NavbarComp({ handleToggleSidebar, toggled, location }) {
	const history = useHistory();
	const { logout } = useAuth();
	const [clock, setClock] = useState(moment().format("hh:mm:ss"));
	const [date, setDate] = useState(moment().format("dddd, MMMM Do YYYY"));
	const [modalShow, setModalShow] = useState(false);

	setTimeout(() => {
		setClock(moment().format("hh:mm:ss"));
		setDate(moment().format("dddd, MMMM Do YYYY"));
	}, 1000);

	const renderedModal = modalShow ? (
		<EntryModal modalShow={modalShow} setModalShow={setModalShow} />
	) : (
		""
	);

	return (
		<>
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
							<Nav.Item className='small px-2 d-flex flex-column justify-content-center text-md-right text-center'>
								<div className='truncate'>{date}</div>
								<br />
								{clock}
							</Nav.Item>
						</Nav>
						<Nav>
							<div className='vl d-none d-md-block' />
							<Dropdown drop='down' className='d-flex flex-column jcc aic'>
								<Dropdown.Toggle
									as='div'
									className='btn w-100 my-md-0 my-2 py-0 d-flex vh-center'>
									<div className='d-flex vh-center nav-icon'>
										<MdPerson />
									</div>
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item
										className='text-light'
										onClick={() => history.push("/user-profile")}>
										User Profile
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item
										className='text-light'
										onClick={() => logout()}>
										Log Out
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							<div className='vl d-none d-md-block' />
							<Nav.Item className='btn d-flex flex-row my-md-0 my-sm-2 py-2'>
								<button
									className='btn btn-success btn-sm w-100'
									onClick={() => setModalShow(true)}>
									New <BiPlus />
								</button>
							</Nav.Item>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
			{renderedModal}
		</>
	);
}

export default NavbarComp;
