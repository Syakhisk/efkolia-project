import { useEfect } from "react";
import moment from "moment";

const getClosestClass = (classesList) => {
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

	if (todayClasses.length) return _closestClass;
};

export default getClosestClass;
