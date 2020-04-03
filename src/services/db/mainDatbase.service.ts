import Knex from 'knex';
import DB from '../../database/connection';

export interface PaginationData {
	items?: Array<object>;
	maxPage: number;
	currentPage?: number;
}

export default abstract class MainDatabaseService {
	private connection: Knex
	constructor() {
		this.connection = DB.getInstance.getConnection;
	}

	public getAll(table: string, fields: Array<string>): Promise<{ items: Array<object> }> {
		return this.knex(table).select(fields).then((items) => items).catch((err) => err);
	}

	public get knex() {
		return this.connection;
	}

	private getMaxPage(infoRows, limit: number): number {
		let maxPage = Math.trunc(infoRows.rows[0].count / Number(limit));
		return maxPage === 0 ? ++maxPage
			: Number.isInteger(Number(maxPage)) ? maxPage : ++maxPage;
	}

	private countRows(table: string): Promise<number> {
		return this.knex.raw(`SELECT count(*) FROM ${table}`).then((rows) => rows).catch((err) => err);
	}

	public async paginateTable(page: number, limit: number, table: string, fields: Array<string>):
		Promise<PaginationData> {
		// set offset
		let offset;
		page === 1 ? offset = 0 : offset = (page - 1) * limit;
		// count rows
		const rows = await this.countRows(table);
		// get max page
		const maxPage = this.getMaxPage(rows, Number(limit));
		return this.knex(table)
			.select(...fields)
			// .from(table)
			.limit(limit).offset(offset)
			.then((items) => {
				if (items.length) {
					return { items, maxPage, currentPage: page };
				}
				return { maxPage };
			})
			.catch((err) => err);
	}
}
