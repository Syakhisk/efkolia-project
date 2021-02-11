import { MdGridOn, MdModeEdit, MdLocalLibrary } from "react-icons/md";
import { GoNote } from "react-icons/go";
import { HiOutlineViewGrid } from "react-icons/hi";
import { BiBook } from "react-icons/bi";
import { ImTable2 } from "react-icons/im";

const links = [
	{ link: "/dashboard", text: "Dashboard", icon: <HiOutlineViewGrid /> },
	{ link: "/tasks", text: "Tasks", icon: <MdModeEdit /> },
	{ link: "/agendas", text: "Agendas", icon: <GoNote /> },
	{ link: "/subjects", text: "Subjects", icon: <BiBook /> },
	{ link: "/timetable", text: "Timetable", icon: <ImTable2 /> },
	// { link: "/playlists", text: "Playlists", icon: <MdPlayCircleFilled /> },
];

export default function useSidebarLinks() {
	return links;
}
