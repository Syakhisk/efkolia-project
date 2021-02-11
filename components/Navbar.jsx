import { useRouter } from "next/router";
import cntl from "cntl";

const Navbar = () => {
	const router = useRouter();

	const navbarCN = cntl`
	sticky top-0 
	flex items-center 
	w-full h-navbar 
	dark:bg-brand-dark bg-brand 
	text-xl text-white 
	px-5 py-5
	`;

	return (
		<div className={navbarCN}>
			<span className='flex-grow'>{router.pathname}</span>
			<div className='div'></div>
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
