import { CurrentUserAction, CurrentUserType } from "../types";

export function currentUserReducer(
	state: CurrentUserType,
	action: CurrentUserAction
) {
	switch (action.type) {
		case "SET_INITIAL_DATA": {
			return {
				...state,
				...action.payload,
			};
		}
		case "UPDATE_ACCOUNT": {
			let newAddress = {
				...state.profile.address,
				...action.payload.profile?.address,
			};
			let updatedProfile = {
				...state.profile,
				...action.payload.profile,
				address: newAddress,
			};
			console.log("UPDATED PROFILE", updatedProfile);

			return {
				...state,
				profile: { ...state.profile, ...updatedProfile },
			};
		}
		case "CREATE_POST": {
			return {
				...state,
				posts: [action.payload, ...state.posts],
			};
		}
		case "DELETE_POST": {
			let posts = state.posts.filter((p) => p.id !== action.payload.postid);
			return {
				...state,
				posts: posts,
			};
		}

		case "LIKE_POST": {
			let post = state.posts.find((p) => p.id === action.payload.postid);
			if (post) {
				let updatedPost = {
					...post,
					likes: [action.payload.likedData, ...post?.likes],
				};
				let updatedPosts = state.posts.filter((p) => p.id !== updatedPost.id);
				return {
					...state,
					posts: [updatedPost, ...updatedPosts],
				};
			} else {
				return state;
			}
		}

		default: {
			return state;
		}
	}
}
