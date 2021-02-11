import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import useSidebarLinks from "../hooks/useSidebarLinks";
import SidebarIcons from "../components/SidebarIcons";
import { MdPerson, MdChevronRight, MdLock, MdLockOpen } from "react-icons/md";
import cntl from "cntl";

export default function Sidebar(props) {
	const { expand, setExpand, show, setShow, lock, setLock } = props;
	const links = useSidebarLinks();
	const router = useRouter();

	const isActive = (itemLink) => {
		if (itemLink === router.pathname) {
			return " bg-gray-100 bg-opacity-10 rounded-full font-bold ring-8 ring-opacity-10 ring-gray-100";
		} else {
			return "";
		}
	};

	const sidebarCN = cntl`
		${expand ? "w-sidebar" : "w-sidebar-collapsed"}
		fixed h-screen
		z-20
		flex flex-col overflow-x-hidden
		dark:bg-brand-dark bg-brand
		divide-solid divide-y divide-white divide-opacity-10
		transition-all
	`;

	const sidebarHeaderCN = cntl`
	flex items-center 
	p-5
	space-x-5 h-navbar
	`;

	const linkItemCN = cntl`
	flex items-center space-x-2
	group
	hover:font-bold text-muted text-sm
	transition-all 
	`;

	const sidebarTitleCN = cntl`
	${!expand ? "hidden" : ""}
	text-muted text-md 
	font-sans font-bold 
	uppercase
	`;

	const sideItemCN = cntl`
	flex flex-col space-y-5
	p-5
	`;

	const sideIconCN = cntl`
	flex items-center space-x-2
	group 
	hover:font-bold
	text-muted text-sm 
	transition-all 
	`;

	const collapseCN = cntl`
	ml-auto
	font-bold
	transform
	${sideIconCN}
	${expand ? "rotate-180" : ""}
	`;

	return (
		<div
			id='sidebar'
			className={sidebarCN}
			onMouseEnter={() => !lock && setExpand(true)}
			onMouseLeave={() => !lock && setExpand(false)}>
			<div id='side_header' className={sidebarHeaderCN}>
				<Image
					src='/logo192-squared.png'
					alt='Efkolia Logo'
					width={25 * 1.5}
					height={25}
					layout="fixed"
				/>
				<h1 className={sidebarTitleCN}>Efkolia</h1>
			</div>
			<div id='side_content' className={sideItemCN}>
				{links.map((item, idx) => (
					<Link key={idx} href={item.link}>
						<a className={linkItemCN + isActive(item.link)}>
							<SidebarIcons>{item.icon}</SidebarIcons>
							<span className={!expand ? "hidden" : ""}>{item.text}</span>
						</a>
					</Link>
				))}
			</div>
			<div id='side_lock' className={sideItemCN}>
				<div
					className={`ml-auto flex ${
						expand ? "space-x-5" : "flex-col space-y-5"
					}`}>
					<div
						role='button'
						onClick={() => setLock(!lock)}
						className={sideIconCN}>
						<SidebarIcons>{lock ? <MdLock /> : <MdLockOpen />}</SidebarIcons>
					</div>
					<div
						role='button'
						onClick={() => setExpand(!expand)}
						className={collapseCN}>
						<SidebarIcons>
							<MdChevronRight />
						</SidebarIcons>
					</div>
				</div>
			</div>

			<div className='flex-grow'></div>

			<div id='side_footer' className={sideItemCN}>
				<Link href='/profile'>
					<a className={sideIconCN}>
						<SidebarIcons>
							<MdPerson />
						</SidebarIcons>
						<span className={!expand ? "hidden" : ""}>Profile</span>
					</a>
				</Link>
			</div>
		</div>
	);
}
