import { CreatePost } from "./";
import { Post } from "../components";
import { useCtx } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import { useUserCtx } from "../components/CurrentUserProvider";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../queries";

const Posts = () => {
	const { posts, loading, updatePosts } = useUserCtx();
	const router = useRouter();
	const userid = router.query.userid as string;
	const authCtx = useCtx();
	// const [
	// 	createPost,
	// 	{
	// 		data: createdPost,
	// 		loading: creatingPostLoading,
	// 		error: creatingPostErro,
	// 	},
	// ] = useMutation(CREATE_POST, {
	// 	onCompleted: (data) => {
	// 		console.log("DATA AFTER CREATEING POST COMPLETE", data);
	// 		updatePosts!(data.createPost.post);
	// 	},
	// 	update(cache, { data: { createPost } }) {},
	// });

	// const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	const target = e.target as typeof e.target & {
	// 		body: { value: string };
	// 	};
	// 	createPost({
	// 		variables: {
	// 			body: target.body.value,
	// 		},
	// 	});
	// };
	return (
		<div className='flex flex-col gap-1  mt-1'>
			{authCtx.user?.account_id.toString() === userid && <CreatePost />}
			{posts?.map((post) => (
				<Post key={post.id} {...post} />
			))}
		</div>
	);
};

export default Posts;
