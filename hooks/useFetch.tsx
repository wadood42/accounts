import { useEffect, useState } from "react";
import { useCtx } from "../contexts/AuthContext";
import { useQuery } from "@apollo/client";
import { GET_ACCOUNT } from "../queries";
import { Account, Profile, Address } from "@prisma/client";
import { DocumentNode } from "@apollo/client";
interface FullProfile extends Profile {
	address: Address;
}

interface FullAccount {
	account: Account & {
		profile: FullProfile;
	};
}

function useFetch(query: DocumentNode, id?: string, networkFetch = false) {
	// const auth = useCtx();
	// const account_id = auth.user?.account_id;
	// console.log("ACCOUNT ID IN USE FETCH", account_id);

	const {
		loading: accountLoading,
		data,
		error,
	} = useQuery(query, {
		variables: {
			accountId: id,
		},
		fetchPolicy: networkFetch ? "network-only" : "cache-first",
	});

	useEffect(() => {
		if (!data) return;
	}, [data]);

	return [accountLoading, data, error] as const;
}

export default useFetch;
