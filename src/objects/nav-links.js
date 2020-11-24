import {
	MdDashboard,
	MdReceipt,
	MdGridOn,
	MdPlaylistPlay,
} from "react-icons/md";

import { GoNote } from "react-icons/go";

const links = [
	{ link: "/", text: "Dashboard", icon: <MdDashboard /> },
	{ link: "/subjects", text: "Subjects", icon: <MdReceipt /> },
	{ link: "/timetable", text: "Timetable", icon: <MdGridOn /> },
	{ link: "/playlists", text: "Playlists", icon: <MdPlaylistPlay /> },
	{ link: "/agendas", text: "Agendas", icon: <GoNote /> },
];

export default links;
