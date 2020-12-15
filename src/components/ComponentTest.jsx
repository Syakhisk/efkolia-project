/* eslint-disable */

import React, { useEffect, useState } from "react";
import moment from "moment";
import { db } from "../firebase";

import { useAuth } from "../contexts/AuthContext";


function Test() {
	const [user, setUser] = useState({});
	const [time, setTime] = useState(
		moment().format("dddd, Do MMMM YYYY, hh:mm:ss")
	);

	// classesTime.forEach((d) => {
	// 	const diff = moment().diff(moment(d, "hh:mm"));
	// 	if (diff <= 0 && diff < closest) {
	// 		closest = diff;
	// 		closestTime = d;
	// 	}
	// });

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

	const classesTime = ["10:00", "20:00", "20:31", "22:11", "12:00"];
	let closest = Infinity;
	let closestTime = "";

	// setInterval(() => {
	// 	setTime(moment().format("dddd, MMMM Do YYYY, hh:mm:ss"));
	// }, 100);

	// useEffect(() => {
	// }, []);

	// const convertedTime = moment().hours();

	// console.log(passwordHash("geming"))

	return (
		<>
			{/* <div className="d-flex h-100 w-100 vh-center test">
				<h1>This is a display test</h1>
			</div> */}
			{/* <div
				className='btn btn-primary'
				onClick={() => {
					if (window.confirm("Are you sure you wish to delete this item?")){
						console.log(true)
					} else console.log(false)
				}}
			/>
			<h1>{time}</h1>
			<h1>minutes {moment().minutes()}</h1> */}
			<h1>Current time: {moment().format("HH:MM")}</h1>
			<h1>
				closest {closestTime} with {(closest / 60 / 1000).toFixed(1)} difference
			</h1>
			{/* <h1>formatted {moment("19:00 am", "hh:mm a").format("hh:mm")}</h1>
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

function Time() {
	const [terdekat, setTerdekat] = useState("");
	const [closestClass, setClosestClass] = useState({});
	const classesTime = ["10:00", "20:00", "20:31", "22:11", "12:00"];
	const classesList = [
		{
			classCode: "wp",
			className: "Web Programming",
			namaDosen: "Nama Dosen WP",
			schedule: {
				day: "tue",
				timeStart: "10:00",
				timeEnd: "13:00",
			},
		},
		{
			classCode: "ds",
			className: "Data Structure",
			namaDosen: "Nama Dosen ds",
			schedule: {
				day: "wed",
				timeStart: "12:00",
				timeEnd: "14:00",
			},
		},
		{
			classCode: "cs",
			className: "Cyber Security",
			namaDosen: "Nama Dosen CS",
			schedule: {
				day: "sun",
				timeStart: "02:14",
				timeEnd: "11:00",
			},
		},
		{
			classCode: "dm",
			className: "Data Modelling",
			namaDosen: "Nama Dosen DM",
			schedule: {
				day: "sun",
				timeStart: "02:15",
				timeEnd: "14:00",
			},
		},
	];

	useEffect(() => {
		const today = moment().format("ddd").toLowerCase();
		const todayClasses = classesList.filter((e) => e.schedule.day === today);

		let closest = Infinity;
		let closestTime = "";
		let _closestClass = {};
		for (const item of todayClasses) {
			const time = item.schedule.timeStart;
			const diff = moment(time, "HH:mm").diff(moment());

			// console.log(time, moment.utc(diff).format("HH:mm"), diff);

			if (diff >= 0 && diff < closest) {
				closest = diff;
				closestTime = time;
				_closestClass = JSON.parse(JSON.stringify(item));
			}
		}
		setClosestClass(_closestClass);
	}, []);

	return (
		<div>
			<h4>Current day: {moment().format("ddd").toLowerCase()}</h4>
			<h1>Current Time: {moment().format("hh:mm")}</h1>
			<h1>
				Closest Class:
				{closestClass.className} at {closestClass.schedule?.timeStart}
				{/* {closestClass} */}
			</h1>
		</div>
	);
}
function TimeWithDB() {
	const { currentUser } = useAuth();

	const [terdekat, setTerdekat] = useState("");
	const [closestClass, setClosestClass] = useState({});
	const classesTime = ["10:00", "20:00", "20:31", "22:11", "12:00"];
	let classesList = [
		{
			classCode: "wp",
			className: "Web Programming",
			namaDosen: "Nama Dosen WP",
			schedule: {
				day: "tue",
				timeStart: "11:00",
				timeEnd: "13:00",
			},
		},
		{
			classCode: "ds",
			className: "Data Structure",
			namaDosen: "Nama Dosen ds",
			schedule: {
				day: "wed",
				timeStart: "12:00",
				timeEnd: "14:00",
			},
		},
		{
			classCode: "cs",
			className: "Cyber Security",
			namaDosen: "Nama Dosen CS",
			schedule: {
				day: "sun",
				timeStart: "02:14",
				timeEnd: "11:00",
			},
		},
		{
			classCode: "dm",
			className: "Data Modelling",
			namaDosen: "Nama Dosen DM",
			schedule: {
				day: "sun",
				timeStart: "02:15",
				timeEnd: "14:00",
			},
		},
	];

	classesList = currentUser.classes;

	// console.log(classesList)

	useEffect(() => {
		const today = moment().format("ddd").toLowerCase();
		const todayClasses = classesList.filter((e) => e.schedule.day === today);

		let closest = Infinity;
		let closestTime = "";
		let _closestClass = {};
		for (const item of todayClasses) {
			const time = item.schedule.timeStart;
			const diff = moment(time, "HH:mm").diff(moment());

			// console.log(time, moment.utc(diff).format("HH:mm"), diff);

			if (diff >= 0 && diff < closest) {
				closest = diff;
				closestTime = time;
				_closestClass = JSON.parse(JSON.stringify(item));
			}
		}
		setClosestClass(_closestClass);
	}, []);

	return (
		<div>
			<h4>Current day: {moment().format("ddd").toLowerCase()}</h4>
			<h1>Current Time: {moment().format("hh:mm")}</h1>
			<h1>
				Closest Class:
				{closestClass.className} at {closestClass.schedule?.timeStart}
				{/* {closestClass} */}
			</h1>
		</div>
	);
}

export default TimeWithDB;
