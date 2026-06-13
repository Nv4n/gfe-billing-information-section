"use client";

import {
	Alert,
	AlertAction,
	AlertDescription,
	AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { unstable_catchError as catchError, type ErrorInfo } from "next/error";

interface ErrorWithMessage {
	message?: string;
}

function ErrorFallback(
	props: { title: string },
	{ error, unstable_retry }: ErrorInfo,
) {
	const errorWithMessage = error as ErrorWithMessage;
	return (
		<Alert variant={"destructive"} className="max-w-md">
			<AlertTitle>{props.title}</AlertTitle>
			<AlertDescription>
				{
					"We're facing some issues at the moment. Please try again later or contact support."
				}
			</AlertDescription>
			<AlertAction>
				<Button size={"sm"} onClick={() => unstable_retry()}>
					Try again
				</Button>
			</AlertAction>
		</Alert>
	);
}

export default catchError(ErrorFallback);
