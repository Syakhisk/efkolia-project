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
import { useHistory } from "react-router-dom";
// eslint-disable-next-line
import { MdPerson, MdChevronRight, MdChevronLeft } from "react-icons/md";

function Sidebar(props) {
	const {
		collapsed,
		toggled,
		handleToggleSidebar,
		handleCollapsedChange,
	} = props;

	const history = useHistory();

	return (
		<ProSidebar
			onMouseEnter={() => handleCollapsedChange(false)}
			onMouseLeave={() => handleCollapsedChange(true)}
			collapsed={collapsed}
			toggled={toggled}
			breakPoint='md'
			onToggle={handleToggleSidebar}>
			<SidebarHeader>
				<div
					className='sidebar-brand-header'
					style={{ cursor: "pointer" }}
					onClick={() => history.push("/dashboard")}>
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
						<MenuItem icon={icon} key={index}>
							<NavLink to={link}>{text}</NavLink>
						</MenuItem>
					))}
				</Menu>

				{/* <Menu iconShape='circle' id='toggle-collapsed'>
					<MenuItem
						icon={collapsed ? <MdChevronRight /> : <MdChevronLeft />}
						onClick={() => handleCollapsedChange(!collapsed)}
					/>
				</Menu> */}
			</SidebarContent>

			<SidebarFooter>
				<Menu iconShape='circle'>
					<MenuItem icon={<MdPerson />}>
						<NavLink to='/user-profile'>User Profile</NavLink>
					</MenuItem>
				</Menu>
			</SidebarFooter>
		</ProSidebar>
	);
}

export default Sidebar;
