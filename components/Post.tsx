import { useState } from "react";
import { PostType } from "../types/index";
import { PostsLikesUsers, PostsComments, Avatar, DeletePostModal } from "./";
import { useMutation, gql } from "@apollo/client";
import { useCtx } from "../contexts/AuthContext";
import { useUserCtx } from "./CurrentUserProvider";
import { LIKE_POST, DELETE_POST } from "../queries";
import { format } from "timeago.js";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Post = ({ id, body, createdAt, account, likes, comments }: PostType) => {
	const [deletePostModal, setDeletePostModal] = useState(false);
	const authedUser = useCtx();
	const { updateDeletedPost, updateLikedPost } = useUserCtx();
	const router = useRouter();
	const userid = router.query.userid;
	const [showLikes, setShowLikes] = useState(false);
	const [showComments, setShowComments] = useState(false);
	const [
		deletePost,
		{ data: deletedPost, loading: detetingPostLoading, error: deletePostError },
	] = useMutation(DELETE_POST, {
		onCompleted: (data) => {
			updateDeletedPost!(data.deletePost.id);
		},
	});

	const [likePost, { data, loading: likingLoading, error }] = useMutation(
		LIKE_POST,
		{
			variables: {
				postId: id,
			},
			onCompleted(data) {
				console.log("data after liking", data);
				updateLikedPost(data.likePost.id, data.likePost.likes[0]);
			},
		}
	);
	if (data) {
		console.log("data after likinga post", data);
	}
	if (error) {
		console.log("error after liking a post", error);
	}
	return (
		<div className='border border-light-gray flex bg-white'>
			{deletePostModal && (
				<DeletePostModal
					id={id}
					setDeletePostModal={setDeletePostModal}
					deletePost={deletePost}
					loading={detetingPostLoading}
				/>
			)}
			{showLikes && (
				<PostsLikesUsers setShowLikes={setShowLikes} users={likes} />
			)}

			{showComments && (
				<PostsComments
					setShowComments={setShowComments}
					post={{ id, body, createdAt, account, comments, likes }}
				/>
			)}
			<Avatar profile_image_url={account.profile?.profile_image_url} />

			<div className=' text-sm w-full flex flex-col gap-1'>
				<div className=' border-light-gray '>
					<p className=' mb-2 p-2'>{body}</p>
				</div>
				<div className='text-gray flex justify-around border-b border-light-gray'>
					<button onClick={() => setShowLikes(true)}>
						{likes.length} likes
					</button>
					<p>{comments.length} comments</p>
					<p className='text-xs text-gray text-right pr-2'>
						{format(createdAt)}
					</p>
				</div>
				<div className=' flex justify-around text-sm  m-2'>
					<button
						className='bg-light-gray  rounded px-4 hover:bg-gray hover:text-white transition'
						onClick={async () =>
							await toast.promise(likePost(), {
								success: "post has been liked!",
							})
						}
					>
						{likingLoading ? "liking.." : "Like"}
					</button>
					<button
						className=' bg-light-gray rounded px-4 hover:bg-gray hover:text-white transition'
						onClick={() => setShowComments(true)}
					>
						comment
					</button>

					{authedUser.user?.account_id.toString() === userid && (
						<button
							// onClick={() => deletePost({ variables: { postId: id } })}
							onClick={() => setDeletePostModal(true)}
							className=' bg-light-gray rounded px-4 hover:bg-red hover:text-white transition'
						>
							{detetingPostLoading ? "deleting..." : "delete"}
						</button>
					)}
				</div>
			</div>
			<ToastContainer autoClose={1000} />
		</div>
	);
};

export default Post;
