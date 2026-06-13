export const formatExpiry = (value: string) => {
	const digits = value.replace(/\D/g, "");

	const limited = digits.substring(0, 4);

	const matches = limited.match(/.{1,2}/g);
	return matches ? matches.join("/") : limited;
};
