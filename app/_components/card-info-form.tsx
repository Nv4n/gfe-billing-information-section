"use client";
import { StyledLabel } from "@/components/styled-label";
import { Button } from "@/components/ui/button";
import {
	Field,
	FieldContent,
	FieldError,
	FieldGroup,
	FieldLegend,
	FieldSeparator,
	FieldSet,
	FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CardData, CardDataSchema } from "@/types/card";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const COUNTRIES = [{ value: "BGR", label: "Bulgaria" }];

export function CardInfoForm() {
	const form = useForm<CardData>({
		resolver: zodResolver(CardDataSchema),
		defaultValues: {
			cardNumber: "",
			cardHolder: "",
			expiry: "",
			cvv: "",
			email: "",
			country: "BGR",
			street: "",
			apartment: "",
			city: "",
			zip: "",
		},
	});

	function onSubmit(data: CardData) {
		toast("You submitted the following values:", {
			description: (
				<pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
					<code>{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
			position: "bottom-right",
			classNames: {
				content: "flex flex-col gap-2",
			},
			style: {
				"--border-radius": "calc(var(--radius)  + 4px)",
			} as React.CSSProperties,
		});
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			<FieldGroup>
				<FieldSet className="">
					<div className="sm:grid sm:grid-cols-3 sm:gap-8">
						<FieldLegend>Payment details</FieldLegend>
						<FieldGroup className="col-span-2">
							<Controller
								name="cardNumber"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field>
										<StyledLabel htmlFor="rhf-card-number">
											Card number
										</StyledLabel>
										<InputGroup>
											<InputGroupInput
												{...field}
												id="rhf-card-number"
												aria-invalid={
													fieldState.invalid
												}
												placeholder="1234 1234 1234 1234"
											/>
											<InputGroupAddon>
												<Image
													className="border rounded "
													src="/ma_symbol.svg"
													alt={"Mastercard logo"}
													unoptimized
													width={32}
													height={32}
												/>
											</InputGroupAddon>
										</InputGroup>
										{fieldState.invalid && (
											<FieldError
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>
							<Controller
								name="cardHolder"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field>
										<StyledLabel htmlFor="rhf-cardholder">
											Cardholder name
										</StyledLabel>
										<Input
											{...field}
											id="rhf-cardholder"
											aria-invalid={fieldState.invalid}
											placeholder="Full name on card"
										/>
										{fieldState.invalid && (
											<FieldError
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>
							<div className="grid grid-cols-2 gap-8">
								<Controller
									name="expiry"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field>
											<StyledLabel htmlFor="rhf-expiry">
												Expiry
											</StyledLabel>
											<Input
												{...field}
												id="rhf-expiry"
												aria-invalid={
													fieldState.invalid
												}
												placeholder="MM/YY"
											/>
											{fieldState.invalid && (
												<FieldError
													errors={[fieldState.error]}
												/>
											)}
										</Field>
									)}
								/>
								<Controller
									name="cvv"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field>
											<StyledLabel htmlFor="rhf-cvv">
												CVV
											</StyledLabel>
											<Input
												{...field}
												id="rhf-cvv"
												aria-invalid={
													fieldState.invalid
												}
												placeholder="123"
											/>
											{fieldState.invalid && (
												<FieldError
													errors={[fieldState.error]}
												/>
											)}
										</Field>
									)}
								/>
							</div>
						</FieldGroup>
					</div>
				</FieldSet>
				<FieldSeparator />
				<FieldSet>
					<div className="sm:grid sm:grid-cols-3 sm:gap-8">
						<FieldLegend>Email address</FieldLegend>
						<FieldGroup className="sm:col-span-2">
							<Controller
								name="email"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field>
										<StyledLabel htmlFor="rhf-email">
											Email
										</StyledLabel>
										<Input
											{...field}
											id="rhf-email"
											aria-invalid={fieldState.invalid}
											placeholder="user@example.com"
										/>
										{fieldState.invalid && (
											<FieldError
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>
						</FieldGroup>
					</div>
				</FieldSet>
				<FieldSeparator />
				<FieldSet>
					<div className="sm:grid sm:grid-cols-3 sm:gap-8">
						<FieldLegend>Address details</FieldLegend>
						<FieldGroup className="sm:col-span-2">
							<Controller
								name="country"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<StyledLabel htmlFor="rhf-select-country-region">
											Country / Region
										</StyledLabel>
										<Select
											name={field.name}
											value={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger
												id="rhf-select-country-region"
												aria-invalid={
													fieldState.invalid
												}
											>
												<SelectValue placeholder="Select a country / region" />
											</SelectTrigger>
											<SelectContent position="popper">
												{COUNTRIES.map((country) => (
													<SelectItem
														key={`country-${country.value}`}
														value={country.value}
													>
														{country.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										{fieldState.invalid && (
											<FieldError
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>
							<FieldGroup>
								<FieldContent>
									<FieldTitle>Address</FieldTitle>
								</FieldContent>
								<Controller
									name="street"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field>
											<StyledLabel
												className="sr-only"
												htmlFor="rhf-street"
											>
												Street address
											</StyledLabel>
											<Input
												{...field}
												id="rhf-street"
												aria-invalid={
													fieldState.invalid
												}
												placeholder="Street address"
											/>
											{fieldState.invalid && (
												<FieldError
													errors={[fieldState.error]}
												/>
											)}
										</Field>
									)}
								></Controller>
								<Controller
									name="apartment"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field>
											<StyledLabel
												className="sr-only"
												htmlFor="rhf-apartment"
											>
												Apartment, suite, etc (optional)
											</StyledLabel>
											<Input
												{...field}
												id="rhf-apartment"
												aria-invalid={
													fieldState.invalid
												}
												placeholder="Apartment, suite, etc (optional)"
											/>
											{fieldState.invalid && (
												<FieldError
													errors={[fieldState.error]}
												/>
											)}
										</Field>
									)}
								></Controller>
							</FieldGroup>
							<div className="grid grid-cols-2 gap-8">
								<Controller
									name="city"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field>
											<StyledLabel htmlFor="rhf-city">
												City
											</StyledLabel>
											<Input
												{...field}
												id="rhf-city"
												aria-invalid={
													fieldState.invalid
												}
												placeholder="City"
											/>
											{fieldState.invalid && (
												<FieldError
													errors={[fieldState.error]}
												/>
											)}
										</Field>
									)}
								/>
								<Controller
									name="zip"
									control={form.control}
									render={({ field, fieldState }) => (
										<Field>
											<StyledLabel htmlFor="rhf-state">
												Zip
											</StyledLabel>
											<Input
												{...field}
												id="rhf-state"
												aria-invalid={
													fieldState.invalid
												}
												placeholder="1234"
												pattern="\d{4}"
												inputMode="numeric"
											/>
											{fieldState.invalid && (
												<FieldError
													errors={[fieldState.error]}
												/>
											)}
										</Field>
									)}
								/>
							</div>
						</FieldGroup>
					</div>
				</FieldSet>
			</FieldGroup>
			<Field orientation={"horizontal"}>
				<Button
					disabled={
						!form.formState.isDirty || !form.formState.isValid
							? true
							: false
					}
					type="submit"
					className="text-start text-background ml-auto w-44 cursor-pointer rounded bg-indigo-700 px-3 py-5 font-medium hover:bg-indigo-800 focus:bg-indigo-800 disabled:bg-neutral-100 disabled:text-neutral-400"
				>
					Save changes
				</Button>
			</Field>
		</form>
	);
}
