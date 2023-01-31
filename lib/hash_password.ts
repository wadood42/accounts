import bcrypt from "bcryptjs";
import { UserInputError } from "apollo-server-micro";

export const hashPassword = async (password: string) => {
	const slat = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, slat);
};

export const verifyPassword = async (
	hash: string,
	providedPassword: string
) => {
	let valid = await bcrypt.compare(providedPassword, hash);
	if (!valid) {
		throw new UserInputError("incorrect password");
	}
	return valid;
};
