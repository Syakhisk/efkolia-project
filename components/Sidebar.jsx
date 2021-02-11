import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import useSidebarLinks from "../hooks/useSidebarLinks";
import SidebarIcons from "../components/SidebarIcons";
import { MdPerson, MdChevronRight, MdLock, MdLockOpen } from "react-icons/md";
import cntl from "cntl";
import ReactTooltip from "react-tooltip";

export default function Sidebar(props) {
	const { expand, setExpand, show, setShow, lock, setLock } = props;
	const links = useSidebarLinks();
	const router = useRouter();

	const sidebarCN = cntl`
	${expand ? "w-sidebar" : "w-sidebar-collapsed"}
	${show ? "" : "mobile:w-0"}
	overflow-hidden
	fixed h-screen
	z-30
	flex flex-col overflow-x-hidden
	dark:bg-brand-dark bg-brand
	divide-solid divide-y divide-white divide-opacity-10
	transition-all duration-300
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
	transition-all duration-300 
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
	transition-all duration-300 
	`;

	const sidebarExitCN = cntl`
	fixed z-20
	bg-black bg-opacity-80 
	h-full w-screen 
	invisible
	${show ? "mobile:visible" : "mobile:invisible"}
	`;

	const collapseCN = cntl`
	ml-auto
	font-bold
	transform
	${sideIconCN}
	${expand ? "rotate-180" : ""}
	`;

	const isActive = (itemLink) => {
		if (itemLink === router.pathname) {
			return " bg-gray-100 bg-opacity-10 rounded-full font-bold ring-8 ring-opacity-10 ring-gray-100";
		} else {
			return "";
		}
	};

	return (
		<>
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
						layout='fixed'
					/>
					<h1 className={sidebarTitleCN}>Efkolia</h1>
				</div>
				<div id='side_content' className={sideItemCN}>
					{links.map((item, idx) => (
						<Link key={idx} href={item.link}>
							<a
								data-tip={item.text}
								className={linkItemCN + isActive(item.link)}>
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
							data-tip={lock ? "Unlock Sidebar" : "Lock Sidebar"}
							data-tip-disable={false}
							onClick={() => setLock(!lock)}
							className={sideIconCN}>
							<SidebarIcons>{lock ? <MdLock /> : <MdLockOpen />}</SidebarIcons>
						</div>
						<div
							role='button'
							data-tip={expand ? "Collapse Sidebar" : "Expand Sidebar"}
							data-tip-disable={false}
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
						<a data-tip='User profile' className={sideIconCN}>
							<SidebarIcons>
								<MdPerson />
							</SidebarIcons>
							<span className={!expand ? "hidden" : ""}>Profile</span>
						</a>
					</Link>
					<ReactTooltip
						effect='solid'
						place={expand ? "top" : "right"}
						className='text-white dark:bg-brand-dark bg-brand'
						offset={{ right: expand ? 0 : 20 }}
						disable={expand}
					/>
				</div>
			</div>
			<div
				onClick={() => {
					setShow(false);
					setExpand(false);
				}}
				className={sidebarExitCN}></div>
		</>
	);
}
