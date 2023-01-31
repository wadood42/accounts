import { NextPage } from "next";
import { useCtx } from "../../contexts/AuthContext";
import { Spinner } from "../../components/Spinner";
import Router from "next/router";
import { ProfileNav, ProfileDetails, Likes, Help } from "../../components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUserCtx } from "../../components/CurrentUserProvider";
const Profile: NextPage = () => {
	const router = useRouter();
	const { loading, setUserId } = useUserCtx();

	const userid = router.query.userid as string;
	const authContext = useCtx();
	const [index, setIndex] = useState(0);
	useEffect(() => {
		setUserId!(userid);
	}, [userid, setUserId]);
	if (loading) return <Spinner loading={loading} />;

	if (!authContext.isAuthenticated) {
		Router.push("/signin");
	}

	return (
		<div className=' flex flex-col w-full  '>
			<div className='bg-blue h-40'></div>

			<div className='w-full  max-w-3xl mx-auto  '>
				<ProfileDetails />
				<ProfileNav setIndex={setIndex} index={index} />
				<Help index={index} userid={userid} />
			</div>
		</div>
	);
};

export default Profile;
