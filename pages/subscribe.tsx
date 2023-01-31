import { NextPage } from "next";

const Subscribe: NextPage = () => {
	return (
		<div className=' w-full flex flex-col justify-center items-center '>
			<div className=' flex flex-col'>
				<h1 className='border text-3xl font-bold text-center tracking-wider   mb-4'>
					Whats your email?
				</h1>
				<form action='' className=' flex justify-center items-center'>
					<input
						type='email'
						name='email'
						className='p-4  text-sm outline-none bg-gray-200 border border-indigo-500 rounded-l '
						placeholder='Type you email...'
					/>
					<button
						type='submit'
						className='border  bg-indigo-500  px-6 py-4 text-sm border-indigo-500 rounded-r   font-bold text-white  '
					>
						Subscribe
					</button>
				</form>
			</div>
		</div>
	);
};

export default Subscribe;
