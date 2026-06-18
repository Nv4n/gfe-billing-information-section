"use client";
import { AddressDetails } from "@/app/_components/card-info-form/sections/adress-details";
import { EmailDetails } from "@/app/_components/card-info-form/sections/email-details";
import { PaymentDetails } from "@/app/_components/card-info-form/sections/payment-details";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldSeparator } from "@/components/ui/field";
import { CardForm, CardFormSchema } from "@/types/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export function CardInfoForm() {
	const form = useForm<CardForm>({
		resolver: zodResolver(CardFormSchema),
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
		mode: "onTouched",
	});

	function onSubmit(data: CardForm) {
		console.log(data);
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
		</FormProvider>
	);
}
