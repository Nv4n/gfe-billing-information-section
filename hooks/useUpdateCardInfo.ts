import { gfeToast } from "@/components/toast-notification";
import { CardFormData } from "@/types/card";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useUpdateCardInfo() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["cards"],
		mutationFn: async (data: CardFormData) => {
			const res = await fetch("/api/cards", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!res.ok) {
				throw new Error("Changes could not be saved. An error occured");
			}

			const body = await res.json();

			if (!body.success) {
				throw new Error(body.error);
			}

			return body;
		},

		onSuccess: async (data) => {
			queryClient.invalidateQueries({ queryKey: ["cards"] });
			gfeToast({
				variant: "success",
				description: "Card info saved successfully",
			});
		},
		onError: (error) => {
			console.error(error);
			gfeToast({
				description:
					"Unexpected error. Please try again later or contact support.",
				variant: "error",
			});
		},
	});
}
