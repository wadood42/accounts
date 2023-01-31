import { NextPage } from "next";
import { Form } from "../components";
import { FormEvent, useState } from "react";
import Link from "next/link";
const Signup: NextPage = () => {
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("hahahah")
	};
	return (
		<div className='w-full  flex flex-col justify-center sm:max-w-md mx-auto'>
			<div className='border rounded border-light-gray'>
				<div className=' flex flex-col items-center p-4 bg-white sm:rounded-tl-md sm:rounded-tr-md shadow-md '>
					<div className=' border w-24 h-24 rounded-full  -mt-16 mb-4 bg-white'></div>
					<h1 className=' font-medium tracking-wider '>Sign up</h1>
					<p className='text-xs text-gray-500'>
						Have an account?
						<Link href='/signin'>
							<a className='font-bold px-1 text-light-blue '>Sign in</a>
						</Link>
						`
					</p>
				</div>
				<Form
					onSubmit={handleSubmit}
					errorMessage={errorMessage}
					formType='signup'
				/>
			</div>
		</div>
	);
};

export default Signup;
