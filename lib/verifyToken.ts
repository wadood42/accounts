import jwt from "jsonwebtoken";

export function verifyToken(token: string) {
	let privateKey = process.env.NEXT_PUBLIC_SECRET_KEY;
	console.log("decode xxxxx", process.env.NEXT_PUBLIC_SECRET_KEY);
	if (privateKey) {
		const decoded: any = jwt.verify(token, privateKey);

		return decoded.data;
	}
}
