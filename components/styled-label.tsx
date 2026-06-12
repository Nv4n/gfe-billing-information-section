import { FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export const StyledLabel = ({
	className,
	...props
}: React.ComponentProps<typeof FieldLabel>) => (
	<FieldLabel
		className={cn("text-sm text-neutral-700", className)}
		{...props}
	/>
);
