import { dbws } from "@/lib/kysely";
import { CardDatabaseSchema } from "@/types/card";
import { NewCard } from "@/types/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const formData: NewCard = CardDatabaseSchema.parse(body);
		await dbws.transaction().execute(async (tx) => {
			const res = await tx
				.insertInto("cards")
				.values(formData)
				.returning(["id"])
				.executeTakeFirstOrThrow();

			console.log(`Insert successful, temp ID: ${res.id}`);
			throw new Error("ROLLBACK_INSERT");
		});
	} catch (error) {
		if (error instanceof Error && error.message === "ROLLBACK_INSERT") {
			console.log("Transaction safely rolled back. No data was saved.");
			return NextResponse.json({ success: true }, { status: 201 });
		}
		console.error(`The insert failed due to a database error: ${error}`);
		return NextResponse.json(
			{ error: "Database error", success: false },
			{ status: 500 },
		);
	}

	return NextResponse.json({ success: true }, { status: 200 });
}
