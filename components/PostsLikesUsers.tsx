import { LikeType } from "../types";
import Image from "next/image";
import { format } from "timeago.js";
import Link from "next/link";
interface PostsLikesUsersProps {
	setShowLikes: React.Dispatch<React.SetStateAction<boolean>>;
	users?: LikeType[];
}

const PostsLikesUsers = ({ setShowLikes, users }: PostsLikesUsersProps) => {
	return (
		<div className='border z-10 w-full h-full left-0 top-0 bg-modal fixed flex justify-center items-center'>
			<div className='  bg-white w-96 h-96 overflow-hidden rounded'>
				<div className='border-b border-light-gray flex justify-between'>
					<p className='font-semibold flex-1 p-2  text-center'>
						Users who likes the post
					</p>
					<button
						onClick={() => setShowLikes(false)}
						className='hover:text-red  px-4'
					>
						X
					</button>
				</div>
				<div className='flex flex-col space-y-2 p-2'>
					{users?.map((user) => (
						<Link href={`/profile/${user.account.account_id}`} key={user.id}>
							<div
								key={user.createdAt}
								className=' border border-light-gray  rounded flex text-sm space-x-2 p-1 justify-between cursor-pointer hover:bg-light-gray transition-all'
							>
								{user.account.profile.profile_image_url ? (
									<Image
										src={user.account.profile.profile_image_url}
										alt='profile-image'
										width={40}
										height={40}
										className='ring-2 rounded-full'
									/>
								) : (
									<Image
										src='/avatar.jpg'
										alt='avatar'
										width={40}
										height={40}
										className=' rounded-full'
									/>
								)}
								<div className=' text-center flex space-x-2 self-center font-semibold'>
									<p>{user.account.profile.first_name}</p>
									<p>{user.account.profile.last_name}</p>
								</div>
								<div className='text-gray self-center'>
									{format(user.createdAt)}
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default PostsLikesUsers;
