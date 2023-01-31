import { PrismaClient } from "@prisma/client";
import prisma from "../prisma/client";
import { SignupData, UpdateAccountInterface } from "../types";
import { UserInputError } from "apollo-server-micro";
import {
	hashPassword,
	generateToken,
	excludePassword,
	verifyPassword,
} from "./";

export default class Db {
	prisma: PrismaClient;

	constructor() {
		this.prisma = prisma;
	}
	async signin(email: string, password: string) {
		let account = await this.prisma.account.findFirst({
			where: {
				email,
			},
		});
		if (account) {
			const all = Promise.all([
				verifyPassword(account?.password, password),
				generateToken({
					account_id: account.account_id,
					email: account.email,
				}),
			]);
			const lists = await all;
			const [valid, token] = lists;
			console.log("list of promises", lists);
			return {
				code: "200",
				success: true,
				message: "sign in success",
				token: token,
				account,
			};
		} else {
			throw new UserInputError("No account found with that email");
		}
	}

	async signup(args: SignupData) {
		const { email, password } = args.data;
		console.log("signu db", args);

		try {
			let account = await this.prisma.account.findFirst({
				where: { email },
			});
			if (account) {
				throw "Account already exists";
			}
			const hash = await hashPassword(password);
			account = await this.prisma.account.create({
				data: {
					email: email,
					password: hash,
				},
			});
			const token = await generateToken({
				account_id: account.account_id,
				email: account.email,
			});

			let updatedAccount = excludePassword(account, "password");
			return {
				code: "200",
				success: true,
				message: "Account has been created successfully.",
				token: token,
				account: updatedAccount,
			};
		} catch (err: any) {
			console.log("hahshsh sorry");
			return {
				code: "500",
				success: false,
				message: err,
				token: null,
				account: null,
			};
		}
	}

	async account(account_id: string) {
		try {
			let account = await this.prisma.account.findUnique({
				where: {
					account_id: account_id,
				},
			});
			if (!account) {
				throw "Account does not exist with that id";
			}
			console.log("found account", account);

			let updatedAccount = excludePassword(account, "password");

			return {
				code: "200",
				success: true,
				message: "found an account with the given id",
				account: updatedAccount,
			};

			// account = updatedAccount;
			// return account;
		} catch (err: any) {
			console.log("account not found", err);
			return {
				code: "400",
				success: false,
				message: err,
				account: null,
			};
		}
	}
	async updateAccount(account_id: string, { data }: UpdateAccountInterface) {
		const { country, state, city, ...rest } = data;
		const profile = await this.prisma.profile.upsert({
			where: {
				account_id: account_id,
			},
			update: {
				...rest,
			},
			create: {
				account_id: account_id,
				...rest,
			},
		});
		const address = await this.prisma.address.upsert({
			where: {
				profile_id: profile.profile_id,
			},
			update: {
				country,
				state,
				city,
			},
			create: {
				profile_id: profile.profile_id,
				country,
				state,
				city,
			},
		});

		return {
			code: "200",
			success: true,
			message: "account has been updated",
			profile: {
				...profile,
				address,
			},
		};
	}

	async getProfile(account_id: string) {
		return await this.prisma.profile.findUnique({
			where: {
				account_id: account_id,
			},
		});
	}

	async getAddress(profile_id: string) {
		console.log("hahah address");
		const address = await this.prisma.address.findUnique({
			where: {
				profile_id: profile_id,
			},
		});
		console.log("found address", address);
		return address;
	}
}
