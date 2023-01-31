import { NextPage } from "next";
import useFetch from "../hooks/useFetch";
import { useCtx } from "../contexts/AuthContext";
import { Spinner } from "../components/Spinner";
import Router from "next/router";
import { Address } from "@prisma/client";
import { ProfileNav, ProfileDetails, Likes, Help } from "../components";
import { GET_ACCOUNT } from "../queries";
import { PostI, ProfileDetailsProps } from "../types";
import { useState } from "react";
import { useRouter } from "next/router";
const Profile: NextPage = () => {
	const router = useRouter();
	console.log("router is ", router);
	const authContext = useCtx();
	const [index, setIndex] = useState(0);

	const [accountLoading, data, error] = useFetch(GET_ACCOUNT);
	const address = data?.account.account?.profile?.address as Address;
	const profile = data?.account.account?.profile as ProfileDetailsProps;
	const posts = data?.account.account?.posts as PostI[];
	const fullProfile = {
		...profile,
		...address,
	};
	if (accountLoading) return <Spinner loading={accountLoading} />;
	if (data) {
		console.log("account in profile full", data);
	}

	if (!authContext.isAuthenticated) {
		Router.push("/signin");
	}

	return (
		<div className=' flex flex-col w-full  '>
			<div className='bg-blue h-40'></div>

			<div className='w-full  max-w-3xl mx-auto  '>
				<ProfileDetails {...fullProfile} />
				<ProfileNav setIndex={setIndex} index={index} />

				<Help index={index} posts={posts} />
			</div>
		</div>
	);
};

export default Profile;
