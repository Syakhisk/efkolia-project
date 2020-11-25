import React from "react";
import {
	ProSidebar,
	Menu,
	MenuItem,
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
				<div className='sidebar-brand-header'>
					<img
						src={logo}
						style={{ height: "23px" }}
						className='mr-4'
						alt='efkolia logo'
					/>
					<span>Efkolia</span>
				</div>
			</SidebarHeader>

			<SidebarContent>
				<Menu iconShape={"circle"}>
					{links.map(({ link, text, icon }, index) => (
						<OverlayTrigger
							key={index}
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
							<MenuItem icon={icon}>
								<NavLink to={link}>{text}</NavLink>
							</MenuItem>
						</OverlayTrigger>
					))}
				</Menu>

				<Menu iconShape='circle' id='toggle-collapsed'>
					<MenuItem
						icon={collapsed ? <MdChevronRight /> : <MdChevronLeft />}
						onClick={() => handleCollapsedChange(!collapsed)}
					/>
				</Menu>
			</SidebarContent>

			<SidebarFooter>
				<Menu iconShape='circle'>
					<MenuItem icon={<MdPerson />}>
						<NavLink to='/profile'>User Profile</NavLink>
					</MenuItem>
				</Menu>
			</SidebarFooter>
		</ProSidebar>
	);
}

export default Sidebar;
