import jwt from "jsonwebtoken";

export async function generateToken(payload: {
	account_id: string;
	email: string;
}) {
	const privatekey = process.env.SECRET_KEY;

	let token = "";
	if (privatekey) {
		token = jwt.sign(
			{
				data: payload,
			},
			privatekey,
			{ expiresIn: "1h" }
		);
	}

	return token;
}
