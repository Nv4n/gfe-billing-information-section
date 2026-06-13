export const formatDigitsOnly = (value: string, length: number) => {
	const digits = value.replace(/\D/g, "");

	if (length <= 0) {
		length = 4;
	}
	const limited = digits.substring(0, length);

	return limited;
};
