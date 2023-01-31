import React, {
	useState,
	useEffect,
	PropsWithChildren,
	useReducer,
} from "react";
import useFetch from "../hooks/useFetch";
import { GET_ACCOUNT } from "../queries";
import {
	LikeType,
	CurrentUserType,
	PostType,
	ProfileDetailsProps,
	CurrentUserAction,
} from "../types";

import { createCurrentUserCtx } from "../contexts/CurrentUser";
import { currentUserReducer } from "../reducers/currentUserReducer";
const [useCurrentUserCtx, Provider] = createCurrentUserCtx<CurrentUserType>();

export const useUserCtx = useCurrentUserCtx;

const CurrentUserProvider = ({ children }: PropsWithChildren) => {
	const [userid, setUserid] = useState("");
	const [accountLoading, data, error] = useFetch(GET_ACCOUNT, userid, true);
	const profile = data?.account.account?.profile as ProfileDetailsProps;

	const [currentUser, dispatch] = useReducer<
		React.Reducer<CurrentUserType, CurrentUserAction>
	>(currentUserReducer, {} as CurrentUserType);

	const setUserId = (id: string) => {
		setUserid(id);
	};
	const updatePosts = (post: PostType) => {
		dispatch({
			type: "CREATE_POST",
			payload: post,
		});
	};
	const updateDeletedPost = (postid: string) => {
		dispatch({
			type: "DELETE_POST",
			payload: { postid: postid },
		});
	};
	const updateLikedPost = (postid: string, data: LikeType) => {
		dispatch({
			type: "LIKE_POST",
			payload: { postid: postid, likedData: data },
		});
	};

	useEffect(() => {
		dispatch({
			type: "SET_INITIAL_DATA",
			payload: data?.account.account,
		});
	}, [data]);

	const updateAccount = (data: Partial<CurrentUserType>) => {
		console.log("update account data in provider", data);
		dispatch({
			type: "UPDATE_ACCOUNT",
			payload: data,
		});
	};

	return (
		<Provider
			value={{
				...currentUser,
				profile: { ...profile },
				loading: accountLoading,
				setUserId,
				updatePosts,
				updateDeletedPost,
				updateLikedPost,
				updateAccount,
			}}
		>
			{children}
		</Provider>
	);
};

export default CurrentUserProvider;
