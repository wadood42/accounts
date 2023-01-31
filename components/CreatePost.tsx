import { useMutation } from "@apollo/client";
import { useUserCtx } from "./CurrentUserProvider";
import { Avatar } from "./";
import { CREATE_POST } from "../queries";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = () => {
	const { updatePosts } = useUserCtx();
	const [createPost, { data: post, loading: createLoading, error }] =
		useMutation(CREATE_POST, {
			onCompleted: (data) => {
				console.log("DATA AFTER CREATEING POST COMPLETE", data);
				updatePosts!(data.createPost.post);
			},
			update(cache, { data: { createPost } }) {
				console.log("cache in create post", cache);
				console.log("data in create post", createPost);
			},
		});

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log("submiting post");

		const target = e.target as typeof e.target & {
			body: { value: string };
		};

		await toast.promise(
			createPost({
				variables: {
					body: target.body.value,
				},
			}),
			{
				success: "Post has been created ",
				error: "Promies rejected",
			}
		);
		target.body.value = "";
	}

	return (
		<div className=' flex bg-white border border-light-blue'>
			<Avatar />

			<form onSubmit={handleSubmit} className=' flex-1 flex  text-sm p-2'>
				<textarea
					name='body'
					placeholder="What's happnening?"
					id='body'
					className=' w-full resize-none outline-none'
				></textarea>
				<button
					type='submit'
					className=' px-7 text-sm font-bold text-light-blue mr-8 hover:bg-light-blue hover:text-white transition-all'
				>
					{createLoading ? "Creating..." : "Post"}
				</button>
			</form>
		</div>
	);
};

export default CreatePost;
