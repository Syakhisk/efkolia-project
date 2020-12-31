import {
	MdDashboard,
	MdGridOn,
	MdModeEdit,
	MdLocalLibrary,
	MdPlayCircleFilled,
} from "react-icons/md";

import { GoNote } from "react-icons/go";

const links = [
	{ link: "/dashboard", text: "Dashboard", icon: <MdDashboard /> },
	{ link: "/tasks", text: "Tasks", icon: <MdModeEdit /> },
	{ link: "/agendas", text: "Agendas", icon: <GoNote /> },
	{ link: "/subjects", text: "Subjects", icon: <MdLocalLibrary /> },
	{ link: "/timetable", text: "Timetable", icon: <MdGridOn /> },
	// { link: "/playlists", text: "Playlists", icon: <MdPlayCircleFilled /> },
];

export default links;
