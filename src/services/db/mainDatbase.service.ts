import Knex from 'knex';
import DB from '../../database/connection';

export interface PaginationData {
	items?: Array<object>;
	maxPage: number;
	currentPage?: number;
	rows?: number
}

export default abstract class MainDatabaseService {
	private connection: Knex
	constructor() {
		this.connection = DB.getInstance.getConnection;
	}

	public getAll(table: string, fields: Array<string>): Promise<Array<any>> {
		return this.knex(table).select(fields).then((items) => items).catch((err) => err);
	}

	public get knex() {
		return this.connection;
	}

	private getMaxPage(rows: number, limit: number): number {
		console.log({rows});
		console.log({limit});
		
		
		let maxPage = Math.ceil(rows / Number(limit));	
		console.log({maxPage});
			
		 if(maxPage === 0) {
			return maxPage
		} else {
			return maxPage
		}
	}

	private async countRows(table: string): Promise<any> {
		return this.knex('users').count().then((rows) => rows[0].count).catch((err) => err);
	}

	public async paginateTable(page: number, limit: number, table: string, fields: Array<string>):
		Promise<PaginationData> {
		// set offset
		let offset;
		page === 1 ? offset = 0 : offset = (page - 1) * limit;
		// count rows
		console.log({table});
		
		const rows = await this.countRows(table);
		
		// get max page
		const maxPage = this.getMaxPage(rows, Number(limit));		
		
		return this.knex(table)
			.select(...fields)
			// .from(table)
			.limit(limit).offset(offset)
			.then((items) => {
				if (items.length) {
					return { items, maxPage, currentPage: page, rows};
				}
				return { maxPage };
			})
			.catch((err) => err);
	}
}
