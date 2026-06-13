export const formaLettersOnly = (value: string) => {
	const letters = value.replace(/[^a-zA-Z ]/g, "");

	return letters;
};
