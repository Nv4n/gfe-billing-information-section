import { Database } from "@/types/db";
import { neon } from "@neondatabase/serverless";
import { CamelCasePlugin, Kysely } from "kysely";
import { NeonDialect } from "kysely-neon";

export const db = new Kysely<Database>({
	dialect: new NeonDialect({
		neon: neon(process.env.DATABASE_URL!),
	}),
	plugins: [new CamelCasePlugin()],
});
