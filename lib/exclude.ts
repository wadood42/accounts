export const excludePassword = <T>(account: T, key: keyof T) => {
	delete account[key];
	return account;
};
