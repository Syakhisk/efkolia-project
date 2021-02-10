import Layout from "../../components/Layout";
import { csrfToken } from "next-auth/client";
import { signIn, useSession } from "next-auth/client";

const Login = ({ csrfToken }) => {
	const [session, loading] = useSession();
	const template = (
		<div>
			<div className='max-w-xl mx-auto my-8 rounded-md border'>
				<div className='bg-gray-100 p-8 '>
					<h1 className='text-3xl font-bold'>Welcome back!</h1>
					<p className='text-base pb-3 border-b border-black'>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
						neque?
					</p>
				</div>

				<form action='' className='grid grid-rows-2 gap-2 shadow p-8'>
					<div className='flex flex-col'>
						<label className='text-sm mb-2' htmlFor='username'>
							Username
						</label>
						<input
							className='border rounded focus:outline-none py-0.5 px-1'
							type='text'
							name='username'
						/>
					</div>
					<div className='flex flex-col'>
						<label className='text-sm mb-2' htmlFor='password'>
							Password
						</label>
						<input
							className='border rounded focus:outline-none py-0.5 px-1'
							type='text'
							name='password'
						/>
					</div>

					<div className='flex mt-5'>
						<button
							onClick={() => signIn()}
							className='w-full bg-purple-800 px-5 py-1 rounded-md text-white font-semibold text-sm'>
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>
	);

	return (
		<Layout bare>
			<form method='post' action='/api/auth/callback/credentials'>
				<input name='csrfToken' type='hidden' defaultValue={csrfToken} />
				<label>
					Username
					<input name='username' type='text' />
				</label>
				<label>
					Password
					<input name='password' type='text' />
				</label>
				<button type='submit'>Sign in</button>
			</form>
		</Layout>
	);
};

export default Login;

Login.getInitialProps = async (context) => {
	return {
		csrfToken: await csrfToken(context),
	};
};
