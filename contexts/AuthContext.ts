import { createContext, useContext, useReducer } from "react";
import { AuthedUser, User, Action } from "../types";

export const authedUser: AuthedUser = {
	isAuthenticated: false,
	user: {} as User,
};

export function authReducer(state: AuthedUser, action: Action): AuthedUser {
	switch (action.type) {
		case "LOGIN": {
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
			};
		}
		case "LOGOUT": {
			return {
				...state,
				isAuthenticated: false,
				user: null,
			};
		}
		default: {
			return state;
		}
	}
}

interface ContextInterface {
	isAuthenticated: boolean;
	loading: boolean;
	user: User | null;
	authenticate: (
		token: string,
		account: { email: string; account_id: number }
	) => void;
	logout: (redirectTo: string) => void;
}

export const [useCtx, Provider] = createCtx<ContextInterface>();

function createCtx<A>() {
	const ctx = createContext<A | undefined>(undefined);

	function useCtx() {
		const c = useContext(ctx);
		if (!c) {
			throw new Error("sorry");
		}
		return c;
	}
	return [useCtx, ctx.Provider] as const;
}
