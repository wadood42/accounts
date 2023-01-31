import React, { useEffect, useReducer, useState } from "react";
import { Provider } from "../contexts/AuthContext";
import { authReducer, authedUser } from "../contexts/AuthContext";
import { AuthedUser, Action } from "../types";

import Router from "next/router";
import { verifyToken } from "../lib/verifyToken";
const AuthProvider = ({ children }: any) => {
	const [loading, setLoading] = useState(true);
	const [state, dispatch] = useReducer<React.Reducer<AuthedUser, Action>>(
		authReducer,
		authedUser
	);

	useEffect(() => {
		setLoading(false);
		if (state.isAuthenticated) return;

		const token = localStorage.getItem("token");

		if (token) {
			const decoded: any = verifyToken(token);
			console.log("decoded data", decoded);

			if (decoded) {
				dispatch({
					type: "LOGIN",
					payload: decoded,
				});
			} else {
				localStorage.removeItem("token");
				dispatch({
					type: "LOGOUT",
				});
			}
		}
	}, [state.isAuthenticated, loading]);

	const authenticate = (
		token: string,
		account: { email: string; account_id: number }
	) => {
		console.log("authenticat user", token);
		localStorage.setItem("token", token);
		dispatch({
			type: "LOGIN",
			payload: { ...account },
		});
	};
	const logout = (redirectTo: string) => {
		localStorage.removeItem("token");
		dispatch({
			type: "LOGOUT",
		});

		Router.push(redirectTo);
	};

	return (
		<Provider value={{ ...state, authenticate, logout, loading }}>
			{children}
		</Provider>
	);
};

export default AuthProvider;
