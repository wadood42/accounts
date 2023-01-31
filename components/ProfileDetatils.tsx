import Link from "next/link";
import { ImLocation2 } from "react-icons/im";

import { useUserCtx } from "./CurrentUserProvider";
import { useCtx } from "../contexts/AuthContext";
import Image from "next/image";
const ProfileDetails = () => {
	const auth = useCtx();
	let a = auth.user?.account_id;
	const { profile, loading, account_id } = useUserCtx();
	console.log("PROFILE HAHAHAHA", profile);
	const { address, first_name, last_name, age, description, job, gender } =
		profile;

	return (
		<div className='bg-white -mt-16 w-full  flex flex-col p-2  sm:rounded-t '>
			<div className='border-8 border-blue rounded-full sm:mx-auto  -mt-14 flex justify-center items-center'>
				<Image
					src='/avatar.jpg'
					width={70}
					height={70}
					alt='avatar'
					className='avatar aspect-square rounded-full'
				/>
			</div>
			{String(auth.user?.account_id) === account_id && (
				<Link href='/profile/edit'>
					<a className='hover:bg-blue-light bg-blue rounded-md text-white text-xs px-2 py-1 self-end transition mr-8 '>
						Edit profile
					</a>
				</Link>
			)}
			<div className='  text-xs sm:text-center flex flex-col gap-1 '>
				<h1 className='font-bold text-lg'>
					{first_name} {last_name}
				</h1>
				<p>
					{gender}, {age}
				</p>
				<p className=''>Bio: {description}</p>
				<p>Profession: {job}</p>

				<div className=' flex sm:justify-center'>
					<span className='mr-2 '>
						<ImLocation2 />
					</span>
					{loading ? (
						"loading..."
					) : (
						<p className=''>
							{address?.country}, {address?.state}, {address?.city}
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProfileDetails;
