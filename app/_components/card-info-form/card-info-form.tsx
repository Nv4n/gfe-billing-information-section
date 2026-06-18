"use client";
import { AddressDetails } from "@/app/_components/card-info-form/sections/adress-details";
import { EmailDetails } from "@/app/_components/card-info-form/sections/email-details";
import { PaymentDetails } from "@/app/_components/card-info-form/sections/payment-details";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldSeparator } from "@/components/ui/field";
import { useUpdateCardInfo } from "@/hooks/useUpdateCardInfo";
import { CardFormData, CardFormDataSchema } from "@/types/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

export function CardInfoForm() {
	const mutation = useUpdateCardInfo();

	const form = useForm<CardFormData>({
		resolver: zodResolver(CardFormDataSchema),
		defaultValues: formDefaults(),
		mode: "onTouched",
	});

	function onSubmit(data: CardFormData) {
		mutation.mutate(data);
	}

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="gap-4 sm:gap-6 flex flex-col"
			>
				<FieldGroup>
					<PaymentDetails />
					<FieldSeparator />
					<EmailDetails />
					<FieldSeparator />
					<AddressDetails />
				</FieldGroup>
				<Field orientation={"horizontal"} className="py-4">
					<Button
						disabled={
							(!mutation.isPending && !form.formState.isDirty) ||
							!form.formState.isValid
								? true
								: false
						}
						type="submit"
						className="text-start text-background ml-auto w-44 cursor-pointer rounded bg-indigo-700 px-3 py-5 font-medium hover:bg-indigo-800 focus:bg-indigo-800 disabled:bg-neutral-100 disabled:text-neutral-400"
					>
						{mutation.isPending ? "Saving..." : "Save changes"}
					</Button>
				</Field>
			</form>
		</FormProvider>
	);
}

function formDefaults() {
	return {
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
	};
}
