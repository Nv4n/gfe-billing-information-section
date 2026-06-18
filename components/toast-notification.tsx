import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ToasterProps, toast as sonnerToast } from "sonner";

interface ToastProps {
	id: string | number;
	description: string;
	variant: "error" | "success";
}

function gfeToast(toast: Omit<ToastProps, "id">) {
	return sonnerToast.custom((id) => (
		<Toast
			id={id}
			description={toast.description}
			variant={toast.variant}
		/>
	));
}

function Toast(props: ToastProps) {
	const { description, variant } = props;

	return (
		<div className="flex items-center gap-3 font-medium">
			<Badge
				className={
					(cn("bg-background shadow"),
					variant === "error" ? "text-red-800" : "text-green-700")
				}
			>
				{variant === "error" ? "Error" : "Success"}
			</Badge>
			<span
				className={
					variant === "error" ? "text-red-600" : "text-green-500"
				}
			>
				{description}
			</span>
		</div>
	);
}
