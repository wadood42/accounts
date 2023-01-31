import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	name: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	console.log("WECOME TO ABOUT API");
	res.status(200).json({ name: "About page" });
}
