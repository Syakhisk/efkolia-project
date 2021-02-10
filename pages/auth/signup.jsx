import { useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout";
import Input from "../../components/Input";

function Signup() {
	const handleSubmits = async (e) => {
		e.preventDefault();
		const res = await fetch("/api/auth/signup", {
			body: JSON.stringify({
				email: e.target.email.value,
				username: e.target.username.value,
				password: e.target.password.value,
				firstName: e.target.firstName.value,
				lastName: e.target.lastName.value,
			}),
			method: "POST",
			headers: { "Content-Type": "application/json" },
		});

		if (res.status == 200) {
			const result = await res.json();
		} else {
			console.log(res);
		}
	};

	const { register, handleSubmit, formState } = useForm();

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<Layout bare title='Signup'>
			<form
				// onSubmit={handleSubmits}
				className='container rounded max-w-xl border mx-auto my-10 py-5'>
				<div className='flex mx-8'>
					<Input
						name='firstName'
						label='First name *'
						classes='mr-5'
						refs={register({ required: true })}
					/>
					<Input name='lastName' label='Last name' classes='' />
				</div>
				<Input name='email' type='email' />
				<Input name='username' type='text' />
				<Input name='password' type='password' />
				<Input
					name='confirmPassword'
					label='Confirm Password'
					type='password'
				/>
				<div className='px-8 mt-5'>
					<input
						className='rounded-md px-3 py-1 w-full bg-gray-800 text-white'
						type='button'
						value='Sign Up'
						onClick={() => handleSubmit(onSubmit)}
					/>
				</div>
			</form>
		</Layout>
	);
}

export default Signup;
