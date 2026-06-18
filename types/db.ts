import { CardDatabaseData } from "@/types/card";
import {
	ColumnType,
	Generated,
	Insertable,
	Selectable,
	Updateable,
} from "kysely";

export interface Database {
	cards: CardsTable;
}

export interface CardsTable extends CardDatabaseData {
	id: Generated<string>;
	createdAt: ColumnType<Date, string | undefined, never>;
}

export type Card = Selectable<CardsTable>;
export type NewCard = Insertable<CardsTable>;
export type CardUpdate = Updateable<CardsTable>;
