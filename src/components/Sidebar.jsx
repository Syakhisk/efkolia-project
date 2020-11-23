import React, { useEffect, useRef } from "react";
import {
	ProSidebar,
	Menu,
	MenuItem,
	SubMenu,
	SidebarHeader,
	SidebarFooter,
	SidebarContent,
} from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import logo from "../assets/efkolia-logo.svg";
import links from "../objects/nav-links";
import { MdPerson, MdChevronRight, MdChevronLeft } from "react-icons/md";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function Sidebar(props) {
	const {
		collapsed,
		toggled,
		handleToggleSidebar,
		handleCollapsedChange,
	} = props;

	const noTooltip = <div></div>;

	return (
		<ProSidebar
			collapsed={collapsed}
			toggled={toggled}
			breakPoint='md'
			onToggle={handleToggleSidebar}>
			<SidebarHeader>
				<div className='sidebar-brand-header'>Efkolia</div>
			</SidebarHeader>

			<SidebarContent>
				<Menu iconShape={"circle"}>
					{links.map(({ link, text, icon }, index) => (
						<OverlayTrigger
							placement='right'
							delay={{ show: 250, hide: 100 }}
							overlay={
								collapsed ? (
									<Tooltip id='button-tooltip' {...props}>
										{text}
									</Tooltip>
								) : (
									noTooltip
								)
							}>
							<MenuItem key={index} icon={icon}>
								<NavLink to={link}>{text}</NavLink>
							</MenuItem>
						</OverlayTrigger>
					))}
				</Menu>

				<Menu
					iconShape='circle'
					className={collapsed ? "" : "d-flex justify-content-center"}>
					<MenuItem
						icon={collapsed ? <MdChevronRight /> : <MdChevronLeft />}
						onClick={() => handleCollapsedChange(!collapsed)}
					/>
				</Menu>
			</SidebarContent>

			<SidebarFooter>
				<Menu iconShape='circle'>
					<MenuItem
						icon={<MdPerson />}
						onClick={() => handleCollapsedChange(!collapsed)}>
						<NavLink to='/profile'>User Profile</NavLink>
					</MenuItem>
				</Menu>
			</SidebarFooter>
		</ProSidebar>
	);
}

export default Sidebar;
