import { useRouter } from "next/router";
import cntl from "cntl";
import { BsLayoutTextSidebarReverse as BsSidebar } from "react-icons/bs";
import { MdMenu } from "react-icons/md";

const Navbar = (props) => {
	const router = useRouter();

	const { show, setShow } = props;

	const navbarCN = cntl`
	flex items-center
	sticky top-0 
	w-full h-navbar 
	dark:bg-brand-dark bg-brand 
	text-xl text-white 
	px-5 py-5
	transition-all duration-300
	`;

	return (
		<div className={navbarCN}>
			<div
				role='button'
				onClick={() => setShow(!show)}
				className='hidden mobile:block'>
				<BsSidebar />
			</div>
			<div className='flex flex-grow mobile:justify-center mobile:ml-0'>
				<span>{router.pathname}</span>
			</div>
			<div className='h-full'>
				<svg
					role='button'
					className='h-full dark:hover:text-brand-lighter'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
					/>
				</svg>
			</div>
		</div>
	);
};

export default Navbar;
