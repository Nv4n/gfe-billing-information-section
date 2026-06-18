import { StyledLabel } from "@/components/styled-label";
import {
	FieldSet,
	FieldLegend,
	FieldGroup,
	Field,
	FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CardFormData } from "@/types/card";
import { Controller, useFormContext } from "react-hook-form";

export function EmailDetails() {
	const formCtx = useFormContext<CardFormData>();
	return (
		<FieldSet>
			<div className="sm:grid sm:grid-cols-3 sm:gap-8">
				<FieldLegend>Email address</FieldLegend>
				<FieldGroup className="sm:col-span-2">
					<Controller
						name="email"
						control={formCtx.control}
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
									type="email"
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
				</FieldGroup>
			</div>
		</FieldSet>
	);
}
