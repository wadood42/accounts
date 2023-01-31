import { Context } from "./context";
import { SigninData, SignupData, UpdateAccountInterface } from "../types";
import { ForbiddenError } from "apollo-server-micro";
import { Account, Profile } from "@prisma/client";
export const resolvers = {
	Query: {
		account: async (_: any, args: { account_id: string }, context: Context) => {
			console.log("account args", context.account_id);
			if (!context.account_id) {
				throw new ForbiddenError("you need log in first account subgraph");
			}
			return await context.db.account(args.account_id);
		},
	},
	// contributes to post
	Account: {
		__resolveReference: async (representation: any, context: Context) => {
			console.log("REPRESENTATION in account ", representation);

			const account = await context.db.account(representation.account_id);
			console.log("account to be returned", account);
			return account.account;
		},

		profile: async (parent: Account, args: any, { db }: Context) => {
			console.log("getting profile ", parent);
			return await db.getProfile(parent.account_id);
		},
	},
	Profile: {
		address: async (parent: Profile, _: any, { db }: Context) => {
			console.log("GETTING ADDRESS FOR PROFILE", parent);

			return await db.getAddress(parent.profile_id);
		},
	},
	Mutation: {
		signup: async (_: any, args: SignupData, context: Context) => {
			return await context.db.signup(args);
		},
		signin: async (_: any, args: SigninData, context: Context) => {
			const { email, password } = args.data;
			return await context.db.signin(email, password);
		},
		updateAccount: async (
			_: any,
			args: UpdateAccountInterface,
			{ db, account_id }: Context
		) => {
			return await db.updateAccount(account_id, args);
		},
	},
};
