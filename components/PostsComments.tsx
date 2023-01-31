import { CommentType, PostType } from "../types";
import { Avatar, Post } from "./";
import Image from "next/image";
import { format } from "timeago.js";
interface PostsCommentsProps {
	setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
	post: PostType;
}

interface CommentProps {
	comment: CommentType;
}
const Comment = ({ comment }: CommentProps) => {
	return (
		<div className=' flex border-b border-light-gray space-x-2 p-2 '>
			<Avatar
				profile_image_url={comment.account.profile.profile_image_url}
				first_name={comment.account.profile.first_name}
				last_name={comment.account.profile.last_name}
			/>
			<div className='flex-1 self-center  flex justify-between'>
				<p className=' text-sm '>{comment.body}</p>
				<p className='text-gray text-xs  text-right'>
					{format(comment.createdAt)}
				</p>
			</div>
		</div>
	);
};

const PostsComments = ({ post, setShowComments }: PostsCommentsProps) => {
	return (
		<div className='border z-10 w-full h-full left-0 top-0 bg-modal fixed flex justify-center items-center'>
			<div className='rounded overflow-hidden w-2/4 bg-white h-3/4'>
				<div>
					<div className='flex p-2'>
						<p className=' text-center flex-1'>
							{post.account?.profile.first_name}{" "}
							{post.account?.profile.last_name} post
						</p>
						<button
							className='hover:text-red p-1'
							onClick={() => setShowComments(false)}
						>
							X
						</button>
					</div>
					<Post {...post} />
					<div className=''>
						{post.comments?.map((c) => (
							<Comment key={c.createdAt} comment={c} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
export default PostsComments;
