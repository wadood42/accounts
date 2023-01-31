import { createContext, useContext } from "react";

export function createCurrentUserCtx<T>() {
	const currentUserCtx = createContext<T | undefined>(undefined);

	function useCurrentUserCtx() {
		const c = useContext(currentUserCtx);
		if (!c) {
			throw new Error("not supported");
		}
		return c;
	}

	return [useCurrentUserCtx, currentUserCtx.Provider] as const;
}
