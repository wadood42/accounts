import { useUserCtx } from "./CurrentUserProvider";
import { useRouter } from "next/router";
import { PostType } from "../types";
import useFetch from "../hooks/useFetch";
import { GET_PPOSTS } from "../queries";
import { useQuery } from "@apollo/client";
const Likes = () => {
	const router = useRouter();
	console.log("router in l ikes", router);
	const currentUser = useUserCtx();
	const userid = router.query.userid as string;

	return <div className='border w-full max-w-3xl mx-auto'>likes</div>;
};

export default Likes;
