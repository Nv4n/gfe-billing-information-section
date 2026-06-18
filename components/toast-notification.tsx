import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast as sonnerToast } from "sonner";
import { id } from "zod/locales";

interface ToastProps {
	description: string;
	variant: "error" | "success";
}

export function gfeToast(toast: Omit<ToastProps, "id">) {
	return sonnerToast(
		<Toast description={toast.description} variant={toast.variant} />,
	);
}

function Toast(props: ToastProps) {
	const { description, variant } = props;

	return (
		<div
			className={cn(
				"flex items-center gap-3 font-medium rounded-full py-1 pl-1 pr-2.5",
				variant === "error" ? "bg-red-50" : "bg-green-50",
			)}
		>
			<Badge
				variant={"secondary"}
				className={
					(cn(
						"bg-zinc-50 dark:bg-zinc-50 px-2.5 py-0.5 shadow rounded-full ",
					),
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
