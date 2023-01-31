import { PrismaClient } from "@prisma/client";
import prisma from "../prisma/client";

import { IncomingMessage, ServerResponse } from "http";
import Db from "../lib/db";
export interface Context {
	db: Db;
	account_id: string;
}

export async function createContext(account_id?: string) {
	return {
		prisma: prisma,
		db: new Db(),
		account_id,
	};
}
