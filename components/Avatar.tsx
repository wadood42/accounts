import Image from "next/image";

interface AvatarProps {
	first_name?: string;
	last_name?: string;
	profile_image_url?: string;
}
const Avatar = ({ first_name, last_name, profile_image_url }: AvatarProps) => {
	return (
		<div className=' flex '>
			{profile_image_url ? (
				<div className='w-16 flex justify-center items-center h-12'>
					<Image
						src={profile_image_url}
						alt='profile-image'
						width={40}
						height={40}
						className='ring-2 rounded-full'
					/>
				</div>
			) : (
				<div className='w-16 flex justify-center items-center border-light-gray h-12'>
					<Image
						src='/avatar.jpg'
						alt='avatar'
						width={40}
						height={40}
						className=' rounded-full'
					/>
				</div>
			)}

			<p className=' self-center text-xs font-semibold text-gray'>
				{first_name} {last_name}
			</p>
		</div>
	);
};

export default Avatar;
