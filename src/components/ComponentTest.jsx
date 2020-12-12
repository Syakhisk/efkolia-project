/* eslint-disable */

import React, { useEffect, useState } from "react";
import moment from "moment";
import { db } from "../firebase";

function Test() {
	const [user, setUser] = useState({});
	const [time, setTime] = useState(
		moment().format("dddd, Do MMMM YYYY, hh:mm:ss")
	);

	// React.useEffect(() => {
	// 	//do not delete❗
	// 	const fetchData = async () => {
	// 		const record = await db
	// 			.collection("users")
	// 			.where("firstName", "==", "bubz")
	// 			.get();
	// 		setUser(record.docs[0].data());
	// 	};

	// 	fetchData().then(() => {
	// 		// console.log(user.classes);
	// 	});
	// }, []);

	const day = moment().format("dddd"); //saturday

	const classesTime = ["10:00", "20:00", "20:31", "22:11", "22:15"];
	let closest = Infinity;
	let closestTime = "";

	setInterval(() => {
		setTime(moment().format("dddd, MMMM Do YYYY, hh:mm:ss"));
	}, 100);

	classesTime.forEach((d) => {
		const diff = moment().diff(moment(d, "hh:mm"));
		if (diff <= 0 && diff < closest) {
			closest = diff;
			closestTime = d;
		}
	});

	const convertedTime = moment().hours();

	return (
		<>
			<div className="d-flex h-100 w-100 vh-center test">
				<h1>This is a display test</h1>
			</div>
			{/* <div
				className='btn btn-primary'
				onClick={() => {
					if (window.confirm("Are you sure you wish to delete this item?")){
						console.log(true)
					} else console.log(false)
				}}
			/>
			<h1>{time}</h1>
			<h1>minutes {moment().minutes()}</h1>
			<h1>
				closest {closestTime} with {(closest / 60 / 1000).toFixed(1)} difference
			</h1>
			<h1>formatted {moment("19:00 am", "hh:mm a").format("hh:mm")}</h1>
			<h1>
				difference{" "}
				{(moment("21:00", "hh:mm").diff(moment()) / 60 / 1000).toFixed(1)}
			</h1>
			<h1>{day}</h1> */}
			{/* <div>Classes</div>
			<ul>
				{user.classes.map((kelas, idx) => (
					<li key={idx}>{kelas.className}</li>
				))}
			</ul> */}
		</>
	);
}

export default Test;
