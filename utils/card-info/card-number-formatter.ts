export const formatCardNumber = (value: string) => {
	const digits = value.replace(/\D/g, "");

	const limited = digits.substring(0, 16);

	const matches = limited.match(/.{1,4}/g);
	return matches ? matches.join(" ") : limited;
};
