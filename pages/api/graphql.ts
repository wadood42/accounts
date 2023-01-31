import { ApolloServer, gql } from "apollo-server-micro";
import { buildSubgraphSchema } from "@apollo/subgraph";
import path from "path";
import { readFileSync } from "fs";
import { resolvers } from "../../graphql/resolvers";
import { createContext } from "../../graphql/context";
import { IncomingMessage, ServerResponse } from "http";
import Cors from "micro-cors";
const schemaDir = path.join(process.cwd(), "graphql");
const typeDefs = gql(
	readFileSync(schemaDir + "/schema.graphql", { encoding: "utf-8" })
);
const apolloServer = new ApolloServer({
	schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
	context: async ({ req }) => {
		let authedAccount: { account_id: string; email: string };

		console.log("account req HEADERS", req.headers);
		// const token: string | null = req.headers.authorization || "";
		// if (token) {
		// 	let jwt = token.split(" ")[1];
		// 	authedAccount = verifyToken(jwt);
		// 	return await createContext(authedAccount);
		// }
		return await createContext(req.headers.account_id);
	},
});

const cors = Cors();
const startServer = apolloServer.start();

export default cors(async function handler(
	req: IncomingMessage,
	res: ServerResponse
) {
	if (req.method === "OPTIONS") {
		res.end();
		return false;
	}
	await startServer;
	await apolloServer.createHandler({
		path: "/api/graphql",
	})(req, res);
});
export const config = {
	api: {
		bodyParser: false,
	},
};
