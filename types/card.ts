import z from "zod";

const ERROR_SUFIX = "is required";

const CardDataSchema = z.object({
	cardNumber: z
		.string()
		.trim()
		.nonempty(`Card number ${ERROR_SUFIX}`)
		.regex(/^(\d{4} ){3}\d{4}$/, "Invalid card number"),
	cardHolder: z
		.string()
		.trim()
		.nonempty(`Card holder ${ERROR_SUFIX}`)
		.toUpperCase()
		.regex(/^[A-Z]+ [A-Z]+$/, "Invalid card holder name"),
	expiry: z
		.string()
		.trim()
		.nonempty(`Card expiry ${ERROR_SUFIX}`)
		.regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date")
		.refine((val) => {
			const [month, year] = val.split("\/");
			const currentDate = new Date();
			const currentMonth = currentDate.getMonth() + 1;
			const currentYear = currentDate.getFullYear() % 100;
			return !(
				(+month <= currentMonth && +year === currentYear) ||
				+year < currentYear
			);
		}, "Cannot be before current date"),
	cvv: z
		.string()
		.nonempty(`Card CVV ${ERROR_SUFIX}`)
		.regex(/^\d{3}$/, "Invalid CVV"),
});

const CardUserDataSchema = z.object({
	email: z
		.email("Please enter a valid email address.")
		.nonempty(`Email ${ERROR_SUFIX}`),
	country: z
		.string()
		.trim()
		.nonempty(`Country ${ERROR_SUFIX}`)
		.regex(/^[A-Z]{3}$/, "Invalid country name"),
	street: z.string().trim().nonempty(`Street ${ERROR_SUFIX}`),
	apartment: z
		.string()
		.trim()
		.min(2, "Too short")
		.max(60, "Too long")
		.optional(),
	city: z
		.string()
		.trim()
		.nonempty(`City ${ERROR_SUFIX}`)
		.min(2, "Too short")
		.max(60, "Too long")
		.regex(/^[A-Z][a-z]+( [A-Z][a-z]+)*$/, "Invalid city name"),
	zip: z
		.string()
		.nonempty(`Zip code ${ERROR_SUFIX}`)
		.regex(/^\d{4}$/, "Invalid zip code"),
});

export const CardFormSchema = z.object({
	...CardDataSchema.shape,
	...CardUserDataSchema.shape,
});

export type CardForm = z.infer<typeof CardFormSchema>;

export const CardDatabaseSchema = CardFormSchema.extend(
	z.object({
		cardNumber: CardFormSchema.shape.cardNumber.transform(
			(val) => +val.replaceAll(" ", ""),
		),
		cvv: CardFormSchema.shape.cvv.transform((val) => +val),
		zip: CardFormSchema.shape.zip.transform((val) => +val),
		expiry: CardFormSchema.shape.expiry.transform((val) => {
			const [month, year] = val.split("\/");
			return new Date(`20${year}-${month}-01`);
		}),
		apartment: CardFormSchema.shape.apartment.transform(
			(val) => val || null,
		),
	}).shape,
);

export type CardDatabaseData = z.output<typeof CardDatabaseSchema>;
