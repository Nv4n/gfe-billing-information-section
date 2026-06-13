import { CardInfoForm } from "@/app/_components/card-info-form/card-info-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function Home() {
	return (
		<Card className="lg:px-28 sm:px-8 py-16">
			<CardHeader>
				<CardTitle className="font-semibold text-xl text-neutral-900">Billing Information</CardTitle>
				<CardDescription className="font-normal text-sm text-neutral-500">
					Update your billing details and address
				</CardDescription>
			</CardHeader>
			<CardContent>
				<CardInfoForm />
			</CardContent>
		</Card>
	);
}
