import Link from "next/link";
import { FormEvent } from "react";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
interface FormProps {
	errorMessage: string;
	formType: string;

	onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function Form({ errorMessage, onSubmit, formType }: FormProps) {
	return (
		<form
			onSubmit={onSubmit}
			className='   p-4 flex flex-col gap-3   shadow-md rounded-b bg-white'
		>
			<div className=' flex   p-1  flex-col gap-2    '>
				<div className='flex  p-1 rounded border border-light-gray '>
					<label htmlFor='email' className=' p-2'>
						<AiOutlineMail />
					</label>
					<input
						type='email'
						name='email'
						id='email'
						required
						placeholder='Email'
						className='  text-xs p-2 w-full outline-none  '
					/>
				</div>
				{errorMessage && (
					<p className=' text-center text-xs   p-1 text-red-500'>
						{errorMessage}
					</p>
				)}
			</div>

			<div className='flex  p-1 rounded border border-light-gray'>
				<label htmlFor='password' className='p-2'>
					<AiFillLock />
				</label>
				<input
					type='password'
					id='password'
					name='password'
					required
					placeholder='Password'
					className='  text-xs p-2 w-full outline-none '
				/>
				{/* <p className=' text-center text-xs border p-1 text-red-500'>
					Password is required
				</p> */}
			</div>

			{formType === "signup" && (
				<div className='flex  p-1 rounded bg-light-gray'>
					<label htmlFor='confirmPassword' className='p-2'>
						<AiFillLock />
					</label>
					<input
						type='password'
						required
						id='confirmPassword'
						name='confirmPassword'
						placeholder='Confirm Password'
						className=' text-xs p-2 w-full outline-none bg-light-gray'
					/>
					{/* <p className=' text-center text-xs border p-1 text-red-500'>
						Password is required
					</p> */}
				</div>
			)}

			<button
				type='submit'
				className='border mb-6 w-full bg-light-blue text-white text-sm p-2 transition ease-linear duration-200 hover:bg-indigo-400 rounded'
			>
				{formType === "signin" ? "Sign in" : "Sign up"}
			</button>

			<div className='w-1/2 mx-auto'>
				<Link href='/signup'>
					<a className='border block bg-green text-center text-white font-bold p-2 rounded '>
						Create new account
					</a>
				</Link>
			</div>
		</form>
	);
}
