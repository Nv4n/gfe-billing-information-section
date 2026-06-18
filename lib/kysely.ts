import { Database } from "@/types/db";
import { neon, neonConfig, Pool } from "@neondatabase/serverless";
import { CamelCasePlugin, Kysely, PostgresDialect, PostgresPool } from "kysely";
import { NeonDialect } from "kysely-neon";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

export const db = new Kysely<Database>({
	dialect: new NeonDialect({
		neon: neon(process.env.DATABASE_URL!),
	}),
	plugins: [new CamelCasePlugin()],
});

export const dbws = new Kysely<Database>({
	dialect: new PostgresDialect({
		pool: new Pool({
			connectionString: process.env.DATABASE_URL!,
		}) as unknown as PostgresPool,
	}),
	plugins: [new CamelCasePlugin()],
});
