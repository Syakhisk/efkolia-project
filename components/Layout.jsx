import cntl from "cntl";
import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import usePersistentState from "../hooks/usePersistentState";

const Layout = (props) => {
	const { bare = false, children, title = "Efkolia" } = props;

	const [sidebarExpand, setSidebarExpand] = usePersistentState(
		"sidebarExpand",
		false
	);
	const [sidebarLock, setSidebarLock] = usePersistentState("sidebarLock", true);
	const [showSidebar, setShowSidebar] = useState(true);

	const toggleTheme = () => {
		const html = document.querySelector("html");
		html.classList.toggle("dark");
	};

	// dark mode setting
	useEffect(() => {
		// localStorage.setItem("theme", "dark");
		// const theme = localStorage.getItem("theme");
		// if (theme == "dark") {
		// 	document.querySelector("html").classList.add(theme);
		// }
		document.querySelector("html").classList.add("dark");
	}, []);

	const layoutCN = cntl`
	flex-grow h-screen
	relative
	z-10
	transition-all
	${sidebarLock && sidebarExpand ? "ml-sidebar" : "ml-sidebar-collapsed"}
	`;

	console.log(sidebarLock);

	return (
		<>
			<Head>
				<title>{title}</title>
				<link rel='icon' href='/favicon.ico' />
				<link rel='preconnect' href='https://fonts.gstatic.com' />
				<link
					href='https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap'
					rel='stylesheet'
				/>
			</Head>

			{/* -------------------------delete diz!------------------ */}
			<div className='w-full mb-3'>
				<button
					className='w-full focus:outline-none px-4 bg-gray-300 text-gray-700 dark:text-white dark:bg-gray-900'
					onClick={() => toggleTheme()}>
					Toggle Dark Mode
				</button>
			</div>
			{/* -------------------------delete diz!------------------ */}

			{!bare ? (
				<div id='main-container' className='flex relative'>
					<Sidebar
						expand={sidebarExpand}
						setExpand={setSidebarExpand}
						show={showSidebar}
						setShow={setShowSidebar}
						lock={sidebarLock}
						setLock={setSidebarLock}
					/>
					<div className={layoutCN}>
						<Navbar />
						<main>{children}</main>
					</div>
				</div>
			) : (
				<main>{children}</main>
			)}
		</>
	);
};

export default Layout;
