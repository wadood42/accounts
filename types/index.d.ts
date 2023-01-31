// interface for when a user signs up
import { Address, Profile } from "@prisma/client";
export interface SignupData {
	data: {
		email: string;
		password: string;
	};
}

export interface SigninData {
	data: {
		email: string;
		password: string;
	};
}

export interface User {
	email: string;
	account_id: number;
}

export interface AuthedUser {
	isAuthenticated: boolean;
	user: User | null;
}

export type Action = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

export interface SigninType {
	signin: {
		success: boolean;
		message: string;
		token: string;
		account: {
			email: string;
			account_id: number;
		};
	};
}

export interface UpdateAccountInterface {
	data: {
		first_name?: string;
		last_name?: string;
		age?: number;
		gender?: string;
		job?: string;
		description?: string;
		profile_image_url?: string;
		country?: string;
		state?: string;
		city?: string;
	};
}

export interface ProfileDetailsProps {
	first_name?: string;
	last_name?: string;
	age?: number;
	gender?: string;
	job?: string;
	description?: string;
	profile_image_url?: string;
	address: Address;
}

export interface PostI {
	id: string;
	accountId: string;
	body: string;
	createdAt: string;
}

export interface PostType {
	id: string;
	body: string;
	createdAt: string;
	account: {
		profile: {
			first_name: string;
			last_name: string;
			profile_image_url: string;
		};
	};
	likes: LikeType[];
	comments: CommentType[];
}

export interface CommentType {
	body: string;
	createdAt: string;
	account: {
		profile: {
			first_name: string;
			last_name: string;
			profile_image_url: string;
		};
	};
}

export interface LikeType {
	id: string;
	createdAt: string;
	account: {
		account_id;
		profile: {
			first_name: string;
			last_name: string;
			profile_image_url: string;
		};
	};
}

export type CurrentUserAction =
	| { type: "DELETE_POST"; payload: { postid: string } }
	| { type: "CREATE_POST"; payload: PostType }
	| { type: "LIKE_POST"; payload: { postid: string; likedData: LikeType } }
	| { type: "SET_INITIAL_DATA"; payload: CurrentUserType }
	| { type: "UPDATE_ACCOUNT"; payload: Partial<CurrentUserType> };

export interface CurrentUserType {
	email: string;
	account_id: string;
	createdAt: string;
	// profile: {
	// 	first_name?: string;
	// 	last_name?: string;
	// 	age?: number;
	// 	gender?: string;
	// 	job?: string;
	// 	description?: string;
	// 	profile_image_url?: string;
	// 	address: {
	// 		country?: string;
	// 		state?: string;
	// 		city?: string;
	// 	};
	// };
	profile: ProfileDetailsProps;
	posts: PostType[];
	updatePosts?: (post: PostType) => void;
	updateDeletedPost?: (postid: string) => void;
	loading?: boolean;
	setUserId?: (id: string) => void;
	updateLikedPost: (postid: string, data: LikeType) => void;
	updateAccount: (data: Partial<UpdateAccountReturnType>) => void;
}
