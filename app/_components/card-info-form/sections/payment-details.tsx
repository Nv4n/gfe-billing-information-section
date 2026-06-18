import { StyledLabel } from "@/components/styled-label";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { CardForm } from "@/types/card";
import { formaLettersOnly } from "@/utils/letters-only-formatter";
import { CreditCard } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import { PatternFormat } from "react-number-format";

export function PaymentDetails() {
	const formCtx = useFormContext<CardForm>();
	return (
		<FieldSet>
			<div className="sm:grid sm:grid-cols-3 sm:gap-8">
				<FieldLegend>Payment details</FieldLegend>
				<FieldGroup className="col-span-2">
					<Controller
						name="cardNumber"
						control={formCtx.control}
						render={({ field, fieldState }) => (
							<Field>
								<StyledLabel htmlFor="rhf-card-number">
									Card number
								</StyledLabel>
								<InputGroup>
									<PatternFormat
										{...field}
										customInput={InputGroupInput}
										aria-invalid={fieldState.invalid}
										placeholder="1234 1234 1234 1234"
										inputMode="numeric"
										format={"#### #### #### ####"}
									/>
									<InputGroupAddon>
										<div className="border rounded w-8 h-6 flex justify-center">
											<CreditCard />
										</div>
									</InputGroupAddon>
								</InputGroup>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="cardHolder"
						control={formCtx.control}
						render={({ field, fieldState }) => (
							<Field>
								<StyledLabel htmlFor="rhf-cardholder">
									Cardholder name
								</StyledLabel>
								<Input
									{...field}
									className="uppercase placeholder:normal-case"
									id="rhf-cardholder"
									aria-invalid={fieldState.invalid}
									placeholder="Full name on card"
									onChange={({ target: { value } }) => {
										const formatted =
											formaLettersOnly(value);
										field.onChange(formatted);
									}}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<div className="grid grid-cols-2 gap-8">
						<Controller
							name="expiry"
							control={formCtx.control}
							render={({ field, fieldState }) => (
								<Field>
									<StyledLabel htmlFor="rhf-expiry">
										Expiry
									</StyledLabel>
									<PatternFormat
										{...field}
										customInput={Input}
										id="rhf-expiry"
										aria-invalid={fieldState.invalid}
										placeholder="MM/YY"
										inputMode="numeric"
										format={"##/##"}
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
							control={formCtx.control}
							render={({ field, fieldState }) => (
								<Field>
									<StyledLabel htmlFor="rhf-cvv">
										CVV
									</StyledLabel>
									<PatternFormat
										{...field}
										customInput={Input}
										id="rhf-cvv"
										aria-invalid={fieldState.invalid}
										placeholder="123"
										inputMode="numeric"
										format="###"
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
