import { StyledLabel } from "@/components/styled-label";
import {
	Field,
	FieldContent,
	FieldError,
	FieldGroup,
	FieldLegend,
	FieldSet,
	FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CardData } from "@/types/card";
import { formatDigitsOnly } from "@/utils/digits-only-formatter";
import { Controller, useFormContext } from "react-hook-form";

const COUNTRIES = [{ value: "BGR", label: "Bulgaria" }];

export function AddressDetails() {
	const formCtx = useFormContext<CardData>();
	return (
		<FieldSet>
			<div className="sm:grid sm:grid-cols-3 sm:gap-8">
				<FieldLegend>Address details</FieldLegend>
				<FieldGroup className="sm:col-span-2">
					<Controller
						name="country"
						control={formCtx.control}
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
										aria-invalid={fieldState.invalid}
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
									<FieldError errors={[fieldState.error]} />
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
							control={formCtx.control}
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
										aria-invalid={fieldState.invalid}
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
							control={formCtx.control}
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
										aria-invalid={fieldState.invalid}
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
							control={formCtx.control}
							render={({ field, fieldState }) => (
								<Field>
									<StyledLabel htmlFor="rhf-city">
										City
									</StyledLabel>
									<Input
										{...field}
										id="rhf-city"
										aria-invalid={fieldState.invalid}
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
							control={formCtx.control}
							render={({ field, fieldState }) => (
								<Field>
									<StyledLabel htmlFor="rhf-state">
										Zip
									</StyledLabel>
									<Input
										{...field}
										id="rhf-state"
										aria-invalid={fieldState.invalid}
										placeholder="1234"
										maxLength={4}
										inputMode="numeric"
										onChange={({ target: { value } }) => {
											const formatted = formatDigitsOnly(
												value,
												4,
											);
											field.onChange(formatted);
										}}
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
	);
}
