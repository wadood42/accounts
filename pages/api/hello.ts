// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	name: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	console.log("HELLO API", req.headers.cookie);
	if (req.headers.cookie) {
		res.redirect("/about");
	}

	res.status(200).json({ name: "John Doe" });
}
