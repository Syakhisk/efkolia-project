import React, { useEffect, useState } from "react";

function Dashboard() {
	const [headerStyle, setHeaderStyle] = useState({ color: "white" });

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		console.log(window.scrollY)
	}, [window.scrollY])

	const handleScroll = (e) => {
		if (window.scrollY > 400) {
			setHeaderStyle({ color: "red" });
		} else {
			setHeaderStyle({ color: "white" });
		}
	};

	return (
		<div>
			<div id='header'>
				<h1 style={headerStyle}>This is the header</h1>
			</div>
			<div id='section_1' className='section'>
				This is section 1
			</div>

			<div id='section_2' className='section'>
				This is section 2
			</div>

			<div id='section_3' className='section'>
				This is section 3
			</div>

			<div id='section_4' className='section'>
				This is section 4
			</div>

			<div id='section_5' className='section'>
				This is section 5
			</div>
		</div>
	);
}

export default Dashboard;
