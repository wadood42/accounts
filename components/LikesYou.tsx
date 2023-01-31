import { useRouter } from "next/router";
import { useUserCtx } from "./CurrentUserProvider";
import { useEffect } from "react";
const LikesYou = () => {
	const router = useRouter();
	const userid = router.query.userid as string;
	console.log("user id in likes you", userid);

	const currentUser = useUserCtx();
	console.log("posts in likes your", currentUser);
	const { address } = currentUser.profile;

	useEffect(() => {
		currentUser.setUserId(userid);
	}, [userid]);

	return (
		<div className='border w-full max-w-3xl mx-auto'>
			likes you
			<h1>{address.country}</h1>
		</div>
	);
};

export default LikesYou;
